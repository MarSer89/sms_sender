$(document).ready(function () {
    var numberField = document.getElementById('numberField');

    $(document).on('keyup', '#textField', function (e) {
        if ((e.keyCode || e.charCode) === 13) {
            sendMessage();
        }
    });

    $(document).on('click', '#sendButton', sendMessage);

    function sendMessage() {
        var number = numberField.value.replace(/\D/g,''); // Remove all non-numeric
        var textField = $('#textField').val();
        var fromField = $('#fromField').val();

        fetch('/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number: number, text: textField, from: fromField})
        })
            .then(function(res){ console.log(res) })
            .catch(function(error){ console.log(error)});
    }
});