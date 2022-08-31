


export default function handler(req, res) {

  const fs = require('fs'),
PDFParser = require("pdf2json");

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error("error parsing the file: ",errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
console.log(pdfData.Pages[0].Texts[0].R)

const data= pdfData
res.status(200).json({ name: data })



});

pdfParser.loadPDF("./public/Satzung.pdf");


}
