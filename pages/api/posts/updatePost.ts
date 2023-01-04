import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;
    const { title, body, description, imageUrl } = req.body;

    try {
        const post = await db
            .collection('posts')
            .updateOne(
                {
                    '_id': ObjectId(id)
                },
                {
                    $set: {
                        title,
                        body,
                        description,
                        imageUrl,
                    }
                }
            );

        return res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Failed update post'
        });
    }
};
