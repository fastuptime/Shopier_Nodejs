const shopier = require('@api/shopier');

const conf = {
  pat: 'SHOPIER_PAT_TOKEN',
  username: 'SHOPIER_USERNAME', 
  key: 'SHOPIER_KEY'
};

shopier.auth(conf.pat);

shopier.postProducts({
  type: 'digital',
  priceData: {
    currency: 'TRY', // USD, EUR, TRY
    price: '1'
  },
  shippingPayer: 'sellerPays',
  title: 'Add Balance',
  media: [
    {
      type: 'image',
      placement: 1,
      url: 'https://cdn.iconscout.com/icon/free/png-256/free-add-money-icon-download-in-svg-png-gif-file-formats--to-wallet-e-pack-commerce-shopping-icons-1538068.png'
    }
  ],
  stockQuantity: 1,
  description: 'Add balance to your account',
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

shopier.deleteProductsId({id: '31850041'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(require('multer')().none());
const username = conf.username;
const key = conf.key;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/shopierWebhook', (req, res) => {
    if (!(req.body.res && req.body.hash)) {
        return res.status(400).send('missing parameter');
    }

    const calculatedHash = crypto
        .createHmac('sha256', key)
        .update(req.body.res + username)
        .digest('hex');

    if (calculatedHash !== req.body.hash) {
        return res.status(401).end();
    }

    try {
        const jsonResult = Buffer.from(req.body.res, 'base64').toString();
        const data = JSON.parse(jsonResult);
        console.log('Received data:', data);
        const {
            email,
            orderid,
            currency,    // 0..TL, 1..USD, 2...EUR
            price,
            buyername,
            buyersurname,
            productcount,
            productid,
            productlist,
            chartdetails,
            customernote, // Müşteri notu
            istest       // 0..canlı, 1..test
        } = data;

        /*
        Received data: {
            email: 'fastuptime@gmail.com',
            orderid: '313758163',
            currency: 0,
            price: '1',
            buyername: 'Can',
            buyersurname: 'Kaya',
            productid: 31857020,
            productcount: 1,
            customernote: '',
            productlist: '31857020',
            chartdetails: [ { id: 31857020, quantity: 1 } ],
            istest: 1
          }
        */
        
        res.send('success');

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('error');
    }
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
