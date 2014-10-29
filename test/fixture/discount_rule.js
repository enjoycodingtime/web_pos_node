/**
 * Created by zk on 14-10-21.
 */
function Discount_rule() {

}


Discount_rule.get_rule1 = function() {
    return "name==苹果";
};
Discount_rule.get_rule2 = function() {
    return "num==7";
};
Discount_rule.get_rule3 = function() {
    return "num<7";
};
Discount_rule.get_rule44 = function() {
    return "num>8";
};
Discount_rule.get_rule12 = function() {
    return "publish_time>=12/11/2014";
};
Discount_rule.get_rule4 = function() {
    return "name==苹果||name==香蕉";
};
Discount_rule.get_rule5 = function() {
    return "category == 水果&&num<8";
};
Discount_rule.get_rule6 = function() {
    return "(category == 水果&&num<8)||(name==mx4)";
};
Discount_rule.get_rule7 = function() {
    return "category == 水果&&(num<8||(name==mx4))";
};
Discount_rule.get_rule8 = function() {
    return "(category == 水果&&(num<8||(name==mx4)))||(name==苹果||num==99)";
};