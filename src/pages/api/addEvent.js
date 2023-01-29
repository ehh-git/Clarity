// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";

const prescriptions = {
  Tylenol: {
    name: "Tylenol",
    frequency: "1x daily",
    dosage: "1 tablet",
  },
  Advil: {
    name: "Advil",
    frequency: "1x daily",
    dosage: "1 tablet",
  },
};

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("events");

  let date = new Date();
  req.body.date = date.toISOString().split("T")[0];
  await collection.insertOne(req.body);

  const events = await collection.find().toArray();
  res.status(200).json(events);
}
