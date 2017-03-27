/**
 * Customized Calendar/Datepicker control
 *
 * @author   Shushik <silkleopard@yandex.ru>
 * @version  2.0
 * @example  http://silkleo.com/fun/b-datepicker/
 * @homepage http://github.com/Shushik/b-datepicker/
 *
 * @constructor
 *
 * @this   {DatePicker}
 * @param  {undefined|object}
 * @param  {undefined|object}
 * @return {this}
 */
;function
    DatePicker(funcs, conf) {
        if (arguments.length) {
            this.init(funcs, conf);
        }
    }

    /**
     * Common regular expressions
     *
     * @private
     *
     * @value {object}
     */
    DatePicker.prototype._rexp = {
        inside   : /[\s\S]*b-datepicker(__(bwd|fwd|day|hide|field))?[\s\S]*/g,
        mobile   : /(Android|iPhone|iPad|iPod)/i,
        disabled : /[\s\S]*_is_disabled[\s\S]*/i
    }

    /**
     * Initialize the datepicker module
     *
     * @this   {DatePicker}
     * @param  {undefined|object}
     * @param  {undefined|object}
     * @return {this}
     */
    DatePicker.prototype.init = function(funcs, conf) {
        conf  = conf  || {};
        funcs = funcs || {};

        var
            it0 = DatePicker.total,
            al0 = '',
            raw = null;

        // Set the main properties
        this._blur       = true;
        this.shown       = false;
        this.id          = DatePicker.last + 1;
        this._dom        = {};
        this._conf       = {};
        this._data       = {};
        this._prox       = {};
        this._funcs      = {};
        this._range      = {};
        this._timers     = {};
        this.subscribers = {};

        // Cache the link to this datepicker instance
        DatePicker.installed[this.id] = this;

        if (conf.dom_id) {
            DatePicker.installed[conf.dom_id] = DatePicker.installed[this.id];
            this.id = conf.dom_id;
        }

        // Set the counter
        DatePicker.total++;

        // Clone the user given params
        for (al0 in conf) {
            this._conf[al0] = conf[al0];
        }

        // Clone the user given handlers
        for (al0 in funcs) {
            this._funcs[al0] = funcs[al0];
        }

        // Save the language settings
        if (conf.dictionaries) {
            for (al0 in conf.dictionaries) {
                HumanDate.language(al0, conf.dictionaries[al0]);
            }
        }

        // Do the rest
        this._setup();
        this._alive();
        this._draw(this._range.now);

        return this;
    }

    /**
     * Remove the calendar instance
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype.uninstall = function() {
		var hasTouch = 'ontouchstart' in window;
		/*
        var
            id     = this.id,
            click  = window.navigator.userAgent.match(this._rexp.mobile) ?
                     'touchstart' :
                     'mousedown',
            method = '',
            prefix = '';
		*/
		var
            id     = this.id,
            click  = hasTouch ? 'touchstart' : 'mousedown',
            method = '',
            prefix = '';
        // Choose the method to set the event handler
        if (window.removeEventListener) {
            method = 'removeEventListener';
        } else {
            method = 'detachEvent';
            prefix = 'on';
        }

        // Unset the field events handlers
        if (this._dom.field) {
            this._dom.field[method](
                prefix + 'blur',
                this._prox.route
            );

            this._dom.field[method](
                prefix + 'focus',
                this._prox.route
            );
        }

        // Unset the block events handlers
        (
            document.documentElement ?
            document.documentElement :
            document
        )[method](
            prefix + click,
            this._prox.route
        );

        // Unset the window resize event handler
        if (this._conf.auto_position === false && this._dom.field) {
            window[method](
                prefix + 'resize',
                this._prox.route
            );
        }

        // Remove the instance link
        delete DatePicker.installed[id];
        DatePicker.total--;
    }

    /**
     * Reset calendar instance to the default settings
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype.reset = function() {
        if (this._data.self) {
            delete this._data.self;
        }

        if (this._data.that) {
            delete this._data.that;
        }

        this._setup4range();

        if (this.shown) {
            this._draw();
        }
    }

    /**
     * Fill the main objects
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._setup = function() {
        // Run parts setupers
        this._setup4range();
        this._setup4prox();
        this._setup4self();
        this._setup4piece('bwd');
        this._setup4piece('fwd');
        this._setup4piece('hat');
        this._setup4piece('week');
        this._setup4piece('month');
        this._setup4piece('hide');

        // Set the default template for calendar header
        if (!this._conf.tmpl_hat) {
            this._conf.tmpl_hat = 'F Y';
        }

        // Set the default template for calendar input
        if (!this._conf.tmpl_input && this._conf.auto_position === false) {
            this._conf.tmpl_input = 'd M';
        }

        // Input the calendar main node into rightful place
        this._dom.target.appendChild(this._dom.self);
    }

    /**
     * Get the proxifyed links to instance methods
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._setup4prox = function() {
        this._prox.hide     = this._proxy(this.hide,      this);
        this._prox.show     = this._proxy(this.snow,      this);
        this._prox.place    = this._proxy(this.place,     this);
        this._prox.route    = this._proxy(this._route,    this);
        this._prox.select   = this._proxy(this._select,   this);
        this._prox.deselect = this._proxy(this._deselect, this);
    }

    /**
     * Get and create main calendar nodes
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._setup4self = function() {
        var
            ch0   = typeof this._conf.dom_target,
            ch1   = typeof this._conf.dom_field,
            ch2   = '',
            field = null;

        // Get the node where the calendar will be placed
        if (ch0 === 'string') {
            this._dom.target = document.querySelectorAll(this._conf.dom_target);
        } else if (ch0 === 'object') {
            this._dom.target = this._conf.dom_target;
        } else {
            this._dom.target = document.body;
        }

        // Get the input node if exists
        if (ch1 === 'string') {
            field = this._dom.field = document.querySelectorAll(this._conf.dom_field);
        } else if (ch1 === 'object') {
            field = this._dom.field = this._conf.dom_field;
        } else {
            this._conf.auto_position = false;
        }

        // Decide what property use to get and set the field value
        if (field) {
            ch2 = field.tagName.toLowerCase();

            if (
                ch2 == 'input' ||
                ch2 == 'button' ||
                ch2 == 'select' ||
				ch2 == 'span' ||
                ch2 == 'textarea'
            ) {
                this._dom.value = 'value';
            } else {
                this._dom.value = 'innerHTML';
            }
        }

        // Create the main calendar wrapper node
        this._dom.self = document.createElement('div');
        this._dom.self.className = 'b-datepicker b-datepicker_id_' + this.id;
    }

    /**
     * Create a dom tree for a given piece of calendar
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {string}
     * @return {undefined}
     */
    DatePicker.prototype._setup4piece = function(alias) {
        var
            node = this._dom[alias] = document.createElement('div');

        node.className = 'b-datepicker__' + alias;

        this._dom.self.appendChild(node);
    }

    /**
     * Get the current, minimal and maximal dates in
     * a calendar range
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._setup4range = function() {
        var
            day   = 0,
            year  = 0,
            month = 0;

        // Get the current date in range
        this._conf.range_now = HumanDate.parse(this._conf.range_now);

        day   = this._conf.range_now.getDate();
        year  = this._conf.range_now.getFullYear();
        month = this._conf.range_now.getMonth();

        // Get the minimal date in range
        if (this._conf.range_min) {
			// HaiNK: firefox thi parse dinh dang khac
			var arrDate = this._conf.range_min.split("-");
			var date = new Date(arrDate[2], arrDate[0]-1, arrDate[1]);
			/*var strDate = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
			var month = date.getMonth()+1;
			year = date.getFullYear();
			
			var month  = month >= 10 ? month : "0" + month;
			if((browserName == 'Firefox' && browserVersion > 8)) {
				this._conf.range_min = strDate + '-' + month + '-' + date.getFullYear();
			}
			if((browserName == 'Safari' && browserVersion > 3)) {
				this._conf.range_min = date.getFullYear() + '-' + month + '-' + strDate;
			}
			this._conf.range_min = HumanDate.parse(this._conf.range_min);	
			*/
			 this._conf.range_min = date;// new Date(year, month, strDate);		
        } else {
            this._conf.range_min = new Date(year, month, day - 1);
        }

        // Get the maximum date in range
        if (this._conf.range_max) {
			// HaiNK: firefox thi parse dinh dang khac
			var arrDate = this._conf.range_max.split("-");
			var date = new Date(arrDate[2], arrDate[0]-1, arrDate[1]);
			/*var strDate = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
			var month = date.getMonth()+1;
			var month  = month >= 10 ? month : "0" + month;
			if((browserName == 'Firefox' && browserVersion > 8)) {
				this._conf.range_max = strDate + '-' + month + '-' + date.getFullYear();
			}
			if((browserName == 'Safari' && browserVersion > 3)) {
				this._conf.range_max = date.getFullYear() + '-' + month + '-' + strDate;
			}
            this._conf.range_max = HumanDate.parse(this._conf.range_max);
			*/
			this._conf.range_max = date;//new Date(year + 1, month, day);
        } else {
            this._conf.range_max = new Date(year + 1, month, day);
        }

        // Set the range object
        this._range.max = this._conf.range_max;
        this._range.min = this._conf.range_min;
        this._range.now = this._conf.range_now;
    }

    /**
     * Bind events handlers
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._alive = function() {
        var hasTouch = 'ontouchstart' in window;
		/*
        var
            id     = this.id,
            click  = window.navigator.userAgent.match(this._rexp.mobile) ?
                     'touchstart' :
                     'mousedown',
            method = '',
            prefix = '';
		*/
		var
            id     = this.id,
            click  = hasTouch ? 'touchstart' : 'mousedown',
            method = '',
            prefix = '';

        // Choose the method to set the event handler
        if (window.addEventListener) {
            method = 'addEventListener';
        } else {
            method = 'attachEvent';
            prefix = 'on';
        }

        // Set the field events handlers
        if (this._dom.field) {
            this._dom.field[method](
                prefix + 'blur',
                this._prox.route
            );

            this._dom.field[method](
                prefix + 'focus',
                this._prox.route
            );
        }

        // Set the block events handlers
        (
            document.documentElement ?
            document.documentElement :
            document
        )[method](
            prefix + click,
            this._prox.route
        );

        // Set the window resize event handler
        if (this._conf.auto_position === false && this._dom.field) {
            window[method](
                prefix + 'resize',
                this._prox.route
            );
        }
    }

    /**
     * Route event to handlers
     *
     * @private
     *
     * @this   {HumanCells}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._route = function(event) {
        event = event || window.event;

        var
            it0   = 0,
            type  = event.type,
            node  = event.target,
            code  = 0,
            where = '';

        // For touch interfaces
        if (type == 'touchstart') {
            type = 'mousedown';
        }

        // Target
        if (!node) {
            node = event.srcElement;
        }

        // Skip the text node
        if (node && node.nodeType === 3) {
            node = node.parentNode;
        }

        if (type === 'resize') {
            if (this._timers.place) {
                clearTimeout(this._timers.place);
            }

            this._timers.place = setTimeout(this._prox.place, 5);
        } else if (this._dom.field && node === this._dom.field) {
            if (this['_' + type + '4field']) {
                this['_' + type + '4field'](event);
            }
        } else if (node.className && node.className.match(this._rexp.inside) && this.shown) {
            where = node.className.replace(this._rexp.inside, '$2');

            if (type === 'mousedown' && event.preventDefault) {
                event.preventDefault();
            }

            this._blur = false;

            if (!node.className.match(this._rexp.disabled) && this['_' + type + '4' + where]) {
                this['_' + type + '4' + where](event);
            }
        } else {
            this.hide();
        }
    }

    /**
     * Mousedown event handler for the bwd control
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._mousedown4bwd = function(event) {
        this.bwd();
    }

    /**
     * Mousedown event handler for the day control
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._mousedown4day = function(event) {
        var
            al0  = '',
            days = this._dom.days,
            node = event.target;

        if (node.parentNode === this._dom.month) {
            for (al0 in days) {
                if (days[al0] === node) {
                    this.select(al0);
                    break;
                }
            }
        }
    }

    /**
     * Mousedown event handler for the fwd control
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._mousedown4fwd = function(event) {
        this.fwd();
    }

    /**
     * Mousedown event handler for the hide control
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._mousedown4hide = function(event) {
        this.hide();
    }

    /**
     * Blur event handler for the input
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._blur4field = function(event) {
        if (this._blur) {
            this.hide();
        }

        this._blur = true;
    }

    /**
     * Focus event handler for the input
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._focus4field = function(event) {
        this._mousedown4field(event);
    }

    /**
     * Mousedown event handler for the input
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._mousedown4field = function(event) {
        this._blur = true;

        this.show();
    }

    /**
     * Touchstart event handler for the input
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {Event}
     * @return {undefined}
     */
    DatePicker.prototype._touchstart4field = function(event) {
        this._mousedown4field(event);
    }

    /**
     * Draw the given month
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {undefined|string|Date}
     * @return {undefined}
     */
    DatePicker.prototype._draw = function(now) {
        var
            raw = null;

        // Set the 
        if (now !== undefined || !this._data.raw) {
            raw = this._data.raw = HumanDate.parse(now);

            this._data.month = raw.getMonth();
            this._data.year  = raw.getFullYear();
            this._data.days  = HumanDate.api(raw);
            this._data.day   = raw.getDate();
        }

        // 
        this._draw4bwd();
        this._draw4fwd();
        this._draw4hat();
        this._draw4hide();
        this._draw4week();
        this._draw4month();
    }

    /**
     * Draw the calendar bwd control
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._draw4bwd = function() {
        var
            bwd = new Date(
                this._data.year,
                this._data.month,
                0
            );
		/*
		HaiNK: cho phép next, previous khi ngay hien nay khong nam trong khoang available
        if (HumanDate.inside(bwd, this._range.min, this._range.max)) {
            this._dom.bwd.className = 'b-datepicker__bwd ' +
                                      'b-datepicker__bwd_is_enabled';
        } else {
            this._dom.bwd.className = 'b-datepicker__bwd ' +
                                      'b-datepicker__bwd_is_disabled';
        }
		*/
        if (this._conf.text_bwd) {
            this._dom.bwd.innerHTML = this._conf.text_bwd;
        }

        this._dom.bwd.title = HumanDate.locales[HumanDate.locales.curr].
                              common.bwd;
    }

    /**
     * Draw the calendar fwd control
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._draw4fwd = function() {
        var
            fwd = new Date(
                this._data.year,
                this._data.month + 1,
                1
            );
			
		/*
		HaiNK: cho phép next, previous khi ngay hien nay khong nam trong khoang available
        if (HumanDate.inside(fwd, this._range.min, this._range.max)) {
            this._dom.fwd.className = 'b-datepicker__fwd ' +
                                      'b-datepicker__fwd_is_enabled';
        } else {
            this._dom.fwd.className = 'b-datepicker__fwd ' +
                                      'b-datepicker__fwd_is_disabled';
        }
		*/
        if (this._conf.text_fwd) {
            this._dom.bwd.innerHTML = this._conf.text_fwd;
        }

        this._dom.fwd.title = HumanDate.locales[HumanDate.locales.curr].
                              common.fwd;
    }

    /**
     * Draw the calendar hat
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._draw4hat = function() {
        this._dom.hat.innerHTML = HumanDate.human(
            this._data.raw,
            this._conf.tmpl_hat
        );
    }

    /**
     * Draw the calendar hide control
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._draw4hide = function() {
        this._dom.hide.innerHTML = HumanDate.locales[HumanDate.locales.curr].common.hide
    }

    /**
     * Draw the calendar week days
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._draw4week = function() {
        var
            it0  = 0,
            ln0  = 7,
            days = HumanDate.locales[HumanDate.locales.curr].weekdays.motu.split(HumanDate.sep),
            node = null;

        // Clean the weekdays
        this._dom.week.innerHTML = '';

        while (it0 < ln0) {
            node = document.createElement('div');
            node.className = 'b-datepicker__day';
            node.innerHTML = days[it0];
            this._dom.week.appendChild(node);

            it0++;
        }
    }

    /**
     * Draw the calendar month days
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._draw4month = function() {
        var
            day  = 0,
            it0  = 0,
            ln0  = this._data.days.length,
            ch0  = '',
            ch1  = new Date(
                       this._range.now.getFullYear(),
                       this._range.now.getMonth(),
                       this._range.now.getDate()
                   ).toString(),
            ch2  = this._data.self ?
                   this._data.self :
                   null,
            ch3  = this._data.that ?
                   this._data.that :
                   null,
            ch4  = ch2 ? ch2.toString() : '',
            ch5  = ch3 ? ch3.toString() : '',
            max  = new Date(
                       this._data.year,
                       this._data.month + 1,
                       0
                   ),
            min  = new Date(
                       this._data.year,
                       this._data.month,
                       1
                   ),
            now  = null,
            node = null;

        // Clean the month days
        this._dom.days = {};
        this._dom.month.innerHTML = '';

        // Iterate through the days
        while (it0 < ln0) {
            now = this._data.days[it0];
            day = now.getDate();
            ch0 = now.toString();

            // Create the day node
            node = this._dom.days[ch0] = document.createElement('div');
            node.className = 'b-datepicker__day';
            node.innerHTML = day;

            // Set the future or the past indicators
            if (now > max) {
                node.className += ' b-datepicker__day_in_future';
            } else if (now < min) {
                node.className += ' b-datepicker__day_in_past';
            }

            // Mark the holidays
            if (HumanDate.holiday(now)) {
                node.className += ' b-datepicker__day_is_holiday';
            }

            // Select the range points
            if (ch0 == ch4 || ch0 == ch5) {
                node.className += ' b-datepicker__day_is_selected';
            }

            // Make the range selection
            if (ch2 && ch3) {
                if (
                    HumanDate.inside(now, ch2, ch3) ||
                    HumanDate.inside(now, ch3, ch2)
                ) {
                    node.className += ' b-datepicker__day_in_range';
                }
            }

            // Mark today
            if (ch0 == ch1) {
                node.className += ' b-datepicker__day_is_today';
            }

            // Activate or deactivate the day
            if (HumanDate.inside(now, this._range.min, this._range.max)) {
                node.className += ' b-datepicker__day_is_enabled';

                node.setAttribute('data-day',   day);
                node.setAttribute('data-year',  now.getFullYear());
                node.setAttribute('data-month', now.getMonth());
            } else {
                node.className += ' b-datepicker__day_is_disabled';
            }

            // Save the day node
            this._dom.month.appendChild(node);

            it0++;
        }
    }

    /**
     * Show the datepicker block
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype.show = function() {
        if (this.shown) {
            return this;
        }

        // Make the calendar become visible
        this._draw();

        this.shown = true;

        this._dom.self.className = 'b-datepicker ' +
                                   'b-datepicker_id_' + this.id + ' ' +
                                   'b-datepicker_is_visible';

        this.place();

        // Run the user given show handler
        if (this._funcs.show) {
            this._funcs.show(this._data.raw);
        }
		
		//HUYNT2
		var pMaskScr = document.getElementById('mask-blacktrans');
		if(pMaskScr != undefined && pMaskScr != null) {
			pMaskScr.style.display = '';
			pMaskScr.style.zIndex = '999';
		}
		
        return this;
    }

    /**
     * Hide the datepicker block
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype.hide = function() {
        if (!this.shown) {
            return this;
        }

        // Make the calendar become invisible
        this.shown = false;

        this._dom.self.className = 'b-datepicker ' + 
                                   'b-datepicker_id_' + this.id;

        // Run the user given show handler
        if (this._funcs.hide) {
            this._funcs.hide(this._data.raw);
        }
		
		//HUYNT2
		var pMaskScr = document.getElementById('mask-blacktrans');
		if(pMaskScr != undefined && pMaskScr != null) {
			pMaskScr.style.display = 'none';
			pMaskScr.style.zIndex = '0';
		}
		
        return this;
    }

    /**
     * Move calendar to a needed date
     *
     * @this   {DatePicker}
     * @param  {undefined|string|Date}
     * @return {this}
     */
    DatePicker.prototype.seek = function(to) {
        var
            raw = this._data.raw = HumanDate.parse(to);

        // Set the new date properties
        this._data.month = raw.getMonth();
        this._data.year  = raw.getFullYear();
        this._data.days  = HumanDate.api(raw);
        this._data.day   = raw.getDate();

        // Redraw the calendar
        if (this.shown) {
            this._draw();
        }

        // Run the user given seek handler
        if (this._funcs.seek) {
            this._funcs.seek(to);
        }

        return this;
    }

    /**
     * Move the calendar to the previous month
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype.bwd = function() {
        var
            raw = new Date(this._data.year, this._data.month - 1, 1);

        this.seek(raw);

        return this;
    }

    /**
     * Move the calendar to the next month
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype.fwd = function() {
        var
            raw = new Date(this._data.year, this._data.month + 1, 1);

        this.seek(raw);

        return this;
    }

    /**
     * Select a date and run a user given handler
     *
     * @this   {DatePicker}
     * @param  {undefined|string|Date}
     * @return {this}
     */
    DatePicker.prototype.select = function(point) {
        this._data.tmp = point;

        // Run a user given select handler
        if (this._funcs.select) {
            if (this._conf.async_selection) {
                this._funcs.select(
                    HumanDate.parse(point),
                    {
                        done : this._prox.select,
                        hide : this._prox.hide
                    }
                );
            } else {
                this._funcs.select(HumanDate.parse(point));
                this._select();
            }
        } else {
            this._select();
        }

        return this;
    }

    /**
     * Finish the date selection
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._select = function() {
        this.self(this._data.tmp);
        this._pub();
        delete this._data.tmp;

        if (this.shown) {
            this._draw();
        }

        if (this._conf.fill_field !== false) {
            this.fill(this._data.self);
        }
    }

    /**
     * Remove the selection
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype.deselect = function() {
        // Run a user given select handler
        if (this._funcs.deselect) {
            if (this._conf.async_selection) {
                this._funcs.deselect({
                    done : this._prox.deselect,
                    hide : this._prox.hide
                });
            } else {
                this._funcs.select(HumanDate.parse(point));
                this._deselect();
            }
        } else {
            this._deselect();
        }
    }

    /**
     * Finish the deselection
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._deselect = function() {
        this._unpub();
        this.self(null);

        if (this.shown) {
            this._draw();
        }
    }

    /**
     * Fill a field with a date value
     *
     * @this   {DatePicker}
     * @param  {undefined|number|string|Date}
     * @return {this}
     */
    DatePicker.prototype.fill = function(val) {
        if (this._dom.field) {
            this._dom.field[this._dom.value] = HumanDate.human(val, this._conf.tmpl_field);
        }

        return this;
    }

    /**
     * Set the first point of selection
     *
     * @this   {DatePicker}
     * @param  {undefined|Date}
     * @return {null|Date}
     */
    DatePicker.prototype.self = function(self) {
        var
            raw = null;

        if (self === null) {
            this._data.self = null;
        } else if (self !== undefined) {
            raw = HumanDate.parse(self);

            this._data.self = new Date(
                raw.getFullYear(),
                raw.getMonth(),
                raw.getDate()
            );
        }

        return this._data.self ? this._data.self : null;
    }

    /**
     * Set the last point of selection
     *
     * @this   {DatePicker}
     * @param  {undefined|Date}
     * @return {null|Date}
     */
    DatePicker.prototype.that = function(that) {
        var
            raw = null;

        if (that === null) {
            this._data.that = null;
        } else if (that !== undefined) {
            raw = HumanDate.parse(that);

            this._data.that = new Date(
                raw.getFullYear(),
                raw.getMonth(),
                raw.getDate()
            );
        }

        return this._data.that ? this._data.that : null;
    }

    /**
     * Get the maximal active point from the calendar range
     *
     * @this   {DatePicker}
     * @param  {undefined|Date}
     * @return {Date}
     */
    DatePicker.prototype.max = function(max) {
        var
            raw = null;

        if (max !== undefined) {
            raw = HumanDate.parse(max);

            this._range.max = new Date(
                raw.getFullYear(),
                raw.getMonth(),
                raw.getDate() + 1
            );

            return raw;
        }

        raw = this._range.max;

        return new Date(
            raw.getFullYear(),
            raw.getMonth(),
            raw.getDate() - 1
        );
    }

    /**
     * Get the minimal active point from the calendar range
     *
     * @this   {DatePicker}
     * @param  {undefined|Date}
     * @return {Date}
     */
    DatePicker.prototype.min = function(min) {
        var
            raw = null;

        if (min !== undefined) {
            raw = HumanDate.parse(min);

            this._range.min = new Date(
                raw.getFullYear(),
                raw.getMonth(),
                raw.getDate() - 1
            );

            return raw;
        }

        raw = this._range.min;

        return new Date(
            raw.getFullYear(),
            raw.getMonth(),
            raw.getDate() + 1
        );
    }

    /**
     * Get the current point from the calendar range
     *
     * @this   {DatePicker}
     * @param  {undefined|Date}
     * @return {Date}
     */
    DatePicker.prototype.now = function(now) {
        if (now !== undefined) {
            this._range.now = HumanDate.parse(now);
        }

        return this._range.now;
    }

    /**
     * Move the calendar to a given position
     * or count the position using the DOM offsets
     *
     * @this   {DatePicker}
     * @param  {undefined|object}
     * @return {this}
     */
    DatePicker.prototype.place = function(to) {
        if (to !== undefined) {
            if (to.top) {
                this._dom.self.style.top = to.top + 'px';
            }

            if (to.left) {
                this._dom.self.style.top = to.left + 'px';
            }
        } else if (this.shown && this._dom.field) {
            this._place();
        }

        return this;
    }

    /**
     * Move the calendar using the DOM offsets
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype._place = function() {
        var
            lft  = 0,
            tmp  = 0,
            top  = 0,
            doc  = document.documentElement ?
                   document.documentElement :
                   document,
            doff = null,
            foff = null,
            woff = null;
		//HUYNT2: SET PLACE CALENDAR
        //
        if (this._conf.auto_position !== false && this._dom.field) {
            woff = {
                width  : doc.offsetWidth,
                height : doc.offsetHeight
            };
            foff = this._offset(this._dom.field, this._dom.target);
            doff = this._offset(this._dom.self, this._dom.target);
            lft  = foff.left;
            top  = foff.top + foff.height;

            if (this._dom.target == document.body) {
                //
                if (lft < 0) {
                    lft = foff.left + foff.width;
                } else if (lft + doff.width > woff.width) {
                    lft = foff.left - doff.width;
                }

                //
                if (top + doff.height > woff.height && foff.top > doff.height) {
                    top = foff.top - doff.height;
                }
            }
			//this._dom.self.style.top  = top + 'px';
            //this._dom.self.style.left = lft + 'px';
			var pDocBodyWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var pDocBodyHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			var pCalWidth = 240;
			var pCalHeight = 231;
			// 60: gap on top
            this._dom.self.style.top  = (pDocBodyHeight - pCalHeight - 60)/2 + 'px';
            this._dom.self.style.left = (pDocBodyWidth - pCalWidth)/2 + 'px';
        }
    }

    /**
     * Publish for saved subscriptions
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {this}
     */
    DatePicker.prototype._pub = function() {
        var
            al0   = '',
            way   = '',
            max   = this.max(),
            min   = this.min(),
            self  = this.self(),
            that  = null,
            tmp   = null,
            child = null;

        // Iterate through subscribed calendars
        for (al0 in this.subscribers) {
            ch0   = false;
            way   = this.subscribers[al0];
            child = DatePicker.installed[al0];
            that  = child.self();

            if (way == '=') {
                // Child calendar is equal to this calendar
                if (that != self) {
                    that = child.self(self);
                }
            } else if (way == '<') {
                // Child calendar is lower than this calendar
                if (!that || that >= self) {
                    if (self >= max) {
                        self = this.self(max);
                    } else if (self <= min) {
                        self = this.self(new Date(
                            min.getFullYear(),
                            min.getMonth(),
                            min.getDate() + 1
                        ));
                    }

                    that = child.self(new Date(
                        self.getFullYear(),
                        self.getMonth(),
                        self.getDate() - 1
                    ));
                }
            } else if (way == '>') {
                // Child calendar is greater than this calendar
                if (!that || that <= self) {
                    if (self <= min) {
                        self = this.self(min);
                    } else if (self >= max) {
                        self = this.self(new Date(
                            max.getFullYear(),
                            max.getMonth(),
                            max.getDate() - 1
                        ));
                    }

                    that = child.self(new Date(
                        self.getFullYear(),
                        self.getMonth(),
                        self.getDate() + 1
                    ));
                }
            }

            // Save the values
            this.that(that);
            child.that(self);
            child.fill(that);
            child.seek(that);
        }

        return this;
    }

    /**
     * Remove this calendar selection from the subscribed calendars
     *
     * @private
     *
     * @this   {DatePicker}
     * @return {undefined}
     */
    DatePicker.prototype._unpub = function() {
        var
            al0 = '';

        // Iterate through subscribed calendars
        for (al0 in this.subscribers) {
            DatePicker.installed[al0].that(null);
        }
    }

    /**
     * Run the function in a given context
     *
     * @private
     *
     * @this   {DatePicker}
     * @param  {function}
     * @param  {object}
     * @return {function}
     */
    DatePicker.prototype._proxy = function(fn, ctx) {
        return function() {
            return fn.apply(ctx, arguments);
        }
    }

    /**
     * Get an offset for chosen elements
     * (magic copypasted from jQuery)
     *
     * @this   {DatePicker}
     * @param  {DOMNode}
     * @param  {undefined|DOMNode}
     * @return {object}
     */
    DatePicker.prototype._offset = function(from, till) {
        till = till || document.body;

        var
            quirks = false,
            table = /^t(?:able|d|h)$/i,
            doc = document,
            body = doc.body,
            view = doc.defaultView ? doc.defaultView.getComputedStyle : null,
            node = from,
            prev = view ? view(node, null) : node.currentStyle,
            curr = null,
            offset = {
                top : node.offsetTop,
                left : node.offsetLeft,
                width : node.offsetWidth,
                height : node.offsetHeight
            },
            cparent = node.offsetParent,
            pparent = from;

        if (navigator.userAgent.match(/MSIE [67]/) && doc.compatMode != 'CSS1Compat') {
            quirks = true;
        }

        while ((node = node.parentNode) && node != till) {
            if (prev.position === 'fixed') {
                break;
            }

            curr = view ? view(node, null) : node.currentStyle;

            offset.top -= node.scrollTop;
            offset.left -= node.scrollLeft;

            if (node === cparent) {
                offset.top += node.offsetTop;
                offset.left += node.offsetLeft;

                if (quirks && table.test(node.tagName)) {
                    offset.top += parseFloat(curr.borderTopWidth) || 0;
                    offset.left += parseFloat(curr.borderLeftWidth) || 0;
                }

                pparent = cparent;
                cparent = node.offsetParent;
            }

            if (curr.overflow !== 'visible') {
                offset.top += parseFloat(curr.borderTopWidth) || 0;
                offset.left += parseFloat(curr.borderLeftWidth) || 0;
            }

            prev = curr;
        }

        if (node === body) {
            if (prev.position === 'relative' || prev.position === 'static') {
                offset.top += body.offsetTop;
                offset.left += body.offsetLeft;
            } else if (prev.position === 'fixed') {
                offset.top += Math.max(doc.scrollTop, body.scrollTop);
                offset.left += Math.max(doc.scrollLeft, body.scrollLeft)
            }
        }

        return offset;
    }

    /**
     * Last added calendar id
     *
     * @static
     *
     * @value {number}
     */
    DatePicker.last = 0;

    /**
     * Number of calendar instances
     *
     * @static
     *
     * @value {number}
     */
    DatePicker.total = 0;

    /**
     * Installed calendar instances
     *
     * @static
     *
     * @value {object}
     */
    DatePicker.installed = {};

    /**
     * Subscribe one calendar to another
     *
     * @static
     *
     * @this   {DatePicker}
     * @param  {number|string}
     * @param  {string}
     * @param  {number|string}
     * @return {undefined}
     */
    DatePicker.sub = function(child, way, parent) {
        var
            ways = {
                '=' : true,
                '>' : true,
                '<' : true
            };

        if (
            DatePicker.installed[child] &&
            DatePicker.installed[parent] &&
            ways[way]
        ) {
            DatePicker.installed[parent].subscribers[child] = way;
        }
    }

    /**
     * Unsubscribe one calendar to another
     *
     * @static
     *
     * @this   {DatePicker}
     * @param  {number|string}
     * @param  {number|string}
     * @return {undefined}
     */
    DatePicker.unsub = function(child, parent) {
        if (
            DatePicker.installed[child] &&
            DatePicker.installed[parent]
        ) {
            delete DatePicker.installed[parent].subscribers[child];
        }
    }

    /**
     * Run a public method
     *
     * @static
     *
     * @this   {DatePicker}
     * @param  {string}
     * @return {DatePicker}
     */
    DatePicker.trigger = function(meth) {
        meth = meth || '';

        var
            it0  = DatePicker.total,
            args = Array.prototype.slice.call(arguments, 1);

        if (
            meth && meth.substring(0, 1) != '_' &&
            DatePicker.prototype[meth]
        ) {
            while (it0-- > 0) {
                DatePicker.prototype[meth].apply(DatePicker.installed[it0], args);
            }
        }
    }

    /**
     * Show all calendars
     *
     * @static
     *
     * @this   {DatePicker}
     * @return {DatePicker}
     */
    DatePicker.show = function() {
		DatePicker.trigger('show');
    }

    /**
     * Hide all calendars
     *
     * @static
     *
     * @this   {DatePicker}
     * @return {DatePicker}
     */
    DatePicker.hide = function() {
		DatePicker.trigger('hide');
    }

    /**
     * Move all calendars to a needed date
     *
     * @static
     *
     * @this   {DatePicker}
     * @param  {undefined|string|Date}
     * @return {DatePicker}
     */
    DatePicker.seek = function(to) {
        DatePicker.trigger('seek', to);
    }

    /**
     * Remove all calendars instances
     *
     * @static
     *
     * @this   {DatePicker}
     * @return {DatePicker}
     */
    DatePicker.uninstall = function() {
        DatePicker.trigger('uninstall');

        DatePicker.last      = 0;
        DatePicker.total     = 0;
        DatePicker.installed = {};
    }



/**
 * A wrapper for JavaScript Date object
 *
 * @author   Shushik <silkleopard@yandex.ru>
 * @version  1.0
 * @homepage http://github.com/shushik/b-humandate/
 *
 * @static
 * @constructor
 *
 * @this   {HumanDate}
 * @return {HumanDate}
 */
;function
    HumanDate(tmpl, raw) {
        return HumanDate.human(HumanDate.parse(raw), tmpl);
    };

    /**
     * The current date
     *
     * @private
     *
     * @value {Date}
     */
    HumanDate._now = HumanDate.prototype._now = new Date();

    /**
     * The current month
     *
     * @private
     *
     * @value {number}
     */
    HumanDate._month = HumanDate.prototype._month = HumanDate._now.getMonth() + 1;

    /**
     * The current year
     *
     * @private
     *
     * @value {number}
     */
    HumanDate._year = HumanDate.prototype._year = HumanDate._now.getFullYear();

    /**
     * The current day
     *
     * @private
     *
     * @value {number}
     */
    HumanDate._day = HumanDate.prototype._day = HumanDate._now.getDate();

    /**
     * The current year prefix
     *
     * @private
     *
     * @value {string}
     */
    HumanDate._ye = HumanDate.prototype._ye = (HumanDate._year + '').substring(0, 2);

    /**
     * The common separator for joins and splits
     *
     * @private
     *
     * @value {string}
     */
    HumanDate.sep = HumanDate.prototype.sep = ';';

    /**
     * Locale settings
     *
     * @private
     *
     * @value {object}
     */
    HumanDate.locales = HumanDate.prototype.locales = {
        en : {
            ampm : {
                full  : 'ante meridiem;post meridiem',
                lower : 'am;pm',
                upper : 'AM;PM'
            },
            days : {
                plur : 'day;days;days'
            },
            years : {
                leap : 'is leap',
                plur : 'year;years;years',
            },
            common : {
                bwd  : 'Go back',
                fwd  : 'Go forward',
                hide : 'hide'
            },
            monthes : {
                decl : 'of January;of February;of March;of April;of May;of June;of July;of August;of September;of October;of November;of December',
                full : 'January;February;March;April;May;June;July;August;September;October;November;December',
                part : 'Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec',
                plur : 'month;monthes;monthes'
            },
            holidays : {
                list : '',
                from : null,
                till : null
            },
            weekdays : {
                motu : 'Mo;Tu;We;Th;Fr;Sa;Su',
                full : 'Monday;Tuesday;Wednesday;Thursday;Friday;Saturday;Sunday',
                part : 'Mon;Tue;Wen;Thu;Fri;Sat;Sun',
                plur : 'week;weeks;weeks'
            }
        },
        def : 'en',
        curr : 'en'
    };

    /**
     * Date formats
     *
     * @private
     *
     * @value {object}
     */
    HumanDate._formats = HumanDate.prototype._formats = {
        rplc : '',
        tmpl : '',
        pregs : {
            A : '(AM|PM)',
            D : '(\\w{3})',
            F : '(\\w{3,9})',
            G : '(\\d{1,2})',
            H : '(\\d{2})',
            M : '(\\w{3})',
            N : '(\\d)',
            O : '([+-]\\d{4})',
            T : '(\\w{3})',
            W : '(\\d{2})',
            Y : '(\\d{4})',
            a : '(am|pm)',
            d : '(\\d{1,2})',
            e : '(\\w{3})',
            g : '(\\d{1,2})',
            h : '(\\d{2})',
            i : '(\\d{2})',
            j : '(\\d{1,2})',
            l : '(\\w{6,9})',
            m : '(\\d{2})',
            n : '(\\d{1,2})',
            s : '(\\d{2})',
            t : '(\\d{1,2})',
            w : '(\\d)',
            y : '(\\d{2})',
            z : '(\\d{1,3})'
        }
    };

    /**
     * A kind of calendar math
     *
     * @this   {HumanDate}
     * @param  {undefined|number|string|Date}
     * @return {object}
     */
    HumanDate.api = HumanDate.prototype.api = function(now) {
        var
            day   = 0,
            from  = 0,
            last  = 0,
            rest  = 42,
            till  = 0,
            year  = 0,
            month = 0,
            data  = [],
            cnow  = HumanDate.parse(now)

        // Fill the variables
        month = cnow.getMonth();
        year  = cnow.getFullYear();
        last  = HumanDate.days(year, month, true);
        from  = new Date(year, month, 1).getDay();
        from  = from === 0 ? 7 : from;
        till  = last;

        rest -= last;

        // Get a first day in range
        if (from !== 1) {
            from = -(from - 2);
            rest = rest + from - 1;
        }

        // Get a last day in range
        if (rest > 0) {
            till = last + rest;
        }

        // Generate an array with the dates in range
        for (day = from; day <= till; day++) {
            data.push(new Date(year, month, day));
        }

        return data;
    };

    /**
     * Count the number of days in a month
     *
     * @this   {HumanDate}
     * @param  {undefined|number}
     * @param  {undefined|number}
     * @param  {undefined|boolean}
     * @return {number}
     */
    HumanDate.days = HumanDate.prototype.days = function(month, year, inner) {
        var
            s = inner !== undefined ? 1 : 0,
            d = new Date(),
            m = month !== undefined ? month + s : d.getMonth(),
            y = year  !== undefined ? year : d.getFullYear();

        return new Date(
            y,
            m,
            0
        ).getDate();
    };

    /**
     * Check if a year is leap
     *
     * @this   {HumanDate}
     * @param  {undefined|number|string|Date}
     * @return {boolean}
     */
    HumanDate.leap = HumanDate.prototype.leap = function(year) {
        var
            d = new Date(),
            y = year !== undefined ? year : d.getFullYear();

        return new Date(y, 1, 29).getDate() != 1 ? true : false;
    };

    /**
     * Turn a date template into a regular expression
     *
     * @this   {HumanDate}
     * @param  {string}
     * @return {RegExp}
     */
    HumanDate.preg = HumanDate.prototype.preg = function(tmpl) {
        var
            it0   = 0,
            ln0   = tmpl.length,
            al0   = '',
            al1   = '',
            pregs = HumanDate._formats.pregs;

        //
        for (it0 = 0; it0 < ln0; it0++) {
            al0 = tmpl[it0];

            if (pregs[al0]) {
                al1 += pregs[al0]
            } else {
                al1 += tmpl[it0];
            }
        }

        return new RegExp(al1, 'g');
    }

    /**
     * Get a number string with a leading zero
     *
     * @this   {HumanDate}
     * @param  {number}
     * @return {string}
     */
    HumanDate.zero = HumanDate.prototype.zero = function(num) {
        return ("0" + num).slice(-2);
    }

    /**
     * Turn the date object into the human string
     *
     * @this   {HumanDate}
     * @param  {undefined|number|string|Date}
     * @param  {undefined|string}
     * @param  {undefined|boolean}
     * @return {string|object}
     */
    HumanDate.human = HumanDate.prototype.human = function(raw, tmpl, part) {
        var
            chr    = 0,
            tmp    = 0,
            parsed = '',
            cp     = HumanDate.parse(raw),
            hmn    = {},
            dist   = null,
            lang   = HumanDate.locales[HumanDate.locales.curr] ?
                     HumanDate.locales[HumanDate.locales.curr] :
                     HumanDate.locales[HumanDate.locales.def];

        // Basics
        hmn.day     = cp.getDate();
        hmn.year    = cp.getFullYear();
        hmn.hours   = cp.getHours();
        hmn.month   = cp.getMonth() + 1;
        hmn.offset  = cp.getTimezoneOffset();
        hmn.minutes = cp.getMinutes();
        hmn.seconds = cp.getSeconds();

        if (part === undefined) {
            dist = HumanDate.distance(
                new Date(cp.getFullYear(), 0, 1, 0, 0, 0),
                cp
            );

            // Day
            hmn.j = hmn.day;
            hmn.d = HumanDate.zero(hmn.j);
            hmn.w = cp.getDay();
            hmn.N = hmn.w === 0 ? 7 : hmn.w;
            hmn.z = dist.days;

            // Week
            tmp = hmn.N - 1;

            hmn.D = lang.weekdays.part.split(HumanDate.sep)[tmp];
            hmn.l = lang.weekdays.full.split(HumanDate.sep)[tmp];
            hmn.W = dist.weeks;

            // Month
            tmp = hmn.month - 1;

            hmn.n = hmn.month;
            hmn.m = HumanDate.zero(hmn.n);
            hmn.M = lang.monthes.part.split(HumanDate.sep)[tmp];
            hmn.F = lang.monthes.full.split(HumanDate.sep)[tmp];
            hmn.t = HumanDate.days(hmn.month, hmn.year);

            // Year
            hmn.Y = hmn.year;
            hmn.y = (hmn.Y + '').substring(2);
            hmn.L = HumanDate.leap(hmn.Y);

            // Time
            hmn.G = hmn.hours;
            hmn.g = hmn.G + -12;
            hmn.H = HumanDate.zero(hmn.G);
            hmn.h = HumanDate.zero(hmn.g);
            hmn.i = HumanDate.zero(hmn.minutes);
            hmn.s = HumanDate.zero(hmn.seconds);

            // A.M/P.M.
            if (hmn.G <= 12) {
                hmn.a = lang.ampm.lower.split(HumanDate.sep)[0];
                hmn.A = lang.ampm.upper.split(HumanDate.sep)[0];
            } else {
                hmn.a = lang.ampm.lower.split(';')[1];
                hmn.A = lang.ampm.upper.split(';')[1];
            }
			//alert(cp.toString());
            // Timezone
			if (cp.toString().indexOf('GMT') > -1)
			{
				tmp = cp.toString().split('GMT')[1].replace(')', '').split(' (');
			}
			else if (cp.toString().indexOf('UTC') > -1)
			{
				tmp = cp.toString().split('UTC')[1].replace(')', '').split(' (');
			}
			
			if (tmp != null && tmp != undefined && tmp.length > 0){
				hmn.O = tmp[0];
				hmn.P = tmp[0].substring(0, 3) + ':' + tmp[0].substring(3);
				hmn.T = tmp[1];
			}
			else{
				hmn.O = '0000';
				hmn.P = '00' + ':' + '00';
				hmn.T = hmn.Y;
			}
			
            hmn.Z = hmn.offset;

            // Summer time
            tmp = [
                cp.getTimezoneOffset(),
                new Date(hmn.Y, 1, 1).getTimezoneOffset(),
                new Date(hmn.Y, 7, 1).getTimezoneOffset()
            ];

            hmn.I = tmp[1] !== tmp[2] && tmp[2] === tmp[0] ? true : false;

            // UTC
            hmn.U = cp.getTime();

            // Formats
            hmn.r = cp.toString();
            hmn.c = hmn.Y + '-' + hmn.m + '-' + hmn.d + '-' +
                    'T' +
                    hmn.H + ':' + hmn.i + ':' + hmn.s + hmn.P;
			
        }

        if (typeof tmpl === 'string') {
            tmp = tmpl.length;

            while (chr < tmp) {
                if (hmn[tmpl[chr]]) {
                    parsed += hmn[tmpl[chr]];
                } else {
                    parsed += tmpl[chr];
                }

                chr++;
            }

            return parsed;
        }

        return hmn;
    }

    /**
     * Get the minimal or the maximal date from the given list,
     * or the sorted dates list
     *
     * @this   {HumanDate}
     * @param  {array}
     * @param  {string}
     * @return {Array|Date}
     */
    HumanDate.order = HumanDate.prototype.order = function(dates, which) {
        which = which || false;
        dates = dates.sort(function(a, b) {
            if (a > b) {
                return 1;
            } else {
                return - 1;
            }
        });

        if (which == 'min') {
            return dates.shift()
        } else if (which == 'max') {
            return dates.pop();
        }

        return dates;
    };

    /**
     * Check if a Date object contains a valid date
     *
     * @this   {HumanDate}
     * @param  {Date}
     * @return {boolean}
     */
    HumanDate.valid = HumanDate.prototype.valid = function(raw) {
        if (!isNaN(raw.getDate())) {
            return true;
        }

        return false;
    }

    /**
     * Parse a date
     *
     * @this   {HumanDate}
     * @param  {number|string|Date}
     * @return {Date|null}
     */
    HumanDate.parse = HumanDate.prototype.parse = function(raw) {
        if (raw instanceof Date) {
            // Don`t parse, just clone
            return new Date(raw);
        } else if (raw === undefined) {
            // Don`t parse, return the current day
            return HumanDate._now;
        }

        var
            day   = 0,
            it0   = 0,
            ln0   = 0,
            year  = 0,
            month = 0,
            type  = typeof raw,
            cp    = null,
            now   = new Date(),
            preg  = null,
            rplcs = HumanDate._formats.rplc.split(HumanDate.sep),
            tmpls = HumanDate._formats.tmpl.split(HumanDate.sep);

        // Try to read a date with a Date parser
        if (type === 'number') {
            return new Date(raw);
        } else if (type === 'string') {
            cp = new Date(raw);

            //
            if (HumanDate.valid(cp)) {
                return cp;
            }

            // Try to parse the date string manually
            cp  = raw;
            ln0 = tmpls.length;

            for (it0 = 0; it0 < ln0; it0++) {
                preg = HumanDate.preg(tmpls[it0]);

                if (cp.match(preg)) {
                    cp = cp.replace(preg, rplcs[it0]);

                    break;
                }
            }

            //
            cp = new Date(cp);

            //
            if (HumanDate.valid(cp)) {
                return cp;
            }
        }

        return null;
    }

    /**
     * Save a date format
     *
     * @this   {HumanDate}
     * @param  {string}
     * @return {undefined|Array}
     */
    HumanDate.format = HumanDate.prototype.format = function(format) {
        var
            it0    = 0,
            ln0    = format.length,
            total  = 0,
            found  = '',
            dt     = [],
            tm     = [],
            keys   = ['year', 'month', 'day'],
            pregs  = HumanDate._formats.pregs;

        // Check the template existance
        if (HumanDate._formats.tmpl.indexOf(format) > -1) {
            return;
        }

        // Iterate through the string
        for (it0 = 0; it0 < ln0; it0++) {
            found = format[it0];

            // 
            if (pregs[found]) {
                total++;

                switch (found) {

                    case 'Y':
                        dt[0] = '$' + total;
                    break;

                    case 'y':
                        dt[0] = HumanDate._ye + '$' + total;
                    break;

                    case 'F':
                    case 'M':
                    case 'm':
                    case 'n':
                        dt[1] = '$' + total;
                    break;

                    case 'd':
                    case 'j':
                        dt[2] = '$' + total;
                    break;

                    case 'H':
                        tm[0] = '$' + total;
                    break;

                    case 'i':
                        tm[1] = '$' + total;
                    break;

                    case 's':
                        tm[2] = '$' + total;
                    break;

                }
            }
        }

        //
        for (it0 = 0; it0 < 3; it0++) {
            if (dt[it0] === undefined) {
                dt[it0] = HumanDate['_' + keys[it0]];
            }

            if (tm[it0] === undefined) {
                tm[it0] = '00';
            }
        }

        // Save the values
        HumanDate._formats.tmpl = format + HumanDate.sep + HumanDate._formats.tmpl;
        HumanDate._formats.rplc = (dt.join(' ') + ' ' + tm.join(':')) + HumanDate.sep + HumanDate._formats.rplc;
    }

    /**
     * Check if the day is holiday
     *
     * @this   {HumanDate}
     * @param  {undefined|number|string|Date}
     * @return {boolean}
     */
    HumanDate.holiday = HumanDate.prototype.holiday = function(raw) {
        var
            hayfork  = '',
            haystack = '',
            craw     = null,
            holidays = null;

        if (HumanDate.locales[HumanDate.locales.curr].holidays) {
            craw     = HumanDate.parse(raw);
            holidays = HumanDate.locales[HumanDate.locales.curr].holidays;
            hayfork  = craw.getFullYear() + '-' +
                       HumanDate.zero(craw.getMonth() + 1) + '-' +
                       HumanDate.zero(craw.getDate());
            haystack = holidays.list;

            if (HumanDate.inside(craw, holidays.from, holidays.till, true)) {
                if (haystack.indexOf(hayfork) > -1) {
                    return true;
                }
            } else {
                return HumanDate.weekend(raw);
            }
        } else {
            return HumanDate.weekend(raw);
        }

        return false;
    };

    /**
     * Check if the given date is between the minimal and maximal
     *
     * @this   {HumanDate}
     * @param  {number|string|Date}
     * @param  {number|string|Date}
     * @param  {number|string|Date}
     * @param  {undefined|boolean}
     * @return {boolean}
     */
    HumanDate.inside = HumanDate.prototype.inside = function(now, min, max, inc) {
        var
            cmax = HumanDate.parse(max),
            cmin = HumanDate.parse(min),
            cnow = HumanDate.parse(now);

        if (
            inc && cnow >= cmin && cnow <= cmax ||
            cnow > cmin && cnow < cmax
        ) {
            return true;
        }

        return false;
    };

    /**
     * Check if the day is weekend
     *
     * @this   {HumanDate}
     * @param  {undefined|number|string|Date}
     * @return {boolean}
     */
    HumanDate.weekend = HumanDate.prototype.weekend = function(raw) {
        var
            day = 0,
            cp  = HumanDate.parse(raw);

        day = cp.getDay();

        if (day == 0 || day == 6) {
            return true;
        }

        return false;
    };

    /**
     * Get the distance between the dates
     *
     * @this   {HumanDate}
     * @param  {number|string|Date}
     * @param  {number|string|Date}
     * @return {object}
     */
    HumanDate.distance = HumanDate.prototype.distance = function(from, till) {
        var
            tmp   = 0,
            out   = {
                days    : 0,
                hours   : 0,
                weeks   : 0,
                years   : 0,
                seconds : 0,
                minutes : 0,
                monthes : 0
            },
            cfrom = HumanDate.parse(from),
            ctill = HumanDate.parse(till);

        // Just in case of crazy coder
        if (cfrom > ctill) {
            tmp  = ctill;
            ctill = cfrom;
            cfrom = tmp;
        }

        // Get the raw number of passed years between the dates
        tmp = (ctill.getFullYear() - cfrom.getFullYear()) * 12;

        // Get the number of monthes and years
        out.monthes = (tmp - cfrom.getMonth()) + ctill.getMonth();
        out.years   = Math.floor(out.monthes / 12);

        // Get the raw number of milliseconds between the dates
        tmp = ctill.getTime() - cfrom.getTime();

        // Get the seconds, minutes and hours
        out.seconds = Math.floor(tmp / 1000);
        out.minutes = Math.floor(out.seconds / 60);
        out.hours   = Math.floor(out.minutes / 60);

        // Get the days and weeks
        out.days  = Math.floor(out.hours / 24);
        out.weeks = Math.floor(out.days / 7);

        return out;
    };

    /**
     * Set the holidays
     *
     * @this   {Cal}
     * @param  {string}
     * @param  {string|Array}
     * @return {undefined|Array}
     */
    HumanDate.holidays = HumanDate.prototype.holidays = function(lang, items) {
        var
            ln0  = 0,
            raw  = null,
            from = null,
            till = null;

        if (items !== undefined) {
            raw = typeof items == 'string' ?
                  items.split(HumanDate.sep) :
                  items;
            ln0 = raw.length;

            // Create the language object if not exists
            // or just switch the language to neededs
            if (!HumanDate.locales[lang]) {
                HumanDate.language(lang, {});
            } else {
                HumanDate.language(lang);
            }

            if (ln0) {
                from = ln0 ? HumanDate.parse(raw[0]) : null;
                till = ln0 ? HumanDate.parse(raw[ln0 - 1]) : null;
            }

            // Save the holidays properties into current locale
            HumanDate.locales[HumanDate.locales.curr].holidays = {
                from : from ?
                       new Date(
                           from.getFullYear(),
                           from.getMonth(),
                           from.getDate()
                       ) :
                       from,
                list : raw.join(HumanDate.sep),
                till : till ?
                       new Date(
                           till.getFullYear(),
                           till.getMonth(),
                           till.getDate()
                       ) :
                       till
            };
        } else {
            if (HumanDate.locales[lang] && HumanDate.locales[lang].holidays) {
                return HumanDate.locales[lang].holidays.split(HumanDate.sep);
            } else {
                return null;
            }
        }
        
    }

    /**
     * Set the language settings
     *
     * @this   {Cal}
     * @param  {string}
     * @param  {undefined|object}
     * @param  {undefined|boolean}
     * @return {undefined}
     */
    HumanDate.language = HumanDate.prototype.language = function(lang, items, rewrite) {
        var
            al0 = '',
            al1 = '',
            def = HumanDate.locales[HumanDate.locales.def];

        if (items !== undefined) {
            def = HumanDate.locales[HumanDate.locales.def];

            // Create the locale object if not exists
            if (!HumanDate.locales[lang]) {
                HumanDate.locales[lang] = {};
            }

            // 
            for (al0 in def) {
                if (al0 == 'holidays') {
                    // Save the holidays
                    HumanDate.holidays(lang, items[al0]);
                } else {
                    // Create the locale setting object if not exists
                    if (!HumanDate.locales[lang][al0]) {
                        HumanDate.locales[lang][al0] = {};
                    }

                    for (al1 in def[al0]) {
                        if (
                            !HumanDate.locales[lang][al0][al1] ||
                            rewrite === true
                        ) {
                            // Take a locale setting from a given object
                            if (items[al0] && items[al0][al1]) {
                                if (items[al0][al1] instanceof Array) {
                                    HumanDate.locales[lang][al0][al1] = items[al0][al1].
                                                                        join(HumanDate.sep);
                                } else {
                                    HumanDate.locales[lang][al0][al1] = items[al0][al1];
                                }
                            } else {
                                // Take a locale setting from a default object
                                HumanDate.locales[lang][al0][al1] = def[al0][al1];
                            }
                        }
                    }
                }
            }
        }

        // Switch to a given language
        if (HumanDate.locales[lang]) {
            HumanDate.locales.curr = lang;
        } else {
            HumanDate.locales.curr = HumanDate.locales.def;
        }
    }


/**
 * Prefill the default formats
 */
;(function() {
    var
        it0 = 0,
        arr = 'D M d Y H:i:s eO \(T\);D M d Y H:i:s eO;D M d H:i:s e Y;Y-m-d H:i:s;H:i:s;Y-m-d;y-m-d;M d,Y;Y-M-d;y-M-d;d-M-Y;M/d/y;m-d-Y;m.d.Y;d/m/Y;d-m-Y;d.m.Y;M d, Y;M d;M-d;m/d;m-d;d-M;d/m;d-m;d'.split(HumanDate.sep);

    for (it0 in arr) {
        HumanDate.format(arr[it0]);
    }
})();