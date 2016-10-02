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
			originalURL: $url.val()
		}

// AJAX call to our API
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/maumasi.fy-url/v1.1.0/shorten',
			data: url,
			success: function (newData) {
				// console.log(this.data);

				// show user their new maumasi.fy link and old link
				$oldUrl.html(newData.originalURL);
				$newUrl.html(newData.maumasi_fied_link);

				// make link active

				console.log($oldUrl.attr('href'));
				$oldUrl.attr('href', newData.originalURL);
				$newUrl.attr('href', newData.maumasi_fied_link);

				$linkWrapper.removeClass('hidden');

				$url.val('');

				console.log(newData);
			},
			// *** This is causing errors!!! ***
			// error: function() {
			// 	alert('API call failed :(');
			// }
		});// ajax
	});
});
