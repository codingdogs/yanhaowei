$(function() {
	var $window_height = $(window).height();
	$(window).resize(function() {
		$window_height = $(window).height();
	});
	var $data_imgs = $('img[data-ysrc]');
	//$data_imgs.
	$(window).scroll(function(){
		window.m_lazy();
	});
	$(window).resize(function(){
		window.m_lazy();
	});
	window.m_lazy = function() {
		$data_imgs = $('img[data-ysrc]');
		var $scrollTop = $(window).scrollTop();
		if ($data_imgs.length > 0) {
			$data_imgs.each(function(index, obj) {
				if ($(obj).offset().top - 2 * $window_height - 10 < $scrollTop) {
					$(obj).attr('src', $(obj).attr('data-ysrc')).removeAttr('data-ysrc').one('load', function() {
						if ($(this).hasClass('auto')) {
							$(this).css({
									width: 'auto',
									height: 'auto'
								})
							if ($(this).parent().width()/$(this).parent().height()<$(this).width()/$(this).height()) {
								$(this).css({
									width: 'auto',
									height: '100%'
								});
								$(this).css({
									left:-((($(this).width()-$(this).parent().width())/2)/$(this).parent().width())*100+'%',
									top:0
								})
							} else {
								$(this).css({
									width: '100%',
									height: 'auto'
								});
								$(this).css({
									top:-((($(this).height()-$(this).parent().height())/2)/$(this).parent().height())*100+'%',
									left:0
								})
							}
						} else if ($(this).hasClass('auto_height')) {
							$(this).css({
								height: 'auto'
							})
						}
						$(this).addClass('go_opacity');

					});
				}
			});
		}
	};
	window.m_lazy();
});