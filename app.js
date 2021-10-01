
const download = require('download');
const axios = require('axios')

// Path at which image will get downloaded
// địa chỉ thư mục lưu file pdf
const filePath = `${__dirname}/files`;

var start =0
var indexPDF = 0

var limit = 20 

for (let index = 0; index < limit; index++) {

  let url = `https://serpapi.com/search.json?engine=google_scholar&q=artificial%20intelligence%20marketing&api_key=cd2ed7fbeb7dfda6828ddc511a3fde17b30bafcea6d3d673e136d5bf0583cde9&num=20&start=${start}`
  axios.get(url)
  .then((response) => {
      // console.log(response.data.organic_results);
      response.data.organic_results.forEach(element => {
        try {
          if(element.resources != null){
  
            // kiểm tra file PDF để tải xuống
            if(element.resources[0].file_format == "PDF"){
            
              let link = element.resources[0].link
  
              download(link,filePath)
              .then(() => {
                  indexPDF++
                  if (indexPDF == 20) {
                    start = start +20
                    indexPDF = 0
                    console.log("start" + start);
                  }           
                  console.log('Download Completed' + indexPDF);
              })
            }
          }
        } catch (error) {
          
        }
      });
  })
  .catch(function (e) {
      console.log("error " + e.message);
      res.render('index', { data: [] });
  });
  
}

