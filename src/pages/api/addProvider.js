// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("provider");

  await collection.insertOne(req.body);

  const provider = await collection.find().toArray();
  res.status(200).json(provider);
}
