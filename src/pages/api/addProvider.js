// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("provider");

  let date = new Date();
  req.body.date = date.toISOString().split("T")[0];
  req.body.provider = "Dr. Smith";
  req.body.providerId = "123";
  await collection.insertOne(req.body);

  const provider = await collection.find().toArray();
  res.status(200).json(provider);
}
