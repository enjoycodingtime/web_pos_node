/**
 * Created by zk on 14-10-17.
 */
var mongodb = require('./db');
var ObjectId = require('mongodb').ObjectID;
function Discount(){

};
Discount.prototype.add_rule = function(rule,callback){

    console.log('--------------------------',rule);
    //打开数据库
//    mongodb.close();
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('rules',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //将商品信息插入shops集合
            collection.insert(rule,{
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
Discount.getTen = function(name,page,back){

    mongodb.open(function(err,db){
        if(err){
            return back(err);
        }
        db.collection('rules',function(err,collection){
            if(err){
                mongodb.close();
                return back(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            collection.count(query, function (err, total) {
                //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                collection.find(query, {
                    skip: (page - 1)*10,
                    limit: 10
                }).sort({
                    _id:-1
                }).toArray(function (err, rules) {
                    mongodb.close();
                    if (err) {
                        return back(err);
                    }
                    back(null, rules, total);
                });
            });
        });
    });
};

Discount.add_rule = function(rule){
   
    //打开数据库
    mongodb.close();
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('rules',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //将商品信息插入shops集合
            collection.insert(rule,{
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
module.exports = Discount;