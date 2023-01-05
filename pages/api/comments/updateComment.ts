import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function updateComment(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;
    const { text } = req.body;

    try {
        const comment = await db
            .collection('comments')
            .updateOne(
                {
                    '_id': ObjectId(id)
                },
                {
                    $set: {
                        text
                    }
                }
            );

        return res.json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Failed update comment'
        });
    }
};
