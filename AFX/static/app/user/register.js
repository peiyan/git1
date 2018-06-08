$(function () {


    flag1 = false;  // 表示用户名输入是否合法
    flag2 = false;  //表示密码输入是否合法
    flag3 = false;  // 表示确认密码输入是否合法
    flag4 = false;  // 表示邮箱输入是否合法
   // 用户名
   $('#username').change(function () {
       var value = $(this).val();
       if (/^[a-zA-Z_]\w{5,17}$/.test(value)){

                flag1 = true;

           $.get('/app/checkusername/',{username:$(this).val()},function (data) {
                // console.log(data)
                if (data['status'] == 1){
                    $('#msg').html('用户名可以使用').css('color','green')
                }
                else if(data['status'] == 0 ){
                    $('#msg').html(data.msg).css('color','red')
                }
                else{
                    $('#msg').html('用户名不合法').css('color','orange')
                }
            })
       }
       else{
           flag1 = false;
           $('#msg').html('用户名不合法').css('color','orange')
       }
   });

   //密码
      $('#password').change(function () {
       var value = $(this).val();
       if (/^.{8,}$/.test(value)){
           // console.log('输入合法')
           flag2 = true
       }
       else{
           // alert('输入有误')
           console.log('密码输入格式不正确')
           flag2 = false

       }
   });
      //确认密码
    //密码
      $('#again').change(function () {
       if ($(this).val() == $('#password').val()){
           // console.log('输入合法')
           flag3 = true
       }
       else{
           // alert('输入有误')
           flag3 = false
       }
   });


      //邮箱
          $('#email').change(function () {
               var value = $(this).val();
               if (/^\w+@\w+\.\w+$/.test(value)){
                   // console.log('输入合法')
                   flag4 = true
               }
               else{
                   // alert('输入有误')
                   flag4 = false
               }
           });

       //注册
    $('#register').click(function () {
        if(flag1 && flag2 && flag3 && flag4){
            $('#password').val(md5($('#password').val()));
            return true
        }
        else{
            window.alert('输入有误');
            return false
        }

    });
    //检查用户名是否存在







});