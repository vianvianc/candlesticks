$(document).ready(function(){
    $('#contact').validate({
        debug: true,
        errorClass: 'alert alert-danger',
        ErrorLabelContainer: '#output-area',
        errorElement: 'div',
        //rules to define what good and bad inputs are
        //each rule starts with the form input elements Name attribute
        rules: {
            name: {
                required: true
            },
            email: {
                required: true
            },
             message: {
                required: true,
                maxlength: 2000
            }
        },
        messages: {
        name: {
            required: 'Name is required.'
        },
        email: {
            email: 'PLease provide a valid email.',
                required: 'Email is required.'
        },
        message: {
            required: 'A message is required.',
                maxlength:
            'message must be 2000 characters or less.'
        }
    },
    submitHandler: (form) => {
        $('#contact').ajaxSubmit({
            type: 'POST',
            url: $('#contact').attr('action'),
            success:(ajaxOutput) => {
                $('#output-area').css('display','')
                $('#output-area').html(ajaxOutput)

                if($('.alert-success') >=1){
                    $('#contact')[0].reset()
                }
            }
        })
    }
    })
})