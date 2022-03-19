var numbers = [1,2,3,4];
numbers.forEach (n => console.log(5*n));

numbers.forEach (septuple);
function septuple (n){ console.log(7*n)};


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
console.log("hello");
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
							   if(maxInterval>5){
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
								var GeneralEliminator = setInterval(()=>{

								//KEYWORDS
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
											clearInterval(GeneralEliminator);
										}
								},200);
							}
						}
});



var h1_h2_h3_h4_span_a_b_em_strong = (censorArr) => {
				//GENERAL CASE
			console.log("nothing detected");

			var h1 = document.querySelectorAll(' h1, h2, h3, h4, strong,span, a, b , em').forEach(function(div){//
				var strDiv = div.innerText;
				for(var i=0; i<censorArr.length; i++){
					if(strDiv.includes(censorArr[i])){
					//	console.log(strDiv);
						div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
						//radiusEliminator(0,div);
					}else{}
				}
		 });
		
}

/*
var radiusEliminator = (rad,division) => {
	//FORCE RAD TO 1 // rad  =1 ;
console.log("rad is "+rad);
				if(rad == 0){
					var imgs = division.querySelectorAll('img').forEach(function(img){
						img.style.display='none';
					 });
						var videos = division.querySelectorAll('video').forEach(function(div){
							div.setAttribute('style', 'background-color:white !important; opacity:0; color:white !important;');
					 });
				}else if(rad == 1){
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
			}else if (rad == 4) {
				var imgs = document.querySelectorAll('img').forEach(function(img){
					img.style.display='none';
				 });
					var videos = document.querySelectorAll('video').forEach(function(div){
						div.setAttribute('style', 'background-color:white !important; opacity:0 !important;');
				 });
		}else{

			}

}*/

/*var clearAllUniqueElts = (div) => {
	var strDiv = div.innerText;
	for(var i=0; i<censorArr.length; i++){
		if(strDiv.includes(censorArr[i])){
		//	console.log(strDiv);
			div.setAttribute('style', 'background-color:red !important; opacity:0.1 ; color:red !important;');
		//	radiusEliminator(0,div);
		}else{}
	}
}*/
 function clearAllUniqueElts(div, cens){
	// console.log("SpanDiv");
	var strDiv = div.innerText;
	var count = div.childElementCount;
	//console.log("count"+count);
	if(count==0){
		for(var i=0; i<cens.length; i++){
			if(strDiv.includes(cens[i])){
				return 	div.setAttribute('style', 'opacity:0 !important; ');
			}else{}
		}
	}else{}
}


function clearAllElts(div, cens){
//	console.log("h1234");
	var strDiv = div.innerText;
	for(var i=0; i<cens.length; i++){
		if(strDiv.includes(cens[i])){
			return 	div.setAttribute('style', ' opacity:0 !important; ');
		}else{}
	}
};

function picsEliminator(rad, div, cens){
	console.log("entered pics eliminator");
	console.log(rad);
	console.log(div);
	console.log(cens);// solve problem images not deleted. and other functions not deleting anymore. when picsEliminator is introduced.
	var strDiv = div.innerText;
	for(var i=0; i<cens.length; i++){
		if(strDiv.includes(cens[i])){
			if(rad == 0){
				var imgs = division.parentNode.parentNode.querySelectorAll('img').forEach(function(img){
					img.style.display='none';
				 });
					var videos = division.parentNode.parentNode.querySelectorAll('video').forEach(function(div){
						div.setAttribute('style', ' opacity:0 !important;');
				 });
			}
		//	return 	div.setAttribute('style', 'background-color:red !important; opacity:0 !important; color:red !important;');
		}else{}
	}
}
