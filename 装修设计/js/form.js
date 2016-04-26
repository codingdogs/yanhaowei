$(function() {
	$('.form_btn').each(function(index, obj) {
		$(this).click(function() {
			var $parent = $(this).parents('.form');
			var $all_inputs = $parent.find('*[data-empty=true]');
			if ($all_inputs.length > 0) {
				for (var i = 0; i < $all_inputs.length; i++) {
					if ($.trim($all_inputs.eq(i).val()) == '') {
						my.toast($all_inputs.eq(i).attr('data-tips'));
						return;
						break;
					} else if ($all_inputs.eq(i).hasClass('tel_test')) {
						if (!my.tel_test.test($all_inputs.eq(i).val())) {
							my.toast('请填写正确的手机号码！');
							return;
							break;
						}
					}else if ($all_inputs.eq(i).hasClass('email_test')) {
						if (!my.email.test($all_inputs.eq(i).val())) {
							my.toast('请填写正确的邮箱地址！');
							return;
							break;
						}
					}
				}
			};
			form_ajax[$(this).attr('data-fn')]();
		})

	});
	$('div.input select').each(function(index, obj) {
		this.index = index;
		$(this).change(function() {
			var index = this.selectedIndex;
			var $input = $(this).prev('input');
			$input.val($(this).find('option').eq(index).html());
		});
	});
})