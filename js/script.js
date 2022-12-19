$(document).ready(function () {

    // $('input[name="number"]').numberMask({beforePoint:12});

    $('.our-item-title').hover(function () {
            $(this).closest('.our-item').find('.our-item-img a img').addClass('hover');
            $(this).closest('.our-item').find('.our-item-img a').addClass('hover');
            $(this).closest('.our-item').find('.our-item-title h1').addClass('hover');
            $(this).closest('.our-item').find('.our-item-title').addClass('hover');
            $(this).closest('.our-item').find('span').addClass('hover');
        },
        function () {
            $(this).closest('.our-item').find('.our-item-img a img').removeClass('hover');
            $(this).closest('.our-item').find('.our-item-img a').removeClass('hover');
            $(this).closest('.our-item').find('.our-item-title h1').removeClass('hover');
            $(this).closest('.our-item').find('.our-item-title').removeClass('hover');
            $(this).closest('.our-item').find('span').removeClass('hover');
        })

    $('.our-item-img a, .our-item-img a img').hover(function () {
            $(this).closest('.our-item').find('.our-item-title h1').addClass('hover');
            $(this).closest('.our-item').find('.our-item-title').addClass('hover');
            $(this).closest('.our-item').find('span').addClass('hover');
        },
        function () {
            $(this).closest('.our-item').find('.our-item-title h1').removeClass('hover');
            $(this).closest('.our-item').find('.our-item-title').removeClass('hover');
            $(this).closest('.our-item').find('span').removeClass('hover');
        })


    $('.close').click(function (event) {
        $(this).closest('form').parent().addClass('hide');
    })
    $('.message-form button').click(function (event) {

        var val = 0;
        var name = $(this).closest('form').find('input[name="name"]');
        var email = $(this).closest('form').find('input[name="email"]');
        var text = $(this).closest('form').find('textarea');
        var type = $(this).closest('form').find('.type').attr('data');
        if (EmptyField(email) && VerificationEmail(email, event)) {
            val = val + 1;
        }
        if (EmptyField(name)) {
            val = val + 1;
        }
        if (EmptyField(text)) {
            val = val + 1;
        }
        if (val == 3) {
            send(type);
        }
        return false;
    });
    $('.order_phone').click(function () {
        if ($('#order_phone').hasClass('hide')) {
            $('#order_phone').removeClass('hide');
        } else {
            $('#order_phone').addClass('hide');
        }
    })
    $('.dignity-contacts button').click(function (event) {

    });
    $('.message-form textarea').focus(function () {
        $(this).removeClass('verefy_error');
    });
    $('.message-form input').focus(function () {
        $(this).removeClass('verefy_error');
    });
    $('.filter-button').on('click', function () {
        formData = $('.filter form').serialize();
    })
    $('select.car_id').on('change', function () {
        var selected = $(this).find('option:selected').attr('value');

        THIS = $(this);
        if (selected != 0) {
            $.ajax({
                url: "/index_ajax.php",
                data: 'processor=filter&c=' + selected,
                type: "POST",
                error: function () {
                    alert('Ошибка AJAX! Пожалуйста, свяжитесь с администрацией ресурса.');
                },
                success: function (result) {
                    $('select.car_model').prop('disabled', false);
                    $('select.car_year').prop('disabled', false);
                    $('select.car_engine').prop('disabled', false);


                    //$('select.car_model').html(result);
                    $('select.car_model').trigger("liszt:updated");
                    $('select.car_year').trigger("liszt:updated");
                    $('select.car_engine').trigger("liszt:updated");
                    $('.select-block').html(result);
                    $('select').next().width('91%');
                    $('.chzn-drop').width('100%');
                    $('.chzn-search input').width('91%');
                }
            });
        }
    });
    $('select.car_producer').on('change', function () {
        var selected = $(this).find('option:selected').attr('value');

        THIS = $(this);
        if (selected != 0) {
            $.ajax({
                url: "/index_ajax.php",
                data: 'processor=filter&p=' + selected,
                type: "POST",
                error: function () {
                    alert('Ошибка AJAX! Пожалуйста, свяжитесь с администрацией ресурса.');
                },
                success: function (result) {
                    $('select.car_type').prop('disabled', false);
                    //$('select.car_model').html(result);
                    $('select.car_type').trigger("liszt:updated");
                    $('div.car_type').html(result);
                    $('select').next().width('91%');
                    $('.chzn-drop').width('100%');
                    $('.chzn-search input').width('91%');

                }
            });
        }
    });
    $('a[href^="#"]').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top}, 300);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 150) {
            $('.button-top').fadeIn();
        } else {
            $('.button-top').fadeOut();
        }
    });
    $('.button-top').click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });


});


function number() {
    var i = 1;
    $(".number").each(function (indx, element) {
        $(element).html(i);
        i++;
    });
}

function VerificationEmail(el, event) {

    var tmpEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$\.?$/i;
    var result = tmpEmail.test($(el).val())
    if (!result) {
        $(el).removeClass('verefy');
        $(el).addClass('verefy_error');
        return false;
    } else {
        $(el).addClass('verefy');
        $(el).removeClass('verefy_error');
        return true;
    }
}

function EmptyField(el) {
    if ($(el).val() == '') {
        $(el).removeClass('verefy');
        $(el).addClass('verefy_error');
        return false;
    } else {
        $(el).addClass('verefy');
        $(el).removeClass('verefy_error');
        return true;
    }
}

function send(type) {
    formData = $('form').serialize();
    $.ajax({
        url: "/index_ajax.php",
        data: "processor=send&" + formData + "&type=" + type,
        type: "POST",
        error: function () {
            alert('Ошибка AJAX! Пожалуйста, свяжитесь с администрацией ресурса.');
        },
        success: function (result) {
            $('form.feetback').remove();
            if (type == 'phone') {
                $('#order_phone').addClass('hide');
            }
            if (type == 'rew') {
                setCookie('s__r', '1', {expires: 5700, path: "/"});
                $('.message-form').html('<p>Спасибо! Ваш отзыв отправлен на модерацию. Нам очень важно Ваше мнение.</p>');
            } else {
                setCookie('s__m', '1', {expires: 600, path: "/"});
                $('.message-form').html('<p>Спасибо! Ваше письмо отправлено. Ближайшее время с Вами свяжутся представители нашей компании.</p>');
            }
        }
    });
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

// $('a.gallery-img').nivoLightbox({
//     effect: 'fadeScale',
//     theme: 'default',
//     keyboardNav: true,
//     clickOverlayToClose: true,
//     onInit: function () {},
//     beforeShowLightbox: function () {},
//     afterShowLightbox: function (lightbox) {},
//     beforeHideLightbox: function () {},
//     afterHideLightbox: function () {},
//     onPrev: function (element) {},
//     onNext: function (element) {},
//     errorMessage: 'При загрузке возникли ошибки. Попробуйте еще раз'
// });
// $('a.gallery-item').nivoLightbox({
//     effect: 'fadeScale',
//     theme: 'default',
//     keyboardNav: true,
//     clickOverlayToClose: true,
//     onInit: function () {},
//     beforeShowLightbox: function () {},
//     afterShowLightbox: function (lightbox) {},
//     beforeHideLightbox: function () {},
//     afterHideLightbox: function () {},
//     onPrev: function (element) {},
//     onNext: function (element) {},
//     errorMessage: 'При загрузке возникли ошибки. Попробуйте еще раз'
// });

$('.scrollableArea').css({'width': '4400px !important'});
$('.scrollWrapper').hover(function () {

    var width_bloack = $('.scrollableArea').width();
    if (!width_bloack) {
        $('.scrollableArea').css({'background': 'none'});
        $('.scrollableArea').css({'width': '4400px'});
        $(".slider-wrapper").smoothDivScroll({
            mousewheelScrolling: "allDirections",
            manualContinuousScrolling: true,
            autoScrollingMode: "onStart"
        });
        $('.scrollableArea').css({'width': '4400px'});
    }

})

function toggleText() {
    var points =
        document.getElementById("points");
    var showMoreText =
        document.getElementById("moreText");
    var buttonText =
        document.getElementById("textButton");
    if (points.style.display === "none") {
        showMoreText.style.display = "none";
        points.style.display = "inline";
        buttonText.innerHTML = "Читать далее";
    } else {
        showMoreText.style.display = "inline";
        points.style.display = "none";
        buttonText.innerHTML = "Убрать";
    }
}

window.onload = function () {
    let box = document.getElementsByClassName('gallery');
    let btn = document.getElementById('imageButton');
    for (let i = 1; i < box.length; i++) {
        box[i].style.display = "none";
    }

    let countD = 1;
    btn.addEventListener("click", function () {
        countD += 1;
        if (countD <= box.length) {
            for (let i = 0; i < countD; i++) {
                box[i].style.display = "flex";
            }
        } else if (countD >= box.length) {
            for (let i = 0; i <= countD; i++) {
                btn.innerHTML = "Скрыть"
                box[i + 1].style.display = "none";
            }

        }

    })
}

// if(document.querySelector("[data-player='banner']")){
// }
// let player = document.querySelector("[data-player='banner']")
// if(player){
//     document.querySelector("[data-player='play']").addEventListener('click', (e)=>{
//         if(player.paused){
//             player.play();
//             e.target.classList.add('pause')
//             e.target.closest('.banner-video').classList.add('banner-video--pause')
//         }else {
//             player.pause();
//             if(e.target.classList.contains('pause')){
//                 e.target.classList.remove('pause')
//                 e.target.closest('banner-video').classList.remove('banner-video--pause')
//             }
//
//         }
//     })
// }


let player1 = document.querySelector("[data-player='banner-1']")
if (player1) {
    document.querySelector("[data-player='play-1']").addEventListener('click', (e) => {
        if (player1.paused) {
            player1.play();
            e.target.classList.add('pause')
            e.target.closest('.banner-video').classList.add('banner-1-video--pause')
        } else {
            player1.pause();
            if (e.target.classList.contains('pause')) {
                e.target.classList.remove('pause')
                e.target.closest('banner-video').classList.remove('banner-1-video--pause')
            }

        }
    })
}