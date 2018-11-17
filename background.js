if (!localStorage.on) {
    localStorage.on = '1';
}

if (localStorage.on == '1') {
	chrome.browserAction.setIcon({path: "images/icon19.png"});
} else {
	chrome.browserAction.setIcon({path: "images/icon19-disabled.png"});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	if (localStorage.on == '1') {
		chrome.browserAction.setIcon({path: "images/icon19-disabled.png"});
		localStorage.on = '0';
	} else {
		chrome.browserAction.setIcon({path: "images/icon19.png"});
		localStorage.on = '1';
	}
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	try{
		chrome.extension.getBackgroundPage().console.log(details.url)
		if (localStorage.on == '1') {
			if(details.url.startsWith("https://im4") || !details.url.endsWith(".gif")){
				return {cancel: false}
			}else{
				return {redirectUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="};
			}
		}
			
	} catch(err){
		chrome.extension.getBackgroundPage().console.log("e: "+err);
	}
}, {urls: ["<all_urls>"], types: ["image", "object"]}, ["blocking"]);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (localStorage.on == '1') {
		chrome.tabs.insertCSS(null, {code: "img{}", runAt: "document_start"});	
		chrome.storage.sync.set({'localStorageIsOn': "1"}, function() { });    
	} else 
		chrome.storage.sync.set({'localStorageIsOn': "0"}, function() { });   
});



