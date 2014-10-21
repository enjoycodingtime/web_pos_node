/**
 * Created by zk on 14-10-21.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/pos_node');
var RuleSchema = new Schema({
    name: {type : String},
    date_range: {type:String},
    time:{type:String},
    discount_way:{type:String}
});

var model_name = coll_name = 'rules';
mongoose.model(model_name, RuleSchema, coll_name);

var RULES  = mongoose.model(model_name, coll_name);

function Rules(){

};
Rules.prototype.add_rule = function(rules){

    var rule  = new RULES();
    rule.name  = rules.name;
    rule.date_range  =rules.date ;
    rule.time  =rules.time ;
    rule.discount_way  =rules.discount_way ;
    rule.save(function(err) {
        if (err) {
            console.log('save failed');
        }
        console.log('save success');
    });

};
module.exports = Rules;


