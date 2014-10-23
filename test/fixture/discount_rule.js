/**
 * Created by zk on 14-10-21.
 */
function Discount_rule() {

}

Discount_rule.get_rule = function() {
    return "(name=='苹果'||name=='mx4')&&publish_time<'11/11/2014'";
};