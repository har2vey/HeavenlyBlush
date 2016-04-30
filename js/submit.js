$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var yogurt = $("input#yogurt:checked").val();
            $.ajax({
                url: "http://api.asamnyapas.com/promo.php",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    yogurt: yogurt
                },
                cache: false,
                success: function(result) {
                  //alert(JSON.stringify(result));
                    $('#contactForm').trigger("reset");
                },
                error: function(result) {
                  var res = jQuery.parseJSON(JSON.stringify(result));
                  if (res.responseText == "" || (res.responseText.indexOf("Error!") > -1)){
                      $('#success').html("<div class='alert alert-danger'>");
                      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                          .append("</button>");
                      $('#success > .alert-danger').append("<strong>"+res.responseText);
                      $('#success > .alert-danger').append('</div>');
                      $('#contactForm').trigger("reset");
                      alert(JSON.stringify(result));
                  }
                  else{
                    var code = res.responseText.split('-');
                    if (code[1]=='alfamart'){
                      var coupon = code[0][0]+code[0][1]+code[0][2]+'-'+code[0][3]+code[0][4]+code[0][5]+'-'+code[0][6]+code[0][7]+code[0][8]
                    }else if (code[1]=='indomaret'){
                      var coupon = code[0][0]+code[0][1]+code[0][2]+'-'+code[0][3]+code[0][4]+'-'+code[0][5]+code[0][6]+code[0][7]
                    }
                    //alert('your code: '+code[0]+', please claim at your nearest '+code[1]);
                      $('#section7').empty();
                      $('#section7').removeClass('contact');
                      $('#section7').addClass(code[1]);
                      setTimeout(function() {
                        $('#section7').append('<div id="code" class="fp-tableCell animated flash"><h1>'+coupon+'</h1></div>');
                      }, 500);

                  }
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
