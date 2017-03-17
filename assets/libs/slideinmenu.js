/**
* 
* Find more about the slide down menu at
* http://cubiq.org/slide-in-menu
*
* Copyright (c) 2010 Matteo Spinelli, http://cubiq.org/
* Released under MIT license
* http://cubiq.org/dropbox/mit-license.txt
* 
* Version 0.1beta1 - Last updated: 2010.05.28
* 
*/

var hasTouch = 'ontouchstart' in window,
	isMSIE = window.navigator.msPointerEnabled,
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';
	
	/*START_EV = isMSIE ? 'MSPointerDown' : START_EV,
	MOVE_EV = isMSIE ? 'MSPointerMove' : MOVE_EV,
	END_EV = isMSIE ? 'MSPointerUp' : END_EV,
	CANCEL_EV = isMSIE ? 'MSPointerUp' : 'mouseup';*/
var isAndroid = (/android/gi).test(navigator.appVersion),
	isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion),
	isWebKit = (/webkit/gi).test(navigator.appVersion),
	//isIEMobile = (/IEMobile/gi).test(navigator.appVersion),
	translateZ = ' translateZ(0)';//isWebKit ? ' translateZ(0)' : ' translateZ(0)';
	
var prefix = (function () {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	var jsVendor = (pre=='ms')? pre : (pre[0].toUpperCase() + pre.substr(1));
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: jsVendor
  };
})();

function slideInMenu(el, opened, typeSide) {
    this.isOpen = false;
    this.container = document.getElementById(el);
    this.handle = this.container.querySelector('.handle');
    this.openedPosition = 250;

    this.container.style.opacity = '1';
    //this.container.style.top = '-' + this.openedPosition + 'px';
    //this.container.style.webkitTransitionProperty = prefix.css + 'transform';
	var transitionProperty = prefix.js + 'TransitionProperty';
	this.container.style[transitionProperty] = prefix.css + 'transform';
	var transitionDuration = prefix.js + 'TransitionDuration';
    
	if (prefix.lowercase == 'ms') {
		this.container.style[transitionDuration] = '350ms';
	}
	else {
		this.container.style[transitionDuration] = '500ms';
	}
	
    if (opened === true) {
        this.open();
    }
	
	this.isRightSide = false;
	if (typeSide) { //true: slide right to left; false: slide left to right
		this.isRightSide = true;
	}
	
    //this.handle.addEventListener(START_EV, this);
}

slideInMenu.prototype = {
    pos: 0,
    opened: false,
	
    handleEvent: function (e) {
        switch (e.type) {
            case START_EV: this.touchStart(e); break;
//            case MOVE_EV: this.touchMove(e); break;
            case END_EV: this.touchEnd(e); break;
        }
    },

    setPosition: function (pos) {
        this.pos = pos;
		var transformJS = prefix.js + 'Transform';
		//var transitionTiming = prefix.js + 'TransitionTimingFunction';
		//this.container.style[transitionTiming] = 'ease linear ease';
        //this.container.style.webkitTransform = 'translate3d(' + pos + 'px,0,0)';
		
		//this.container.style[transformJS] = 'translate3d(' + pos + 'px,0,0)';
		if(!this.isRightSide) {
			this.container.style[transformJS] = 'translate(' + pos + 'px,0)' + translateZ;
		}
		else {
			this.container.style[transformJS] = 'translate(' + -pos + 'px,0)' + translateZ;
		}
		
        if (this.pos == this.openedPosition) {
            this.opened = true;
        } else if (this.pos == 0) {
            this.opened = false;
        }
    },

    touchStart: function (e) {
//        e.preventDefault();
//        e.stopPropagation();
		/*var transitionDuration = prefix.js + 'TransitionDuration';
        this.container.style[transitionDuration] = '0';
        this.startPos = this.pos;
		if (hasTouch) {
			this.startDelta = e.touches[0].pageX - this.pos;
		}
        else {
			this.startDelta = e.pageX - this.pos;
		}

//        this.handle.addEventListener(MOVE_EV, this);
        this.handle.addEventListener(END_EV, this);*/
    },

//    touchMove: function (e) {
//	if (hasTouch) {
//        var delta = e.touches[0].pageX - this.startDelta;
//	}
//	else {
//        var delta = e.pageX - this.startDelta;
//	}
//
//        if (delta < 0) {
//            delta = 0;
//        } else if (delta > this.openedPosition) {
//            delta = this.openedPosition;
//        }
//
//        this.setPosition(delta);
//    },

    touchEnd: function (e) {
        /*var strokeLength = this.pos - this.startPos;
        strokeLength *= strokeLength < 0 ? -1 : 1;
		var transitionDuration = prefix.js + 'TransitionDuration';
        if (strokeLength > 3) {		// It seems that on Android is almost impossibile to have a tap without a minimal shift, 3 pixels seems a good compromise
			
        	this.container.style[transitionDuration] = '200ms';
            //this.container.style.webkitTransitionDuration = '200ms';
            if (this.pos == this.openedPosition || !this.opened) {
                this.setPosition(this.pos > this.openedPosition / 3 ? this.openedPosition : 0);
            } else {
                this.setPosition(this.pos > this.openedPosition ? this.openedPosition : 0);
            }
        } else {
            //this.container.style.webkitTransitionDuration = '400ms';
			this.container.style[transitionDuration] = '400ms';
            this.setPosition(!this.opened ? this.openedPosition : 0);
        }

//        this.handle.removeEventListener(MOVE_EV, this);
        this.handle.removeEventListener(END_EV, this);*/
    },

    open: function () {
        this.setPosition(this.openedPosition);
        this.isOpen = true;
    },

    close: function () {
        this.setPosition(0);
        this.isOpen = false;
    },

    toggle: function () {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    },
    destroy: function(){
        this.handle.removeEventListener(START_EV, this);
    }
}
