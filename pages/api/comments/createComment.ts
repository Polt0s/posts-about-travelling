import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { text, postId } = req.body;

    try {
        const comment = await db
            .collection('comments')
            .insertOne({
                text,
                postId,
                user: 'anonymous'
            });

        return res.json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Failed create comment'
        });
    }
};
