import { useRouter } from 'next/router';

import { CreatePost } from '../Post';

import styles from './Header.module.css';

export const Header = (): JSX.Element => {
    const router = useRouter();

    return (
        <header className={styles['Header']}>
            {router.asPath === '/' && (
                <CreatePost tag="create" />
            )}
        </header>
    );
};
