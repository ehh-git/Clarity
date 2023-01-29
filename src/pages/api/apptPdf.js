// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import PDFDocument from "pdfkit-table";

export default async function handler(req, res) {
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("events");

  const events = await collection.find({}).toArray();

  // Set response header to indicate PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="generated.pdf"');

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Add content to the PDF
  doc.fontSize(15);
  doc.font("Times-Roman");
  doc.text("Timeline Export");
  doc.fontSize(12);
  doc.text("Date: " + new Date().toLocaleDateString());
  doc.moveDown();
  doc.fontSize(10);
  doc.moveDown();

  const table = {
    title: "Events",
    headers: ["Event", "Date", "Provider"],
    rows: events.map((event) => [event.type, event.title, event.date]),
  };

  doc.table(table, {});
  // End the PDF document and send it to the response
  doc.end();
}
