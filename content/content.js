var maxInterval = 0 ;
var maxHookInterval = 0;
var censor = [];


//Blocking Images
browser.storage.local.get(null, result => {
						if (typeof result.isImagesBlocking != 'undefined')	{
							if (result.isImagesBlocking == 1)	{
							var eliminator = setInterval(()=>{
							  var imgs = document.querySelectorAll('img').forEach(function(img){
									img.style.display='none';
							   });
							   	var videos = document.querySelectorAll('video').forEach(function(div){
										div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
							   });
							   maxInterval++;
							   //console.log(imgs);
							   if(maxInterval>15){
								   clearInterval(eliminator);
							   }
							},200);
							console.log("isImagesBlocking ");
							console.log(result.isImagesBlocking);
							}else{}
						}else{
							console.log("storage array has been set");
						}
});


//Blocking CLickbaits, Hooks and Youtube recommendations
browser.storage.local.get(null, result => { console.log("checking for isUnhook");

						if (typeof result.isUnhookBlocking != 'undefined')	{
							if (result.isUnhookBlocking == 1)	{
							var eliminateHooks = setInterval(()=>{
								console.log(window.location.href );
								//if(window.location.href=="https://www.youtube.com/*"){
							        //console.log("in yt.com");
								var related = document.querySelectorAll('#related').forEach(function(div){
									div.setAttribute ('style','opacity:0 !important;');
									});

								//}else{console.log("not in yt");}
								if(window.location.href === "https://www.youtube.com/" ){
						        		console.log("in exclusive yt.com");
									var tryThis = document.querySelectorAll('ytd-browse').forEach(function(div){
											div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
											div.style.display='none';
									});
								}else{console.log("not in exclusive yt.com");}
								console.log(maxHookInterval);
							   	if(maxHookInterval>10){
								   console.log("clearInterval");
								   clearInterval(eliminateHooks);
							   	}
							        maxHookInterval++;
							},300);
							console.log("isUnhookBlocking");
							console.log(result.isUnhookBlocking);
							}else{}
						}else{
							console.log("isUnhookBlocking Undefined");
						}
});



//Imports Keywords and Celebrities BlackList
browser.storage.local.get(null, result => {
		  if(typeof result.censor != "undefined" ){
			  censor = result.censor ;
		  }
});




// blocking celebrities and keywords.
browser.storage.local.get(null, result => {//
						if (typeof result.isKeywordBlocking != 'undefined')	{
							if (result.isKeywordBlocking == 1)	{
								var GeneralCleaner = setInterval(()=>{
								 var dvs = document.querySelectorAll('div').forEach(function(div){
									  var strDiv = div.innerText;
									  var count = div.childElementCount;
										if(count==0){
											 for(var i=0; i<censor.length; i++){
												if(strDiv.includes(censor[i])){
														div.setAttribute('style', 'opacity:1 !important;background-color:white !important;color:white !important; ');//background-color:red !important;
													}else{}
											 }
										 }
								   });
										h1_h2_h3_h4_span_a_b_em_strong(censor); //apply css properties to h1, h2, h3, h4, span, a, b, em, strong elements (make them invisible)
										if(maxInterval>25){
											clearInterval(GeneralCleaner);
										}
								},300);
							}
						}
});



var h1_h2_h3_h4_span_a_b_em_strong = (blackListArray) => {
				//GENERAL CASE
			var h1 = document.querySelectorAll(' h1, h2, h3, h4, strong,span, a, b , em').forEach(function(div){//
				var strDiv = div.innerText;
				for(var i=0; i<blackListArray.length; i++){
					if(strDiv.includes(blackListArray[i])){
						div.setAttribute('style', ' opacity:0 !important; ');
					}else{}
				}
		 });

}
