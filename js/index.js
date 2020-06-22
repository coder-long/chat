$(function () {


  //注册
  function check_register() {
    var name = $("#r_user_name").val();
    var pass = $("#r_password").val();
    var nickname = $("#nickname").val();

    $.ajax({
      url: 'http://118.24.25.7/chat_api/interface/reg.php',
      type: 'post',
      data: {
        username: name,
        password: pass,
        nickname: nickname
      },
      //请求成功
      success: function (data) {
        if (data.code == 0) {
          $(".reg_des").text('创建成功，请登录！').css({
            'color': '#4CAF50'
          })
          //成功后 跳转到登录面板
          setTimeout(function () {
            Handover()
          }, 2000)

        } else {

          console.log(data);

          $(".reg_des").text(data.msg)
          $("#login_form").removeClass('shake_effect');
          setTimeout(function () {
            $("#login_form").addClass('shake_effect')
          }, 1);

        }
      },
      //请求出错
      error: function (err) {
        console.log(err);
        $(".reg_des").text('请求数据出错！！')
      }
    })

  }

  //登录
  function check_login() {
    var name = $("#user_name").val();
    var pass = $("#password").val();

    $.ajax({
      url: 'http://118.24.25.7/chat_api/interface/login.php',
      type: 'POST',
      data: {
        username: name,
        password: pass
      },
      //请求成功
      success: function (data) {

        setCookie('user',JSON.stringify(data.data), 1)
        

        if (data.code == 0) {
          $('.log_des').text('')
          $("#login").text('请稍后 . . .').css({
            'color': 'while',
            'fontSize': '14px'
          })
          setTimeout(function () {
            window.location.href = "./pages/所有用户.html?idx=1"
          }, 2000)

        } else {

          $('.log_des').text(data.msg)

          $("#login_form").removeClass('shake_effect');
          setTimeout(function () {
            $("#login_form").addClass('shake_effect')
          }, 1);
        }
      },
      //请求出错
      error: function (err) {
        console.log(err);
      }

    })

  }

  //按钮点击
  $("#create").click(function () {
    check_register();
    return false;
  })
  $("#login").click(function () {
    check_login();
    return false;
  })


  //切换
  function Handover() {
    $('form').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 'slow');
  }

  //注册 登录 切换
  $('.message a').click(function () {
    Handover()
    setTimeout(function () {
      $(".reg_des").text('')
      $(".log_des").text('')
    }, 500)
  });


})