// $(function () {
//     // 全部类型
//     $('#child_type').click(function () {
//         $('#child_type_container').toggle() ;// 切换显示和隐藏
//         $('#child_type_icon').toggleClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
//     });
//
//     $('#child_type_container').click(function () {
//         $(this).hide(); //隐藏
//         $('#child_type_icon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down')
//
//         // $('#sort_rule_container').triggerHandler('click');
//
//     });
//
//
//     $('#sort_rule').click(function () {
//         $('#sort_rule_container').toggle();
//         $('#sort_rule_icon').toggleClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
//         //主动触发$('#child_type_container')的click事件
//         $('#child_type_container').triggerHandler('click');
//     });
//     //变换上下箭头
//     $('#sort_rule_container').click(function () {
//         $(this).hide()
//         $('#sort_rule_container').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down')
//     })
// });
$(function () {
   //全部类型
    $('#child_type').click(function () {
        $('#child_type_container').toggle();//切换显示和隐藏
        $('#child_type_icon').toggleClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        $('#sort_rule_container').trigger('click')
    });

    $('#child_type_container').click(function () {
       $(this).hide();
       $('#child_type_icon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down')
    });

    //排序规则
    $('#sort_rule').click(function () {
        $('#sort_rule_container').toggle();
        $('#sort_rule_icon').toggle('glyphicon-chevron-down').addClass('glyphicon-chevron-up');

        $('#child_type_container').triggerHandler('click');


    });
    $('#sort_rule_container').click(function () {
       $(this).hide();
       $('#sort_rule_icon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    });


        //加入购物车
        $('.add').click(function () {
            // index = $(this).index('.add');
            // num = $('.number').eq(index)
            $number = $(this).parent().find('.number');
            $number.html(parseInt($number.html())+1);
        });
        $('.reduce').click(function () {
                // index = $(this).index('.add');
                // num = $('.number').eq(index)
                $number = $(this).parent().find('.number');
                num = parseInt($number.html())-1;
                if (num<1){
                    num = 1
                }
                $number.html(num);
            });
    //加入购物车
    $('.addtocart').click(function () {
        goodsid = $(this).attr('goodsid');
        num = parseInt($(this).prev().find('.number').html());

        $.get('/app/addtocart/',{goodsid:goodsid,num:num},function (data) {
            // console.log(data);
            if(data.status == 1){
                console.log('加入购物车成功')
            }
            else if(data.status == 0){
                location.href = '/app/login/'
            }
        })
    })

});


