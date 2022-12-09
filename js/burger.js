$('.menu .burger').click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.menu ul').removeClass('active');
    } else {
        $(this).addClass('active');
        $('.menu ul').addClass('active');
    }

});