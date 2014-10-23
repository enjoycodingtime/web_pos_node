describe ("Discount",function(){
   it("should be return discounted_shopping_cart when called filter",function(){
       expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule())).toEqual([{ category: '手机',
           name: 'mx4',
           unitPrice: '1799',
           unit: '台',
           promotion: 'undefined',
           publish_time:'11/10/2014',
           num: 5 }]);
   }) ;
});
