import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("posts-about-travelling");
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let myPost = await db.collection("posts").insertOne(bodyObject);
            res.json(myPost.ops[0]);
            break;
        case "GET":
            const posts = await db.collection("posts").find({}).toArray();
            res.json(posts);
            break;
    }
}
