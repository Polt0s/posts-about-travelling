import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getOnePost(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;

    try {
        const post = await db
            .collection('posts')
            .findOne({
                '_id': ObjectId(id)
            });

        return res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Failed get one post'
        });
    }
};
