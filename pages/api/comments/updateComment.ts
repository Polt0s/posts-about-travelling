import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function updateComment(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;
    const { text, createdAt } = req.body;

    try {
        await db
            .collection('comments')
            .updateOne(
                {
                    id: id
                },
                {
                    $set: {
                        text,
                        createdAt
                    }
                }
            );

        const comment = await db
            .collection('comments')
            .findOne({
                'id': id
            });

        return res.json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Failed update comment'
        });
    }
};
