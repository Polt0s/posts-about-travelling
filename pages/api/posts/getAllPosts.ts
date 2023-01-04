import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');

    try {
        const posts = await db.collection('posts').find({}).toArray();

        return res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Failed get all posts'
        });
    }
};
