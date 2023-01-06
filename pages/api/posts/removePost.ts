import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function removePost(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;

    try {
        const post = await db
            .collection('posts')
            .deleteOne({
                'id': id
            });

        await db.collection('comments').deleteOne({
            'postId': id
        });

        return res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Failed delete post'
        });
    }
};
