


export default function handler(req, res) {

  const fs = require('fs'),
  PDFParser = require("pdf2json");
  const {kColors, kFontFaces, kFontStyles} = require("pdf2json/lib/pdfconst");
  const { method } = req;

  const pdfParser = new PDFParser();
  

  pdfParser.on("pdfParser_dataError", errData => console.error("error parsing the file: ",errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
  
  

  const data= pdfData


  if (method === "GET") {
    return res.status(200).json({name: data });
  }



});

pdfParser.loadPDF("./public/Satzung.pdf");


}
