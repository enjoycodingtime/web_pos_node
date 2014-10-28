/**
 * Created by zk on 14-10-28.
 */
function New_Discount(){

};

New_Discount.filter  = function (rule,cart){
    var filtered_cart =[]
    rule = New_Discount.format(rule);
    return New_Discount.remove_brackets(rule,cart,filtered_cart);
};
//去掉最里面的括号
New_Discount.remove_brackets = function(rule,unchanged_cart,filtered_cart){
    if(!New_Discount.contain_brackets(rule)){
        if(rule.length = 0){
            return cart;
        }
    }else{
        var min_rule = New_Discount.get_min_rule(rule);
        var cuted_rule = min_rule.cuted_rule;
        rule = min_rule.rule;
        var cart = New_Discount.filter_cart(cuted_rule,unchanged_cart);
        filtered_cart.push(cart);
    }



    return New_Discount.remove_brackets(rule,unchanged_cart,filtered_cart);
};
//判断是否有括号
New_Discount.contain_brackets = function(rule){

};
//获取最里面括号里的运算式
New_Discount.get_min_rule = function (rule){
    var anti_brackets_index = New_Discount.get_first_anti_brackets(rule);
    var before_anti_brackets_rule = rule.substr(0,anti_brackets_index);
    var positive_brackets_index = New_Discount.get_lost_positive_brackets(before_anti_brackets_rule);
    var cuted_rule = rule.substr(positive_brackets_index,anti_brackets_index-positive_brackets_index+1);
    var rule = rule.substr(0,positive_brackets_index)+rule.substr(anti_brackets_index+1);
    return {rule:rule,cuted_rule:cuted_rule}
};
//获取从左到右第一个')'的index
New_Discount.get_first_anti_brackets = function (rule){
    var reg_anti_brackets = /\)/;
    return reg_anti_brackets.exec(rule).index;
};
//获取从左到右最后一个'('的index
New_Discount.get_lost_positive_brackets = function(rule){
    var reg_positive_brackets = /\(/g;
    var result,index;
    while ((result = reg_positive_brackets.exec(rule)) != null)  {
        index = result.index;
    }
    return index;
};
//格式化规则
New_Discount.format = function (discount_rule) {
    discount_rule = discount_rule.replace(/\s/g,"");
    var pattern = new RegExp("[`\"':;'{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0,discount_rule_length = discount_rule.length; i < discount_rule_length; i++) {
        rs = rs+discount_rule.substr(i, 1).replace(pattern, '');
    }
    return rs;
};
//过滤出符合规则的商品
New_Discount.filter_cart = function (cuted_rule,unchanged_cart){
    var reg1 = /\|\|/,reg2 = /&&/,result;
    if(cuted_rule.substr(0,1) == '('){
        cuted_rule = cuted_rule.substr(1);
    };
    if(cuted_rule.substr(cuted_rule.length-1,1) == ')'){
        cuted_rule = cuted_rule.substr(0,cuted_rule.length-1);
    };
    if(reg1.exec(cuted_rule)){
        result = reg1.exec(cuted_rule);
        var str1 = cuted_rule.substr(0,result.index);
        var str2 = cuted_rule.substr(result.index+2);
    }
};
//获得符合指定规则的商品
New_Discount.filter_information = function(cuted_rule,cart){
    reg = /(==)|<|>|(<=)|(>=)/;
    var operator_index= reg.exec(cuted_rule).index,
        operator = reg.exec(cuted_rule)[0],
        filtered_rule = {};
    filtered_rule.operator = operator[0];
    filtered_rule.property_name = cuted_rule.substr(0,operator_index);
    filtered_rule.property_value = cuted_rule.substr(operator_index+operator.length);
    return New_Discount(filtered_rule,cart);
};
New_Discount.get_information = function (filtered_rule,cart){
    var obj = {};
    obj[filtered_rule.property_name] = filtered_rule.property_value;
    var car;
    switch(filtered_rule.operator) {
        case '==':
            car = _.where(cart,obj);
            break;
        case '<':
            car = _.filter(cart,function(item){
                if(item[filtered_rule.property_name]<filtered_rule.property_value){
                    return item;
                }
            });
            break;
        case '>':
            car = _.filter(cart,function(item){
                if(item[filtered_rule.property_name]>filtered_rule.property_value){
                    return item;
                }
            });
            break;
        case '<=':
            car = _.filter(cart,function(item){
                if(item[filtered_rule.property_name]<=filtered_rule.property_value){
                    return item;
                }
            });
        case '>=':
            car = _.filter(cart,function(item){
                if(item[filtered_rule.property_name]>=filtered_rule.property_value){
                    return item;
                }
            });
            break;
    };
    return car;
}