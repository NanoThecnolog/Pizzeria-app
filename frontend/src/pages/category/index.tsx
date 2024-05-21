import { useState, FormEvent } from "react"

import { toast } from "react-toastify"

import Head from "next/head"
import { Header } from "@/components/Header"
import styles from './style.module.scss'

import { setupApiClient } from "@/services/api"
import { FiRefreshCcw } from "react-icons/fi"
import { FaTrash } from "react-icons/fa"

import { canSSRAuth } from "@/utilities/canSSRAuth"
import { log } from "console"



type ItemProps = {
    id: string;
    name: string;

}

interface CategoryProps {
    categoryList: ItemProps[];
}



export default function Category({ categoryList }: CategoryProps) {

    const [name, setName] = useState('')

    const [categories, setCategories] = useState(categoryList || [])

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
        handleRefreshCategories();
    }

    async function handleRefreshCategories() {
        const apiClient = setupApiClient();
        const response = await apiClient.get('/category');
        setCategories(response.data);
    }
    async function handleRemoveCategory(id: string) {
        console.log(id);
        const apiClient = setupApiClient();
        try {

            //Colocar lógica que verifica se existem produtos na categoria
            //Criar lógica para abrir um modal com uma lista de produtos da categoria clicada.
            await apiClient.delete('/category', {
                params: {
                    category_id: id
                }
            })
            toast.success("Categoria excluída!");
            handleRefreshCategories();


        } catch (err) {
            toast.error("Verifique se existem produtos cadastrados a essa categoria.")

        }

    }

    return (
        <>
            <Head>
                <title>Categorias - Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div>
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
                    </div>


                    <div className={styles.categoriesList}>
                        <div>
                            <h1>Categorias cadastradas</h1>
                            <button className={styles.buttonRefresh} onClick={handleRefreshCategories}>
                                <FiRefreshCcw size={25} color="#3fffa3" />

                            </button>
                        </div>
                        <div>
                            <ul>
                                {categories
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((item, index) => {
                                        return (
                                            <li key={item.id} value={index}>
                                                {item.name}
                                                <button className={styles.buttonTrash} onClick={() => handleRemoveCategory(item.id)}>
                                                    <FaTrash size={25} color="#ff3f4b" />
                                                </button>
                                            </li>

                                        )
                                    })}

                            </ul>
                        </div>



                    </div>
                </main>
            </div>
        </>

    )
}
export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupApiClient(context);

    const response = await apiClient.get('/category');

    //console.log(response.data)
    return {
        props: {
            categoryList: response.data,
        }
    }
})