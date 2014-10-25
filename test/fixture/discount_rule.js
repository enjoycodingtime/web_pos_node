/**
 * Created by zk on 14-10-21.
 */
function Discount_rule() {

}

Discount_rule.get_rule7 = function() {
    return "category == 水果";
};
Discount_rule.get_rule8 = function() {
    return "category == 水果&&name==苹果";
};
Discount_rule.get_rule3 = function() {
    return "(name=='苹果'||name=='mx4')";
};
Discount_rule.get_rule5 = function() {
    return "publish_time=='13/11/2014'";
};
Discount_rule.get_rule1 = function() {
    return "(name=='苹果'||name=='mx4')&&publish_time<'11/11/2014'";
};
Discount_rule.get_rule2 = function() {
    return "(name=='苹果'||name=='mx4')&&publish_time>'11/11/2014'";
};
Discount_rule.get_rule4 = function() {
    return "name=='苹果'&&publish_time>'11/11/2014‘";
};
Discount_rule.get_rule6 = function() {
    return "publish_time<'11/11/2014'&&(name=='苹果'||name=='mx4')";
};
Discount_rule.get_rule9 = function() {
    return "name=='苹果'||name=='mx4||name ==锤子T";
};
Discount_rule.get_rule10 = function() {
    return "(name=='苹果'||(name=='香蕉'&&category ==水果))";
};
Discount_rule.get_rule13 = function() {
    return "(name=='苹果'||(name=='香蕉'&&category ==水果))&&publish_time==11/12/2014";
};
Discount_rule.get_rule14 = function() {
    return "(name=='苹果'&&(name=='香蕉'&&category ==水果))||publish_time==11/12/2014";
};
Discount_rule.get_rule11 = function() {
    return "(name=='mx4'||category ==水果)";
};
Discount_rule.get_rule12 = function() {
    return "(name=='mx4'||category ==水果)&&publish_time>11/11/2014";
};
