

// ** ARRAYS FOR ALPHABETS, NUMBERS AND SPECIAL CHARACTERS **

var alphaArray = new Array("q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m");

var numArray = new Array("7","8","9","4","5","6","1","2","3","0");

var SpCharArray = new Array("!","@","#","$","%","&","*","(",")","+","=","?",".");



var currSpArray = new Array();

var currAlphaArray = new Array();

var currNumArray = new Array();

var currControlArray = new Array();



// ** INTERMEDIATE ARRAYS WHICH WILL CARRY THE RANDOMIZED VALUES **

var randomAlpha = chooseNum(26, alphaArray);

var randomNum = chooseNum(10, numArray);

var randomSpChar = chooseNum(13, SpCharArray);



// ** THE FINAL ARRAYS WHICH WILL BE CALLED FROM THE MAIN SIGNON PAGE **

var finalAlphaImage = new Array();

var finalNumImage = new Array();

var finalSpCharImage = new Array();



// ** OTHER VARIABLES **

var caps			= 0;

var entry_field		= "";

var form_name		= "";

var textValue		= "";

var isUpper			= false;

var timeoutObj;

var selectedObj;

var isRandom		= true;

var isMouseClicked	= false;

var isProcessing	= false;

var	HOVER_TIMEOUT	= 500;
var HOVER_STOP		= 100;

//------------------------------------------------------------------------------

/**

	This function assign the value of function parameters to

	field "entry_field" and "form_name"

**/

function setKeyboardFocus(p_fieldid)

{

	//form_name	= p_formname;	

	entry_field = p_fieldid;

}

//------------------------------------------------------------------------------

/**

	This function changes the background style when user clicks on 

	"< Caps" button.

**/

function capsLock(q, fldItem)

{

	var l_obj;

	l_obj = document.getElementById(fldItem);



	if(q==0) {

		caps = 1;

		l_obj.style.background='#000080';

	} else {

		caps = 0;

		l_obj.style.background='#EFEFEF';

	}

}

//------------------------------------------------------------------------------

function showValue (p_obj)

{

	if (isProcessing) {

		return false;

	}
	
	if (document.getElementById(entry_field) == undefined) {
		
		return false; 
		
	}
	
	if (document.getElementById("elemC4").checked) {

		clearTimeout(timeoutObj);

		timeoutObj = null;

	}

	str = document.getElementById(entry_field).value;

	var l_tmp = p_obj.innerHTML;

	if (p_obj.innerHTML == "&amp;") {

		l_tmp = "&";

	}

	document.getElementById(entry_field).value = str + l_tmp;

	document.getElementById(entry_field).focus();

	if (isRandom) {

		doRandomize ();

	}

	return false;

}

//------------------------------------------------------------------------------

/**

   * THIS FUNCTION WILL RANDAMIZE THE ARRAYS

   * THIS IS THE MAIN FUNCTION TO RANDOMIZE THE ARRAYS THAT ARE PASSED

   * @PARAM nums, numArr

**/

function chooseNum(nums, numArr)

{

	if(nums>numArr.length) {

//		alert('You are trying to choose more elements from the array than it has!');

		return false;

	}



	var chooseArr=new Array();

	var tempArr = new Array();

	for (var l_i = 0; l_i < numArr.length; l_i++) {

		tempArr[l_i] = numArr[l_i];

	}



	for(var i=0; i<nums; i++) {

		chooseArr[chooseArr.length]=tempArr[Math.round((tempArr.length-1)*Math.random())];

		var temp=chooseArr[chooseArr.length-1];

		for(var j=0; j<tempArr.length; j++) {

			if(tempArr[j]==temp) {

				tempArr[j]=null;

				var tempArr2=new Array();

				for(var k=0; k<tempArr.length; k++)

					if(tempArr[k]!=null)

						tempArr2[tempArr2.length]=tempArr[k];

				tempArr=tempArr2;

				break;

			}

		}

	}

	return chooseArr;

}

//------------------------------------------------------------------------------

/**

   * THE FOLLOWING FUNCTIONS ARE CALLED TO DISPLAY THE IMAGES ON THE SIGNON PAGE.

   * THE FUNCTIONS ARE

   * imageAlphaOnPage() :: FOR ALPHABETS

   * imageNumOnPage()   :: FOR NUMBERS

   * imageSpCharOnPage():: FOR SPECIAL CHARAHTERS

   *

   * @PARAM i

**/



function imageAlphaOnPage(p_i)

{

	for(var n=0;n<randomAlpha.length+1;n++) {

		finalAlphaImage[n] = randomAlpha[p_i];

	}

	document.write('<button id="elemA' + p_i + '" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" OnClick="return showValue(this);">');

	document.write(finalAlphaImage[p_i]);

	document.write('</button>');

}

//------------------------------------------------------------------------------

function imageNumOnPage(p_i)

{

	for(var n=0;n<randomNum.length+1;n++) {

		finalNumImage[n] = randomNum[p_i];

	}

	document.write('<button id="elemN' + p_i + '" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" OnClick="return showValue(this);" >');

	document.write(finalNumImage[p_i]);

	document.write('</button>');

}

//------------------------------------------------------------------------------

function imageSpCharOnPage(p_i)

{

	for(var n=0;n<randomSpChar.length+1;n++) {

		finalSpCharImage[n] = randomSpChar[p_i];

	}

/*
	document.write('<button id="elemS' + p_i + '" onmouseover="startHover(this);" onmousedown="return changeToStar();" onmouseup="return changeBack();" onmouseout="return changeBack(),stopHover();" OnClick="return showValue(this);" >');

	document.write(finalSpCharImage[p_i]);

	document.write('</button>');
*/
}

//------------------------------------------------------------------------------

/**

   This function is called to disable the key stroke

**/



function disableKeyBoard(e)

{

	if (window.event){

		if (event.keyCode) {

			event.returnValue = false;

			event.keyCode = 0;

		}

	} else {

		if(navigator.appName == 'Netscape'){

			e.preventDefault();

		}

	}

	return false;

}



//------------------------------------------------------------------------------

/**

This function is used to change all characters on the virtual keyboard to an

asterisk

**/

function changeToStar()

{

	if (isProcessing) {

		return false;

	}


/*
	for (var l_i=0; l_i < SpCharArray.length; l_i++) {

		currSpArray[l_i] = document.getElementById('elemS' + l_i).innerHTML;

		document.getElementById('elemS' + l_i).innerHTML = "*";

	}
*/

	for (var l_i=0; l_i < alphaArray.length; l_i++) {

		currAlphaArray[l_i] = document.getElementById('elemA' + l_i).innerHTML;

		document.getElementById('elemA' + l_i).innerHTML = "*";

	}

	for (var l_i=0; l_i < numArray.length; l_i++) {

		currNumArray[l_i] = document.getElementById('elemN' + l_i).innerHTML;

		document.getElementById('elemN' + l_i).innerHTML = "*";

	}

	for (var l_i=0; l_i < 4; l_i++) {

		currControlArray[l_i] = document.getElementById('elemC' + l_i).innerHTML;

		document.getElementById('elemC' + l_i).innerHTML = "*";

	}

	isMouseClicked	= true;

	return false;

}

//------------------------------------------------------------------------------

/**

This function changes back the characters from asterisk to their original values

**/

function changeBack()

{

	if (!isMouseClicked) {

		return false;

	}

/*
	for (var l_i=0; l_i < SpCharArray.length; l_i++) {

		document.getElementById('elemS' + l_i).innerHTML = currSpArray[l_i];

	}
*/	

	for (var l_i=0; l_i < alphaArray.length; l_i++) {

		if (isUpper) {

			document.getElementById('elemA' + l_i).innerHTML 

				= currAlphaArray[l_i].toUpperCase();

		} else {

			document.getElementById('elemA' + l_i).innerHTML 

				= currAlphaArray[l_i].toLowerCase();

		}

	}

	for (var l_i=0; l_i < numArray.length; l_i++) {

		document.getElementById('elemN' + l_i).innerHTML = currNumArray[l_i];

	}

	for (var l_i=0; l_i < 4; l_i++) {

		document.getElementById('elemC' + l_i).innerHTML = currControlArray[l_i];

	}

	isMouseClicked	= false;

	isProcessing	= false;

	return false;

}

//------------------------------------------------------------------------------

/**

This function changes a flag indicating whether random characters should be 

displayed on every click or not.

**/

function setRandom()

{

	if (isRandom) {

		isRandom = false;

		document.getElementById('elemC3').innerHTML = "Mixed";

	} else {

		isRandom = true;

		document.getElementById('elemC3').innerHTML = "Not Mixed";

	}

	doRandomize();

	return false;

}

//------------------------------------------------------------------------------

/**

This function randomizes the characters on the virtual keyboard.

**/

function doRandomize()

{

	var l_sArray;

	var l_aArray;

	var l_nArray;



	if (! isRandom) {

		l_aArray = alphaArray;

		l_nArray = numArray;

		l_sArray = SpCharArray;

	} else {

		l_aArray = chooseNum(26, alphaArray);

		l_nArray = chooseNum(10, numArray);

		l_sArray = chooseNum(13, SpCharArray);

	}


/*
	for (var l_i=0; l_i < l_sArray.length; l_i++) {

		if (l_sArray[l_i] == "&") {

			document.getElementById('elemS' + l_i).innerHTML = "&amp;";

		} else {

		document.getElementById('elemS' + l_i).innerHTML = l_sArray[l_i];

		}

	}
*/

	for (var l_i=0; l_i < l_aArray.length; l_i++) {

		if (isUpper) {

			document.getElementById('elemA' + l_i).innerHTML 

				= l_aArray[l_i].toUpperCase();

		} else {

			document.getElementById('elemA' + l_i).innerHTML 

				= l_aArray[l_i].toLowerCase();

		}

	}

	for (var l_i=0; l_i < l_nArray.length; l_i++) {

		document.getElementById('elemN' + l_i).innerHTML = l_nArray[l_i];

	}

	return false;

}

//------------------------------------------------------------------------------

/**

This function sets a flag indicating whether alphabets are to be displayed in

upper case of lower case.

**/

function setCase()

{

	if (isUpper) {

		isUpper = false;

		document.getElementById('elemC0').innerHTML = "Upper";

	} else {

		isUpper = true;

		document.getElementById('elemC0').innerHTML = "Lower";

	}

	changeCase();

	return false;

}

//------------------------------------------------------------------------------

/**

This function changes the case of all alphabets.

**/

function changeCase()

{

	var l_aArray;



	if (! isRandom) {

		l_aArray = alphaArray;

	} else {

		l_aArray = chooseNum(26, alphaArray);

	}



	for (var l_i=0; l_i < l_aArray.length; l_i++) {

		if (isUpper) {

			document.getElementById('elemA' + l_i).innerHTML 

				= l_aArray[l_i].toUpperCase();

		} else {

			document.getElementById('elemA' + l_i).innerHTML 

				= l_aArray[l_i].toLowerCase();

		}

	}

	return false;

}

//------------------------------------------------------------------------------

/**

This function is triggered when the user starts hovering a particular key.

**/

function startHover(p_obj) {

	if (document.getElementById("elemC4").checked) {

		if (timeoutObj != null) {

			clearTimeout (timeoutObj);

		}

		selectedObj = p_obj;

		//timeoutObj = setTimeout ("showVal()", HOVER_TIMEOUT);
		timeoutObj = setTimeout (function() {
			showVal();
		}, HOVER_TIMEOUT);
	}

}

//------------------------------------------------------------------------------

/**

This function clears the timer. It gets triggered whenever a user moves out

his mouse from a key.

**/

function stopHover() {

	if (document.getElementById("elemC4").checked) {

		clearTimeout(timeoutObj);

		timeoutObj = null;

		changeBack();

	}

}

//------------------------------------------------------------------------------

/**

This function is called whenever a timeout value exceeds. It is a dummy

function that is used to call the 

**/

function showVal() {

	if (isMouseClicked) {

		return false;

	}

	showValue(selectedObj);

	changeToStar();

	selectedObj = null;

	isProcessing = true;

	//setTimeout("stopHover()",200);
	stopHover();
	/*setTimeout(function() {
		stopHover();
	}, HOVER_STOP);*/

}

//------------------------------------------------------------------------------