var pdfUtil = require('pdf-to-text');
// var pdf_path = "https://www.ijrra.net/April2018/ConsComp2018_106.pdf";
 

var pdf_path = "C:\\Users\\thucduy\\Downloads\\Documents\\test.pdf";

// include node fs module
var fs = require('fs');
 
// writeFile function with filename, content and callback function


//Omit option to extract all text from the pdf file
pdfUtil.pdfToText(pdf_path, function(err, data) {
  if (err) throw(err);
//   console.log(data); //print all text    
  fs.writeFile(`${__dirname}/files/test.txt`, data, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
});

