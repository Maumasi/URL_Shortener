//	jquery javaScript

$(function(){

	var $newUrl = $('.newUrl');
	var $submit = $('.btn-submit');
	var $url = $('input#url');

	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/api/v1/url',
		success: function(data) {
			$newUrl.html(data.maumasi_fied_link);
			// console.log(data);
		}
	});


	$submit.on('click', function() {

		var url = {
			originalUrl: $url.val()
		}

		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/api/v1/url',
			data: url,
			success: function(newData) {
				$newUrl.html(newData.maumasi_fied_link);
				// console.log(newData);
				// console.log(this.data);
			}
		});
	});

});
