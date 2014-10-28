describe ("Discount",function(){
//   it("should be return discounted_shopping_cart when called filter",function(){
//       expect(New_Discount.filter(Discount_rule.get_rule7(),Shopping_cart.get_cart())).toEqual([
//           { category: '水果',
//               name: '香蕉',
//               unitPrice: '5',
//               unit: '斤',
//               promotion: 'undefined',
//               publish_time:'13/11/2014',
//               num: '7' },
//           { category: '水果',
//               name: '苹果',
//               unitPrice: '5',
//               unit: '斤',
//               promotion: 'undefined',
//               publish_time:'11/12/2014',
//               num: '56' }
//       ]);
//   }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(New_Discount.filter(Discount_rule.get_rule8(),Shopping_cart.get_cart())).toEqual([
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: '56' }
//        ]);
//    }) ;
    it("should be return discounted_shopping_cart when called filter",function(){
        expect(New_Discount.filter(Discount_rule.get_rule9(),Shopping_cart.get_cart())).toEqual([
            { category: '水果',
                name: '苹果',
                unitPrice: '5',
                unit: '斤',
                promotion: 'undefined',
                publish_time:'11/12/2014',
                num: '56' },
            { category: '手机',
                name: 'mx4',
                unitPrice: '1799',
                unit: '台',
                promotion: 'undefined',
                publish_time:'11/10/2014',
                num: '5' },
            { category: '手机',
                name: '锤子T',
                unitPrice: '2000',
                unit: '台',
                promotion: 'undefined',
                publish_time:'10/12/2014',
                num: '99' }
        ]);
    }) ;

});
