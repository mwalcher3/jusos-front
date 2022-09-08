


export default function handler(req, res) {

  const fs = require('fs'),
  PDFParser = require("pdf2json");
  const {kColors, kFontFaces, kFontStyles} = require("pdf2json/lib/pdfconst");
  const { method } = req;

  const pdfParser = new PDFParser();
  

  pdfParser.on("pdfParser_dataError", errData => console.error("error parsing the file: ",errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
  console.log(pdfData.Pages[0].Texts[0].R);
  console.log("colors", kColors[2]);
  
  

  const data= pdfData


  if (method === "GET") {
    return res.status(200).json({ data: data });
  }



});

pdfParser.loadPDF("./public/Satzung.pdf");


}
