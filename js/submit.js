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
                url: "./promo.php",
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
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function(result) {
                  //alert(JSON.stringify(result));
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry, server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    $('#section7').empty();
                    $('#section7').append('<img src="img/Heavenly-Blush-12.jpg" class="imgFull animated fadeIn"/>');
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
