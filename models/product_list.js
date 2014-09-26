/**
 * Created by zk on 14-9-10.
 */

var mongodb = require('./db');
var _ = require('../public/underscore/underscore-min.js');

function Product(product){
    this.category = product.category;
    this.name = product.name;
    this.number = product.number;
    this.unitPrice = product.unitPrice;
    this.unit = product.unit;
    this.publish_time = product.publish_time

}

module.exports = Product;

Product.get = function(back){
    mongodb.open(function(err,db){
        if(err){
            return back(err);
        }
        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return back(err);
            }
            collection.find({}).sort({
                time:-1
            }).toArray(function(err,shops){
                mongodb.close();
                if(err){
                    return back(err);
                }
                back(null,shops);
            });
        });
    });
};

//存入商品信息
Product.prototype.save = function(property,callback){
    //要存入数据库的商品
    var product = {
        category:this.category,
        name:this.name,
        number:this.number,
        unitPrice:this.unitPrice,
        unit:this.unit,
        publish_time:this.publish_time
    };
    if(property.length !=0){
        for (value in property){
            product[value] = property[value];
        }
    }
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //将商品信息插入shops集合
            collection.insert(product,{
                safe:true
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

