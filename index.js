var express = require('express');
var app = express();
const axios = require('axios')
const puppeteer = require('puppeteer');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {

    axios.get('https://api.elsevier.com/content/search/sciencedirect?start=0&count=2&query=artificial%20intelligence%20marketing+and+openaccess%281%29&apiKey=7f59af901d2d86f78a1fd60c1bf9426a&httpAccept=application%2Fjson')
        .then((response) => {
            const result = response.data['search-results'].entry

            let arr = []
            result.forEach(element => {
                element.link.forEach(ele => {
                    arr.push(ele['@href'])
                });
                // element.description = "element " + element['prism:publicationName']
            });

            let arrResult = arr.filter(link => link.includes('sciencedirect'))

            // console.log(result);

            (async () => {
                const browser = await puppeteer.launch({ headless: false });

                for (let index = 0; index < arrResult.length; index++) {
                    const nameUrl = arrResult[index];
    
                    // const fullUrl = `${url}${nameUrl}`
                    // console.log(nameUrl)
                    const page = await browser.newPage()
                    await page.goto(nameUrl, { waitUntil: 'load',timeout: 50000 })
                    try {
                        await page.waitForSelector('#body')
                        const pageData = await page.evaluate(() => {
                            // console.log(document.querySelector('#body').innerText);
                            let string = document.querySelector('#body').innerText
                            return string
                        })
                        // console.log('\t Data from page: ', pageData)

                        result[index].description = pageData
                    } catch (error) {
                        // console.log("close");
                        result[index].description = "error"
                    }
                    // data[fullUrl] = pageData
                    await page.close()

                }
                await browser.close()

                await res.render('index', { data: result });
            })();  
            // console.log(arrResult);
            
        })
        .catch(function (e) {
            console.log("error " + e.message);
            res.render('index', { data: [] });
        });

});

app.listen(3000, () => {
    console.log('listening to port 3000')
});
