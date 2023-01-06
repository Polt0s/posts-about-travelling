import clientPromise from 'lib/mongodb';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function updatePost(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('posts-about-travelling');
    const { id } = req.query;
    const { title, body, description, imageUrl } = req.body;

    try {
        await db
            .collection('posts')
            .updateOne(
                {
                    'id': id
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

        const getPost = await db
            .collection('posts')
            .findOne({
                'id': id
            });

        return res.json(getPost);
    } catch (error) {
        res.status(500).json({
            message: 'Failed update post'
        });
    }
};
