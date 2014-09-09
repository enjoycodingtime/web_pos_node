
module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'web_pos' });
    });
    app.get('/product_list', function (req, res) {
        res.render('product_list', { title: 'web_pos' });
    });
    app.get('/shopping_cart', function (req, res) {
        res.render('shopping_cart', { title: 'web_pos' });
    });
};