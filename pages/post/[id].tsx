import React from 'react';

import { FullPost } from 'components';
import { getOnePostApi } from 'pages/api/ApiService';

import type { GetServerSideProps } from 'next/types';
import type { IPost } from 'types/Post';

interface IFullPostPage {
    post: IPost
};

const FullPostPage = ({ post }: IFullPostPage) => {
    return (
        <>
            <FullPost title={post.title} blocks={post.body} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx?.params?.id;

    const response = await getOnePostApi(String(id));

    return {
        props: { post: response },
    };
};

export default FullPostPage;
