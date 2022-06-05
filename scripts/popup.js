'use strict';

document.querySelectorAll('li, button, input').forEach(item => item.addEventListener('click', process));
		var cboxMedia = document.getElementById("cboxMedia");//value=true;
		var boxMedia = document.getElementById("boxMedia");//value=true;
		var mediaSwitch = document.getElementById("mediaSwitch");
		var sliderMed = document.getElementById("sliderMedia");
function processImagesBlocking(options){
	if(options==1){
		console.log("options"+options);
		var cboxImages = document.getElementById("cboxImages");//value=true;
			cboxImages.checked = true;
		//console.dir(cboxImages);
	}else{
		var cboxImages = document.getElementById("cboxImages");//value=false;
			cboxImages.checked = false;
	}
}
function processKeywordBlocking(options){
	if(options==1){
		console.log("options"+options);
		var cboxKeywords = document.getElementById("cboxKeywords");//value=true;
			cboxKeywords.checked = true;
		//console.dir(cboxKeywords);
	}else{
		var cboxKeywords = document.getElementById("cboxKeywords");//value=false;
			cboxKeywords.checked = false;
	}
}
function processCensorOptions(isMediaBlocked){
	if(isMediaBlocked==1){
		console.log("isMediaBlocked"+isMediaBlocked);
		var cboxMedia = document.getElementById("cboxMedia");//value=true;
			cboxMedia.checked = true;
		//console.dir(cboxMedia);
	}else{
		browser.runtime.sendMessage({"unblockMedia": "unblockMedia"});
		var cboxMedia = document.getElementById("cboxMedia");//value=false;
			cboxMedia.checked = false;
	}
}
function processUnhookBlocking(isHooksBlocked){
	if(isHooksBlocked==1){
		console.log("isHooksBlocked"+isHooksBlocked);
		var cboxUnhook= document.getElementById("cboxUnhook");//value=true;
		cboxUnhook.checked = true;
		//console.dir(cboxUnhook);
		//browser.tabs.reload();
	}else{
//		browser.runtime.sendMessage({"unblockMedia": "unblockMedia"});
		var cboxUnhook= document.getElementById("cboxUnhook");//value=false;
		cboxUnhook.checked = false;
		//browser.tabs.reload();
	}
}
browser.storage.local.get(null, result => {
			//console.dir(result.isMediaBlocking);
			if(typeof result.isImagesBlocking != "undefined"){
				processImagesBlocking (result.isImagesBlocking);
				//alert("isImagesBlocking" +result.isImagesBlocking);
			}
			if(typeof result.isKeywordBlocking != "undefined"){
				processKeywordBlocking (result.isKeywordBlocking);
				//alert("isKeywordBlocking"+result.isKeywordBlocking);
			}
			if(typeof result.isMediaBlocking != "undefined"){
				processCensorOptions (result.isMediaBlocking);
			}
			if(typeof result.isUnhookBlocking!= "undefined"){
				processUnhookBlocking(result.isUnhookBlocking);
			}

});


function process() {
  let tabs;
  switch (this.dataset.i18n) {
	case 'cboxImages':
		if(this.checked){
			browser.storage.local.set({"isImagesBlocking":1});
			browser.runtime.sendMessage({"blockImages": "blockImages"});
		}else{
			browser.storage.local.set({"isImagesBlocking":0});
			browser.runtime.sendMessage({"unblockImages": "unblockImages"});
		}
    break;
	case 'cboxKeywords':
		if(this.checked){
			browser.storage.local.set({"isKeywordBlocking":1});
			browser.runtime.sendMessage({"blockKeyword": "blockKeyword"});
			browser.tabs.reload();
		}else{
			browser.storage.local.set({"isKeywordBlocking":0});
			browser.runtime.sendMessage({"unblockKeyword": "unblockKeyword"});
			browser.tabs.reload();
		}
    break;
	case 'cboxMedia':
		if(this.checked){
			browser.storage.local.set({"isMediaBlocking":1});
			browser.runtime.sendMessage({"blockMedia": "blockMedia"});
			browser.tabs.reload();
		}else{
			browser.storage.local.set({"isMediaBlocking":0});
			browser.runtime.sendMessage({"unblockMedia": "unblockMedia"});
			browser.tabs.query( {active: true},tabs => {
					if (tabs[0].url.includes("/pages/blocked.html")){
						let updating = browser.tabs.update({url: "https://google.com"})
					}else{
						browser.tabs.reload() ;
					}
			});
		}
    break;
	case 'cboxUnhook':
		if(this.checked){
			browser.storage.local.set({"isUnhookBlocking":1});
			browser.runtime.sendMessage({"blockHooks": "blockHooks"});
			browser.tabs.reload();
		}else{
			browser.storage.local.set({"isUnhookBlocking":0});
			browser.runtime.sendMessage({"unblockHooks": "unblockHooks"});
			browser.tabs.reload();
		}
    break;



	case 'censor':
	 let urlBlocklist = browser.runtime.getURL('blocklist.html');
	  browser.tabs.query({url:urlBlocklist}, tabs => { // find a keyWords tab
        tabs[0] ? browser.tabs.update(tabs[0].id, {active: true}) : browser.tabs.create({url:urlBlocklist}); // active existing tab OR open new tab
        window.close();
      });
      break;
    default:
  }
}
