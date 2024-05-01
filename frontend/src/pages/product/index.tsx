import Head from "next/head";
import { Header } from "@/components/Header";
import styles from './styles.module.scss';
import { useState, ChangeEvent, FormEvent } from "react";
import { FiUpload } from "react-icons/fi";
import { canSSRAuth } from "@/utilities/canSSRAuth";
import { setupApiClient } from "@/services/api";
import { toast } from "react-toastify";

type ItemProps = {
    id: string;
    name: string;

}

interface CategoryProps {
    categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

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
    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error('Preencha todos os campos!')
                return;
            }
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupApiClient();

            await apiClient.post('/product', data);

            toast.success('Produto cadastrado com sucesso!');

        } catch (err) {
            toast.error('Ops, erro ao cadastrar o produto!')

        }
        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');

    }


    return (
        <>
            <Head>
                <title>Novo Produto - Pizzaria</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form} onSubmit={handleRegister}>

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        placeholder="Digite o preço do produto. Ex: 9.99"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <textarea
                        className={styles.input}
                        placeholder="Descrição do Produto."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
