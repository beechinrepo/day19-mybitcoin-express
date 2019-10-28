require('dotenv').config(); // loads envt vars from .env file into process.env. 
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require('path'),
      uuidv1 = require('uuid/v1');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const APP_PORT = process.env.PORT;
const API_URL = '/api';
const list = [];

app.post(`${API_URL}/btc`, (req, res) => {
    let order = req.body;
    if (typeof (order) != 'undefined') {
        order.id = uuidv1();
        list.push(order);
        list.sort(function(a, b) {
            return a.name.localeCompare(b.name);
         });
         console.log(list);
        res.status(200).json(order);
        // console.log('Posted order: ', order);
    }
});

app.get(`${API_URL}/btc`, (req, res) => {
    let returnResult = [];
    list.forEach((item) => {
        if (item) {
            returnResult.push(item);
        }
    });
    res.status(200).json(returnResult);
    // console.log('Getting all transactions: ', returnResult);
  });

app.get(`${API_URL}/btc/:orderId`, (req, res) => {
    let orderId = req.params.orderId;
    let orderIdx = list.find(x => {   // get value of 1st element
        if (typeof (x) !== 'undefined') {
            return x.id == orderId;
        }
        return null;
    });
    if (orderIdx) {
        res.status(200).json(orderIdx);
        // console.log('Received selected order: ', orderIdx);
    }
});

app.delete(`${API_URL}/btc/:orderId`, (req, res) => {
    const orderId = req.params.orderId;
    let index = list.findIndex(order => order.id === orderId);
    if (index < 0) {
        res.status(404).json({message: 'Order not found'});
    } else {
        list.splice(index, 1);
        res.status(200).json({message: 'Order deleted'});
    }
});

app.put(`${API_URL}/btc`, (req, res) => { // query:sort/filter; param:id specific resource(s)
    let orderId = req.query.orderId;
    let order = req.body;
    const index = list.findIndex(y => {
        if (typeof (y) !== 'undefined') {
            return y.id == orderId;
        }
        return null;
    });
    // console.log(index);
    if (index === -1) {
        res.status(500).json({ error: 'error update' })
    } else {
        let ordertoUpdate = list[index];
        ordertoUpdate.name = order.name;
        ordertoUpdate.contact = order.contact;
        ordertoUpdate.gender = order.gender;
        ordertoUpdate.dob = order.dob;
        ordertoUpdate.orderDate = order.orderDate;
        ordertoUpdate.orderType = order.orderType;
        ordertoUpdate.unit = order.unit;
        ordertoUpdate.btcAddress = order.btcAddress;
        ordertoUpdate.rate = order.rate;
        ordertoUpdate.total = order.total;
        res.status(200).json(ordertoUpdate);
        // console.log('Updated list: ', ordertoUpdate);
    };
});

app.get(`${API_URL}/price`, (req, res) => {
    let priCurr = req.query.priCurr; //SGD
    let secCurr = req.query.secCurr; //BTC
    const PRICE_API_URL = process.env.PRICE_API_URL;
    const options = {
        url: `${PRICE_API_URL}${"SGD"},${"BTC"}`,
        headers: {
            'Accept': 'application/json',
            'X-testing': 'testing'
        }
    };
    request(options, (error, response, body) => {
        if (!error && response.status == 200) {
            res.status(200).json(JSON.parse(body)); // JSON.parse() method parses a JSON string to construct a JS obj/value
        };
    });
});

app.listen(APP_PORT, () => {
    console.log("App server started at " + APP_PORT);
});

