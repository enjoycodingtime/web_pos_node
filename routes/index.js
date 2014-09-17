var Product = require('../models/product_list.js');
var _ = require('../models/underscore-min.js');

module.exports = function(app) {
    app.get('/', function (req, res) {
        if(!req.session.cart){
            req.session.cart = [];
        }
        if(!req.session.total){
            req.session.total = 0;
        }
        res.render('index',{title:"主页",total:req.session.total,home_active:"active",product_active:"",shopping_cart_active:''});
    });
    app.get('/product_list', function (req, res) {
        Product.get(function(err,shoppings){
            var shops = shoppings;
            if(err){
                shops = [];
            }
            res.render('product_list',{
                total:req.session.total,
                shops:shops,
                product_active:"active",
                home_active:'',
                shopping_cart_active:''
            });
        });

    });
    app.get('/shopping_cart', function (req, res) {
        res.render('shopping_cart', { title: 'web_pos',product_active:"",
            home_active:'',
            shopping_cart_active:'active',
            total:req.session.total,
            shops:req.session.cart
        });
    });
    app.post('/addToCart',function(req,res){
        console.log("hello");
        var shop = req.body.shop;
        var cart = req.session.cart;
        var hadShop = _.findWhere(cart,{name:shop.name});
        if(hadShop){
            shop.num = hadShop.num + 1;
            var index = _.indexOf(cart,hadShop);
            cart[index] = shop;
        }else{
            shop.num = 1;
            cart.push(shop);
        }
        req.session.cart = cart;
        var total = req.session.total + 1;
        req.session.total = total;
        res.writeHead(200,{'Content-type':'text/plain'});
        res.write(total + "");
        res.end();
    });
};