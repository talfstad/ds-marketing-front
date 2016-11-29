$(document).ready(function() {


  $("#feature-signup").focus();


  $(".signup-button").click(function() {
    var email = $(this).siblings().children().val();

    var validateEmail = function(email) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(email);
    }

    if (validateEmail(email)) {
      $(".signup-input").removeClass("hasError");

      if ($(".confirmed").css("display") === "none") {

        $.fancybox.open([{
          href: '#signup-success-modal'
        }]);

        $(".sent-email-notice span").text(email);

        $.post("api/signup",{email: email}, function(data) {
          $(".loading").hide();
          $(".confirmed").show();
          $(".fancybox-close").show();
          $.fancybox.update();
        });

      } else {

        $.fancybox.open([{
          href: '#signup-success-modal'
        }]);
      
      }



    } else {
      $(".signup-input").addClass("hasError");
    }

  });


  //scroll
  $(function() {
    $('.scroll-link a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  //animated navigation
  function init() {
    window.addEventListener('scroll', function(e) {
      var distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 50,
        header = document.querySelector("header");
      if (distanceY > shrinkOn) {
        classie.add(header, "smaller");
      } else {
        if (classie.has(header, "smaller")) {
          classie.remove(header, "smaller");
        }
      }
    });
  }
  window.onload = init();


  //flex slider
  $(window).load(function() {
    // $('.flexslider').flexslider({

    // });
  });

  //masonry
  /*-------------------------------------------------*/
  /* =  portfolio isotope
   /*-------------------------------------------------*/

  var winDow = $(window);
  // Needed variables
  var $container = $('.iso-call');
  var $filter = $('.filter');

  try {
    $container.imagesLoaded(function() {
      $container.trigger('resize');
      $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
          duration: 750,
          easing: 'linear'
        }
      });

      $('.triggerAnimation').waypoint(function() {
        var animation = $(this).attr('data-animate');
        $(this).css('opacity', '');
        $(this).addClass("animated " + animation);

      }, {
        offset: '75%',
        triggerOnce: true
      });
      setTimeout(1500);
    });
  } catch (err) {}

  winDow.bind('resize', function() {
    var selector = $filter.find('a.active').attr('data-filter');

    try {
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
    } catch (err) {}
    return false;
  });

  // Isotope Filter 
  $filter.find('a').click(function() {
    var selector = $(this).attr('data-filter');

    try {
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
    } catch (err) {

    }
    return false;
  });


  var filterItemA = $('.filter li a');

  filterItemA.on('click', function() {
    var $this = $(this);
    if (!$this.hasClass('active')) {
      filterItemA.removeClass('active');
      $this.addClass('active');
    }
  });
});

new WOW().init();
