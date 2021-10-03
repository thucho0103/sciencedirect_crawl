const axios = require('axios')
const cheerio = require('cheerio');
const download = require('download');

//https://sci-hub.se/10.1016/j.jbusres.2020.09.009

//err
//https://sci-hub.se/10.1016/j.procs.2021.09.233

axios.get(`https://sci-hub.se/10.1016/j.chbr.2020.100014`,{timeout :1000})
        .then((response) => {
            let $ = cheerio.load(response.data)
            let link =  $('#buttons > button').attr('onclick')
            console.log(link);
            if (link != null) {

                let linkDownload = link.slice(link.indexOf("sci") ,link.length-1)
                console.log(linkDownload);
                
                // download(`https://${linkDownload}`,filePath)
                // .then(() => {         
                //     console.log('Download Completed');
                // })
            }
        })
        .catch(err =>{
            console.log(err);
        })