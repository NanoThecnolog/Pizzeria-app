
import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.scss';
import Image from "next/image";

import logoImg from '../../public/logo.svg';
import Link from "next/link";


import { canSSRGuest } from "@/utilities/canSSRGuest";



import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from "@/contexts/AuthContext";
import { CgPassword } from "react-icons/cg";

import { toast } from "react-toastify";

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning("Digite seu acesso!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);

  }

  return (
    <>
      <Head>
        <title>Pizzaria - Faça login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>

          </form>
          <Link legacyBehavior href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>


        </div>

      </div>
    </>
  );
}



export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {}
  }
})