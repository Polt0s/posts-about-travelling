import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { title, description, body, id } = req.body;

    try {
        await db
            .collection('posts')
            .insertOne({
                id,
                title,
                description,
                body
            });

        const getPost = await db
            .collection('posts')
            .findOne({
                'id': id
            });

        return res.json(getPost);
    } catch (error) {
        res.status(500).json({
            message: 'Failed create post'
        });
    }
};
