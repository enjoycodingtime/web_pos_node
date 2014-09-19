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
            if(req.query.pay == "pay"){
                req.session.total = 0;
                req.session.cart = [];
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

    app.get('/payment',function(req,res){
        var shops = req.session.cart;
        var gives = [];
        _.each(shops,function(shop){
            if(shop.promotion == "true" && shop.num >= 3){
                var give = _.clone(shop);
                give.num = parseInt(give.num/3);
                gives.push(give);
            }
        });
        console.log(req.session.total+"-------------------------------------");
        res.render('payment',{ title: 'web_pos',
            total:req.session.total,
            product_active:'',
            home_active:'',
            shopping_cart_active:'active',
            shops:shops,
            gives:gives

        });
    });

    app.get('/admin',function(req,res){

        res.render('admin');
    });

    app.get('/add_product',function(req,res){

        res.render('add_product');
    });
    app.get('/product_detail',function(req,res){

        res.render('product_detail');
    });
    app.get('/add_property',function(req,res){
       res.render('add_property');
    });
    app.get('/delete_product_property',function(req,res){
       res.render('delete_product_property',{current_product:'苹果'})
    });

    app.post('/addToCart',function(req,res){

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

    app.get('/lessOrMore',function(req,res){
        var shops = req.session.cart;
        var shop = _.findWhere(shops,{name:req.query.shopName});
        var index = _.indexOf(shops,shop);

        if(req.query.flag == "less"){
            shop.num = shop.num - 1;
            if(shop.num == 0){
                shops.splice(index,1);
            }else{
                shops[index] = shop;
            }
            req.session.total = req.session.total - 1;
        }else if(req.query.flag == "more"){
            shop.num = shop.num + 1;
            shops[index] = shop;
            req.session.total = req.session.total + 1;
        }
        req.session.cart = shops;

        if(req.session.total == 0){
            res.redirect('/product_list');
        }else{
            res.redirect('/shopping_cart');
        }
    });
};