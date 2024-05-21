import { useState } from "react"
import { canSSRAuth } from "@/utilities/canSSRAuth"
import Head from "next/head"
import Link from "next/link"
import styles from './styles.module.scss'

import { Header } from "@/components/Header"
import { FiRefreshCcw } from "react-icons/fi"
import { setupApiClient } from "@/services/api"

import Modal from "react-modal";

import { ModalOrder } from "@/components/ModalOrder"

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;

    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setupApiClient();

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        })
        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string) {
        const apiClient = setupApiClient();
        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/orders');
        setOrderList(response.data);
        setModalVisible(false);


    }

    async function handleRefreshOrders() {
        const apiClient = setupApiClient();
        const response = await apiClient.get('/orders');
        setOrderList(response.data);
    }

    Modal.setAppElement('#__next');



    return (
        <>
            <Head>
                <title>Painel - Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Ultimos pedidos</h1>
                        <button title="refresh" onClick={handleRefreshOrders}>
                            <FiRefreshCcw size={25} color="#3fffa3" />

                        </button>


                    </div>
                    <article className={styles.listOrders}>

                        {orderList.length === 0 && (
                            <span className={styles.emptyList}>Nenhum pedido em aberto...</span>
                        )}

                        {orderList.map(item => (
                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}



                    </article>

                </main>

                {modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        order={modalItem}
                        handleFinishOrder={handleFinishItem}

                    />
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupApiClient(context);

    const response = await apiClient.get('/orders');


    return {
        props: {
            orders: response.data
        }
    }

})