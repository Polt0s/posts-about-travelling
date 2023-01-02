import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

export default function Home({ posts }: any) {
    const [loading, setLoading] = useState(false);

    let submitForm = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        let res = await fetch("http://localhost:3000/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title: 'My trip to Serbia',
                content: 'It was very cool trip for me. I opened many new interesting places',
                id: 1
            }),
        });
        res = await res.json();
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <button style={{ margin: '1rem 0' }} onClick={submitForm}>Create post</button>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {posts.map((post: any) => (
                        <span key={post.id} style={{ display: 'flex', flexDirection: 'column', gap: 5, border: '1px solid green', padding: '1rem', marginBottom: '1rem' }}>
                            <h1>{post.title}</h1>
                            <p>{post.description}</p>
                        </span>
                    ))}
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/posts');
    const posts = response.data;

    return {
        props: { posts },
    };
}
