/**
 * Created by zk on 14-9-24.
 */

var mongodb = require('./db');

function Post(){
    
};
Post.prototype.remove = function (name,callback) {
    mongodb.close();
    console.log("11111111111111111111111111111111111lcoase");
    mongodb.open(function (err, db) {
        if (err) {

            return callback(err);
        }
        //读取 shops 集合
        db.collection('shops', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.remove({
                "name": name
            }, {
                w: 1
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};
module.exports = Post;