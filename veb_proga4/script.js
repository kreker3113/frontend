$(document).ready(function() {
    // Инициализация календарей
    $('#birthdate').datepicker({
        dateFormat: 'dd.mm.yy',
        changeMonth: true,
        changeYear: true
    });

    $('#date-range').datepicker({
        dateFormat: 'dd.mm.yy',
        range: true
    });

    // Валидация формы
    $('#extended-form').submit(function(e) {
        e.preventDefault();
        let isValid = true;
        $('.error-message').text('');
        $('input').css('border-color', '#ddd');

        // Проверка логина
        if ($('#login').val().length < 4) {
            $('#login-error').text('Минимум 4 символа');
            $('#login').css('border-color', '#d9534f');
            isValid = false;
        }

        // Проверка пароля
        if ($('#password').val().length < 6) {
            $('#password-error').text('Минимум 6 символов');
            $('#password').css('border-color', '#d9534f');
            isValid = false;
        }

        // Подтверждение пароля
        if ($('#password').val() !== $('#confirm-password').val()) {
            $('#confirm-password-error').text('Пароли не совпадают');
            $('#confirm-password').css('border-color', '#d9534f');
            isValid = false;
        }

        // Проверка даты рождения
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!dateRegex.test($('#birthdate').val())) {
            $('#birthdate-error').text('Формат: ДД.ММ.ГГГГ');
            $('#birthdate').css('border-color', '#d9534f');
            isValid = false;
        }

        // Если все проверки пройдены
        if (isValid) {
            $('#form-result').html(`
                <div class="success">
                    <h3>Данные успешно отправлены!</h3>
                    <p>Логин: ${$('#login').val()}</p>
                    <p>Email: ${$('#email').val()}</p>
                </div>
            `);
        }
    });
});