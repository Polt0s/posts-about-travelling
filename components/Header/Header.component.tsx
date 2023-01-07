import Link from 'next/link';
import { useRouter } from 'next/router';

import { CreatePost } from '../Post';

import styles from './Header.module.css';

export const Header = (): JSX.Element => {
    const router = useRouter();

    return (
        <header className={styles['Header']}>
            <Link href="/" className={styles['Header__logo']}>
                P-A-T
            </Link>
            {router.asPath === '/' && (
                <CreatePost tag="create" />
            )}
        </header>
    );
};
