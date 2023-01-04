import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { title, body } = req.body;

    try {
        const post = await db
            .collection('posts')
            .insertOne({
                title,
                body
            });

        return res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Failed create post'
        });
    }
};
