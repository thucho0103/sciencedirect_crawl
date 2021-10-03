const
    // axios = require("axios"),
    // https = require('https'),
    // request = require("request-promise-native"),
    cheerio = require("cheerio");

const download = require('download');
const filePath = `${__dirname}/sciencedirect`;

 async function fetchApi(url) {
    const axios = require("axios")
    const response = await axios.get(url)
    return await response.data['search-results'].entry.map(x=> x['prism:doi'])
}

async function fetchPage(doi) {

    try {
        const axios = require("axios")
        const response = await axios.get(`https://sci-hub.se/${doi}`,{timeout : 5000})

        let $ = await cheerio.load(response.data)
        let link = await $('#buttons > button').attr('onclick')
        let linkDownload = await link.slice(link.indexOf("sci") ,link.length-1)
        
        return await linkDownload

      } catch (error) {
          console.log(error.message);
        return ""
      }
}

// async function fetchPage(url) {

//     return await request({
//         url: `https://sci-hub.se/${url}`,
//         transform: (body) => cheerio.load(body)
//     });
// }


async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function run(prom, to) {

    const urls = await fetchApi(`https://api.elsevier.com/content/search/sciencedirect?start=${prom}&count=${to}&query=artificial%20intelligence%20marketing+and+openaccess%281%29&apiKey=7f59af901d2d86f78a1fd60c1bf9426a&httpAccept=application%2Fjson`);

    // console.log(urls);

    for (const url of urls) {
        await sleep(5000);
        const linkDownload = await fetchPage(url);

        if (linkDownload === "") {
            // console.log("link not found " + urls.indexOf(url));
            console.log(`link not found prom:${prom} to:${to} ${urls.indexOf(url)}`);
        }else{
            // console.log(linkDownload + urls.indexOf(url));
            download(`https://${linkDownload}`,filePath)
            .then(() => {         
                console.log(`Download Completed prom:${prom} to:${to} ${urls.indexOf(url)}`);
            })
        }
    }
}

async function demo() {

    await run(0,30);
    await sleep(5000);

    await run(30,60);
    await sleep(5000);
    
    await run(60,90);
}

demo()