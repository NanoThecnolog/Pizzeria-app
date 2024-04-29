
import { useState, FormEvent, useContext } from "react";
import Head from "next/head";
import styles from '@/styles/Home.module.scss';
import Image from "next/image";

import logoImg from '../../../public/logo.svg';
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { toast } from "react-toastify";

export default function SignUp() {
    const { signUp } = useContext(AuthContext);


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);


    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.error("Preencha todos os campos")
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);
    }


    return (
        <>
            <Head>
                <title>Faça seu cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Pizzaria" />

                <div className={styles.login}>
                    <h1>Crie seu acesso</h1>

                    <form onSubmit={handleSignUp}>
                        <Input
                            placeholder="Seu nome"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Seu email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>

                    </form>
                    <Link legacyBehavior href="/">
                        <a className={styles.text}>Possui uma conta? Faça login!</a>
                    </Link>


                </div>

            </div>
        </>
    );
}
