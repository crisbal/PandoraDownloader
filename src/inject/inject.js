chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		$(".contentnav").append("<span id='downloadSong' style='float:left;color: #fff;text-decoration: underline'>Download Song<span>");

        $(document).on('click', '#downloadSong', function(){ 
            var song = document.getElementsByClassName("songTitle")[0].innerHTML;
            var author =  document.getElementsByClassName("artistSummary")[0].innerHTML;
            
            var url = jQuery.param( { author : author, song: song } );
            window.open('http://127.0.0.1:5000/download?' + url,'_blank');
        }); 

	}
	}, 10);
});