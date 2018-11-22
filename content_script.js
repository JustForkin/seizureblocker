
function handleIMGS(textNode) {
	try {
		// Get all images
		var _allImagesList_ = textNode.getElementsByTagName('img');

		// Find all the .gif files
		var _the_images_ = []
		for(var i = 0; i < _allImagesList_.length; i++){

			if(_allImagesList_[i].src.split('.').pop() == 'gif'){
				_the_images_.push(_allImagesList_[i])
			}			
		}

		// Loop through the .gif files and request the slowed down ones
		for(var i = 0; i < _the_images_.length; i++){
			src = _the_images_[i].src
			$x = _the_images_[i]

			// Send a get request to our server
		    var xmlHttp = new XMLHttpRequest();
		    xmlHttp.onreadystatechange = function() { 
		        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		        	console.log(xmlHttp.responseText)

		        	// The response is our new slowed down GIF
		        	$x.style.backgroundImage = "url('https://"+xmlHttp.responseText+"')";
					$x.style.backgroundPosition = 'center center';
					$x.style.backgroundRepeat = "no-repeat";
		    }
		    xmlHttp.open("GET", 'https://seizureblocker.herokuapp.com/view_gif?url='+this.src, false); // true for asynchronous 
		    xmlHttp.send(null);
		}
	} catch (error){
		console.log("e: "+error);
	}
}
var localStorageIsOn="0"
chrome.storage.sync.get('localStorageIsOn', function(items){
    localStorageIsOn = items['localStorageIsOn'];
	if (localStorageIsOn=="1") {
		handleIMGS(document);
	}
	chrome.storage.local.clear(function() {});
});