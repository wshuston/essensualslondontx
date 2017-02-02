var pContainerHeight = $('.top-box').height();
var vph = $(window).height();

$(window).scroll(function(){
	var wScroll = $(this).scrollTop();

	if (wScroll <= pContainerHeight) {

		$('.top-box .logo').css({
			'transform' : 'translate(0px, '+ (wScroll/2).toFixed(2) +'%)'
		});
	}

	if(wScroll > $('.logo-img1').offset().top - ($(window).height())) {
		var opacity = (wScroll - $('.logo-img1').offset().top + 500).toFixed(2) / (wScroll / 2.4).toFixed(2);

		$('.logo-img1').css({
			'opacity': opacity,
			'transform': 'translate(0px, '+ wScroll /2 +'%)'
		});
	}

	if(wScroll > $('.our-team').offset().top - ($(window).height() / 1.2).toFixed(2)) {
		$('.our-team figure').each(function(i){
			setTimeout(function(){
				$('.our-team figure').eq(i).addClass('is-showing');
			}, 150 * (i + 1));
		});
	}

	if(wScroll > $('.large-window').offset().top - ($(window).height())){
		$('.large-window').css({'background-position':'center '+ (wScroll - $('.large-window').offset().top) +'px'});

		var opacity = (wScroll - $('.large-window').offset().top + 600) / (wScroll / 5).toFixed(2);

		$('.window-tint').css({'opacity': opacity});
	}

	if(wScroll > $('.blog-posts').offset().top - ($(window).height())){

		var offset = Math.min(0, wScroll - $('.blog-posts').offset().top + $(window).height() - 450);

		$('.post-1').css({'transform':'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});
	}

	if(wScroll > $('.post-2').offset().top - ($(window).height())){

		var offset = Math.min(0, wScroll - $('.post-2').offset().top + $(window).height() - 450);

		$('.post-2').css({'transform':'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +'px)'});
	}

	if(wScroll > $('.post-3').offset().top - ($(window).height())){

		var offset = Math.min(0, wScroll - $('.post-3').offset().top + $(window).height() - 450);

		$('.post-3').css({'transform':'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});
	}

});