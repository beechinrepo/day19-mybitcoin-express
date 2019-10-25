require('dotenv').config(); // loads envt vars from .env file into process.env. 
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

const APP_PORT = process.env.PORT;
const API_URL = '/api';
const list = [];

app.post(`${API_URL}/btc`, (req, res)=> {
    let order = req.body;
    console.log('Receiving order: ', order);
    order.id = list.length++;
    list.push(order);
    res.status(200).json(list);
    console.log('Saved order: ', list);
});

app.get(`${API_URL}/btc`, (req, res)=> {
    let getAll = [];
    list.forEach((item)=>{
        if(item) {
            getAll.push(item);
        }  
    });
    res.status(200).json(getAll);
    console.log('Getting all transactions: ', getAll);
  });

app.get(`${API_URL}/btc/:orderId`, (req,res)=> {
    let orderId = req.params.orderId;
    const orderIdx = list.find(x=> {   // get value of 1st element
        if(typeof(x) !== 'undefined') {
            return x.id == orderId;
        }
        return null;
    });
    if(orderIdx){
        res.status(200).json(orderIdx);
        console.log('Received selected order: ', orderIdx);
    }
});

app.put(`${API_URL}/btc/:orderId`, (req,res)=> { // query:sort/filter; param:id specific resource(s)
    let orderId = req.params.orderId;
    const orderIdy = list.findIndex(y =>{
        if(typeof(y) !== 'undefined'){
            return y.id == orderId;
        }
        return null;
    });
    console.log(index);
    if (index === -1) {
        res.status(500).json({error: 'error update'})
    } else {
        let updatedlist = list[index];
        updatedlist.name = list.name;
        updatedlist.contact = list.contact;
        updatedlist.gender = list.gender;
        updatedlist.dob = list.dob;
        updatedlist.orderDate = list.orderDate;
        updatedlist.orderType = list.orderType;
        updatedlist.unit = list.unit;
        updatedlist.btcAddress = list.btcAddress;
        updatedlist.rate = list.rate;
        updatedlist.total = list.total;
        res.status(200).json(updatedlist);
        console.log('Updated list: ', updatedlist);
    };
});

app.get(`${API_URL}/btc/price`, (req,res)=> {
    let priCurr = req.query.priCurr;
    let secCurr = req.query.secCurr;
    const PRICE_API_URL = process.env.PRICE_API_URL;
    const options = {
        url: `${PRICE_API_URL}${priCurr},${secCurr}`,
        headers: {
            'Accept': 'application/json',
            'X-testing': 'testing'
        };
    };
    request(options, (error, response, body)=>{
        if (!error && response.status == 200) {
            res.status(200).json(JSON.parse(body)); // JSON.parse() method parses a JSON string to construct a JS obj/value
        };
    });
});

app.listen(APP_PORT, ()=>{
    console.log("App server started at " + APP_PORT);
});

