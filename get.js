const download = require('download');
const axios = require('axios')


const filePath = `${__dirname}/files`;

var arrayApi = [0,20,40]

arrayApi.forEach(element => {
    let url = `https://serpapi.com/search.json?engine=google_scholar&q=artificial%20intelligence%20marketing&api_key=cd2ed7fbeb7dfda6828ddc511a3fde17b30bafcea6d3d673e136d5bf0583cde9&num=20&start=${element}`

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
                    console.log('Download Completed' + indexPDF);
                })
                console.log(link);
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

});


  