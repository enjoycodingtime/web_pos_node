/**
 * Created by zk on 14-9-10.
 */

var mongodb = require('./db');
var _ = require('../public/underscore/underscore-min.js');

function Product(){
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
