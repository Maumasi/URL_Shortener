//	jquery javaScript

$(function(){

	var $newUrl = $('.newUrl');
	var $oldUrl = $('.oldUrl');
	var $shortenUrlSubmit = $('.btn-shorten-url-submit');
	var $url = $('input.original-url');

	var $updatedUrl = $('.updatedUrl');
	var $shortLinkUsed = $('.short-link-used');
	var $shortLink = $('#short-link');
	var $editUrl = $('#edit-url');
	var $editUrlSubmit = $('.btn-edit-short-link');

	var $linkWrapper = $('div.link-wrapper');


	$linkWrapper.addClass('hidden');

	$shortenUrlSubmit.on('click', function() {

		var url = {
			originalURL: $url.val(),
		}

// AJAX call to our API
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/maumasi.fy/v1.1.0/shorten-url',
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
	});// onClick


	$editUrlSubmit.on('click', function() {

		var editUrl = {
			maumasiFyKey: $shortLink.val(),
			updatelURL: $editUrl.val(),
		}

		console.log('test update btn');

// AJAX call to our API
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/maumasi.fy/v1.1.0/update-url',
			data: editUrl,
			success: function (updatedData) {
				console.log(this.data);

				// show user their new maumasi.fy link and old link
				$updatedUrl.html(updatedData.originalURL);
				$shortLinkUsed.html(updatedData.maumasi_fied_link);

				// make link active

				console.log($oldUrl.attr('href'));
				$oldUrl.attr('href', updatedData.originalURL);
				$newUrl.attr('href', updatedData.maumasi_fied_link);

				$linkWrapper.removeClass('hidden');

				$shortLink.val('');
				$editUrl.val('');
			},
			// *** This is causing errors!!! ***
			// error: function() {
			// 	alert('API call failed :(');
			// }
		});// ajax
	});// onClick
});
