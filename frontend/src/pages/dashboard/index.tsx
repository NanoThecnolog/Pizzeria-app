import { canSSRAuth } from "@/utilities/canSSRAuth"
import Head from "next/head"
import Link from "next/link"

import { Header } from "@/components/Header"

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - Pizzaria</title>
            </Head>
            <div>
                <Header />
                <h1>Painel</h1>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async () => {

    return {
        props: {}
    }

})