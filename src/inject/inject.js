chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {

    	if (document.readyState === "complete") 
        {
    		clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
    		// This part of the script triggers when page is done loading
            // ----------------------------------------------------------
            hostName = window.location.hostname;

            if(hostName.indexOf("pandora.com")!=-1) //this is for the eventuality of other websites, like grooveshark
            {
                pandora();
            }
    		
            //http://youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=i62Zjga8JOM
    	}
	}, 10);


    function pandora()
    {
        $(".contentnav").append('<input type="button" value="Download this song" id="downloadSong" style="float:left;"/>');

        $(document).on('click', '#downloadSong', function(){ 
            song = document.getElementsByClassName("songTitle")[0].innerHTML;
            author =  document.getElementsByClassName("artistSummary")[0].innerHTML;
            
            searchAndDownload(song + " " + author);
        }); 
    }

    function searchAndDownload (query) {
        // this was the search query in python r = requests.get("https://gdata.youtube.com/feeds/api/videos?q=" + author + " " + song + "&max-results=1&v=2&alt=json")
        
        var paramsYTSearch = jQuery.param( { q: query, "max-results": 1, v: 2, alt: "json" } ); //to do things the safe way
        
        $.getJSON( "https://gdata.youtube.com/feeds/api/videos?" + paramsYTSearch, function( json ) {
            var ytLink = json.feed.entry[0].link[0].href;
            ytLink = ytLink.replace('&feature=youtube_gdata', '');
            console.log(json);

            item = escape(ytLink);
            
            var date = new Date;
            var r = date.getTime()

            $.ajax({
                url: "http://www.youtube-mp3.org/a/pushItem/?item=http%3A//www.youtube.com/watch%3Fv%3DKMU0tzLwhbE&el=na&bf=false&r=1397828359422",
                data: { item: item, r: r, el: "na", bf: "false" },
                type: "GET",
                success: function(data) {
                    alert("Success");
                },
                dataType: 'jsonp'
            });
        });
    }
});