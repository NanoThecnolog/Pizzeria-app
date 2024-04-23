
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from '../styles/Home.module.scss';
import Image from "next/image";

import logoImg from '../../public/logo.svg';


const inter = Inter({ subsets: ["latin"] });

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Pizzaria - Faça login
        </title>
      </Head>
      <div className="{styles.containerCenter}">
        <Image src={logoImg} alt="Logo Pizzaria"/>

        <div className={styles.login}>
          <form>
            <Input
            placeholder="Seu email"
            type="text"
            />
            <Input
            placeholder="Sua senha"
            type="password"
            />
            <Button
            type="submit"
            loading={true}
            >
              Acessar
            </Button>
            
          </form>


        </div>
        
      </div>
    </>
  );
}
