describe ("Discount",function(){
//   it("should be return discounted_shopping_cart when called filter",function(){
//       expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule1())).toEqual([{ category: '手机',
//           name: 'mx4',
//           unitPrice: '1799',
//           unit: '台',
//           promotion: 'undefined',
//           publish_time:'11/10/2014',
//           num: 5 }]);
//   }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule2())).toEqual([{ category: '水果',
//            name: '苹果',
//            unitPrice: '5',
//            unit: '斤',
//            promotion: 'undefined',
//            publish_time:'11/12/2014',
//            num: 6 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule3())).toEqual([{ category: '水果',
//            name: '苹果',
//            unitPrice: '5',
//            unit: '斤',
//            promotion: 'undefined',
//            publish_time:'11/12/2014',
//            num: 6 },
//            { category: '手机',
//                name: 'mx4',
//                unitPrice: '1799',
//                unit: '台',
//                promotion: 'undefined',
//                publish_time:'11/10/2014',
//                num: 5 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule4())).toEqual([{ category: '水果',
//            name: '苹果',
//            unitPrice: '5',
//            unit: '斤',
//            promotion: 'undefined',
//            publish_time:'11/12/2014',
//            num: 6 }]);
//    });
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule5())).toEqual([{ category: '水果',
//            name: '香蕉',
//            unitPrice: '5',
//            unit: '斤',
//            promotion: 'undefined',
//            publish_time:'13/11/2014',
//            num: 7 }]);
//    });
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule6())).toEqual([{ category: '手机',
//            name: 'mx4',
//            unitPrice: '1799',
//            unit: '台',
//            promotion: 'undefined',
//            publish_time:'11/10/2014',
//            num: 5 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule7())).toEqual([
//            { category: '水果',
//                name: '香蕉',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'13/11/2014',
//                num: 7 },
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule8())).toEqual([
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule9())).toEqual([
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 },
//            { category: '手机',
//                name: 'mx4',
//                unitPrice: '1799',
//                unit: '台',
//                promotion: 'undefined',
//                publish_time:'11/10/2014',
//                num: 5 },
//            { category: '手机',
//                name: '锤子T',
//                unitPrice: '2000',
//                unit: '台',
//                promotion: 'undefined',
//                publish_time:'10/12/2014',
//                num: 7 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule10())).toEqual([
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 },
//            { category: '水果',
//                name: '香蕉',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'13/11/2014',
//                num: 7 }]);
//    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule11())).toEqual([
//            { category: '手机',
//                name: 'mx4',
//                unitPrice: '1799',
//                unit: '台',
//                promotion: 'undefined',
//                publish_time:'11/10/2014',
//                num: 5 },
//            { category: '水果',
//                name: '香蕉',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'13/11/2014',
//                num: 7 },
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 }]);
//    }) ;
////    it("should be return discounted_shopping_cart when called filter",function(){
////        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule12())).toEqual([
////            { category: '水果',
////                name: '香蕉',
////                unitPrice: '5',
////                unit: '斤',
////                promotion: 'undefined',
////                publish_time:'13/11/2014',
////                num: 7 },
////            { category: '水果',
////                name: '香蕉',
////                unitPrice: '5',
////                unit: '斤',
////                promotion: 'undefined',
////                publish_time:'13/11/2014',
////                num: 7 }]);
////    }) ;
//    it("should be return discounted_shopping_cart when called filter",function(){
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule13())).toEqual([
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 }]);
//    }) ;

//    it("should be return discounted_shopping_cart when called filter",function(){
//        console.log(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule14()));
//        expect(Discount.filter(Shopping_cart.get_cart(),Discount_rule.get_rule14())).toEqual([
//            { category: '水果',
//                name: '苹果',
//                unitPrice: '5',
//                unit: '斤',
//                promotion: 'undefined',
//                publish_time:'11/12/2014',
//                num: 6 }]);
    }) ;
});
