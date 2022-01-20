maxInterval = 0 ;
console.log("hello");
var censor = [];
var radius = 1;
browser.storage.local.get(null, result => {
		  if(typeof result.censor != "undefined" ){
			  censor = result.censor ;
		  }
			if(typeof result.radius != "undefined" ){
			  radius = result.radius;
		  }
});

console.log(window.location.href );

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
							   if(maxInterval>30){
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

browser.storage.local.get(null, result => {//
						if (typeof result.isKeywordBlocking != 'undefined')	{
							if (result.isKeywordBlocking == 1)	{
								var eliminator = setInterval(()=>{

								//KEYWORDS
								  var dvs = document.querySelectorAll('div').forEach(function(div){
									  var strDiv = div.innerText;
									  var count = div.childElementCount;
										if(count==0){
											 for(var i=0; i<censor.length; i++){
												if(strDiv.includes(censor[i])){
														div.setAttribute('style', 'opacity:1 !important;background-color:white !important;color:white !important; ');//background-color:red !important;
													}else{
													}
											 }
										 }
								   });
										h1_h2_h3_h4_span_a_b_em_strong(censor); //apply css properties to h1, h2, h3, h4, span, a, b, em, strong elements (make them invisible)
								},200);
							}
						}
});



var h1_h2_h3_h4_span_a_b_em_strong = (censorArr) => {
					var h1 = document.querySelectorAll('h1, h2, h3, h4, span, a, b, em, strong').forEach(function(div){
						var strDiv = div.innerText;
						for(var i=0; i<censorArr.length; i++){
							if(strDiv.includes(censorArr[i])){
								console.log(strDiv);
								div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
								radiusEliminator(radius,div);
							}else{}
						}
				 });
}


var radiusEliminator = (rad,division) => {
			if(rad == 1){
				var imgs = division.parentNode.querySelectorAll('img').forEach(function(img){
					img.style.display='none';
				 });
					var videos = division.parentNode.querySelectorAll('video').forEach(function(div){
						div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
				 });
			}else if (rad == 2) {
				var imgs = division.parentNode.parentNode.querySelectorAll('img').forEach(function(img){
					img.style.display='none';
				 });
					var videos = division.parentNode.parentNode.querySelectorAll('video').forEach(function(div){
						div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
				 });
			}else if (rad == 3) {
				var imgs = division.parentNode.parentNode.parentNode.querySelectorAll('img').forEach(function(img){
					img.style.display='none';
				 });
					var videos = division.parentNode.parentNode.parentNode.querySelectorAll('video').forEach(function(div){
						div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
				 });
			}else{
				var imgs = document.querySelectorAll('img').forEach(function(img){
					img.style.display='none';
				 });
					var videos = document.querySelectorAll('video').forEach(function(div){
						div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
				 });
			}
			/*		if(keywordDetected)	{
						if rad == 1 {
							eliminate image inside division
						}
						if rad == 2 { eliminate images inside both div and parent div}
						if rad == 3 { eliminate images inside both div, parent div, and second parent level}
						if rad == 4 (infinity)  { eliminate pictures inside all page }
				}*/
}
