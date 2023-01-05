import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function removeComment(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;

    try {
        const comment = await db
            .collection('comments')
            .deleteOne({
                '_id': ObjectId(id)
            });

        return res.json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Failed delete comment'
        });
    }
};
