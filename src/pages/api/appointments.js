// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("events");

  const providers = await collection.find({ type: "appointment" }).toArray();

  res.status(200).json(providers);
}
