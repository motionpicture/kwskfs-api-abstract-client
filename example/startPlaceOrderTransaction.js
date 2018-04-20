/**
 * 注文取引開始サンプル
 * @ignore
 */

const sasaki = require('../');

const transactions = new sasaki.service.transaction.PlaceOrder({
    endpoint: 'https://example.com'
});

transactions.start({
    expires: new Date(),
    sellerId: '',
    passportToken: ''
}).then((result) => {
    console.log(result);
});;

