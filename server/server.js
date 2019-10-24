require('dotenv').config();  // zero-dependency module tt loads environment variables from .env file into process.env. Don’t check in .env, keys only in .env.sample
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path');
const app = express();
const APP_PORT = process.env.PORT ||3000;
console.log("APP_PORT : " + APP_PORT);
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

console.log(__dirname);
// const angularDistPath = path.join(__dirname, '../', 'dist', 'day09-mybitcoin');//ng build --prod; dist same lvl as server(i.e.root)
// console.log(angularDistPath);
// app.use(express.static(angularDistPath));

app.use(express.static(__dirname));
var data = [];

app.post('/api/btc', (req, res, next)=>{
    console.log('Saving order ...')
    // console.log(req.body);
    console.log(req.body);
    console.log('Saved order...')
    // res.status(200).json({});
    // // store in memory
    data.push(req.body);
    console.log(data);
    // // send it back, updated, in json
    // // res.setHeader('Content-Type', 'application/json');
    // res.send(data);
})

app.get('/api/btc', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
    console.log('viewing all transactions')
    console.log(data);
  })

app.listen(APP_PORT, ()=>{
    console.log("App server started at " + APP_PORT);
})

// ---


// app.get('/orders', (req,res)=>{
//     console.log("Fetch customer ...");
//     res.status(200).json({name: 'Kenneth Phang3'});
// });


// app.get('/dice', (req, res, next)=>{
//     let roll = Math.floor(Math.random() * 6) + 1;
//     console.log(roll);
//     res.status(200);
//     res.format({
//         'text/html': ()=>{
//             console.log("returning html");
//             res.type('text/plain');
//             res.end(`<h1>Dice roll is ${roll}</h1>`);
//         },
//         'application/json': ()=>{
//             console.log("returning json");
//             res.json({dice_roll: roll});
//         } 
//     });
// });

