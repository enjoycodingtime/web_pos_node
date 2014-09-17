/**
 * Created by zk on 14-9-14.
 */
$(function(){

    $('.add_to_cart').click(function(){

        var temp = [];
        $($(this).parent().siblings()).each(function(){
            temp.push($(this).text());
        });

        var shop = {
            category:temp[0],
            name:temp[1],
            unitPrice:temp[2],
            unit:temp[3],
            promotion:temp[4]
        };

        $.post('/addToCart',{shop:shop},function(data){
            $('#cart_num').text(data);
        });
    });
});
