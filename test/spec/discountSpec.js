describe ("Discount",function(){
   it("should be return true",function(){
       discount = new Discount();
       expect(discount.isDiscount('id',"rules")).toEqual(true);
   }) ;
});
