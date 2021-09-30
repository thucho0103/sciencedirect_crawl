var express = require('express');
var app = express();
const axios = require('axios')
const puppeteer = require('puppeteer');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {

    // axios.get('https://api.elsevier.com/content/search/sciencedirect?start=0&count=2&query=artificial%20intelligence%20marketing+and+openaccess%281%29&apiKey=7f59af901d2d86f78a1fd60c1bf9426a&httpAccept=application%2Fjson')
    //     .then((response) => {
            
    //     })
    //     .catch(function (e) {
    //         console.log("error " + e.message);
    //         res.render('index', { data: [] });
    //     });

    
});

app.listen(3000, () => {
    console.log('listening to port 3000')
});
