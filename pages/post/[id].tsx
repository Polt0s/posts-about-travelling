import React from 'react';

import { FullPost } from 'components';
import { getAllComments, getOnePostApi } from 'pages/api/ApiService';

import type { GetServerSideProps } from 'next/types';
import type { IComment, IPost } from 'types';

interface IFullPostPage {
    post: IPost;
    comments: IComment[];
};

const FullPostPage = ({ post, comments }: IFullPostPage) => {
    return (
        <>
            <FullPost
                title={post.title}
                blocks={post.body}
                id={post._id}
                comments={comments}
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx?.params?.id;

    const response = await getOnePostApi(String(id));
    const getComments = await getAllComments(String(id));

    return {
        props: { post: response, comments: getComments },
    };
};

export default FullPostPage;
