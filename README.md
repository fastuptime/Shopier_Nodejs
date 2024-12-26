# Shopier API Entegrasyonu

Node.js ile geliştirilmiş Shopier API entegrasyon projesi.

## 📦 Gereksinimler

```bash
npm install express body-parser crypto multer @api/shopier
```

## ⚙️ Yapılandırma

```javascript
const config = {
  pat: 'SHOPIER_PAT_TOKEN',
  username: 'SHOPIER_USERNAME', 
  key: 'SHOPIER_KEY'
};
```

## 💻 Kullanım

### Ürün Ekleme
```javascript
shopier.postProducts({
  type: 'digital',
  priceData: {
    currency: 'TRY',
    price: '1'
  },
  title: 'Ürün Adı',
  stockQuantity: 1
});
```

### Ürün Silme
```javascript
shopier.deleteProductsId({id: 'URUN_ID'});
```

## 🌐 Webhook

Webhook URL: `http://your-domain.com/shopierWebhook`

### Gelen Veri Örneği
```javascript
{
  email: 'ornek@site.com',
  orderid: '123456',
  currency: 0, // 0:TL, 1:USD, 2:EUR
  price: '1',
  buyername: 'Ad',
  buyersurname: 'Soyad',
  productid: 123456,
  productcount: 1,
  customernote: '',
  productlist: '123456',
  chartdetails: [{ id: 123456, quantity: 1 }],
  istest: 1 // 0:Gerçek, 1:Test
}
```

## 🚀 Çalıştırma

```bash
node shopier.js
```

## 🔒 Güvenlik

- HMAC doğrulaması her webhook isteğinde yapılır
- Base64 decode işlemleri güvenli şekilde gerçekleştirilir

## 📝 Lisans

MIT

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/xyz`)
3. Değişikliklerinizi commit edin (`git commit -am 'xyz özelliği eklendi'`)
4. Branch'i push edin (`git push origin feature/xyz`)
5. Pull Request oluşturun
