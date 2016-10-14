//	jquery javaScript

$(function(){

	// create handles
	var $newUrl = $('.newUrl');
	var $oldUrl = $('.oldUrl');
	var $shortenUrlSubmit = $('.btn-shorten-url-submit');
	var $url = $('input.original-url');

	// update handlers
	var $updatedUrl = $('.updatedUrl');
	var $shortLinkUsed = $('.short-link-used');
	var $shortLink = $('#short-link');
	var $editUrl = $('#edit-url');
	var $editUrlSubmit = $('.btn-edit-short-link');

	// delete handlers
	var $deleteInput = $('#delete-short-link');
	var $deleteSubmit = $('.btn-delete-submit');
	var $deleteResponse = $('.deleted-short-link');

	var $urlRepoWrapper = $('.url-repo-wrapper');

	var $linkWrapper = $('div.link-wrapper');


	$linkWrapper.addClass('hidden');

	$shortenUrlSubmit.on('click', function() {

		var url = {
			originalURL: $url.val(),
		}

// AJAX call to our API
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/v1/shorten-url',
			data: url,
			success: function (newData) {
				// console.log(this.data);

				// show user their new maumasi.fy link and old link
				$oldUrl.html(newData.originalURL);
				$newUrl.html(newData.maumasi_fied_link);

				// make link active
				console.log(newData);
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
			url: 'http://162.243.53.145:3000/v1/update-url',
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



	$deleteSubmit.on('click', function() {

		var deleteShortLink = {
			maumasiFyKey: $deleteInput.val(),
		}

		console.log('test delete btn');

// AJAX call to our API
		$.ajax({
			type: 'POST',
			url: 'http://162.243.53.145:3000/v1/remove-url',
			data: deleteShortLink,
			success: function (deleteReturn) {

				// show user their new maumasi.fy link and old link
				$deleteResponse.html("<span class=\" \">'" + deleteShortLink.maumasiFyKey + "'</span>" + ' has been removed forever until the end of time, or until it makes the rounds again. Thanks for recycling!');

				$linkWrapper.removeClass('hidden');

				$deleteInput.val('');
			},
			// *** This is causing errors!!! ***
			// error: function() {
			// 	alert('API call failed :(');
			// }
		});// ajax
	});// onClick


// show all DB records
	$.ajax({
		type: 'GET',
		url: 'http://162.243.53.145/v1/all-urls',
		// data: url,
		success: function (AllShortLinkRecords) {

			AllShortLinkRecords.forEach(function(urlData){
				// console.log(urlData);
				$urlRepoWrapper
					.append(
						"<div class='panel panel-default'>" +
						  "<div class='panel-heading'>" +
						    "<h3 class='panel-title'><a href='http://localhost:3000/go/" + urlData.maumasiFyKey + "'>Short link: http://localhost:3000/go/" + urlData.maumasiFyKey + "</a></h3>" +
						  "</div>" +
						  "<div class='panel-body'>" +
						    "Mapped URL: <a href='"+ urlData.originalURL.originalURL +"'>" + urlData.originalURL.originalURL + "</a>" +
						  "</div>" +
						"</div>"
					);
			});// forEach
		},
		// *** This is causing errors!!! ***
		// error: function() {
		// 	alert('API call failed :(');
		// }
	});// ajax
});
