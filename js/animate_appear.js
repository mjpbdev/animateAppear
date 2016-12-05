/*
    animateAppear - 
    version 1.0
    Copyright (c) 2016 mjpbDev

 * jQueryAppear
 *
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 */


// animateAppear plugin
(function(window, $) {

    var pluginName = 'animateAppear';

    // Plugin constructor
    var AnimateAppear = function(elem, options) {

        this.elem = elem;
        this.options = options;
        this.init();

    };

    // Default options
    AnimateAppear.defaults = {
        accX: 0,
        accY: -100,
        delay: 1
    };

    // Avoid Plugin.prototype conflicts
    $.extend(AnimateAppear.prototype, {

        init: function() {

            this.setData()
                .setMetadata()
                .settings()
                .animate();

            return this;
        },

        setData: function() {

            this.$elem = $(this.elem);
            this.defaults = AnimateAppear.defaults;
            this.animation_name = this.$elem.data('animation-name');

            this.$elem.data("plugin_" + pluginName, this);

            return this;
        },

        setMetadata: function(){

            this.metadata = ( this.$elem.data('animation-delay') ? { delay :this.$elem.data('animation-delay')} : {} );

            return this;
        },

        settings: function() {

            this.settings = $.extend({}, this.defaults, this.options, this.metadata);
            
            return this;
        },

        animate: function() {

          var $el = this.$elem,
              plugin = this,
              delay = this.settings.delay;

            $el.addClass('animated unshown');

            if( delay != 1 ) $el.css('animation-delay', delay + 's');

            $el.appear(function() {

                $el.addClass(plugin.animation_name);

                setTimeout(function() {
                    $el.addClass('shown').removeClass('unshown');
                }, delay);

            }, { accX: plugin.settings.accX, accY: plugin.settings.accY });

            return this;
        }

    });

    window.AnimateAppear = AnimateAppear;

    $.fn.animateAppear = function(options) {
        return this.each(function() {

            if (!$.data(this, "plugin_" + pluginName)) {

                return new AnimateAppear(this,options);

            } else {

                return $.data(this, "plugin_" + pluginName);
            }

        });
    };

})(window, jQuery);

// jQueryAppear plugin
(function($) {
    $.fn.appear = function(fn, options) {

        var settings = $.extend({

            //arbitrary data to pass to fn
            data: undefined,

            //call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            //whether the element is currently visible
            t.appeared = false;

            if (!fn) {

                //trigger the custom event
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            //fires the appear event when appropriate
            var check = function() {

                //is the element hidden?
                if (!t.is(':visible')) {

                    //it became hidden
                    t.appeared = false;
                    return;
                }

                //is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

                    //trigger the custom event
                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {

                    //it scrolled out of view
                    t.appeared = false;
                }
            };

            //create a modified fn with some additional logic
            var modifiedFn = function() {

                //mark the element as visible
                t.appeared = true;

                //is this supposed to happen only once?
                if (settings.one) {

                    //remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                //trigger the original fn
                fn.apply(this, arguments);
            };

            //bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            //check whenever the window scrolls
            w.scroll(check);

            //check whenever the dom changes
            $.fn.appear.checks.push(check);

            //check now
            (check)();
        });
    };

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        //process the queue
        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        //check the queue asynchronously
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
    });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function() {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            }
        }
    });

})(jQuery);
