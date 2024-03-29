
(function ($, window, document, undefined) {
    'use strict';

    var $form = $('#contact-form');

    $form.submit(function (e) {
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();
        $('.contact-form button').addClass('btn-disabled');

        // get the form data
        var formData = {
            'name' : $('input[name="form-name"]').val(),
            'email' : $('input[name="form-email"]').val(),
            // 'phone' : $('input[name="form-phone"]').val(),
            // 'message' : $('textarea[name="form-message"]').val()
        };
        
        $('#loader').addClass('show');

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'process.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            // handle errors
            if (!data.success) {
                if (data.errors.name) {
                    $('#name-field').addClass('has-error');
                    $('#name-field').find('.form-input').append('<span class="help-block">' + data.errors.name + '</span>');
                }

                if (data.errors.email) {
                    $('#email-field').addClass('has-error');
                    $('#email-field').find('.form-input').append('<span class="help-block">' + data.errors.email + '</span>');
                }

                // if (data.errors.phone) {
                //     $('#phone-field').addClass('has-error');
                //     $('#phone-field').find('.form-input').append('<span class="help-block">' + data.errors.phone + '</span>');
                // }

				// if (data.errors.message) {
                //     $('#message-field').addClass('has-error');
                //     $('#message-field').find('.form-input').append('<span class="help-block">' + data.errors.message + '</span>');
                // }
                $('#loader').removeClass('show');
                $('.contact-form button').removeClass('btn-disabled');
                $('#loader').addClass('hide');
            } else {
                // display success message
                $('#loader').removeClass('show');
                $('.contact-form button').removeClass('btn-disabled');
                $('#loader').addClass('hide');
                $form.html('<div class="alert alert-success">' + data.message + '</div>');
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
}(jQuery, window, document));
