import { useContext } from 'react'
import styles from './styles.module.scss'

import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '@/contexts/AuthContext'


export function Header() {

    const { signOut } = useContext(AuthContext)


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard' legacyBehavior>
                    <img src='/MARCA.png' width={190} height={38} alt='Logo' />

                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/category' legacyBehavior>
                        <a href="/category">Categoria</a>
                    </Link>
                    <Link href='/product' legacyBehavior>
                        <a href="/product">Cardápio</a>
                    </Link>

                    <button title='SignOut' onClick={signOut}>
                        <FiLogOut color='#fff' size={24} />
                    </button>
                </nav>

            </div>

        </header>
    )
}