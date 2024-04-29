import Head from "next/head";
import { Header } from "@/components/Header";
import styles from './styles.module.scss';
import { useState, ChangeEvent } from "react";

import { FiUpload } from "react-icons/fi";


import { canSSRAuth } from "@/utilities/canSSRAuth";

import { setupApiClient } from "@/services/api";

type ItemProps = {
    id: string;
    name: string;

}

interface CategoryProps {
    categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps) {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) {
            return;
        }
        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpg' || image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }

    }

    function handleChangeCategory(event) {

        setCategorySelected(event.target.value)
    }


    return (
        <>
            <Head>
                <title>Novo Produto - Pizzaria</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={30} color="#fff" />
                        </span>

                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />

                        {avatarUrl && (
                            <img
                                src={avatarUrl}
                                alt="Foto do produto"
                                width={250}
                                height={250}
                                className={styles.preview}
                            />
                        )}

                    </label>



                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}

                    </select>
                    <input
                        className={styles.input}
                        placeholder="Digite o nome do produto"
                        type="text"
                    />
                    <input
                        className={styles.input}
                        placeholder="Digite o preço do produto"
                        type="text"
                    />

                    <textarea
                        className={styles.input}
                        placeholder="Descrição do Produto."
                    />

                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>




                </form>

            </main>
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
