import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("medications");

  const medications = await collection.find({}).toArray();

  res.status(200).json(medications);
}