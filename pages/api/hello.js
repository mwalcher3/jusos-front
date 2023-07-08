// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import PDFParser from "pdf2json";
const fs = require("fs");

// PDFParser = require("pdf2json");

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", (errData) =>
  console.error("error parsing the file: ", errData.parserError)
);
pdfParser.on("pdfParser_dataReady", (pdfData) => {});

pdfParser.loadPDF("./public/Satzung.pdf");

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
