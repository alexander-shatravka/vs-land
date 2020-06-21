$(document).ready(function() {
  // initIntroSlider();
  initFormCustomFocus();
  initAnchorsScroll();
  initServicesSlider();
  initPartnersSlider();
  initTabs();
  initFixedHeader();
  initMobileMenu();
  initFormValidation();
  initRemoveErr();
  initTelegramForms();
});

function initIntroSlider() {
  var slickElement = $('.intro-slider');

  slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var statusCurrent = $('.slider-progress .current');
    var statusLast = $('.slider-progress .last');
    var i = (currentSlide ? currentSlide : 0) + 1;
    statusCurrent.text(''+i);
    statusLast.text(''+slick.slideCount);
  })

  slickElement.slick({
    infinite: true,
    dots: false,
    prevArrow: $('.intro-slider-prev'),
    nextArrow: $('.intro-slider-next')
  })
}
jQuery(window).on('load', function() {
  var viewportWidth = jQuery(window).width();

  if (viewportWidth < 768) {
    $('.intro-slider').slick('unslick');
  } else {
    return false
  }
});

function initFixedHeader() {
  var fixedItem = jQuery("header"),
    win = jQuery(window);
  win.on('load resize scroll', function (e) {
    var winTop = win.scrollTop();
    if ($(window).width() > 0) {
      if (winTop && winTop > 50) {
        fixedItem.addClass("fixed");
      } else {
        fixedItem.removeClass("fixed");
      }
      pointRemember = winTop;
    }
    // else fixedItem.addClass("slideUp");
  });
}

function initMobileMenu() {
  $('.burger-btn').on('click', function () {
    $(this).toggleClass('active');
    $('.main-nav').toggleClass('mobile-show');
    $('.header').toggleClass('mobile-menu-enable');
  })
}

function initFormCustomFocus() {
  $('.custom-input').on('blur', function () {
    $('.input-wrapper').removeClass('focused');
    if ($(this).val()) {
      $(this).parents('.input-wrapper').find('.placeholder').addClass('hide');
    } else {
      $(this).parents('.input-wrapper').find('.placeholder').removeClass('hide');
    }
  });
  $('.custom-input').on('focus', function () {
    $(this).parents('.input-wrapper').addClass('focused');
  })
}

function initAnchorsScroll() {
  $(document).on('click', 'a.anchor-link[href^="#"]', function (event) {
    event.preventDefault();
    
    $('.burger-btn').removeClass('active');
    $('.main-nav').removeClass('mobile-show');
    $('.header').removeClass('mobile-menu-enable');

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });
}

function initServicesSlider() {
  $('.services-slider').slick({
    dots: false,
    nextArrow: $('.services-arrows .slider-next'),
    prevArrow: $('.services-arrows .slider-prev'),
  })
}

function initTabs() {
  $('.row-tab-links').on('click', 'a', function (e) {
    e.preventDefault();
    $('.row-tab-links>a').removeClass('active');
    $(this).addClass('active');
    $('.tabs-content .tab').removeClass('show');
    $('.tabs-content .tab').eq($(this).index()).addClass('show');
  })
}

function initPartnersSlider() {
  var slickElement = $('.partners-slider');

  slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var statusCurrent = $('.partners-slider-progress .current');
    var statusLast = $('.partners-slider-progress .last');
    var i = (currentSlide ? currentSlide : 0) + 1;
    statusCurrent.text(''+i);
    statusLast.text(''+slick.slideCount);
  })

  slickElement.slick({
    infinite: true,
    dots: false,
    prevArrow: $('.partners-slider-prev'),
    nextArrow: $('.partners-slider-next'),
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
    ],
  })
}

function initTelegramForms() {
  jQuery('.form-submit').on('click', function(e) {
    var form = $(this).parents('form');
    e.preventDefault();
    initFormValidation();
    var errors = form.find('.has-error');
    if (errors.length) {
      return false;
    }
    var form_data = form.serialize();
    jQuery.ajax({ //telegram to admins
      type: "POST",
      url: "telegram.php",
      data: form_data,
      success: function() {
        // jQuery('.thank-massage').addClass('done');
        location = '/thank-you.html';
        // setTimeout(function() { jQuery('.thank-massage').removeClass('done'); }, 3000);
      },
    });
    return false;
  })
}

function initFormValidation() {
  jQuery('.form-submit').on('click', function(e) {
    e.preventDefault();
    var name = jQuery(this).parents('form').find('input[name="name"]');
    var tel = jQuery(this).parents('form').find('input[name="phone"]');
    // var email = jQuery(this).parents('form').find('input[name=email]');

    if (!name.val()) {
      name.addClass('has-error');
    } else name.removeClass('has-error');

    if (!tel.val()) {
      tel.addClass('has-error');
    } else tel.removeClass('has-error');

    // if (email.val()=='') {
    //     email.addClass('error');
    // } else email.removeClass('error');
  });
}

function initRemoveErr(){
  jQuery('input[name=name],input[name=email],input[name=phone]').on('focusout change', function(){
    var name = jQuery(this).parents('form').find('input[name=name]');
    var tel = jQuery(this).parents('form').find('input[name=phone]');
    // var email = jQuery(this).parents('form').find('input[name=email]');

    if (name.val()=='') {
      name.addClass('has-error');
    } else name.removeClass('has-error');

    if (tel.val()=='') {
      tel.addClass('has-error');
    } else tel.removeClass('has-error');

    // if (email.val()=='') {
    //   email.addClass('has-error');
    // } else email.removeClass('has-error');
  });
}