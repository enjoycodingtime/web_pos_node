var Product = require('../models/product_list.js');

module.exports = function(app) {
    app.get('/', function (req, res) {
        if(!req.session.cart){
            req.session.cart = [];
        }
        if(!req.session.total){
            req.session.total = 0;
        }
        res.render('index',{title:"主页",total:req.session.total});
    });
    app.get('/product_list', function (req, res) {
        Product.get(function(err,shoppings){
            var shops = shoppings;
            if(err){
                shops = [];
            }
            res.render('product_list',{
                total:req.session.total,
                shops:shops
            });
        });

    });
    app.get('/shopping_cart', function (req, res) {
        res.render('shopping_cart', { title: 'web_pos' });
    });
};