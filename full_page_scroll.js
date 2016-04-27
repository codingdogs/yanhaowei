$(function() {
	$('.scroll_content_body').fullpage({
		scrollOverflow: true,
		verticalCentered: true,
		css3: true,
		navigation: true,
		navigationPosition: 'left',
		navigationColor: '#fff',
		navigationTooltips: circle_data,
		afterLoad: function(anchorLink, index) {
			if (now_page == 'sjln') {
				if (index == 3) {
					flower();
				} else if (index == 2) {
					snow();
				}
			}
		},
		onLeave: function() {
			if (now_page == 'sjln') {
				$(document).snowfall('clear');
			}
		}
	});
	$('.swiper_content .title span').click(function() {
		if ($(this).hasClass('on')) {
			return false;
		} else {
			$(this).addClass('on').siblings().removeClass('on');
			var index = $(this).index();
			$(this).parents('.swiper_content').find('li').fadeOut().eq(index).fadeIn();
		};
	});
	var yhw = {
		num: function() {
			yhw.height = $(window).height() - 170;
			$('.footer_content').css({
				height: yhw.height - $('.footer_num').height() < 0 ? 0 : yhw.height - $('.footer_num').height()

			})
		}
	};
	$('.backtop').click(function(){
		$.fn.fullpage.moveTo(1,0);
	});
//	$('.swiper_content div p').slimScroll({
//		height:420,
//		width:550,
//		allowPageScroll: true
//	});
$('.updown1').click(function(){
	var $now_move=$(this).siblings('div').find('p');
	$now_move.stop().animate({top:$now_move.position().top+200>0?0:$now_move.position().top+200})
})
$('.updown2').click(function(){

	var $now_move=$(this).siblings('div').find('p');
	$now_move.stop().animate({top:$now_move.position().top-200<330-$now_move.height()?330-$now_move.height():$now_move.position().top-200})
});
$('i.next').click(function(){
	$('.no_warp').stop().animate({left:$('.no_warp').position().left-400<-2000?-2000:$('.no_warp').position().left-400})
})
$('i.prev').click(function(){
	$('.no_warp').stop().animate({left:$('.no_warp').position().left+400>0?0:$('.no_warp').position().left+400})
})
});