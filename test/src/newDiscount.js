/**
 * Created by zk on 14-10-28.
 */
function New_Discount(){

};
//((name==苹果||category==手机)&&num==7)||name==香蕉
New_Discount.filter  = function (rule,cart){
    var filtered_cart =[];
    rule = New_Discount.format(rule);
    console.log(rule,cart);
    return New_Discount.remove_brackets(rule,cart,filtered_cart);
};
//去掉最里面的括号
New_Discount.remove_brackets = function(rule,unchanged_cart,filtered_cart){
    var reg = /(\|\|)|(&&)/,reg2 = /(==)|<|>|(<=)|(>=)/;

    if(New_Discount.contain_brackets(rule)==-1 && !reg2.exec(rule)){
        if(rule.length == 0){
            console.log('test');
            console.log(filtered_cart);
            return _.flatten(filtered_cart);
        }else{
            if(reg2.exec(rule)){

            }
            while((result = reg.exec(rule)) != null)  {
//                index = result.index;
                if(result[0] == '||'){
                    var new_car = _.union(filtered_cart[0],filtered_cart[1]);
                    filtered_cart.splice(0,2,new_car);
                }
                if(result[0] == '&&'){
                    var new_car = _.intersection(filtered_cart[0],filtered_cart[1]);
                    filtered_cart.splice(0,2,new_car);
                }
            }
            return filtered_cart;

        }
    }else{
        var min_rule = New_Discount.get_min_rule(rule);
        var cuted_rule = min_rule.cuted_rule;
        rule = min_rule.rule;
        if(New_Discount.check_index_of_barckets(cuted_rule)){
            filtered_cart = New_Discount.filter_part_of_barckets(cuted_rule,unchanged_cart,filtered_cart);

        }else{

            var cart = New_Discount.filter_cart(cuted_rule,unchanged_cart);
            filtered_cart.push(cart);
            console.log(cuted_rule,rule.length,_.flatten(filtered_cart[0]),filtered_cart[0]);
        }
    }
    return New_Discount.remove_brackets(rule,unchanged_cart,filtered_cart);
};
//判断是否有括号
New_Discount.contain_brackets = function(rule){
    return rule.indexOf('(')||rule.indexOf(')');
};
//获取最里面括号里的运算式
New_Discount.get_min_rule = function (rule){
    if(New_Discount.contain_brackets(rule)==-1){
        return {rule:"",cuted_rule:rule}
    }else{
        var anti_brackets_index = New_Discount.get_first_anti_brackets(rule);
        var before_anti_brackets_rule = rule.substr(0,anti_brackets_index);
        var positive_brackets_index = New_Discount.get_lost_positive_brackets(before_anti_brackets_rule);
        var cuted_rule = rule.substr(positive_brackets_index,anti_brackets_index-positive_brackets_index+1);
        var rule = rule.substr(0,positive_brackets_index)+rule.substr(anti_brackets_index+1);
        return {rule:rule,cuted_rule:cuted_rule}
    }
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
    console.log(cuted_rule,unchanged_cart);
    var reg1 = /\|\|/,reg2 = /&&/,result;
    cuted_rule = New_Discount.remove_first_or_last_barckets(cuted_rule);
    if(reg1.exec(cuted_rule)){
        result = reg1.exec(cuted_rule);
        var str1 = cuted_rule.substr(0,result.index);
        var str2 = cuted_rule.substr(result.index+2);
        console.log(str1,str2);
        var car1 = New_Discount.filter_information(str1,unchanged_cart);
        var car2 = New_Discount.filter_information(str2,unchanged_cart);
        return _.union(car1,car2);
    }
    if(reg2.exec(cuted_rule)){
        result = reg2.exec(cuted_rule);
        var str1 = cuted_rule.substr(0,result.index);
        var str2 = cuted_rule.substr(result.index+2);
        console.log(str1,str2,car1,car2);
        var car1 = New_Discount.filter_information(str1,unchanged_cart);
        var car2 = New_Discount.filter_information(str2,unchanged_cart);
        return _.intersection(car1,car2);
    }
    return New_Discount.filter_information(cuted_rule,unchanged_cart);
};
//获得符合指定规则的商品
New_Discount.filter_information = function(cuted_rule,cart){
    var reg = /(==)|<|>|(<=)|(>=)/;
    var operator_index= reg.exec(cuted_rule).index,
        operator = reg.exec(cuted_rule)[0],
        filtered_rule = {};
    filtered_rule.operator = operator[0];
    filtered_rule.property_name = cuted_rule.substr(0,operator_index);
    filtered_rule.property_value = cuted_rule.substr(operator_index+operator.length);
    console.log(filtered_rule);
    return New_Discount.get_information(filtered_rule,cart);
};
//检查规则的‘||’或‘&&’符号是不是在最前或最后
New_Discount.check_index_of_barckets = function(cuted_rule){
    cuted_rule = New_Discount.remove_first_or_last_barckets(cuted_rule);
    var reg = /(\|\|)|(&&)/;
    var result = reg.exec(cuted_rule);
    if(result && (result.index ==0||result.index ==cuted_rule.length-2)){
        return true;
    }
    return false;
};
New_Discount.get_information = function (filtered_rule,cart){
    var obj = {};
    obj[filtered_rule.property_name] = filtered_rule.property_value;
    var car;
    console.log(obj,cart,filtered_rule.operator);
    switch(filtered_rule.operator) {
        case '=':
            console.log('-----------');
            car = _.where(cart,obj);
            console.log(car);
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
    console.log(car);
    return car;
};

//去掉规则前后的括号
New_Discount.remove_first_or_last_barckets = function(cuted_rule){
    if(cuted_rule.substr(0,1) == '('){
        cuted_rule = cuted_rule.substr(1);
    };
    if(cuted_rule.substr(cuted_rule.length-1,1) == ')'){
        cuted_rule = cuted_rule.substr(0,cuted_rule.length-1);
    };
    return cuted_rule;
};
//过滤只有一半括号的规则
New_Discount.filter_part_of_barckets = function(cuted_rule,unchanged_cart,filtered_cart){
    var reg = /(\|\|)|(&&)/;
    var result = reg.exec(cuted_rule);
    if(result == '||'){
        if(result.index == 0){
            cuted_rule = cuted_rule.substr(2);
        }else{
            cuted_rule = cuted_rule.substr(0,cuted_rule.length-2)
        }
        var car = New_Discount.filter_information(cuted_rule,unchanged_cart);
        filtered_cart[filtered_cart.length-1] = _.union(car,filtered_cart[filtered_cart.length-1]);
    }
    if(result == '&&'){
        if(result.index == 0){
            cuted_rule = cuted_rule.substr(2);
        }else{
            cuted_rule = cuted_rule.substr(0,cuted_rule.length-2)
        }
        var car = New_Discount.filter_information(cuted_rule,unchanged_cart);
        filtered_cart[filtered_cart.length-1] = _.intersection(car,filtered_cart[filtered_cart.length-1]);
    }
    return filtered_cart;

}
