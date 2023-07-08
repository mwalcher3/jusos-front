import PDFParser from "pdf2json";
// const {kColors, kFontFaces, kFontStyles} = require("pdf2json/lib/pdfconst");

// import { kColors, kFontFaces, kFontStyles } from "pdf2json";

const fs = require("fs");

export default function handler(req, res) {
  const { method } = req;

  const pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataError", (errData) =>
    console.error("error parsing the file: ", errData.parserError)
  );
  pdfParser.on("pdfParser_dataReady", (pdfData) => {
    const data = pdfData;

    if (method === "GET") {
      return res.status(200).json({ name: data });
    }
  });

  pdfParser.loadPDF("./public/SebastianOBWahl.pdf");
}
