function tabsLoad() {
  // get tab container
  	var container = document.getElementById("tabContainer");
	var listTab = document.getElementById("tabs");
	var tabcon = document.getElementById("tabscontent");
		//alert(tabcon.childNodes.item(1));
    // set current tab
    var navitem = document.getElementById("tabHeader_1");
		
    //store which tab we are on
    var ident = navitem.id.split("_")[1];
		//alert(ident);
    navitem.parentNode.setAttribute("data-current",ident);
    //set current tab with class of activetabheader
    navitem.setAttribute("class","item selected");

    //hide two tab contents we don't need

	var pages = tabcon.getElementsByTagName("div");
	for (var i = 1; i < pages.length; i++) {
	 pages.item(i).style.display="none";
	};
	
	//this adds click event to tabs
	
	var tabs = listTab.getElementsByClassName("item");
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].setAttribute("onclick", "displayPage(" + (i + 1) + ")");
	}
	
}

function tabsLoadForInit(listEvent) {
  // get tab container
  	var container = document.getElementById("tabContainer");
	var tabcon = document.getElementById("tabscontent");
		//alert(tabcon.childNodes.item(1));
    // set current tab
    var navitem = document.getElementById("tabHeader_1");
		
    //store which tab we are on
    var ident = navitem.id.split("_")[1];
		//alert(ident);
    navitem.parentNode.setAttribute("data-current",ident);
    //set current tab with class of activetabheader
    navitem.setAttribute("class","item selected");
    //hide two tab contents we don't need
	/*
   	 var pages = tabcon.getElementsByTagName("div");
    	for (var i = 1; i < pages.length; i++) {
     	 pages.item(i).style.display="none";
		};
	*/
    //this adds click event to tabs
    var tabs = container.getElementsByTagName("div");
    for (var i = 0; i < tabs.length; i++) {
		var method = listEvent[i];
      	tabs[i].setAttribute("onclick","displayPageForLoad(" + i + "," + listEvent[i] + ")");
    }
}

// on click of one of tabs
function displayPage(index) {
	var container = document.getElementById("tabContainer");
	var listTab = document.getElementById("tabs");
	var tabs = listTab.getElementsByClassName("item");
	var tab = tabs[index - 1];
	var current = tab.parentNode.getAttribute("data-current");
	//remove class of activetabheader and hide old contents
	document.getElementById("tabHeader_" + current).setAttribute("class","item");
	document.getElementById("tabpage_" + current).style.display="none";
	
	var ident = tab.id.split("_")[1];
	//add class of activetabheader to new active tab and show contents
	tab.setAttribute("class","item selected");
	document.getElementById("tabpage_" + ident).style.display="block";
	tab.parentNode.setAttribute("data-current",ident);
}

// on click of one of tabs
function displayPageForLoad(index,method) {
	if(method && (typeof method == "function")) {
		method();
	}
	var container = document.getElementById("tabContainer");
	var tabs = container.getElementsByTagName("div");
	var tab = tabs[index];
	var current = tab.parentNode.getAttribute("data-current");
	//remove class of activetabheader and hide old contents
	document.getElementById("tabHeader_" + current).setAttribute("class","item");
	document.getElementById("tabpage_" + current).style.display="none";
	var ident = tab.id.split("_")[1];
	//add class of activetabheader to new active tab and show contents
	tab.setAttribute("class","item selected");
	document.getElementById("tabpage_" + ident).style.display="block";
	tab.parentNode.setAttribute("data-current",ident);
  
}