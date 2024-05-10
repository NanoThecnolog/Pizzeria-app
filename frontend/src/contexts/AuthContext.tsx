import { createContext, ReactNode, useState, useEffect } from "react";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { api } from "@/services/apiClient";

import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>

}
type UserProps = {
    id: string;
    name: string;
    email: string;
}
type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string,
    email: string,
    password: string
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch (err) {
        toast.error("Erro ao deslogar, tente novamente.")
        console.log("erro ao deslogar. " + err)
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({ id: '', name: '', email: '' })
    const isAuthenticated = !!user;

    useEffect(() => {

        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
                .catch(() => {
                    signOut();
                })


        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            //console.log(response.data)
            const { id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 1 mes
                path: "/"
            })

            setUser({
                id,
                name,
                email,

            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Bem vindo!')


            Router.push('/dashboard')


        } catch (err) {
            toast.error("Erro ao Acessar! Tente novamente!")
            console.log("erro ao acessar", err)


        }

    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Usuário criado com sucesso!")

            Router.push('/');

        } catch (err) {
            toast.error("Erro ao tentar criar um usuário")
            console.log("Erro ao cadastrar", err)

        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}