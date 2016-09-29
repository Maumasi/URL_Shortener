//	jquery javaScript

$(function(){

	var $newUrl = $('.newUrl');
	var $oldUrl = $('.oldUrl');
	var $submit = $('.btn-submit');
	var $url = $('input#url');

	$submit.on('click', function() {

		var url = {
			originalUrl: $url.val()
		}

// AJAX call to our API
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/api/v1/url',
			data: url,
			success: function(newData) {

				// show user their new maumasi.fy link
				$oldUrl.html('This URL: ' + newData.originalUrl);
				$newUrl.html('truned into this URL : ' + newData.maumasi_fied_link);

				$url.val('');

				console.log(newData);
			},
			// *** This is causing errors!!! *** 
			// error: function() {
			// 	alert('API call failed :(');
			// }
		});
	});

});
