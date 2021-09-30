
const download = require('download');

// Url of the image
const file = 'https://www.ijrra.net/April2018/ConsComp2018_106.pdf';
// Path at which image will get downloaded
const filePath = `${__dirname}/files`;
  
const axios = require('axios')

axios.get('https://serpapi.com/search.json?engine=google_scholar&q=artificial%20intelligence%20marketing&api_key=cd2ed7fbeb7dfda6828ddc511a3fde17b30bafcea6d3d673e136d5bf0583cde9&num=20')
.then((response) => {
    // console.log(response.data.organic_results);
    response.data.organic_results.forEach(element => {
      try {
        if(element.resources != null){

          // console.log(typeof(element.resources[0].file_format)); 

          if(element.resources[0].file_format == "PDF"){
            
            let link = element.resources[0].link

            download(link,filePath)
            .then(() => {
                console.log('Download Completed');
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