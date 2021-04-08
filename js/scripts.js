$(document).ready(function(){

    // $('.carousel__inner').slick({
    //     speed: 1200,
    //     adaptiveHeight: true,
    //     prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
    //     nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 dots: true,
    //                 arrows: false
    //             }
    //         }
    //     ]
    // });


    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    }); 


    function tuggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__lists').eq(i).toggleClass('catalog-item__lists_active');
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            })
        })
    }

    tuggleSlide('.catalog-item__link');
    tuggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');

    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) { 
        // let str = $('.catalog-item__subtitle').eq(i).text();
        // $(this).on('click', function() {
        //     $('#order .modal__descr').text(str);
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

   
    function validateForm (form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите свой контактный номет телефона",
                email: {
                    required: "Пожалуйста, введите свой email",
                    email: "email введен не правильно"
                }
            }
        });
    };

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');


    $('input[name=phone]').mask("+38 (999) 999-99-99");


    $('form').submit(function(e) {
        e.preventDefault();                 // Отмена стандартного поведеня браузера
        $.ajax({                            // Отправка сообщения на сервер
            type: "POST",                   // Отправить данные на сервер
            url: "mailer/smart.php",        // Адрес обработчика сообщения
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");  //нейти и очистить все INPUT
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');     // Очистить все формы на сайте
        });    
        return false;                   
    });


    // Smuuth scroll and pageup    скачек вверх по нажатию иконки-стрелочки

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn();
        } else {
            $(".pageup").fadeOut();
        }
    });

    $("a[href=#up]").click(function(){ 
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });


    // WOW + animate.css
    
    new WOW().init();




});
 