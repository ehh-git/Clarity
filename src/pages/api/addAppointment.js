// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("events");

  let date = new Date();
  req.body.date = date.toISOString().split("T")[0];
  req.body.provider = "Dr. Smith";
  req.body.providerId = "123";
  req.body.type = "appointment";
  await collection.insertOne(req.body);

  const events = await collection.find({ type: "appointment" }).toArray();
  res.status(200).json(events);
}
