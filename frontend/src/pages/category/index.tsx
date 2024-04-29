import { useState, FormEvent } from "react"

import { toast } from "react-toastify"

import Head from "next/head"
import { Header } from "@/components/Header"
import styles from './style.module.scss'

import { setupApiClient } from "@/services/api"

import { canSSRAuth } from "@/utilities/canSSRAuth"

export default function Category() {

    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            toast.error(`Digite o nome da categoria!`)
            return;

        }
        const apiClient = setupApiClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success(`Categoria ${name} cadastrada com sucesso!`)
        setName('');


    }

    return (
        <>
            <Head>
                <title>Nova Categoria - Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>

                    <form onSubmit={handleRegister} className={styles.form}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome da categoria"
                            className={styles.input}
                        />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                </main>
            </div>
        </>

    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    return {
        props: {}
    }
})