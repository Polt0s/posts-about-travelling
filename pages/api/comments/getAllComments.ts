import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllPosts(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;

    try {
        const comments = await db.collection('comments').find({ postId: id }).toArray();

        return res.json(comments);
    } catch (error) {
        res.status(500).json({
            message: 'Failed get all comments'
        });
    }
};
