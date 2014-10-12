var Product = require('../models/product_list.js');
var Property = require('../models/Property.js');
var _ = require('../models/underscore-min.js');
var Time = require('../models/Time.js');
var Post = require('../models/Post.js');


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

        req.session.detail_property = [];
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //查询并返回第 page 页的 10 篇文章
        Product.getTen(null, page, function (err, shoppings, total) {
            var shops = shoppings;
            if (err) {
                shops = [];
            }

        res.render('admin',{shops:shops,
            page: page,
            isFirstPage: (page - 1) == 0,
            isLastPage: ((page - 1) * 10 + shops.length) == total});
        });
    });

    app.get('/add_product',function(req,res){

        res.render('add_product',{new_property:req.session.property});
    });
    app.post('/add_product',function(req,res){

        var current_time = new Time();
        var product = new Product({
            category:req.body.category,
            name:req.body.product_name,
            number:req.body.product_number,
            unitPrice:req.body.product_price,
            unit:req.body.product_unit,
            publish_time:current_time.get_time()
        });
        var properties = req.session.property;
        var added_property = {};
        if(properties.length !=0){
            properties.forEach(function(value){
                added_property[value.name] = req.body[value.name];
            });
        }
        product.save(added_property,function (err) {
            if(err){
                return res.redirect('/add_product');
            }
            res.redirect('/admin');
        })

    });
    app.get('/product_detail',function(req,res){

        var product_id = req.query.product_id || req.session.current_product;
        Product.getOne(product_id,function(err,product){
             if(err){
                return console.log(err);
            }
        req.session.current_product = product_id;
        res.render('product_detail',{this_product:product[0],new_property:req.session.detail_property});
        });
    });

    app.post('/product_detail',function(req,res){

        var object = req.body;
        var property = new Property();
        var properties = req.session.detail_property;
        var added_property = {};
        if(properties.length !=0){
            properties.forEach(function(value){
                added_property[value.name] = req.body[value.name];
            });
        }

        property.update(object,req.session.current_product,added_property,function (err) {
            if(err){
                return res.redirect('/product_detail');
            }
            res.redirect('/admin');
        })

    });

    app.get('/delete_detail_property',function(req,res){
        var product_id = req.query.product_id || req.session.current_product;
        Product.getOne(product_id,function(err,product){
            if(err){
                return console.log(err);
            };
            req.session.current_product = product_id;
            res.render('delete_detail_property',{this_product:product[0],product_name:product[0].name});
        });
    });

    app.get('/delete_this_property',function(req,res){
        var product_id = req.query.product_id;
        var property_name = req.query.name;
        var added_property = [];
        req.session.current_product = product_id;
        Product.getOne(product_id,function(err,product){
            if(err){
                return console.log(err);
            }
            var this_product = product;
            var new_product = _(this_product[0]).omit(property_name);
            var property = new Property();
            property.update(new_product,product_id,added_property,function (err) {
                if(err){
                    return res.redirect('/delete_this_property');
                }
                res.redirect('/delete_detail_property');
            })
        });
    });

    app.get('/delete_product',function(req,res){
        var post = new Post();
        var product_id = req.query.product_id;
        post.remove(product_id, function (err) {
            if (err) {

                return res.redirect('/admin');
            }

            res.redirect('/admin');
        });
    });
    app.get('/add_property',function(req,res){
       res.render('add_property');
    });
    app.post('/add_property',function(req,res){

        var session_property =req.session.property;
        var property = {
            name:req.body.property_name,
            value:req.body.property_value
        };
        session_property.push(property);
        req.session.property = session_property;
        res.redirect('/add_product');
    });

    app.get('/detail_add_property',function(req,res){
        var product_id = req.query.product_id;
       res.render('detail_add_property',{product_id:product_id})
    });
    app.post('/detail_add_property',function(req,res){
        var session_property =req.session.detail_property ||[];
        var property = {
            name:req.body.property_name,
            value:req.body.property_value
        };
        session_property.push(property);
        req.session.detail_property = session_property;

        res.redirect('/product_detail')
    });

    app.get('/delete_product_property',function(req,res){
       res.render('delete_product_property',{propertys:req.session.property})
    });
    app.get('/delete_property',function(req,res){

       var product_id = req.query.product_id;
        var session_property = req.session.property;
         var sub =_.indexOf(session_property,_.findWhere(session_property,{name:property_name}));
         session_property.splice(sub,1);
        req.session.property = session_property;
        res.redirect('/add_product');
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

    app.get('/admin_lessOrMore',function(req,res){
        var product_id = req.query.shopId;
        var product_number = parseInt(req.query.number);
        if(req.query.flag == 'less' && product_number !=0){
            Product.update_number(product_id,'less',product_number,function(err){
                if (err) {
                    return res.redirect('/admin');
                }
                res.redirect('/admin');
            });
        }
        if(req.query.flag == 'more'){
            Product.update_number(product_id,'More',product_number,function(err){
                if (err) {
                    return res.redirect('/admin');
                }
                res.redirect('/admin');
            })
        }


    });
};

