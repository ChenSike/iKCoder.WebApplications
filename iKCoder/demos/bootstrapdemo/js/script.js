(function($) {
	
	'use strict';
	
	var BestApp = {
		
		// Initialization the functions
		init: function() {
			BestApp.AffixMenu();
			BestApp.MobileMenu();
			BestApp.ScrollSpy();
			BestApp.SmoothScroll();
			BestApp.FitVids();
			BestApp.PlaceHolder();
			BestApp.Carousel();
			BestApp.Lightbox();
			BestApp.CounterUp();
			BestApp.Parallax();
			BestApp.Hover();
			BestApp.Form();
			BestApp.Scrollup();
			BestApp.Customizer();
			
			$(window).on('load', function() {
				BestApp.Preload();
				BestApp.Animated();
			});
		},
		
		// Navigation menu affix
		AffixMenu: function() {
			$('body').waypoint(function() {
				$('#navigation').removeClass('affix');
			}, {
				offset: -49
			});
			
			$('body').waypoint(function() {
				$('#navigation').addClass('affix');
			}, {
				offset: -50
			});
		},
		
		// Add mobile navigation
		MobileMenu: function() {
			var navMenu	= '<nav id="navigation_mobile">';
			navMenu		+= '<div class="nav-menu-links">';
			navMenu		+= '<ul>';
			navMenu		+= $('#navigation .nav').html();
			navMenu		+= '</ul>';
			navMenu		+= '</div>';
			navMenu		+= '<div class="nav-menu-button">';
			navMenu		+= '<button class="nav-menu-toggle"><i class="ion ion-navicon"></i></button>';
			navMenu		+= '</div>';
			navMenu		+= '</nav>';
			
			$('#header').before(navMenu);
			
			$('.nav-menu-toggle').on('click', function() {
				$(this).parent('.nav-menu-button').prev('.nav-menu-links').slideToggle(300, function() {
					$(window).trigger('resize.px.parallax');
				});
			});
		},
		
		// Navigation menu scrollspy to anchor section
		ScrollSpy: function() {
			setTimeout(function() {
				$('body').scrollspy({
					target: '#navigation.scrollspy',
					offset: 71
				});
			}, 100);
		},
		
		// Smooth scrolling to anchor section
		SmoothScroll: function() {
			$('a.smooth-scroll').on('click', function(event) {
				var $anchor		= $(this);
				var offsetTop	= '';
				
				if (window.Response.band(768)) {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - 70, 0);
				} else {
					offsetTop = parseInt($($anchor.attr('href')).offset().top, 0);
				}
				
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 1500,'easeInOutExpo');
				
				event.preventDefault();
			});
		},
		
		// Responsive video size
		FitVids: function() {
			$('body').fitVids();
		},
		
		// Placeholder compatibility for IE8
		PlaceHolder: function() {
			$('input, textarea').placeholder();
		},
		
		// Slider with Slick carousel
		Carousel: function() {
			// Header slider
			$('#header .carousel-slider').slick({
				arrows: false,
				dots: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
				draggable: false,
				responsive: [{
					breakpoint: 768,
					settings: {
						draggable: true
					}
				}]
			});
			
			// Testimonials carousel
			$('.affa-testimonials-carousel .carousel-slider').slick({
				speed: 200,
				autoplay: true,
				autoplaySpeed: 5000,
				infinite: true,
				draggable: false,
				responsive: [{
					breakpoint: 768,
					settings: {
						arrows: false,
						dots: true,
						draggable: true
					}
				}]
			});
			
			// Gallery slider
			$('.carousel-slider.gallery-slider').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				draggable: false,
				centerMode: true,
				centerPadding: 0,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							dots: true,
							slidesToShow: 2,
							draggable: true,
							centerMode: false
						}
					},
					{
						breakpoint: 400,
						settings: {
							arrows: false,
							dots: true,
							speed: 300,
							slidesToShow: 1,
							slidesToScroll: 1,
							draggable: true,
							centerMode: false
						}
					}
				]
			});
			
			// General slider
			$('.carousel-slider.general-slider').each(function() {
				$(this).slick({
					dots: true,
					speed: 300,
					adaptiveHeight: true,
					draggable: false,
					responsive: [{
						breakpoint: 768,
						settings: {
							draggable: true
						}
					}]
				});
			}).on('afterChange', function() {
				$(window).trigger('resize.px.parallax');
			});
		},
		
		// Preview images popup gallery with Fancybox
		Lightbox: function() {
			$('.fancybox').fancybox({
				loop: false
			});
			
			$('.fancybox-media').attr('rel', 'media-gallery').fancybox({
				openEffect: 'none',
				closeEffect: 'none',
				prevEffect: 'none',
				nextEffect: 'none',
				arrows: false,
				helpers: {
					title: null,
					media: {},
					buttons : {}
				}
			});
		},
		
		// Number counter ticker animation
		CounterUp: function() {
			$('.affa-counter-txt > h4 > span').counterUp({
				delay: 10,
				time: 3000
			});
		},
		
		// Background with parallax effect
		Parallax: function() {
			$(window).resize(function() {
				setTimeout(function() {
					$(window).trigger('resize.px.parallax');
				}, 100);
			});
		},
		
		// Elements hover effect
		Hover: function() {
			$('.affa-tbl-pricing .tbl-prc-wrap').on('hover', function() {
				if (!$(this).parents('.tbl-prc-col').hasClass('current')) {
					$(this).parents('.affa-tbl-pricing').find('.tbl-prc-col').removeClass('current');
					$(this).parents('.tbl-prc-col').addClass('current');
				}
			});
		},
		
		// Form submit function
		Form: function() {
			var pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
			
			// Checking form input when focus and keypress event
			$('.affa-form-contact input[type="text"], .affa-form-contact input[type="email"], .affa-form-contact textarea').on('focus keypress', function() {
				var $input = $(this);
				
				if ($input.hasClass('error')) {
					$input.removeClass('error');
				}
			});
			
			// Contact form when submit button clicked
			$('.affa-form-contact').on('submit', function() {
				var $form		= $(this);
				var submitData	= $form.serialize();
				var $name		= $form.find('input[name="name"]');
				var $email		= $form.find('input[name="email"]');
				var $message	= $form.find('textarea[name="message"]');
				var $send_copy	= $form.find('input[name="send_copy"]');
				var $submit		= $form.find('input[name="submit"]');
				var status		= true;
				
				if ($email.val() === '' || pattern.test($email.val()) === false) {
					$email.addClass('error');
					status = false;
				}
				if ($message.val() === '') {
					$message.addClass('error');
					status = false;
				}
				
				if (status) {
					$name.attr('disabled', 'disabled');
					$email.attr('disabled', 'disabled');
					$message.attr('disabled', 'disabled');
					$send_copy.attr('disabled', 'disabled');
					$submit.attr('disabled', 'disabled');
					
					$.ajax({
						type: 'POST',
						url: 'process-contact.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								if (msg_split[0] === 'success') {
									$name.val('').removeAttr('disabled');
									$email.val('').removeAttr('disabled').removeClass('error');
									$message.val('').removeAttr('disabled').removeClass('error');
									$send_copy.prop('checked', false).removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<div class="submit-status-txt"><span class="success"><i class="ion ion-ios-checkmark-outline"></i> ' + msg_split[1] + '</span></div>').fadeIn(300).delay(3000).fadeOut(300);
								} else {
									$name.removeAttr('disabled');
									$email.removeAttr('disabled').removeClass('error');
									$message.removeAttr('disabled').removeClass('error');
									$send_copy.removeAttr('disabled');
									$submit.removeAttr('disabled');
									$form.find('.submit-status').html('<div class="submit-status-txt"><span class="error"><i class="ion ion-ios-close-outline"></i> ' + msg_split[1] + '</span></div>').fadeIn(300).delay(3000).fadeOut(300);
								}
							}
						}
					});
				}
				
				status = true;
				
				return false;
			});
		},
		
		// Back to top button function
		Scrollup: function() {
			$('.scrollup').on('click', function() {
				$('html, body').stop().animate({
					scrollTop: 0
				}, 2000, 'easeInOutExpo');
				
				return false;
			});
		},
		
		// Preload function after images loaded
		Preload: function() {
			$('img.parallax-slider').imgpreload({
				all: function() {
					$('img.parallax-slider').addClass('loaded');
				}
			});
			
			$('.bg-img-base, #header .header-bg').addClass('in');
		},
		
		// Embed animation effects to HTML elements with CSS3
		Animated: function() {
			$('.animation, .animation-visible').each(function() {
				var $element = $(this);
				$element.waypoint(function() {
					var delay = 0;
					if ($element.data('delay')) delay = parseInt($element.data('delay'), 0);
					if (!$element.hasClass('animated')) {
						setTimeout(function() {
							$element.addClass('animated ' + $element.data('animation'));
						}, delay);
					}
					delay = 0;
				}, {
					offset: '85%'
				});
			});
		},
		
		// Customizer to change the template layouts
		Customizer: function() {
			$('#customize .popup-open').on('click', function() {
				var $parent = $(this).parents('#customize');
				if ($parent.hasClass('in')) {
					$parent.removeClass('in');
				} else {
					$parent.addClass('in');
				}
			});
			
			$('#customize .customize-list-color a').on('click', function(e) {
				var $color = $(this).attr('class');
				$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/' + $color + '/color.css">');
				e.preventDefault();
			});
		}
		
	};
	
	// Run the main function
	$(function() {
		BestApp.init();
	});
	
})(window.jQuery);
