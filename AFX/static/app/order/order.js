$(function () {

    //支付:需要集成第三方支付

    $('#pay').click(function () {
              $.get('/app/orderchangestatus/',{'orderid':$(this).attr('orderid'),"status":"1"},function (data) {
                            // console.log(data)
                  if(data.status == '1'){
                      location.href = '/app/mine/'
                  }
                  else{
                      console.log(data.msg)
                  }
              })
    })

});