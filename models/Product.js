/**
 * Created by zk on 14-9-10.
 */

var mongodb = require('./db');
var _ = require('../public/underscore/underscore-min.js');
var ObjectId = require('mongodb').ObjectID;

function Product(product){
    this.category = product.category;
    this.name = product.name;
    this.number = product.number;
    this.unitPrice = product.unitPrice;
    this.unit = product.unit;
    this.publish_time = product.publish_time

}

module.exports = Product;

Product.add_rule = function(rule,back){
    console.log(rule+'-------------------------------------');
};

Product.getTen = function(name,page,back){

    mongodb.open(function(err,db){
        if(err){
            return back(err);
        }
        db.collection('shops',function(err,collection){
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
                }).toArray(function (err, shops) {
                    mongodb.close();
                    if (err) {
                        return back(err);
                    }
                    back(null, shops, total);
                });
            });
        });
    });
};
Product.get = function(back){
    mongodb.close();
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
                _id:-1
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


Product.getOne = function(id,back){
    mongodb.close();
    mongodb.open(function(err,db){
        if(err){
            return back(err);
        }
        db.collection('shops',function(err,collection){
            if(err){
                mongodb.close();
                return back(err);
            }
            collection.find({_id:new ObjectId(id)}).sort({
                time:1
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


Product.update_number = function(product_id,lessOrMore,number,back){
    var product_number = number;
    mongodb.open(function(err,db){
      if(err){
          return back(err);
      }
      db.collection('shops',function(err,collection){
          if(err){
              mongodb.close();
              return back(err);
          };

          if(lessOrMore == 'less'){
              product_number -=1;
              collection.update({'_id':ObjectId(product_id)},{$set:{'number':product_number}},
                  function(err){
                  mongodb.close();
                  if(err){
                      return back(err);
                  }
                  back(null);
              });

          }else{
              product_number +=1;
              collection.update({'_id':ObjectId(product_id)},{$set:{'number':product_number}},
                  function(err){
                      mongodb.close();
                      if(err){
                          return back(err);
                      }
                      back(null);
                  });
          }
      })
  })
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
//更新数据
Product.prototype.update = function(product_id,property,callback){
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
            collection.update({'_id':product_id
                },product,function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};




