const express = require('express')
const {readFile, readFileSync} = require('fs');

const PayOS = require('@payos/node');

const payos = new PayOS(
'c7ad9eb1-8f41-4ebb-9106-e4dad41249c9',
'a6737404-7e69-48ab-b914-cb8a6ef3390d',
'a6c775d4864c766b2c6d95b67249f90adc2bbcd2d097440734603172d115a0ca')

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.get('/',(req,res)=>{
readFile('./public/home.html', 'utf8', (err,html) => {
if(err){
res.status(500).send("error")}
res.send(html);});
});

app.post("/create-payment-link",async(req,res)=> {
const order = {
amount: 10000,
description: 'Thanh toan good luck',
orderCode: between(1,100000),
returnUrl: 'http://localhost:3000/success.html',
cancelUrl: 'http://localhost:3000/cancel.html'
};
const paymentLink = await payos.createPaymentLink(order);
res.redirect(303, paymentLink.checkoutUrl);
});

app.listen(3000,()=>console.log("connected"));