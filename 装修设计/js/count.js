$(function(){
	$('<div id="public_count" class="change_fixed"></div>').load('public/count.html').prependTo('body'); //公共头部;
	
	$('.select').change(function(){
		var index=this.selectedIndex;
		var now_val=$(this).find('option').eq(index).html();
		$(this).prev('input').val(now_val);
		var now_val_arr=now_val.split('x');
		$(this).parents('.inputs_body').next('.inputs_body').find('input').each(function(index,obj){
			$(obj).val(Number(now_val_arr[index]))
		})
	}).change();
	$('.go_count').click(function(){
		var $inputs=$('input:not([disabled])');
		for (var i=0;i<$inputs.length;i++) {
			if(!$inputs.eq(i).val()){
				my.toast('请填写完整信息！')
				return false;
				break;
			}
		};
		
	})
});
