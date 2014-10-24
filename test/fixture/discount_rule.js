/**
 * Created by zk on 14-10-21.
 */
function Discount_rule() {

}

Discount_rule.get_rule1 = function() {
    return "(name=='苹果'||name=='mx4')&&publish_time<'11/11/2014'";
};
Discount_rule.get_rule2 = function() {
    return "(name=='苹果'||name=='mx4')&&publish_time>'11/11/2014'";
};