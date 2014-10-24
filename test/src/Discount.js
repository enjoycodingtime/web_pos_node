function Discount(){

};

Discount.filter = function(shopping_cart,discount_rule){
    discount_rule = Discount.format(discount_rule);
    var shopping_cart = Discount.filter_rule(discount_rule,shopping_cart);
    return shopping_cart;
};

Discount.filter_rule = function (discount_rule,shopping_cart) {
    if(discount_rule.length == 0) return shopping_cart;
    var reg =/(\|\|)|(&&)/,reg2 = /(==)|<|>|(<=)|(>=)/;

    while(reg.exec(discount_rule)){
        var back = Discount.filter_or_and(discount_rule,shopping_cart);
        discount_rule = back.discount_rule;
        shopping_cart = back.shopping_cart;
        console.log(discount_rule+'_________________-');
    };
    if(discount_rule !=''){
        console.log(discount_rule,shopping_cart);
        shopping_cart = Discount.filter_last(discount_rule,shopping_cart);
        discount_rule = '';
    }
    return Discount.filter_rule(discount_rule,shopping_cart);
};

Discount.format = function (discount_rule) {
    discount_rule = discount_rule.replace(/\s/g,"");
    var pattern = new RegExp("[`\"':;'{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0,discount_rule_length = discount_rule.length; i < discount_rule_length; i++) {
        rs = rs+discount_rule.substr(i, 1).replace(pattern, '');
    }
    return rs;
};

Discount.filter_or_and = function (discount_rule,shopping_cart) {
    var reg =/(\|\|)|(&&)/,reg2 = /(==)|<|>|(<=)|(>=)/;
    var result = reg.exec(discount_rule);
    console.log(result);
    var cuted_rule = discount_rule.substr(0,result.index);
    discount_rule = discount_rule.substr(result.index+2,discount_rule.length-result.index-2);
    var filtered_rule = Discount.filter_information(cuted_rule);
    var obj = {};
    obj[filtered_rule.property_name] = filtered_rule.property_value;
    var cart = _(shopping_cart).where(obj);
    if(result[0] == '||' && reg.exec(discount_rule)){
        var or = Discount.filter_or_and(discount_rule,shopping_cart);
        discount_rule = or.discount_rule;
        cart.push(or.shopping_cart[0]);
    }

    else if(result[0] == '||' && !reg.exec(discount_rule)){
        console.log(discount_rule,shopping_cart);
        var last = Discount.filter_last(discount_rule,shopping_cart);
        discount_rule = '';
        cart.push(last);
        console.log(last);
    }
    console.log(cart);
    console.log(discount_rule);
    return {discount_rule:discount_rule,shopping_cart:cart}
};

Discount.filter_information = function(cuted_rule){
    var reg =/(\|\|)|(&&)/,reg2 = /(==)|<|>|(<=)|(>=)/;
    if(cuted_rule.substr(0,1) === '('){
        cuted_rule = cuted_rule.substr(1);
    };
    if(cuted_rule.substr(cuted_rule.length-1,1) === ')'){
        cuted_rule = cuted_rule.substr(0,cuted_rule.length-1);
    }
    var operator_index= reg2.exec(cuted_rule).index,
        operator = reg2.exec(cuted_rule)[0],
        filtered_rule = {};
//    filtered_rule[cuted_rule.substr(0,operator_index)] = cuted_rule.substr(operator_index+operator.length);
    filtered_rule.operator = operator[0];
    filtered_rule.property_name = cuted_rule.substr(0,operator_index);
    filtered_rule.property_value = cuted_rule.substr(operator_index+operator.length);
    return filtered_rule;
};

Discount.filter_last = function(discount_rule,shopping_cart){
    var filtered_information = Discount.filter_information(discount_rule);
        if(filtered_information.property_name == 'publish_time'){
            var cart = Discount.filter_publich_time(filtered_information,shopping_cart);
        }else{
            var obj = {};
            obj[filtered_information.property_name] = filtered_information.property_value;
            var cart = _(shopping_cart).where(obj)[0];
        }
    return cart;
};

Discount.filter_publich_time = function(filtered_information,shopping_cart){
    var year = filtered_information.property_value.substr(6),
        month = filtered_information.property_value.substr(3,2),
        day = filtered_information.property_value.substr(0,2),
        operator = filtered_information.operator;
    var cart = _(shopping_cart).filter(function(cart){
        var y = cart.publish_time.substr(6),
            m = cart.publish_time.substr(3,2),
            d = cart.publish_time.substr(0,2);
        if(operator === '<'){
            if(y<year){
                return cart;
            }else if(y == year && m<month){
                return cart;
            }else if(y == year &&m == month && d<day){
                return cart;
            }
        }
        if(operator === '>'){
            if(y>year){
                return cart;
            }else if(y == year && m>month){
                return cart;
            }else if(y == year &&m == month && d>day){
                return cart;
            }
        }
        if(operator === '='){
            if(y == year &&m == month && d == day){
                return cart;
            }
        }
    });
    return cart;
};
