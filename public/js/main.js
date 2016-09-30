//	jquery javaScript

$(function(){

	var $newUrl = $('.newUrl');
	var $oldUrl = $('.oldUrl');
	var $submit = $('.btn-submit');
	var $url = $('input.original-url');
	var $linkWrapper = $('div.link-wrapper');


	$linkWrapper.addClass('hidden');

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
				$oldUrl.html(newData.originalUrl);
				$newUrl.html(newData.maumasi_fied_link);

				// make link active
				$oldUrl.attr('href', newData.originalUrl);
				$newUrl.attr('href', newData.maumasi_fied_link);

				$linkWrapper.removeClass('hidden');

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
