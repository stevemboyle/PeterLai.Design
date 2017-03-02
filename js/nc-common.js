/**
*****************************************************************
* PROJECT : NC-Grip Multiuse Coming-Soon Page
* AUTHOR : NCodeArt
*****************************************************************
*/

/**
*****************************************************************
* This file is licensed to NCodeArt. 
* it's not allowed to copy or reuse it Copyright NCodeArt 2015-2016
*****************************************************************
*/

var nc = {};
var package_ver = 'v0.3';

/*----------  VALIDATION  ----------*/
nc.elcheck = function(el) {
	'use strict';
	if ($(el).length > 0) {
		return true;
	} else {
		return false;
	};
}

/*----------  MEDIAQUARY  ----------*/
$.mediaquery({
	minWidth     : [ 200, 480, 600, 768, 992, 1200 ],
	maxWidth     : [ 1199, 991, 767, 599, 479 ],
	minHeight    : [ 400, 800 ],
	maxHeight    : [ 800, 400 ]
});
if ($.mediaquery("state").minWidth === 200) {
	nc.device = 'm';
}else{
	nc.device = 'd';
}

nc.getMultiScripts = function(arr, path) {
	var _arr = $.map(arr, function(scr) {
		return $.getScript( (path||"") + scr );
	});

	_arr.push($.Deferred(function( deferred ){
		$( deferred.resolve );
	}));

	return $.when.apply($, _arr);
}

nc.setId = function(obj, prefix, n) {
	'use strict';

	n++;
	var a = prefix+n;
	$(obj).css({opacity:0});
	$(obj).attr("id", a);
	$(obj).addClass(a);

	// Accordion setup
	if ($(obj).is(".accordion-widget")) {
		$(obj).find(".acc-block").each(function(index, el) {
			var id = a+"-acc-block-"+index;
			$(this).find(".acc-hd").attr("data-accid", "#"+id);
			$(this).find(".acc-content").attr("id", id);
			$(this).find(".acc-hd").append('<i class="acc-open '+$(obj).attr("data-acc-openclass")+' "></i><i class="acc-close '+$(obj).attr("data-acc-closeclass")+'"></i>');
		});
	}
}

/*----------  EQUAL HEIGHT  ----------*/
nc.eqh = function(parentObj, childObj, a) {
	'use strict';
	if (nc.elcheck(parentObj)) {
		$(parentObj).each(function(index, el) {
			if (a == "destroy") {
				$(this).equalize("destroy");
			} else {
				if (nc.elcheck(childObj)) {
					$(this).equalize({
						target: $(childObj)
					});
				}
			};	
		});
	};
}

/*----------  GETVAR  ----------*/
nc.getvar = function (v, default_v, val_type) {
	'use strict';
	if (val_type == 'n') {
		return v ? parseInt(v,10) : default_v;
	} 
	if (val_type == 'b') {
		if (v == 'true') { return true; }
		else if (v == 'false') { return false; }
		else { return default_v; }
	}
	if (val_type == 's') {
		if (v == 'false') {
			return false;
		} else {
			return v ? v : default_v;
		};
		
	}
}

/*----------  OWLCAROUSEL  ----------*/
nc.owlitems = function (arr) {
	'use strict';
	if (typeof(arr) == "string" && arr != 'false') {
		var t1 = arr.split('|');
		var t2 = {};
		$.each(t1, function(index, val) {
			var str = val;
			var newarr = str.split(',');
			t2[newarr[0]] = {}
			t2[newarr[0]] = {items: parseInt(newarr[1],10)};
		});
		return t2;
	}else if(arr === 'false'){
		return {};
	}else{
		return false;
	}
}

nc.slider = function (owlObj) {
	
	'use strict';

	var resObj = {
		0    : { items:1 },
		420  : { items:2 },
		600  : { items:3 },
		768  : { items:3 },
		980  : { items:4 }
	}

	var owlEle = $(owlObj + ' .owl-carousel');

	var config = {
		center             : nc.getvar($(owlObj).attr('data-center'), false, 'b'),
		stagePadding       : nc.getvar($(owlObj).attr('data-stpd'), 0, 'n'),
		items              : nc.getvar($(owlObj).attr('data-items'), 5, 'n'),
		margin             : nc.getvar($(owlObj).attr('data-margin'), 0, 'n'),
		nav                : nc.getvar($(owlObj).attr('data-nav'), false, 'b'),
		dots               : nc.getvar($(owlObj).attr('data-pager'), false, 'b'),
		slideby            : nc.getvar($(owlObj).attr('data-slideby'), 1, 'n'),
		rbase              : nc.getvar($(owlObj).attr('data-rbase'), $(owlObj).parent(), 's'),
		res                : $(owlObj).attr('data-itemrange') ? nc.owlitems($(owlObj).attr('data-itemrange')) : resObj,
		animOut            : nc.getvar($(owlObj).attr('data-out'), 'fadeOut', 's'),
		animIn             : nc.getvar($(owlObj).attr('data-in'), 'fadeIn', 's'),
		autoplay           : nc.getvar($(owlObj).attr('data-autoplay'), false, 'b'),
		autoplayTimeout    : nc.getvar($(owlObj).attr('data-timeout'), 3000, 'n'),
		autoplayHoverPause : nc.getvar($(owlObj).attr('data-hstop'), true, 'b'),
		loop               : nc.getvar($(owlObj).attr('data-loop'), false, 'b'),
		autoWidth          : nc.getvar($(owlObj).attr('data-awidth'), false, 'b'),
		autoHeight         : nc.getvar($(owlObj).attr('data-hauto'), true, 'b'),
		touchDrag          : nc.getvar($(owlObj).attr('data-tdrag'), true, 'b'),
		mouseDrag          : nc.getvar($(owlObj).attr('data-mdrag'), true, 'b'),
		pullDrag           : nc.getvar($(owlObj).attr('data-pdrag'), true, 'b'),
		contentHeight      : nc.getvar($(owlObj).attr('data-h'), true, 'b')
	}
	$(owlObj).animate({opacity:1}, 300, function(){

		 owlEle.owlCarousel({
			center                : config.center,
			stagePadding          : config.stagePadding,
			items                 : config.items,
			margin                : config.margin,
			nav                   : config.nav,
			dots                  : config.dots,
			slideBy               : config.slideby,
			navText               : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			responsiveBaseElement : config.rbase,
			responsive            : config.res,
			loop                  : $(owlObj+" .owl-carousel > .item").length > 1 ? config.loop : false,
			animateOut            : config.animOut, //'slideOutDown',
			animateIn             : config.animIn, //'flipInX',
			autoplay              : config.autoplay,
			autoplayTimeout       : config.autoplayTimeout,
			autoplayHoverPause    : config.autoplayHoverPause,
			autoHeight            : config.autoHeight,
			autoWidth             : config.autoWidth,
			touchDrag             : config.touchDrag,
			mouseDrag             : config.mouseDrag,
			pullDrag              : config.pullDrag,
			autoplaySpeed : 2000,

			onInitialized: function () {
				owlEle.animate({opacity: 1}, 300);
				if (owlEle.find('.feedback-box1').length > 0) {
					config.contentHeight ? nc.eqh(owlEle, ".feedback-box1", "") : false;
				}
				if (owlEle.find('.feedback-box3').length > 0) {
					config.contentHeight ? nc.eqh(owlEle, ".feedback-box3 .feedback", "") : false;
				}
				if (owlEle.find('.feedback-box4').length > 0) {
					config.contentHeight ? nc.eqh(owlEle, ".feedback-box4 .feedback", "") : false;
				}

				// Align arrows
				owlEle.find('.owl-nav').css({
					top: owlEle.find('.owl-stage-outer').outerHeight()/2
				})
			}
		});

		$(owlObj).find('.carousel-btn .prev').on('click', function() { owlEle.trigger('prev.owl.carousel'); });
		$(owlObj).find('.carousel-btn .next').on('click', function() { owlEle.trigger('next.owl.carousel'); });

	});
}

/*----------  COUNTDOWN-CLOCK  ----------*/
nc.countdown = function (obj) {
	'use strict';

	var config = {
		day   : parseInt($(obj).attr("data-day"),10),
		month : parseInt($(obj).attr("data-month"),10),
		year  : parseInt($(obj).attr("data-year"),10),
		hour  : parseInt($(obj).attr("data-hr"),10),
		min   : parseInt($(obj).attr("data-min"),10),
		sec   : parseInt($(obj).attr("data-sec"),10)
	}
	
	var oneDay     = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var firstDate  = new Date(config.year, config.month-1, config.day-1);
	var d          = new Date();
	var secondDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	var diffDays   = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	
	var countdownHtml  = '<div class="inner-dashboard">';
		countdownHtml += '	<!-- DAYS -->';
		countdownHtml += '	<div class="dash days_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += diffDays > 99 ? '<div class="digit">0</div>' : '';
		//countdownHtml += '<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">dd</span>';
		countdownHtml += '	</div>';
		countdownHtml += '	<!-- HOURS -->';
		countdownHtml += '	<div class="dash hours_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">hr</span>';
		countdownHtml += '	</div>';
		countdownHtml += '	<!-- MINIUTES -->';
		countdownHtml += '	<div class="dash minutes_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">min</span>';
		countdownHtml += '	</div>';
		countdownHtml += '	<!-- SECONDS -->';
		countdownHtml += '	<div class="dash seconds_dash">';
		countdownHtml += '		<div class="inner-dash">';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '			<div class="digit">0</div>';
		countdownHtml += '		</div>';
		countdownHtml += '		<span class="dash_title">sec</span>';
		countdownHtml += '	</div>';
		countdownHtml += '</div>';

	$(obj).html(countdownHtml);

	// DESKTOP CLOCK
	$(obj).countDown({
		targetDate: {
			'day': 		config.day,
			'month': 	config.month,
			'year': 	config.year,
			'hour': 	config.hour,
			'min': 		config.min,
			'sec': 		config.sec
		},
		omitWeeks: true
	});
}

/*----------  BACKGROUND SLIDER  ----------*/
nc.bgSlider = function (setting) {
	'use strict';
	setTimeout(function () {
		$(setting.obj).vegas({
			delay: setting.delay,
			slides: setting.slides,
			timer: false,
			animation: setting.effect
		});	
	}, 1000);
}

/*----------  ANIMATION OUT  ----------*/
nc.animationOut = function(obj) {
	$(obj+" .animated").each(function() {
		$(this).removeClass($(this).attr("data-animOut"));
		$(this).removeClass($(this).attr("data-animIn"));
		$(this).addClass($(this).attr("data-animOut"));
	});
}

/*----------  ANIMATION IN  ----------*/
nc.animationIn = function(obj){
	$(obj+" .animated").each(function() {
		$(this).removeClass($(this).attr("data-animOut"));
		$(this).removeClass($(this).attr("data-animIn"));
		$(this).addClass($(this).attr("data-animIn"));
	});
}

/*----------  FORM  ----------*/
nc.global_validation = {
	form: '',
	rules: { 
		email            : { required: true, email: true },
		name             : { required: true },
		message          : { required: true },
		phone            : { required: true, number: true },
		date             : { required: true, date: true },
		people           : { required: true, number: true },
		datetime         : { required: true, date: true },

		pickup_location  : { required: true },
		pickup_datetime  : { required: true, date: true },
		dropoff_datetime : { required: true, date: true },
		dropoff_location : { required: true },
	},
	msgpos: 'normal',
	msg: {
		email: {email: "Please, enter a valid email"}
	},
	subscribe_successMsg : "You are in list. We will inform you as soon as we finish.",
	form_successMsg : "Thank you for contact us. We will contact you as soon as possible.",
	
	successMsg : "",
	errorMsg   : "Oops! Looks like something went wrong. Please try again later."
}

nc.formVaidate = function (obj) {
	'use strict';
	var msgpos = $(obj.form).attr('data-msgpos') ? $(obj.form).attr('data-msgpos') : 'normal';
	if (msgpos == 'append') {
		$(obj.form).validate({
			onfocusout: false,
			onkeyup: false,
			rules: obj.rules,
			messages: obj.msg,
			highlight: false,
			errorPlacement: function(error, element) {
				if (msgpos == 'append') {
					error.appendTo( element.closest("form").find('.msg-wrp'));
				};
			},
			success: function(element) {
				element.remove();
			}
		});
	} else {
		$(obj.form).validate({
			onfocusout: false,
			onkeyup: false,
			rules: obj.rules,
			messages: obj.msg,
			highlight: false,
			success: function(element) {
				element.remove();
			}
		});
	};
}

nc.resetForm = function (form) {
	'use strict';
	$(form).find('input[type="text"], input[type="email"], textarea').val(null);
}

nc.contactForm = function($form, formData, validate_data){
	'use strict';

	if ($form.find('label.error').length > 0) { $form.find('label.error').hide(); }
	
	var $btn = $form.find(".btn").button('loading');
	var timer = 50000;

	if ($form.valid()) {
		$.ajax({
			url: $form.attr('action'),
			type: 'POST',
			data: formData,
			success: function(data) {
				if (data.status == 'error') {
					// Email subscription error messages
					swal("Error!", data.type, "error");
					$btn.button('reset');
					nc.resetForm($form);
				} else {
					//swal("Success!", validate_data.successMsg, "success");
					swal({
						type: "success",
						title: "Success!",
						text: validate_data.successMsg,
						timer: timer
					}, function() {
						if ($form.attr('data-success-redirect') === 'y') {
							window.location = nc.config.success_url;
						}
					});
					
					$btn.button('reset');
					$.magnificPopup.close();
					nc.resetForm($form);
					
					setTimeout(function() { swal.close(); }, timer);
				};
			},
			error: function() {
				swal("Error!", validate_data.errorMsg, "error");
				$btn.button('reset');
				$.magnificPopup.close();
				setTimeout(function() { swal.close(); }, timer);
			}
		});
	} else {
		$form.find("label.error").delay(timer).fadeOut('400', function() {
			$(this).remove();
		});
		$btn.button('reset');
	};
}

nc.formWidget = function (obj) {
	'use strict';

	var config = {
		popup_selector : $(obj).attr('data-popup') ? '.'+$(obj).attr('data-popup') : false,
		form_type      : $(obj).attr('data-formtype') ? $(obj).attr('data-formtype') : 'normal',
		form_selector  : obj
	}

	var $form = $(config.form_selector);

	// Validation rules
	nc.global_validation.form = config.form_selector;
	var validate_data = nc.global_validation;

	// Pop up form
	if (config.popup_selector) {
		$(config.popup_selector).each(function(index, el) {
			$(this).magnificPopup({
				type: 'inline',
				preloader: false
			});
		});
	};

	// Date picker
	if ($form.find(".date-pick").length > 0) {
		$form.find(".date-pick").each(function(index, el) {
			$(this).datepicker({
				clearBtn: true,
				todayHighlight: true,
				autoclose: true
			});		
		});
	};

	// Date time picker
	if ($form.find(".datetime-pick").length > 0) {
		$form.find(".datetime-pick").each(function(index, el) {
			$(this).datetimepicker();
		});
	};

	// Form validation
	nc.formVaidate(validate_data);

	// Form
	$form.find('button').off('click').on('click', function(e) {
		console.log(config.form_type);
		e.preventDefault();
		if (config.form_type == "newsletter") {
			console.log("in");
			nc.global_validation.successMsg = nc.global_validation.subscribe_successMsg;
		} else {
			console.log("out");
			nc.global_validation.successMsg = nc.global_validation.form_successMsg;
		};

		nc.contactForm($form, $form.serializeObject(), validate_data);
		return false;
	});
}

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		
		// Field labels
		var field_label = $('[name='+this.name+']').attr('data-label') ? $('[name='+this.name+']').attr('data-label') : this.name;

		// Field values
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push({val: this.value, label: field_label} || '');
		} else {
			//o[this.name] = this.value || '';
			o[this.name] = {val: this.value, label: field_label} || '';
		}
	});
	return o;
};


/*----------  Y-VIDEO BACKGRUND  ----------*/
nc.videoBg = function (obj, imglist) {
	'use strict';
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	if( isMobile.any() ){
		$(obj).css("display","none");
		/*$(obj).vegas({
			slides: [
				{ src: "images/bg-1.jpg" },
				{ src: "images/bg-2.jpg" },
				{ src: "images/bg-3.jpg" },
				{ src: "images/bg-4.jpg" }
			]
			slides: imglist
		});*/
	}
	else{
		$(obj).css("display","block");
		$(obj).YTPlayer();
	}
}

/*----------  VIDEO BACKGRUND  ----------*/
nc.vide = function (obj) {
	'use strict';

	var videofile = $(obj).attr("data-vide-src");
	$(obj).animate({opacity:1}, 500, function(){});
	$(obj).vide({
			mp4: videofile,
			webm: videofile,
			ogv: videofile,
			poster: videofile+".jpg"
		}, {
			volume: 1,
			playbackRate: 1,
			muted: true,
			loop: true,
			autoplay: true,
			position: 'center center', // Similar to the CSS `background-position` property.
			posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
			resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
			bgColor: 'transparent', // Allow custom background-color for Vide div,
			className: '' // Add custom CSS class to Vide div
		});
}

/*----------  SCROLL  ----------*/
nc.scrollBar = function() {
	$(".scroll-bar").mCustomScrollbar({
	    axis:"y"
	});
}

nc.common = function() {

	/*----------  SET BACKGROUND-IMAGE  ----------*/
	if (nc.elcheck("[data-bgImage]")) {
		$("[data-bgImage]").each(function(index, el) {
			$(this).css({backgroundImage: "url("+$(this).attr("data-bgImage")+")"});
		});
	}

	/*----------  OWLCAROUSEL  ----------*/
	if (nc.elcheck(".carousel-widget")) {
		var carousel = 0;
		$('.carousel-widget').each(function(){

			// SET ID ON ALL OBJECTS
			carousel++;
			var owlObj = 'owl'+carousel;
			$(this).css({opacity:0});
			$(this).attr("id", owlObj);
			$(this).addClass(owlObj);
			nc.slider("#"+owlObj);
		});
	}

	/*----------  COUNTDOWN-CLOCK  ----------*/		
	if (nc.elcheck(".countdown-widget")) {
		var countdown = 0;
		$(".countdown-widget").each(function(index, el) {
			var obj = 'countdown'+countdown;
			$(this).children('div').attr("id", obj);
			nc.countdown("#"+obj);
			countdown++;
		});
	}

	/*----------  SUBSCRIBE  ----------*/
	if (nc.elcheck("#subscribe")) {
		var $subscribeForm = $('#subscribe');
		var subscribe_validate_data = {
			form: "#subscribe",
			rules: { email: { required: true, email: true } },
			msg: {
					email: {
						required: "Please enter email before submit.",
						email: "Please, enter a valid email"
					}
				},
			msgpos: 'append',
			successMsg: "<div class='msg-success'>Congrats! You are in list. We will inform you as soon as we finish.</div>",
			errorMsg: "<div class='msg-error>Oops! Looks like something went wrong. Please try again later.</div>"
		}
		nc.formVaidate(subscribe_validate_data);
		$('#subscribe').off('click').on('click', '#submit', function(e) {
			e.preventDefault();
			var formData = {
				email: $subscribeForm.find('input').val()
			}
			nc.contactForm($subscribeForm, formData, subscribe_validate_data);
			return false;
		});
	}
	
	/*----------  FORM  ----------*/
	if (nc.elcheck(".form-widget")) {
		$(".form-widget").each(function(index, el) {
			nc.formWidget(this);
		});
	};

	if (nc.elcheck(".popgallery-widget")) {
		var magnific = 0;
		$('.popgallery-widget').each(function(){

			magnific++;
			var obj = 'popgallery'+magnific;
			$(this).attr("id", obj);
			$(this).addClass(obj);

			$('#'+obj).magnificPopup({
				delegate: '.pop-img',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title');
					}
				}
			});
		});
	}
}

;(function(){
	'use strict';

	$(window).load(function(){

		/*----------  PAGE-LOADER  ----------*/
		if (nc.elcheck(".page-loader-wrapper")) {
			$(".page-loader-wrapper").fadeOut(800);	
		}

	});

	jQuery(document).ready(function($) {

		$('html').before('<!-- '+package_ver+' -->');

		/*----------  PAGE TRANSITION  ----------*/
		if (nc.elcheck(".nav-link")) {

			nc.animationIn("#page-wrapper");
			$("#main-wrapper").on("click", ".navigation-wrapper .nav-link", function(){

				var pageObj = {
					pageUrl: $(this).attr("data-page"),
					transitionWrapper: ".transition-wrapper",
					homeWrapper: "#page-wrapper .home.home-wrapper",
					ajaxPage: "#ajax-page",
					displayHidden: function (area) {
						$("#page-wrapper ."+area).addClass("hidden");
					},
					displayVisible: function (area) {
						$("#page-wrapper ."+area).removeClass("hidden");
					},
					pageLoad: function () {
						$.get(pageObj.pageUrl, function(data){
							$(pageObj.ajaxPage).html(" ");
							$(pageObj.ajaxPage).html(data);
							nc.common();
							nc.animationIn(pageObj.ajaxPage);
							if($(pageObj.ajaxPage).find('.clock').length == 0) {
								if (typeof e !== 'undefined') {
									e.doCountDown = function() {}; t='';	
								}; 
							}
						});
					},
					homeLoad: function() {
						$.get(pageObj.pageUrl, function(data){
							$(pageObj.ajaxPage).html(" ");
							var animIn = $(".animated").attr("data-animIn");
							var animOut = $(".animated").attr("data-animOut");
							$(pageObj.homeWrapper+" .animated").removeClass(animIn);
							$(pageObj.homeWrapper+" .animated").removeClass(animOut);
							$(pageObj.homeWrapper).removeClass("op-0");
							nc.animationIn("#page-wrapper");
							if($(pageObj.ajaxPage).find('.clock').length == 0) {
								if (typeof e !== 'undefined') {
									e.doCountDown = function() {}; t='';	
								}; 
							}
						});
					}
				}
				

				nc.animationOut("#page-wrapper");

				setTimeout(function(){
					$(pageObj.transitionWrapper).addClass('page-transition dark-bg').delay(600).queue(function(){
						pageObj.displayHidden("home");
						pageObj.displayVisible("pages");
				        $(this).removeClass("page-transition").clearQueue();
				        pageObj.pageLoad();
				    });
				}, 950);

				$(pageObj.ajaxPage).on("click", ".close-button", function(){
					nc.animationOut("#ajax-page");
					setTimeout(function(){
						$(pageObj.transitionWrapper).addClass('page-transition').delay(600).queue(function(){
							$(pageObj.homeWrapper).addClass("op-0");
							pageObj.displayHidden("pages");
					        $(this).removeClass("dark-bg page-transition").clearQueue();
					        pageObj.displayVisible("home");
					        pageObj.homeLoad();
					    });
					}, 950);
				});
				

			});
		}


		nc.common();

		/*----------  MOBILE NAVIGATION  ----------*/
		var navObj = {
			navClose: function() {
				$(".nav-handel").removeClass("active");
				$(".navigation-wrapper").fadeOut("800", function() {
					$(".navigation-wrapper").css("display","none").removeClass("nav-open");
				});
			}
		}

		if (nc.elcheck(".nav-handel")) {
			$(".nav-handel").on("click", function(){
				if ($(".nav-handel").hasClass("active")) {
					navObj.navClose();
				} else {
					$(".nav-handel").addClass("active");
					$(".navigation-wrapper").css("display","block").addClass("nav-open");
				}
			});

			$("body").on("click", ".nav-link", function(){
				if ($(".nav-handel").hasClass("active")) {
					navObj.navClose();
				}
			});
		}

		/*----------  POPUP  ----------*/
		if (nc.elcheck("[data-popup='y']")) {
			$("[data-popup='y']").each(function(index, el) {
				$(this).magnificPopup({
					type: 'inline',
					preloader: false,
					mainClass: 'animated fadeIn',
					removalDelay: 2000,
					callbacks: {
						beforeClose: function() {
						    $(".mfp-wrap").find(".popup-block").removeClass("fadeInUp").addClass("fadeOutUp");
						    $(".mfp-bg").addClass("fadeOut");
						},
						afterClose: function() {
						    $(".popup-block").removeClass("fadeOutUp").addClass("fadeInUp");
						}
					}
				});
			});
		}

		/*----------  BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-bgslider]")) {
			$("[data-bgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-bgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				var bgslideSetting = {
					obj: this,
					delay: 6000,
					slides: bgslides,
					animation: 'kenburns'
				}
				nc.bgSlider(bgslideSetting);
			});
		};

		/*----------  KENBURN BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-kenburnBgslider]")) {
			$("[data-kenburnBgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-kenburnBgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				$(this).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					animation: 'kenburns'
				});
			});
		};

		/*----------  KENBURN BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-rkenburnBgslider]")) {
			$("[data-rkenburnBgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-rkenburnBgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				$(this).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					animation: 'random'
				});
			});
		};

		/*----------  ZOOM OUT BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-zoomOutBgslider]")) {
			$("[data-zoomOutBgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-zoomOutBgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				$(this).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					transition: 'zoomOut'
				});
			});
		};

		/*----------  SWIRE LEFT BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-swirlLeftBgslider]")) {
			$("[data-swirlLeftBgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-swirlLeftBgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				$(this).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					transition: 'swirlLeft'
				});
			});
		};

		/*----------  BLUR BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-blurBgslider]")) {
			$("[data-blurBgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-blurBgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				$(this).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					transition: 'blur'
				});
			});
		};

		/*----------  FLASH BACKGROUND SLIDER  ----------*/
		if (nc.elcheck("[data-flashBgslider]")) {
			$("[data-flashBgslider]").each(function(index, el) {
				var s1 = $(this).attr('data-flashBgslider');
				var s2 = s1.split('|');
				var bgslides = [];
				$.each(s2, function(index, val) {
					bgslides.push({ src: val });
				});
				$(this).vegas({
					delay: 6000,
					slides: bgslides,
					timer: false,
					transition: 'flash'
				});
			});
		};

		/*----------  VIDEO-BACKGROUND  ----------*/
		if (nc.elcheck(".videobg")) {
			$(".videobg").each(function(index, el) {
				nc.videoBg(el);
			});
		};
		if (nc.elcheck(".vide-widget")) {
			var vide_script_arr = [	"lib/Vide/jquery.vide.min.js" ];
			nc.getMultiScripts(vide_script_arr, '').done(function(){
				$(".vide-widget").each(function(index, el) {
					nc.setId(this, 'videwidget', index);
					nc.vide(this);
				});
			});
		}

		/*----------  SCROLL  ----------*/
		if (nc.elcheck(".scroll-bar")) {
			nc.scrollBar();
		};

		/*----------  RESPONSIVE  ----------*/
		$.mediaquery("bind", "mq-key", "(min-width: 992px)", {
			enter: function() {
				nc.eqh(".eqh", ".eqh > div", "");
			},
			leave: function() {
				nc.eqh(".eqh", ".eqh > div", "destroy");
			}
		});

		$.mediaquery("bind", "mq-key", "(min-width: 200px) and (max-width: 991px)", {
			enter: function() {
				$("html").addClass("mob");
			},
			leave: function() {
				$("html").removeClass("mob");
			}
		});

	});
})();