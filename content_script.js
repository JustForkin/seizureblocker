
function handleIMGS(textNode) {
	try {
		var _allImagesList_ = textNode.getElementsByTagName('img');
		//console.log(_allImagesList_.length)
		var _the_images_ = []
		for(var i = 0; i < _allImagesList_.length; i++){
			//console.log(_allImagesList_[i].src);
			if(_allImagesList_[i].src.split('.').pop() == 'gif'){
				//console.log(_allImagesList_[i].src + ' is a gif')
				_the_images_.push(_allImagesList_[i])
			}else{
				//console.log(_allImagesList_[i].src + ' is not a gif')
			}
			//res = isAnimatedGif(_allImagesList_[i].src, this)
			
		}
		//console.log(_the_images_.length)
		for(var i = 0; i < _the_images_.length; i++){
			src = _the_images_[i].src
			_the_images_[i].classList.add("needtoloadimagestyle");
			_the_images_[i].addEventListener('click', function (e) {
				window.location.href="https://www.seizureblocker.org/view_gif?url="+src
			});
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

function isAnimatedGif(src, cb) {
	console.log('in isAnimatedGif')
	console.log('src: '+src)
	var request = new XMLHttpRequest();
	request.open('GET', src, true);
	request.responseType = 'arraybuffer';
	request.addEventListener('load', function () {
		console.log('in here baby')
		var arr = new Uint8Array(request.response),
			i, len, length = arr.length, frames = 0;
		
		console.log('in here baby too')
		// make sure it's a gif (GIF8)
		
		console.log('yoo')
		
		//ported from php http://www.php.net/manual/en/function.imagecreatefromgif.php#104473
		//an animated gif contains multiple "frames", with each frame having a 
		//header made up of:
		// * a static 4-byte sequence (\x00\x21\xF9\x04)
		// * 4 variable bytes
		// * a static 2-byte sequence (\x00\x2C) (some variants may use \x00\x21 ?)
		// We read through the file til we reach the end of the file, or we've found 
		// at least 2 frame headers
		console.log('before for loop')
		for (i=0, len = length - 9; i < len, frames < 2; ++i) {
			
			if (arr[i] === 0x00 && arr[i+1] === 0x21 &&
				arr[i+2] === 0xF9 && arr[i+3] === 0x04 &&
				arr[i+8] === 0x00 && 
				(arr[i+9] === 0x2C || arr[i+9] === 0x21))
			{
				frames++;
			}
		}
		console.log('after for loop')
		// if frame count > 1, it's animated
		if(frames > 1){
			console.log('Animated')
			return true;
		}else{
			console.log('Not animated')
			return false
		}
		cb(frames > 1);
	});
	request.send();
}