describe ("Discount",function(){
   it("should be return discounted_shopping_cart when called filter",function(){
       expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule())).toEqual({});
   }) ;
});
