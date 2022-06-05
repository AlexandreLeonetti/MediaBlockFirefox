'use strict';

// ----------------- Internationalization ------------------
/*
document.querySelectorAll('[data-i18n]').forEach(node => {
  let [text, attr] = node.dataset.i18n.split('|');
  text = browser.i18n.getMessage(text);
  attr ? node[attr] = text : node.appendChild(document.createTextNode(text));
});*/
// ----------------- /Internationalization -----------------

// ----- global

var MediaArray = [];
var keywordArray  = [];
var keyWordInput = document.getElementById('wordAddress');
var mediaAddress = document.getElementById('mediaAddress');

//keyWordInput.focus();
/*
** Getting keyword array, media array  status from browser storage.
*/

browser.storage.local.get(null, result => {
		  if(typeof result.censor != "undefined" ){
			  keywordArray = result.censor ;
		  }
			if(typeof result.censorMedia != "undefined"){// result.censorMedia
				MediaArray = result.censorMedia;// result.censorMedia
			}

});


/*
** Injecting entered values in , newKeyword and newMedia.
*/


const newKeyword =  document.querySelector('#wordAddress');
const newMedia =  document.querySelector('#mediaAddress');

// Add Listeners for each click on a button.

document.querySelectorAll('button').forEach(item => item.addEventListener('click', process));


/*
** The function process(), take care of each entry and call the function that is relevent to each case.
*/

function process() {
  switch (this.dataset.i18n) {
    case 'cancel':
       location.href = '/blocklist.html';
      break;
      case 'saveKeyword':
      if (!validateInput()) { return; }
      browser.storage.local.set(makeword(), () => {
        location.href = '/blocklist.html' ;
      });
      break;
	  case 'deleteAllKeywords':
				browser.storage.local.set(deleteAllKeyWords(), () => {
					location.href = '/blocklist.html' ;
				});
	  break;
	  case 'saveMedia':
      if (!validateMedia()) { return; }
      browser.storage.local.set(makeMedia(), () => {
        location.href = '/blocklist.html' ;
      });
      break;
  }
}
//on key "enter" in keyword input save keyword.
keyWordInput.onkeydown = function(e){
   if(e.keyCode == 13 ){
		 if (!validateInput()) { return; }else{
			 browser.storage.local.set(makeword(), () => {
				 location.href = '/blocklist.html' ;
			 });
	 	}
   }
};

//on key "enter" in website blocklist save website.
mediaAddress.onkeydown = function(e){
   if(e.keyCode == 13 ){
		 if (!validateMedia()) { return; }else{
			 browser.storage.local.set(makeMedia(), () => {
				 location.href = '/blocklist.html' ;
			 });
	 	}
   }
};

// cleans entered keyword if incorrect char.
function validateInput() {
  document.querySelectorAll('input[type="text"]').forEach(item => item.value = item.value.trim());
  newKeyword.value = Utils.stripBadChars(newKeyword.value);
  newKeyword.classList.remove('invalid'); // reset
  if (!newKeyword.value) {
    newKeyword.classList.add('invalid');
    return false;
  }
  return true;
}

// cleans entered website address if incorrect char.
function validateMedia() {
  document.querySelectorAll('input[type="text"]').forEach(item => item.value = item.value.trim());
  newMedia.value = Utils.stripBadChars(newMedia.value);
  newMedia.classList.remove('invalid'); // reset
  if (!newMedia.value) {
    newMedia.classList.add('invalid');
    return false;
  }
  return true;
}


//UNIQUE AND SORT
function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

// push keyword entered and return the object "censor": "the pushed new array".
function makeword() {
   keywordArray.push(newKeyword.value);
   keywordArray=  uniq(keywordArray);
  return {["censor"]: keywordArray};
}

function makewordArray(arr) {
		console.dir(arr);
	console.dir(keywordArray);
keywordArray=  keywordArray.concat(arr);
keywordArray=  uniq(keywordArray);
	 console.dir(keywordArray);
  return {["censor"]: keywordArray};
}

function deleteAllKeyWords() {
   keywordArray=[];
  return {["censor"]: keywordArray};
}
//push  website address and return the object "censormedia" : "the pushed new array"
function makeMedia() {
	var newMediaCompleted = newMedia.value;//"*://www."+ newMedia.value+"/*";
   MediaArray.push(newMediaCompleted);
  return {["censorMedia"]: MediaArray};//"censorMedia"
}


//READ FROM File

document.getElementById('inputFile')
    .addEventListener('change', function() {

    var fr=new FileReader();
    fr.onload=function(){
      console.dir(fr.result);
        //document.getElementById('output')
                //.textContent=fr.result;
								var fileContent = fr.result;
								var textByLine = fileContent.split(/\n|\r|:/);
								console.dir(textByLine);
								var textByLine = textByLine.filter(e => e);
								console.dir(textByLine);
								for(var i=0; i<textByLine.length; i++){
									textByLine[i]=textByLine[i].replace(/[\n\r]+/g, '');
								}
								console.dir(textByLine);
								//for(var i=0; i<textByLine.length; i++){
									browser.storage.local.set(makewordArray(textByLine), () => {
											console.log("saved");
											location.href = '/blocklist.html' ;
									});
									//location.href = '/blocklist.html' ;
							//	}
    }

    fr.readAsText(this.files[0]);

})
