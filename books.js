const axios = require('axios')
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const download = require('download');

const filePath = `${__dirname}/sciencedirect`;

const count = 100

axios.get(`https://api.elsevier.com/content/search/sciencedirect?start=0&count=${count}&query=artificial%20intelligence%20marketing+and+openaccess%281%29&apiKey=7f59af901d2d86f78a1fd60c1bf9426a&httpAccept=application%2Fjson`)
.then((response) => {

    const array = response.data['search-results'].entry

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
        console.log(element['prism:doi']);

        axios.get(`https://sci-hub.se/${element['prism:doi']}`)
        .then((response) => {
            let $ = cheerio.load(response.data)
            let link =  $('#buttons > button').attr('onclick')
            let linkDownload = link.slice(link.indexOf("sci") ,link.length-1)
            console.log(linkDownload);
            
            download(`https://${linkDownload}`,filePath)
            .then(() => {         
                console.log('Download Completed');
            })
        })
        .catch(function (e) {
            console.log("error " + e.message);
        });
    }
})
.catch(function (e) {
    console.log("error " + e.message);
});

