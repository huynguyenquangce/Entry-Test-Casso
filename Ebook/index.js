const express = require('express');
const PayOS = require("@payos/node");

const payos = new PayOS("03a9c17b-c1bb-412a-a8d2-2b367a1b8c91", "0bf046d0-54d3-4b3c-9cce-92acd3a0a7d3", "59cfbb904f44ec96825bd7aa604592c9acc28afcd0349ff4e85302c59d1186b3");
const app = express();
app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:3000';
let orderCode = 50;
app.post('/create-payment-link',async(req,res)=>{
    const order = 
    {
        amount: 10000,
        description: 'Thanh toan Ebook',
        orderCode: orderCode++,
        returnUrl: `${YOUR_DOMAIN}/success.html`,
        cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
    };
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303,paymentLink.checkoutUrl);
})
// webhook url https using ngrok
// https://947d-113-161-77-160.ngrok-free.app/receive-hook
app.post('/receive-hook', async(req, res)=>{
    console.log(req.body);
    res.json();
});

app.listen(3000,()=>console.log('running on port 3000'));