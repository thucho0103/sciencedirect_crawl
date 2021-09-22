const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  
  const page = await browser.newPage()
//   await page.goto('https://www.sciencedirect.com/science/article/pii/S2667096820300021',{ waitUntil: 'load' })

  await page.goto('https://www.sciencedirect.com/science/article/pii/S2667096820300021', {'waitUntil':'load'});
//   await waitTillHTMLRendered(page)
  // await page.waitForTimeout(5000)
  await page.waitForSelector('#body')
    // await page.waitForSelector('#body',()=>{
    //   console.log("abcd");
    // })
  const result = await page.evaluate(()=>{
    return document.querySelector('#body').innerText
  })

  console.log(result);

  await browser.close()
})();



// const cheerio = require('cheerio'),
//     axios = require('axios'),
//     url = `https://api.elsevier.com/content/search/sciencedirect?start=0&count=100&query=artificial+intelligence+marketing&apiKey=7f59af901d2d86f78a1fd60c1bf9426a&httpAccept=application%2Fjson`;

// axios.get(url)
//     .then((response) => {
//         let $ = cheerio.load(response.data);
//         // console.log($.text());    

//         $('table > td').each(function (i, e) {   
//           console.log(e);           
//         })
//     })
//     .catch(function (e) {
//         console.log(e);
//     });

//     'yexewe4638@tinilalo.com'
//     'T"ytiUq?#84BRU7'