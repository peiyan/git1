$(function () {

// 增
    $('.add').click(function () {

    // var num = $(this).prev();
    var that = this;
    var cartid = $(this).parents('.menuList').attr('cartid');
    //加
    $.get('/app/addnum/', {cartid: cartid}, function (data) {
        // console.log(data)
        if (data.status == 1) {
            // console.log('11111111')
            $(that).prev().html(data.num)
        }
        else {
            console.log(data.msg)
        }
        calculate();
    });
    });

//    减
    $('.reduce').click(function () {
        // var num = $(this).prev();
        var that = this;
        var cartid = $(this).parents('.menuList').attr('cartid');
        $.get('/app/reducenum/', {cartid: cartid}, function (data) {
            // console.log(data)
            if (data.status == 1) {
                $(that).next().html(data.num)
            }
            else {
                console.log(data.msg)
            }
            calculate();
        });


    });

//    删除
    $('.delbtn').click(function () {
        var cartid = $(this).parent().attr('cartid');
        var that = this;

        $.get('/app/deletecart/',{'cartid':cartid},function (data) {
            // console.log(data)
            if (data.status == 1){
                $(that).parent().remove();
            }
            else{
                console.log(data.msg)
            }
        })
        });

//勾选
    $('.select').click(function () {
            var cartid = $(this).parents('.menuList').attr('cartid');
            var that = this;
            $.get('/app/cartselect/',{cartid:cartid},function (data) {
                console.log(data)
                if (data.status == 1) {
                    if (data.is_select) {
                        $(that).find('span').html('√');
                    }
                    else {
                        $(that).find('span').html('');
                    }
                }
                else{
                    console.log(data.msg)
                }
                isAllSelected()
            });
        });

//全选
    $('#allselect').click(function () {
            selects = [];
            unselects = [];
            $('.menuList').each(function () {
                var select = $(this).find('.select').children('span').html();
                if (select){
                    selects.push($(this).attr('cartid'))
                }
                else{
                    unselects.push($(this).attr('cartid'))
                }
            });

            if (unselects.length == 0){
                $.get('/app/cartselectall/',{'action':'cancelselect','selects':selects.join('#')},function (data) {
                    // console.log(data)
                    if(data.status==1){
                        $('.select').find('span').html('')
                    }
                    else{
                        console.log(data.msg)
                    }
                    isAllSelected()
                });
            }
            else {
                $.get('/app/cartselectall/', {'action': 'select', 'selects': unselects.join('#')}, function (data) {
                    // console.log(data)
                    if (data.status == 1) {
                        $('.select').find('span').html('√')
                    }
                    else {
                        console.log(data.msg)
                    }
                    isAllSelected()
                });
            }

        });
// 检查是否全选
    isAllSelected();
    function isAllSelected() {
        var count = 0;
        $('.select').each(function () {
            if($(this).find('span').html()){
                count ++;
            }
        });


        if (count == $('.select').length){
            $('#allselect').find('span').html('√')
        }
        else{
             $('#allselect').find('span').html('')
        }
        calculate();
    }
//计算总计
    function calculate() {
            total = 0;
            $('.menuList').each(function () {
                if($(this).find('.select').find('span').html()){
                    price = parseFloat($(this).find('.price').html());
                    num = parseInt($(this).find('.num').html());
                    total += price*num;
                }
            });
            //显示总价
            $('#totalprice').html(total.toFixed(2));
    }
    
//结算
    $('#calculate').click(function () {
        //先获取勾选的所有商品(可以在后台获取)
        //后台生成订单
        $.get('/app/orderadd/',function (data) {
            if(data.status == 1){
                location.href = '/app/order/' + data.orderid + '/'
            }
            else{
                console.log(data.msg)
            }
        })
    });
    });




