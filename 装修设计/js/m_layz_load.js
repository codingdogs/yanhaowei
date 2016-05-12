$(function() {
	var $window_height = $(window).height();
	$(window).resize(function() {
		$window_height = $(window).height();
	});
	var $data_imgs = $('img[data-src]');
	//$data_imgs.
	$(window).scroll(function() {
		$data_imgs = $('img[data-src]');
		var $scrollTop = $(window).scrollTop();
		if ($data_imgs.length > 0) {
			$data_imgs.each(function(index, obj) {
				if ($(obj).offset().top - 2 * $window_height - 10 < $scrollTop) {
					$(obj).attr('src', $(obj).attr('data-src')).removeAttr('data-src').one('load', function() {
						if ($(this).hasClass('pic_middle')) {
							if ($(this).width() > $(this).height()) {
								$(this).css({
									width: 'auto',
									height: '100%'
								})
							} else {
								$(this).css({
									width: '100%',
									height: 'auto'
								})
							}
						}else if($(this).hasClass('auto_height')){
							$(this).css({
								height:'auto'
							})
						}
						$(this).addClass('go_opacity');

					});
				}
			});
		}

	});
	$(window).scroll();
});