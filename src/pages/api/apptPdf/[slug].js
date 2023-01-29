// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import PDFDocument from "pdfkit-table";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  const client = await clientPromise;
  const db = client.db("provider");
  const collection = db.collection("events");

  var o_id = new ObjectId(req.query.slug);
  const appt = await collection.findOne({
    _id: o_id,
  });

  // Set response header to indicate PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="generated.pdf"');

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Add content to the PDF
  doc.fontSize(15);
  doc.font("Times-Roman");
  doc.text("Appointment Export");
  doc.fontSize(12);
  doc.text("Date: " + new Date().toLocaleDateString());
  doc.moveDown();
  doc.fontSize(10);
  doc.moveDown();
  doc.text("Title: " + appt.title);
  doc.text("Provider: " + appt.provider);
  doc.text("Patient: " + appt.patient);
  doc.text("Notes: " + appt.notes);
  doc.moveDown();

  const table = {
    title: "Prescriptions",
    headers: ["Prescription", "Dosage", "Frequency"],
    rows:
      appt.prescriptions &&
      appt.prescriptions.map((prescription) => [
        prescription.name,
        prescription.dosage,
        prescription.frequency,
      ]),
  };

  doc.table(table, {});
  // End the PDF document and send it to the response
  doc.end();
}
