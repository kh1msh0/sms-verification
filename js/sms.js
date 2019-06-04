function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validate = function() {
    var form = $("#myform").serializeArray();
    var errors = [];

    for (var i = 0; i < form.length; i++) {
      if (form[i].name == "Name" && form[i].value.length < 3) {
        errors.push("Name");
      } else if (
        form[i].name == "Phone" &&
        (form[i].value.length < 7 || parseInt(form[i].value) < 1 || form[i].value.length > 9 )
      ) {
        errors.push("Phone");
      } else if (form[i].name == "Email" && !validateEmail(form[i].value)) {
        errors.push("Email");
      }
    }

    // $("#myform input").css("border", "1px solid rgba(223, 223, 223, 0.61) !important");

    if (errors.length > 0) {
      for (var i = 0; i < errors.length; i++) {
        $(`#myform input[name="${errors[i]}"`).addClass("make_it_red"
          // "border",
          // "1px solid red","!important"
        );
        $(`#myform input[name="${errors[i]}"`).addClass("placeholder");
        console.log(errors[i]);
      }
      return false;
    }
    return true;
  };


  $(document).ready(function() {    
    $("#second_try").hide()
    $(".skip_popup_background").hide()
    $(".skip_popup").hide()
    $(".sms_popup_change_number").hide()
    $(".loading1").hide();
    $(".sms_popup").hide();
    $("#in24hour").hide()
    $(".loaderi").hide()
    $('.resend_code').hide()
    $("#new_number_form_text").hide();
    $(".success-checkmark").hide();
    $(".success").hide();



    // if(!Cookies.get("ifsmscodewasused")){
    //   Cookies.set("ifsmscodewasused", true, { expires: 1 });
    // }else{
    //   $("#second_try").show()
    //   $("#sbmtbtn").hide()
    // }

    $("#sbmtbtn").on("click", function(e) {
      e.preventDefault();
      if (validate()) {
        callPopup();
        formsMoving()
        getAllData()
      } else {
        $("#contactNum, #Email").addClass("make_it_red");
      }
    });


    $("#second_try").click(function(){
      if (validate()){
        $('.inputs').hide()
        closeSmsVerification()
      }
    })


  });

  var interval;
  window.aboutPopup = false;
  var counrtyCode= "+995";


  function getAllData() {
    var Full_name = $('#Full_name').val()
    var Email = $('#Email').val()
    var Phone_number = $('#Phone_number').val()
    var code = Phone_number.substring(0,3)
    console.log(code)
    if(code == Number(counrtyCode) ){
      console.log(Phone_number)
    }else{
      console.log(counrtyCode+Phone_number)
    }
  }

  function callPopup() {
    if (window.aboutPopup == false) {      
      sendCode();
      window.aboutPopup = true;
    } else {
      popupSucses();
    }
  }

  function checkCode() {
    var x = document.getElementById("smscode").value;
    if (x.length == window.smscode.length ) {
      $("#smscode").addClass("make_it_green");
    } else {
      $("#smscode").removeClass("make_it_green");
      $("#smscode").addClass("make_it_red");
    }
  }

  function popupSucses() {
    $(".sms_popup_background").hide();
    // $(".step2").addClass("active");
    // $(".step1").removeClass("active");
    // $(".step1").addClass("done");
  }

  $("#sms_code_okay").click(function() {
    var x = document.getElementById("smscode").value;
    if (x == window.smscode) {
      closeSmsVerification();
    } else {
      $("#smscode").removeClass("make_it_green");
      $("#smscode").addClass("make_it_red");
    }
  });

  function countSentSms() {
    if (!Cookies.get("smscodecount")) {
      Cookies.set("smscodecount", 1, { expires: 1 });
    } else {
      Cookies.set("smscodecount", Number(Cookies.get("smscodecount")) + 1, {
        expires: 1
      });
    }
  }

  function sendCode() {
    if (Number(Cookies.get("smscodecount")) >= 3){
      $(".resend_code").css("color", "red");
      $("#popuptext").hide()
      $("#in24hour").show()
      $(".sms_popup_head").hide()

      $("#smscode").addClass("none_pointer_event");
    }else{
      document.getElementById('smscode').value = ''
      timeri();
      createNumber();
    }
    
  }

  function rando(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createNumber() {
      countSentSms();
      const num1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      // window.smscode = `1111`;
      window.smscode = `${rando(num1)}${rando(num1)}${rando(num1)}${rando(num1)}`;
      return console.log(window.smscode);
  }

  
  function timeri() {
    clearInterval(interval);
    $('.resend_code').hide()
    $("#smscode").removeClass("none_pointer_event");
    $("#time").css("color", "white");
    window.timer = 30;
    interval = setInterval(() => {
      if (window.timer == 0) {
        $("#time").css("color", "red");
        $("#smscode").addClass("make_it_red");
        $("#smscode").addClass("none_pointer_event");
        $('.resend_code').show()
        clearInterval(interval);
      } else {
        window.timer -= 1;
        if (window.timer < 10) {
          $("#timer").text("0" + window.timer);
        } else {
          $("#timer").text(window.timer);
          
        }
      }
    }, 1000);
  }
  
  function formsMoving(){
    $('.inputs').fadeOut(300)
    setTimeout(function() {
      $(".loaderi").show()
    }, 400);
    setTimeout(function() {
      $(".loaderi").fadeOut(300)
      setTimeout(function() {
        $(".sms_popup").fadeIn(300);
      }, 400);
      
    }, 2000);
  }

  $('#change_number').click(function(){
    $("#popuptext").hide();
    $(".sms_popup_head").hide();
    $("#in24hour").hide();
    $("#new_number_form_text").show();
    $('#change_number').hide()
    $(".sms_popup_input").hide()
    $(".resend_code").hide()
    $("#time").hide()
    $(".sms_popup_change_number").show()
    clearInterval(interval);
  })

  $("#new_number_button").click(function(){
    var value = $('#new_number_input').val()
    // console.log(value)
    if(value.length < 7 || parseInt(value) < 1 || value.length > 9 ){ 
      $("#new_number_input").addClass("make_it_red");
    }else{
      Cookies.set("smscodecount", 1, { expires: 1 })
      $(".loading1").show();
      $(".new_number_button_okay").hide();
      setTimeout( function() {
        $("#new_number_form_text").hide();
        $("#popuptext").show();
        $(".sms_popup_head").show();

        // $("loading1").hide();
        $(".sms_popup_input").show()
        $(".sms_popup_change_number").hide()
        $("#change_number").hide()
        $(".resend_code").show()
        $("#time").show()
        sendCode() 
      }, 1000);
    }
  })


  function closeSmsVerification(){

    $('.skip_popup').fadeOut(300)
    $('.sms_popup').fadeOut(300)
    setTimeout(() => {
      $(".loaderi").fadeIn(300)
    }, 400);

    setTimeout(() => {
      $(".loaderi").fadeOut(300)
      setTimeout(() => {
        $(".success").show(300)
      }, 300);
    }, 2000);
    setTimeout(() => {
      $(".sms_popup_background").fadeOut(300);
    }, 3500);
  }



  $('.skip_btn_no').click(function(){
    $(".skip_popup").hide()
    if(validate()){
      $(".sms_popup").show()
    }else{
      $(".inputs").show()
    }
  })


  $('.skip').click(function(){
    $(".skip_popup").show()
    $(".sms_popup").hide()
    $(".inputs").hide()
  })


  $("#back_from_new_phone").click(function(){
    if(Number(Cookies.get("smscodecount")) == 3){
      $("#new_number_form_text").hide()
      $("#in24hour").show()
    }else{
      $("#new_number_form_text").hide()
      $(".sms_popup_head").show()
      $("#popuptext").show()
    }
    $(".sms_popup_change_number").hide()
    $(".sms_popup_input").show()
    $("#change_number").show()


  })


  