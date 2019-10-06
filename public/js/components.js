/*
PNotify 3.0.0 sciactive.com/pnotify/
(C) 2015 Hunter Perrin; Google, Inc.
license Apache-2.0
*/
(function(b,k){"function"===typeof define&&define.amd?define("pnotify",["jquery"],function(q){return k(q,b)}):"object"===typeof exports&&"undefined"!==typeof module?module.exports=k(require("jquery"),global||b):b.PNotify=k(b.jQuery,b)})(this,function(b,k){var q=function(l){var k={dir1:"down",dir2:"left",push:"bottom",spacing1:36,spacing2:36,context:b("body"),modal:!1},g,h,n=b(l),r=function(){h=b("body");d.prototype.options.stack.context=h;n=b(l);n.bind("resize",function(){g&&clearTimeout(g);g=setTimeout(function(){d.positionAll(!0)},
10)})},s=function(c){var a=b("<div />",{"class":"ui-pnotify-modal-overlay"});a.prependTo(c.context);c.overlay_close&&a.click(function(){d.removeStack(c)});return a},d=function(c){this.parseOptions(c);this.init()};b.extend(d.prototype,{version:"3.0.0",options:{title:!1,title_escape:!1,text:!1,text_escape:!1,styling:"brighttheme",addclass:"",cornerclass:"",auto_display:!0,width:"300px",min_height:"16px",type:"notice",icon:!0,animation:"fade",animate_speed:"normal",shadow:!0,hide:!0,delay:8E3,mouse_reset:!0,
remove:!0,insert_brs:!0,destroy:!0,stack:k},modules:{},runModules:function(c,a){var p,b;for(b in this.modules)p="object"===typeof a&&b in a?a[b]:a,"function"===typeof this.modules[b][c]&&(this.modules[b].notice=this,this.modules[b].options="object"===typeof this.options[b]?this.options[b]:{},this.modules[b][c](this,"object"===typeof this.options[b]?this.options[b]:{},p))},state:"initializing",timer:null,animTimer:null,styles:null,elem:null,container:null,title_container:null,text_container:null,animating:!1,
timerHide:!1,init:function(){var c=this;this.modules={};b.extend(!0,this.modules,d.prototype.modules);this.styles="object"===typeof this.options.styling?this.options.styling:d.styling[this.options.styling];this.elem=b("<div />",{"class":"ui-pnotify "+this.options.addclass,css:{display:"none"},"aria-live":"assertive","aria-role":"alertdialog",mouseenter:function(a){if(c.options.mouse_reset&&"out"===c.animating){if(!c.timerHide)return;c.cancelRemove()}c.options.hide&&c.options.mouse_reset&&c.cancelRemove()},
mouseleave:function(a){c.options.hide&&c.options.mouse_reset&&"out"!==c.animating&&c.queueRemove();d.positionAll()}});"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed);this.container=b("<div />",{"class":this.styles.container+" ui-pnotify-container "+("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?this.styles.success:this.styles.notice),role:"alert"}).appendTo(this.elem);""!==
this.options.cornerclass&&this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass);this.options.shadow&&this.container.addClass("ui-pnotify-shadow");!1!==this.options.icon&&b("<div />",{"class":"ui-pnotify-icon"}).append(b("<span />",{"class":!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container);
this.title_container=b("<h4 />",{"class":"ui-pnotify-title"}).appendTo(this.container);!1===this.options.title?this.title_container.hide():this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title);this.text_container=b("<div />",{"class":"ui-pnotify-text","aria-role":"alert"}).appendTo(this.container);!1===this.options.text?this.text_container.hide():this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?
String(this.options.text).replace(/\n/g,"<br />"):this.options.text);"string"===typeof this.options.width&&this.elem.css("width",this.options.width);"string"===typeof this.options.min_height&&this.container.css("min-height",this.options.min_height);d.notices="top"===this.options.stack.push?b.merge([this],d.notices):b.merge(d.notices,[this]);"top"===this.options.stack.push&&this.queuePosition(!1,1);this.options.stack.animation=!1;this.runModules("init");this.options.auto_display&&this.open();return this},
update:function(c){var a=this.options;this.parseOptions(a,c);this.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast");"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-"+this.options.animate_speed);this.options.cornerclass!==a.cornerclass&&this.container.removeClass("ui-corner-all "+a.cornerclass).addClass(this.options.cornerclass);this.options.shadow!==a.shadow&&(this.options.shadow?this.container.addClass("ui-pnotify-shadow"):this.container.removeClass("ui-pnotify-shadow"));
!1===this.options.addclass?this.elem.removeClass(a.addclass):this.options.addclass!==a.addclass&&this.elem.removeClass(a.addclass).addClass(this.options.addclass);!1===this.options.title?this.title_container.slideUp("fast"):this.options.title!==a.title&&(this.options.title_escape?this.title_container.text(this.options.title):this.title_container.html(this.options.title),!1===a.title&&this.title_container.slideDown(200));!1===this.options.text?this.text_container.slideUp("fast"):this.options.text!==
a.text&&(this.options.text_escape?this.text_container.text(this.options.text):this.text_container.html(this.options.insert_brs?String(this.options.text).replace(/\n/g,"<br />"):this.options.text),!1===a.text&&this.text_container.slideDown(200));this.options.type!==a.type&&this.container.removeClass(this.styles.error+" "+this.styles.notice+" "+this.styles.success+" "+this.styles.info).addClass("error"===this.options.type?this.styles.error:"info"===this.options.type?this.styles.info:"success"===this.options.type?
this.styles.success:this.styles.notice);if(this.options.icon!==a.icon||!0===this.options.icon&&this.options.type!==a.type)this.container.find("div.ui-pnotify-icon").remove(),!1!==this.options.icon&&b("<div />",{"class":"ui-pnotify-icon"}).append(b("<span />",{"class":!0===this.options.icon?"error"===this.options.type?this.styles.error_icon:"info"===this.options.type?this.styles.info_icon:"success"===this.options.type?this.styles.success_icon:this.styles.notice_icon:this.options.icon})).prependTo(this.container);
this.options.width!==a.width&&this.elem.animate({width:this.options.width});this.options.min_height!==a.min_height&&this.container.animate({minHeight:this.options.min_height});this.options.hide?a.hide||this.queueRemove():this.cancelRemove();this.queuePosition(!0);this.runModules("update",a);return this},open:function(){this.state="opening";this.runModules("beforeOpen");var c=this;this.elem.parent().length||this.elem.appendTo(this.options.stack.context?this.options.stack.context:h);"top"!==this.options.stack.push&&
this.position(!0);this.animateIn(function(){c.queuePosition(!0);c.options.hide&&c.queueRemove();c.state="open";c.runModules("afterOpen")});return this},remove:function(c){this.state="closing";this.timerHide=!!c;this.runModules("beforeClose");var a=this;this.timer&&(l.clearTimeout(this.timer),this.timer=null);this.animateOut(function(){a.state="closed";a.runModules("afterClose");a.queuePosition(!0);a.options.remove&&a.elem.detach();a.runModules("beforeDestroy");if(a.options.destroy&&null!==d.notices){var c=
b.inArray(a,d.notices);-1!==c&&d.notices.splice(c,1)}a.runModules("afterDestroy")});return this},get:function(){return this.elem},parseOptions:function(c,a){this.options=b.extend(!0,{},d.prototype.options);this.options.stack=d.prototype.options.stack;for(var p=[c,a],m,f=0;f<p.length;f++){m=p[f];if("undefined"===typeof m)break;if("object"!==typeof m)this.options.text=m;else for(var e in m)this.modules[e]?b.extend(!0,this.options[e],m[e]):this.options[e]=m[e]}},animateIn:function(c){this.animating=
"in";var a=this;c=function(){a.animTimer&&clearTimeout(a.animTimer);"in"===a.animating&&(a.elem.is(":visible")?(this&&this.call(),a.animating=!1):a.animTimer=setTimeout(c,40))}.bind(c);"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",c).addClass("ui-pnotify-in"),this.elem.css("opacity"),this.elem.addClass("ui-pnotify-fade-in"),this.animTimer=setTimeout(c,650)):(this.elem.addClass("ui-pnotify-in"),c())},animateOut:function(c){this.animating=
"out";var a=this;c=function(){a.animTimer&&clearTimeout(a.animTimer);"out"===a.animating&&("0"!=a.elem.css("opacity")&&a.elem.is(":visible")?a.animTimer=setTimeout(c,40):(a.elem.removeClass("ui-pnotify-in"),this&&this.call(),a.animating=!1))}.bind(c);"fade"===this.options.animation?(this.elem.one("webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionEnd transitionend",c).removeClass("ui-pnotify-fade-in"),this.animTimer=setTimeout(c,650)):(this.elem.removeClass("ui-pnotify-in"),c())},position:function(c){var a=
this.options.stack,b=this.elem;"undefined"===typeof a.context&&(a.context=h);if(a){"number"!==typeof a.nextpos1&&(a.nextpos1=a.firstpos1);"number"!==typeof a.nextpos2&&(a.nextpos2=a.firstpos2);"number"!==typeof a.addpos2&&(a.addpos2=0);var d=!b.hasClass("ui-pnotify-in");if(!d||c){a.modal&&(a.overlay?a.overlay.show():a.overlay=s(a));b.addClass("ui-pnotify-move");var f;switch(a.dir1){case "down":f="top";break;case "up":f="bottom";break;case "left":f="right";break;case "right":f="left"}c=parseInt(b.css(f).replace(/(?:\..*|[^0-9.])/g,
""));isNaN(c)&&(c=0);"undefined"!==typeof a.firstpos1||d||(a.firstpos1=c,a.nextpos1=a.firstpos1);var e;switch(a.dir2){case "down":e="top";break;case "up":e="bottom";break;case "left":e="right";break;case "right":e="left"}c=parseInt(b.css(e).replace(/(?:\..*|[^0-9.])/g,""));isNaN(c)&&(c=0);"undefined"!==typeof a.firstpos2||d||(a.firstpos2=c,a.nextpos2=a.firstpos2);if("down"===a.dir1&&a.nextpos1+b.height()>(a.context.is(h)?n.height():a.context.prop("scrollHeight"))||"up"===a.dir1&&a.nextpos1+b.height()>
(a.context.is(h)?n.height():a.context.prop("scrollHeight"))||"left"===a.dir1&&a.nextpos1+b.width()>(a.context.is(h)?n.width():a.context.prop("scrollWidth"))||"right"===a.dir1&&a.nextpos1+b.width()>(a.context.is(h)?n.width():a.context.prop("scrollWidth")))a.nextpos1=a.firstpos1,a.nextpos2+=a.addpos2+("undefined"===typeof a.spacing2?25:a.spacing2),a.addpos2=0;"number"===typeof a.nextpos2&&(a.animation?b.css(e,a.nextpos2+"px"):(b.removeClass("ui-pnotify-move"),b.css(e,a.nextpos2+"px"),b.css(e),b.addClass("ui-pnotify-move")));
switch(a.dir2){case "down":case "up":b.outerHeight(!0)>a.addpos2&&(a.addpos2=b.height());break;case "left":case "right":b.outerWidth(!0)>a.addpos2&&(a.addpos2=b.width())}"number"===typeof a.nextpos1&&(a.animation?b.css(f,a.nextpos1+"px"):(b.removeClass("ui-pnotify-move"),b.css(f,a.nextpos1+"px"),b.css(f),b.addClass("ui-pnotify-move")));switch(a.dir1){case "down":case "up":a.nextpos1+=b.height()+("undefined"===typeof a.spacing1?25:a.spacing1);break;case "left":case "right":a.nextpos1+=b.width()+("undefined"===
typeof a.spacing1?25:a.spacing1)}}return this}},queuePosition:function(b,a){g&&clearTimeout(g);a||(a=10);g=setTimeout(function(){d.positionAll(b)},a);return this},cancelRemove:function(){this.timer&&l.clearTimeout(this.timer);this.animTimer&&l.clearTimeout(this.animTimer);"closing"===this.state&&(this.state="open",this.animating=!1,this.elem.addClass("ui-pnotify-in"),"fade"===this.options.animation&&this.elem.addClass("ui-pnotify-fade-in"));return this},queueRemove:function(){var b=this;this.cancelRemove();
this.timer=l.setTimeout(function(){b.remove(!0)},isNaN(this.options.delay)?0:this.options.delay);return this}});b.extend(d,{notices:[],reload:q,removeAll:function(){b.each(d.notices,function(){this.remove&&this.remove(!1)})},removeStack:function(c){b.each(d.notices,function(){this.remove&&this.options.stack===c&&this.remove(!1)})},positionAll:function(c){g&&clearTimeout(g);g=null;if(d.notices&&d.notices.length)b.each(d.notices,function(){var a=this.options.stack;a&&(a.overlay&&a.overlay.hide(),a.nextpos1=
a.firstpos1,a.nextpos2=a.firstpos2,a.addpos2=0,a.animation=c)}),b.each(d.notices,function(){this.position()});else{var a=d.prototype.options.stack;a&&(delete a.nextpos1,delete a.nextpos2)}},styling:{brighttheme:{container:"brighttheme",notice:"brighttheme-notice",notice_icon:"brighttheme-icon-notice",info:"brighttheme-info",info_icon:"brighttheme-icon-info",success:"brighttheme-success",success_icon:"brighttheme-icon-success",error:"brighttheme-error",error_icon:"brighttheme-icon-error"},jqueryui:{container:"ui-widget ui-widget-content ui-corner-all",
notice:"ui-state-highlight",notice_icon:"ui-icon ui-icon-info",info:"",info_icon:"ui-icon ui-icon-info",success:"ui-state-default",success_icon:"ui-icon ui-icon-circle-check",error:"ui-state-error",error_icon:"ui-icon ui-icon-alert"},bootstrap3:{container:"alert",notice:"alert-warning",notice_icon:"glyphicon glyphicon-exclamation-sign",info:"alert-info",info_icon:"glyphicon glyphicon-info-sign",success:"alert-success",success_icon:"glyphicon glyphicon-ok-sign",error:"alert-danger",error_icon:"glyphicon glyphicon-warning-sign"}}});
d.styling.fontawesome=b.extend({},d.styling.bootstrap3);b.extend(d.styling.fontawesome,{notice_icon:"fa fa-exclamation-circle",info_icon:"fa fa-info",success_icon:"fa fa-check",error_icon:"fa fa-warning"});l.document.body?r():b(r);return d};return q(k)});

(function(d,e){"function"===typeof define&&define.amd?define("pnotify.buttons",["jquery","pnotify"],e):"object"===typeof exports&&"undefined"!==typeof module?module.exports=e(require("jquery"),require("./pnotify")):e(d.jQuery,d.PNotify)})(this,function(d,e){e.prototype.options.buttons={closer:!0,closer_hover:!0,sticker:!0,sticker_hover:!0,show_on_nonblock:!1,labels:{close:"Close",stick:"Stick",unstick:"Unstick"},classes:{closer:null,pin_up:null,pin_down:null}};e.prototype.modules.buttons={closer:null,
sticker:null,init:function(a,b){var c=this;a.elem.on({mouseenter:function(b){!c.options.sticker||a.options.nonblock&&a.options.nonblock.nonblock&&!c.options.show_on_nonblock||c.sticker.trigger("pnotify:buttons:toggleStick").css("visibility","visible");!c.options.closer||a.options.nonblock&&a.options.nonblock.nonblock&&!c.options.show_on_nonblock||c.closer.css("visibility","visible")},mouseleave:function(a){c.options.sticker_hover&&c.sticker.css("visibility","hidden");c.options.closer_hover&&c.closer.css("visibility",
"hidden")}});this.sticker=d("<div />",{"class":"ui-pnotify-sticker","aria-role":"button","aria-pressed":a.options.hide?"false":"true",tabindex:"0",title:a.options.hide?b.labels.stick:b.labels.unstick,css:{cursor:"pointer",visibility:b.sticker_hover?"hidden":"visible"},click:function(){a.options.hide=!a.options.hide;a.options.hide?a.queueRemove():a.cancelRemove();d(this).trigger("pnotify:buttons:toggleStick")}}).bind("pnotify:buttons:toggleStick",function(){var b=null===c.options.classes.pin_up?a.styles.pin_up:
c.options.classes.pin_up,e=null===c.options.classes.pin_down?a.styles.pin_down:c.options.classes.pin_down;d(this).attr("title",a.options.hide?c.options.labels.stick:c.options.labels.unstick).children().attr("class","").addClass(a.options.hide?b:e).attr("aria-pressed",a.options.hide?"false":"true")}).append("<span />").trigger("pnotify:buttons:toggleStick").prependTo(a.container);(!b.sticker||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock)&&this.sticker.css("display","none");
this.closer=d("<div />",{"class":"ui-pnotify-closer","aria-role":"button",tabindex:"0",title:b.labels.close,css:{cursor:"pointer",visibility:b.closer_hover?"hidden":"visible"},click:function(){a.remove(!1);c.sticker.css("visibility","hidden");c.closer.css("visibility","hidden")}}).append(d("<span />",{"class":null===b.classes.closer?a.styles.closer:b.classes.closer})).prependTo(a.container);(!b.closer||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock)&&this.closer.css("display",
"none")},update:function(a,b){!b.closer||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock?this.closer.css("display","none"):b.closer&&this.closer.css("display","block");!b.sticker||a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock?this.sticker.css("display","none"):b.sticker&&this.sticker.css("display","block");this.sticker.trigger("pnotify:buttons:toggleStick");this.closer.find("span").attr("class","").addClass(null===b.classes.closer?a.styles.closer:b.classes.closer);
b.sticker_hover?this.sticker.css("visibility","hidden"):a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock||this.sticker.css("visibility","visible");b.closer_hover?this.closer.css("visibility","hidden"):a.options.nonblock&&a.options.nonblock.nonblock&&!b.show_on_nonblock||this.closer.css("visibility","visible")}};d.extend(e.styling.brighttheme,{closer:"brighttheme-icon-closer",pin_up:"brighttheme-icon-sticker",pin_down:"brighttheme-icon-sticker brighttheme-icon-stuck"});d.extend(e.styling.jqueryui,
{closer:"ui-icon ui-icon-close",pin_up:"ui-icon ui-icon-pin-w",pin_down:"ui-icon ui-icon-pin-s"});d.extend(e.styling.bootstrap2,{closer:"icon-remove",pin_up:"icon-pause",pin_down:"icon-play"});d.extend(e.styling.bootstrap3,{closer:"glyphicon glyphicon-remove",pin_up:"glyphicon glyphicon-pause",pin_down:"glyphicon glyphicon-play"});d.extend(e.styling.fontawesome,{closer:"fa fa-times",pin_up:"fa fa-pause",pin_down:"fa fa-play"})});

/**
*
* jquery.sparkline.js
*
* v2.1.3
* (c) Splunk, Inc
* Contact: Gareth Watts (gareth@splunk.com)
* http://omnipotent.net/jquery.sparkline/
*
* Generates inline sparkline charts from data supplied either to the method
* or inline in HTML
*
* Compatible with Internet Explorer 6.0+ and modern browsers equipped with the canvas tag
* (Firefox 2.0+, Safari, Opera, etc)
*
* License: New BSD License
*
* Copyright (c) 2012, Splunk Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright notice,
*       this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright notice,
*       this list of conditions and the following disclaimer in the documentation
*       and/or other materials provided with the distribution.
*     * Neither the name of Splunk Inc nor the names of its contributors may
*       be used to endorse or promote products derived from this software without
*       specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
* OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
*
* Usage:
*  $(selector).sparkline(values, options)
*
* If values is undefined or set to 'html' then the data values are read from the specified tag:
*   <p>Sparkline: <span class="sparkline">1,4,6,6,8,5,3,5</span></p>
*   $('.sparkline').sparkline();
* There must be no spaces in the enclosed data set
*
* Otherwise values must be an array of numbers or null values
*    <p>Sparkline: <span id="sparkline1">This text replaced if the browser is compatible</span></p>
*    $('#sparkline1').sparkline([1,4,6,6,8,5,3,5])
*    $('#sparkline2').sparkline([1,4,6,null,null,5,3,5])
*
* Values can also be specified in an HTML comment, or as a values attribute:
*    <p>Sparkline: <span class="sparkline"><!--1,4,6,6,8,5,3,5 --></span></p>
*    <p>Sparkline: <span class="sparkline" values="1,4,6,6,8,5,3,5"></span></p>
*    $('.sparkline').sparkline();
*
* For line charts, x values can also be specified:
*   <p>Sparkline: <span class="sparkline">1:1,2.7:4,3.4:6,5:6,6:8,8.7:5,9:3,10:5</span></p>
*    $('#sparkline1').sparkline([ [1,1], [2.7,4], [3.4,6], [5,6], [6,8], [8.7,5], [9,3], [10,5] ])
*
* By default, options should be passed in as the second argument to the sparkline function:
*   $('.sparkline').sparkline([1,2,3,4], {type: 'bar'})
*
* Options can also be set by passing them on the tag itself.  This feature is disabled by default though
* as there's a slight performance overhead:
*   $('.sparkline').sparkline([1,2,3,4], {enableTagOptions: true})
*   <p>Sparkline: <span class="sparkline" sparkType="bar" sparkBarColor="red">loading</span></p>
* Prefix all options supplied as tag attribute with "spark" (configurable by setting tagOptionsPrefix)
*
* Supported options:
*   lineColor - Color of the line used for the chart
*   fillColor - Color used to fill in the chart - Set to '' or false for a transparent chart
*   width - Width of the chart - Defaults to 3 times the number of values in pixels
*   height - Height of the chart - Defaults to the height of the containing element
*   chartRangeMin - Specify the minimum value to use for the Y range of the chart - Defaults to the minimum value supplied
*   chartRangeMax - Specify the maximum value to use for the Y range of the chart - Defaults to the maximum value supplied
*   chartRangeClip - Clip out of range values to the max/min specified by chartRangeMin and chartRangeMax
*   chartRangeMinX - Specify the minimum value to use for the X range of the chart - Defaults to the minimum value supplied
*   chartRangeMaxX - Specify the maximum value to use for the X range of the chart - Defaults to the maximum value supplied
*   composite - If true then don't erase any existing chart attached to the tag, but draw
*           another chart over the top - Note that width and height are ignored if an
*           existing chart is detected.
*   tagValuesAttribute - Name of tag attribute to check for data values - Defaults to 'values'
*   enableTagOptions - Whether to check tags for sparkline options
*   tagOptionsPrefix - Prefix used for options supplied as tag attributes - Defaults to 'spark'
*   disableHiddenCheck - If set to true, then the plugin will assume that charts will never be drawn into a
*           hidden dom element, avoding a browser reflow
*   disableInteraction - If set to true then all mouseover/click interaction behaviour will be disabled,
*       making the plugin perform much like it did in 1.x
*   disableTooltips - If set to true then tooltips will be disabled - Defaults to false (tooltips enabled)
*   disableHighlight - If set to true then highlighting of selected chart elements on mouseover will be disabled
*       defaults to false (highlights enabled)
*   highlightLighten - Factor to lighten/darken highlighted chart values by - Defaults to 1.4 for a 40% increase
*   tooltipContainer - Specify which DOM element the tooltip should be rendered into - defaults to document.body
*   tooltipClassname - Optional CSS classname to apply to tooltips - If not specified then a default style will be applied
*   tooltipOffsetX - How many pixels away from the mouse pointer to render the tooltip on the X axis
*   tooltipOffsetY - How many pixels away from the mouse pointer to render the tooltip on the r axis
*   tooltipFormatter  - Optional callback that allows you to override the HTML displayed in the tooltip
*       callback is given arguments of (sparkline, options, fields)
*   tooltipChartTitle - If specified then the tooltip uses the string specified by this setting as a title
*   tooltipFormat - A format string or SPFormat object  (or an array thereof for multiple entries)
*       to control the format of the tooltip
*   tooltipPrefix - A string to prepend to each field displayed in a tooltip
*   tooltipSuffix - A string to append to each field displayed in a tooltip
*   tooltipSkipNull - If true then null values will not have a tooltip displayed (defaults to true)
*   tooltipValueLookups - An object or range map to map field values to tooltip strings
*       (eg. to map -1 to "Lost", 0 to "Draw", and 1 to "Win")
*   numberFormatter - Optional callback for formatting numbers in tooltips
*   numberDigitGroupSep - Character to use for group separator in numbers "1,234" - Defaults to ","
*   numberDecimalMark - Character to use for the decimal point when formatting numbers - Defaults to "."
*   numberDigitGroupCount - Number of digits between group separator - Defaults to 3
*
* There are 7 types of sparkline, selected by supplying a "type" option of 'line' (default),
* 'bar', 'tristate', 'bullet', 'discrete', 'pie' or 'box'
*    line - Line chart.  Options:
*       spotColor - Set to '' to not end each line in a circular spot
*       minSpotColor - If set, color of spot at minimum value
*       maxSpotColor - If set, color of spot at maximum value
*       spotRadius - Radius in pixels
*       lineWidth - Width of line in pixels
*       normalRangeMin
*       normalRangeMax - If set draws a filled horizontal bar between these two values marking the "normal"
*                      or expected range of values
*       normalRangeColor - Color to use for the above bar
*       drawNormalOnTop - Draw the normal range above the chart fill color if true
*       defaultPixelsPerValue - Defaults to 3 pixels of width for each value in the chart
*       highlightSpotColor - The color to use for drawing a highlight spot on mouseover - Set to null to disable
*       highlightLineColor - The color to use for drawing a highlight line on mouseover - Set to null to disable
*       valueSpots - Specify which points to draw spots on, and in which color.  Accepts a range map
*
*   bar - Bar chart.  Options:
*       barColor - Color of bars for postive values
*       negBarColor - Color of bars for negative values
*       zeroColor - Color of bars with zero values
*       nullColor - Color of bars with null values - Defaults to omitting the bar entirely
*       barWidth - Width of bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*                  can be an Array of values to control the color of individual bars or a range map
*                  to specify colors for individual ranges of values
*       barSpacing - Gap between bars in pixels
*       zeroAxis - Centers the y-axis around zero if true
*
*   tristate - Charts values of win (>0), lose (<0) or draw (=0)
*       posBarColor - Color of win values
*       negBarColor - Color of lose values
*       zeroBarColor - Color of draw values
*       barWidth - Width of bars in pixels
*       barSpacing - Gap between bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*                  can be an Array of values to control the color of individual bars or a range map
*                  to specify colors for individual ranges of values
*
*   discrete - Options:
*       lineHeight - Height of each line in pixels - Defaults to 30% of the graph height
*       thesholdValue - Values less than this value will be drawn using thresholdColor instead of lineColor
*       thresholdColor
*
*   bullet - Values for bullet graphs msut be in the order: target, performance, range1, range2, range3, ...
*       options:
*       targetColor - The color of the vertical target marker
*       targetWidth - The width of the target marker in pixels
*       performanceColor - The color of the performance measure horizontal bar
*       rangeColors - Colors to use for each qualitative range background color
*
*   pie - Pie chart. Options:
*       sliceColors - An array of colors to use for pie slices
*       offset - Angle in degrees to offset the first slice - Try -90 or +90
*       borderWidth - Width of border to draw around the pie chart, in pixels - Defaults to 0 (no border)
*       borderColor - Color to use for the pie chart border - Defaults to #000
*
*   box - Box plot. Options:
*       raw - Set to true to supply pre-computed plot points as values
*             values should be: low_outlier, low_whisker, q1, median, q3, high_whisker, high_outlier
*             When set to false you can supply any number of values and the box plot will
*             be computed for you.  Default is false.
*       showOutliers - Set to true (default) to display outliers as circles
*       outlierIQR - Interquartile range used to determine outliers.  Default 1.5
*       boxLineColor - Outline color of the box
*       boxFillColor - Fill color for the box
*       whiskerColor - Line color used for whiskers
*       outlierLineColor - Outline color of outlier circles
*       outlierFillColor - Fill color of the outlier circles
*       spotRadius - Radius of outlier circles
*       medianColor - Line color of the median line
*       target - Draw a target cross hair at the supplied value (default undefined)
*
*
*
*   Examples:
*   $('#sparkline1').sparkline(myvalues, { lineColor: '#f00', fillColor: false });
*   $('.barsparks').sparkline('html', { type:'bar', height:'40px', barWidth:5 });
*   $('#tristate').sparkline([1,1,-1,1,0,0,-1], { type:'tristate' }):
*   $('#discrete').sparkline([1,3,4,5,5,3,4,5], { type:'discrete' });
*   $('#bullet').sparkline([10,12,12,9,7], { type:'bullet' });
*   $('#pie').sparkline([1,1,2], { type:'pie' });
*/

/*jslint regexp: true, browser: true, jquery: true, white: true, nomen: false, plusplus: false, maxerr: 500, indent: 4 */

(function(document, Math, undefined) { // performance/minified-size optimization
(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (jQuery && !jQuery.fn.sparkline) {
        factory(jQuery);
    }
}
(function($) {
    'use strict';

    var UNSET_OPTION = {},
        getDefaults, createClass, SPFormat, clipval, quartile, normalizeValue, normalizeValues,
        remove, isNumber, all, sum, addCSS, ensureArray, formatNumber, RangeMap,
        MouseHandler, Tooltip, barHighlightMixin,
        line, bar, tristate, discrete, bullet, pie, box, defaultStyles, initStyles,
        VShape, VCanvas_base, VCanvas_canvas, VCanvas_vml, pending, shapeCount = 0;

    /**
     * Default configuration settings
     */
    getDefaults = function () {
        return {
            // Settings common to most/all chart types
            common: {
                type: 'line',
                lineColor: '#00f',
                fillColor: '#cdf',
                defaultPixelsPerValue: 3,
                width: 'auto',
                height: 'auto',
                composite: false,
                tagValuesAttribute: 'values',
                tagOptionsPrefix: 'spark',
                enableTagOptions: false,
                enableHighlight: true,
                highlightLighten: 1.4,
                tooltipSkipNull: true,
                tooltipPrefix: '',
                tooltipSuffix: '',
                disableHiddenCheck: false,
                numberFormatter: false,
                numberDigitGroupCount: 3,
                numberDigitGroupSep: ',',
                numberDecimalMark: '.',
                disableTooltips: false,
                disableInteraction: false
            },
            // Defaults for line charts
            line: {
                spotColor: '#f80',
                highlightSpotColor: '#5f5',
                highlightLineColor: '#f22',
                spotRadius: 1.5,
                minSpotColor: '#f80',
                maxSpotColor: '#f80',
                lineWidth: 1,
                normalRangeMin: undefined,
                normalRangeMax: undefined,
                normalRangeColor: '#ccc',
                drawNormalOnTop: false,
                chartRangeMin: undefined,
                chartRangeMax: undefined,
                chartRangeMinX: undefined,
                chartRangeMaxX: undefined,
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
            },
            // Defaults for bar charts
            bar: {
                barColor: '#3366cc',
                negBarColor: '#f44',
                stackedBarColor: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#66aa00',
                    '#dd4477', '#0099c6', '#990099'],
                zeroColor: undefined,
                nullColor: undefined,
                zeroAxis: true,
                barWidth: 4,
                barSpacing: 1,
                chartRangeMax: undefined,
                chartRangeMin: undefined,
                chartRangeClip: false,
                colorMap: undefined,
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
            },
            // Defaults for tristate charts
            tristate: {
                barWidth: 4,
                barSpacing: 1,
                posBarColor: '#6f6',
                negBarColor: '#f44',
                zeroBarColor: '#999',
                colorMap: {},
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                tooltipValueLookups: { map: { '-1': 'Loss', '0': 'Draw', '1': 'Win' } }
            },
            // Defaults for discrete charts
            discrete: {
                lineHeight: 'auto',
                thresholdColor: undefined,
                thresholdValue: 0,
                chartRangeMax: undefined,
                chartRangeMin: undefined,
                chartRangeClip: false,
                tooltipFormat: new SPFormat('{{prefix}}{{value}}{{suffix}}')
            },
            // Defaults for bullet charts
            bullet: {
                targetColor: '#f33',
                targetWidth: 3, // width of the target bar in pixels
                performanceColor: '#33f',
                rangeColors: ['#d3dafe', '#a8b6ff', '#7f94ff'],
                base: undefined, // set this to a number to change the base start number
                tooltipFormat: new SPFormat('{{fieldkey:fields}} - {{value}}'),
                tooltipValueLookups: { fields: {r: 'Range', p: 'Performance', t: 'Target'} }
            },
            // Defaults for pie charts
            pie: {
                offset: 0,
                sliceColors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#66aa00',
                    '#dd4477', '#0099c6', '#990099'],
                borderWidth: 0,
                borderColor: '#000',
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
            },
            // Defaults for box plots
            box: {
                raw: false,
                boxLineColor: '#000',
                boxFillColor: '#cdf',
                whiskerColor: '#000',
                outlierLineColor: '#333',
                outlierFillColor: '#fff',
                medianColor: '#f00',
                showOutliers: true,
                outlierIQR: 1.5,
                spotRadius: 1.5,
                target: undefined,
                targetColor: '#4a2',
                chartRangeMax: undefined,
                chartRangeMin: undefined,
                tooltipFormat: new SPFormat('{{field:fields}}: {{value}}'),
                tooltipFormatFieldlistKey: 'field',
                tooltipValueLookups: { fields: { lq: 'Lower Quartile', med: 'Median',
                    uq: 'Upper Quartile', lo: 'Left Outlier', ro: 'Right Outlier',
                    lw: 'Left Whisker', rw: 'Right Whisker'} }
            }
        };
    };

    // You can have tooltips use a css class other than jqstooltip by specifying tooltipClassname
    defaultStyles = '.jqstooltip { ' +
            'position: absolute;' +
            'left: 0px;' +
            'top: 0px;' +
            'visibility: hidden;' +
            'background: rgb(0, 0, 0) transparent;' +
            'background-color: rgba(0,0,0,0.6);' +
            'filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);' +
            '-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";' +
            'color: white;' +
            'font: 10px arial, san serif;' +
            'text-align: left;' +
            'white-space: nowrap;' +
            'padding: 5px;' +
            'border: 1px solid white;' +
            'box-sizing: content-box;' +
            'z-index: 10000;' +
            '}' +
            '.jqsfield { ' +
            'color: white;' +
            'font: 10px arial, san serif;' +
            'text-align: left;' +
            '}';

    /**
     * Utilities
     */

    createClass = function (/* [baseclass, [mixin, ...]], definition */) {
        var Class, args;
        Class = function () {
            this.init.apply(this, arguments);
        };
        if (arguments.length > 1) {
            if (arguments[0]) {
                Class.prototype = $.extend(new arguments[0](), arguments[arguments.length - 1]);
                Class._super = arguments[0].prototype;
            } else {
                Class.prototype = arguments[arguments.length - 1];
            }
            if (arguments.length > 2) {
                args = Array.prototype.slice.call(arguments, 1, -1);
                args.unshift(Class.prototype);
                $.extend.apply($, args);
            }
        } else {
            Class.prototype = arguments[0];
        }
        Class.prototype.cls = Class;
        return Class;
    };

    /**
     * Wraps a format string for tooltips
     * {{x}}
     * {{x.2}
     * {{x:months}}
     */
    $.SPFormatClass = SPFormat = createClass({
        fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
        precre: /(\w+)\.(\d+)/,

        init: function (format, fclass) {
            this.format = format;
            this.fclass = fclass;
        },

        render: function (fieldset, lookups, options) {
            var self = this,
                fields = fieldset,
                match, token, lookupkey, fieldvalue, prec;
            return this.format.replace(this.fre, function () {
                var lookup;
                token = arguments[1];
                lookupkey = arguments[3];
                match = self.precre.exec(token);
                if (match) {
                    prec = match[2];
                    token = match[1];
                } else {
                    prec = false;
                }
                fieldvalue = fields[token];
                if (fieldvalue === undefined) {
                    return '';
                }
                if (lookupkey && lookups && lookups[lookupkey]) {
                    lookup = lookups[lookupkey];
                    if (lookup.get) { // RangeMap
                        return lookups[lookupkey].get(fieldvalue) || fieldvalue;
                    } else {
                        return lookups[lookupkey][fieldvalue] || fieldvalue;
                    }
                }
                if (isNumber(fieldvalue)) {
                    if (options.get('numberFormatter')) {
                        fieldvalue = options.get('numberFormatter')(fieldvalue);
                    } else {
                        fieldvalue = formatNumber(fieldvalue, prec,
                            options.get('numberDigitGroupCount'),
                            options.get('numberDigitGroupSep'),
                            options.get('numberDecimalMark'));
                    }
                }
                return fieldvalue;
            });
        }
    });

    // convience method to avoid needing the new operator
    $.spformat = function(format, fclass) {
        return new SPFormat(format, fclass);
    };

    clipval = function (val, min, max) {
        if (val < min) {
            return min;
        }
        if (val > max) {
            return max;
        }
        return val;
    };

    quartile = function (values, q) {
        var vl;
        if (q === 2) {
            vl = Math.floor(values.length / 2);
            return values.length % 2 ? values[vl] : (values[vl-1] + values[vl]) / 2;
        } else {
            if (values.length % 2 ) { // odd
                vl = (values.length * q + q) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 : values[vl-1];
            } else { //even
                vl = (values.length * q + 2) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 :  values[vl-1];

            }
        }
    };

    normalizeValue = function (val) {
        var nf;
        switch (val) {
            case 'undefined':
                val = undefined;
                break;
            case 'null':
                val = null;
                break;
            case 'true':
                val = true;
                break;
            case 'false':
                val = false;
                break;
            default:
                nf = parseFloat(val);
                if (val == nf) {
                    val = nf;
                }
        }
        return val;
    };

    normalizeValues = function (vals) {
        var i, result = [];
        for (i = vals.length; i--;) {
            result[i] = normalizeValue(vals[i]);
        }
        return result;
    };

    remove = function (vals, filter) {
        var i, vl, result = [];
        for (i = 0, vl = vals.length; i < vl; i++) {
            if (vals[i] !== filter) {
                result.push(vals[i]);
            }
        }
        return result;
    };

    isNumber = function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    };

    formatNumber = function (num, prec, groupsize, groupsep, decsep) {
        var p, i;
        num = (prec === false ? parseFloat(num).toString() : num.toFixed(prec)).split('');
        p = (p = $.inArray('.', num)) < 0 ? num.length : p;
        if (p < num.length) {
            num[p] = decsep;
        }
        for (i = p - groupsize; i > 0; i -= groupsize) {
            num.splice(i, 0, groupsep);
        }
        return num.join('');
    };

    // determine if all values of an array match a value
    // returns true if the array is empty
    all = function (val, arr, ignoreNull) {
        var i;
        for (i = arr.length; i--; ) {
            if (ignoreNull && arr[i] === null) continue;
            if (arr[i] !== val) {
                return false;
            }
        }
        return true;
    };

    // sums the numeric values in an array, ignoring other values
    sum = function (vals) {
        var total = 0, i;
        for (i = vals.length; i--;) {
            total += typeof vals[i] === 'number' ? vals[i] : 0;
        }
        return total;
    };

    ensureArray = function (val) {
        return $.isArray(val) ? val : [val];
    };

    // http://paulirish.com/2008/bookmarklet-inject-new-css-rules/
    addCSS = function(css) {
        var tag, iefail;
        if (document.createStyleSheet) {
            try {
                document.createStyleSheet().cssText = css;
                return;
            } catch (e) {
                // IE <= 9 maxes out at 31 stylesheets; inject into page instead.
                iefail = true;
            }
        }
        tag = document.createElement('style');
        tag.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(tag);
        if (iefail) {
            document.styleSheets[document.styleSheets.length - 1].cssText = css;
        } else {
            tag[(typeof document.body.style.WebkitAppearance == 'string') /* webkit only */ ? 'innerText' : 'innerHTML'] = css;
        }
    };

    // Provide a cross-browser interface to a few simple drawing primitives
    $.fn.simpledraw = function (width, height, useExisting, interact) {
        var target, mhandler;
        if (useExisting && (target = this.data('_jqs_vcanvas'))) {
            return target;
        }

        if ($.fn.sparkline.canvas === false) {
            // We've already determined that neither Canvas nor VML are available
            return false;

        } else if ($.fn.sparkline.canvas === undefined) {
            // No function defined yet -- need to see if we support Canvas or VML
            var el = document.createElement('canvas');
            if (!!(el.getContext && el.getContext('2d'))) {
                // Canvas is available
                $.fn.sparkline.canvas = function(width, height, target, interact) {
                    return new VCanvas_canvas(width, height, target, interact);
                };
            } else if (document.namespaces && !document.namespaces.v) {
                // VML is available
                document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
                $.fn.sparkline.canvas = function(width, height, target, interact) {
                    return new VCanvas_vml(width, height, target);
                };
            } else {
                // Neither Canvas nor VML are available
                $.fn.sparkline.canvas = false;
                return false;
            }
        }

        if (width === undefined) {
            width = $(this).innerWidth();
        }
        if (height === undefined) {
            height = $(this).innerHeight();
        }

        target = $.fn.sparkline.canvas(width, height, this, interact);

        mhandler = $(this).data('_jqs_mhandler');
        if (mhandler) {
            mhandler.registerCanvas(target);
        }
        return target;
    };

    $.fn.cleardraw = function () {
        var target = this.data('_jqs_vcanvas');
        if (target) {
            target.reset();
        }
    };

    $.RangeMapClass = RangeMap = createClass({
        init: function (map) {
            var key, range, rangelist = [];
            for (key in map) {
                if (map.hasOwnProperty(key) && typeof key === 'string' && key.indexOf(':') > -1) {
                    range = key.split(':');
                    range[0] = range[0].length === 0 ? -Infinity : parseFloat(range[0]);
                    range[1] = range[1].length === 0 ? Infinity : parseFloat(range[1]);
                    range[2] = map[key];
                    rangelist.push(range);
                }
            }
            this.map = map;
            this.rangelist = rangelist || false;
        },

        get: function (value) {
            var rangelist = this.rangelist,
                i, range, result;
            if ((result = this.map[value]) !== undefined) {
                return result;
            }
            if (rangelist) {
                for (i = rangelist.length; i--;) {
                    range = rangelist[i];
                    if (range[0] <= value && range[1] >= value) {
                        return range[2];
                    }
                }
            }
            return undefined;
        }
    });

    // Convenience function
    $.range_map = function(map) {
        return new RangeMap(map);
    };

    MouseHandler = createClass({
        init: function (el, options) {
            var $el = $(el);
            this.$el = $el;
            this.options = options;
            this.currentPageX = 0;
            this.currentPageY = 0;
            this.el = el;
            this.splist = [];
            this.tooltip = null;
            this.over = false;
            this.displayTooltips = !options.get('disableTooltips');
            this.highlightEnabled = !options.get('disableHighlight');
        },

        registerSparkline: function (sp) {
            this.splist.push(sp);
            if (this.over) {
                this.updateDisplay();
            }
        },

        registerCanvas: function (canvas) {
            var $canvas = $(canvas.canvas);
            this.canvas = canvas;
            this.$canvas = $canvas;
            $canvas.mouseenter($.proxy(this.mouseenter, this));
            $canvas.mouseleave($.proxy(this.mouseleave, this));
            $canvas.click($.proxy(this.mouseclick, this));
        },

        reset: function (removeTooltip) {
            this.splist = [];
            if (this.tooltip && removeTooltip) {
                this.tooltip.remove();
                this.tooltip = undefined;
            }
        },

        mouseclick: function (e) {
            var clickEvent = $.Event('sparklineClick');
            clickEvent.originalEvent = e;
            clickEvent.sparklines = this.splist;
            this.$el.trigger(clickEvent);
        },

        mouseenter: function (e) {
            $(document.body).unbind('mousemove.jqs');
            $(document.body).bind('mousemove.jqs', $.proxy(this.mousemove, this));
            this.over = true;
            this.currentPageX = e.pageX;
            this.currentPageY = e.pageY;
            this.currentEl = e.target;
            if (!this.tooltip && this.displayTooltips) {
                this.tooltip = new Tooltip(this.options);
                this.tooltip.updatePosition(e.pageX, e.pageY);
            }
            this.updateDisplay();
        },

        mouseleave: function () {
            $(document.body).unbind('mousemove.jqs');
            var splist = this.splist,
                 spcount = splist.length,
                 needsRefresh = false,
                 sp, i;
            this.over = false;
            this.currentEl = null;

            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }

            for (i = 0; i < spcount; i++) {
                sp = splist[i];
                if (sp.clearRegionHighlight()) {
                    needsRefresh = true;
                }
            }

            if (needsRefresh) {
                this.canvas.render();
            }
        },

        mousemove: function (e) {
            this.currentPageX = e.pageX;
            this.currentPageY = e.pageY;
            this.currentEl = e.target;
            if (this.tooltip) {
                this.tooltip.updatePosition(e.pageX, e.pageY);
            }
            this.updateDisplay();
        },

        updateDisplay: function () {
            var splist = this.splist,
                 spcount = splist.length,
                 needsRefresh = false,
                 offset = this.$canvas.offset(),
                 localX = this.currentPageX - offset.left,
                 localY = this.currentPageY - offset.top,
                 tooltiphtml, sp, i, result, changeEvent;
            if (!this.over) {
                return;
            }
            for (i = 0; i < spcount; i++) {
                sp = splist[i];
                result = sp.setRegionHighlight(this.currentEl, localX, localY);
                if (result) {
                    needsRefresh = true;
                }
            }
            if (needsRefresh) {
                changeEvent = $.Event('sparklineRegionChange');
                changeEvent.sparklines = this.splist;
                this.$el.trigger(changeEvent);
                if (this.tooltip) {
                    tooltiphtml = '';
                    for (i = 0; i < spcount; i++) {
                        sp = splist[i];
                        tooltiphtml += sp.getCurrentRegionTooltip();
                    }
                    this.tooltip.setContent(tooltiphtml);
                }
                if (!this.disableHighlight) {
                    this.canvas.render();
                }
            }
            if (result === null) {
                this.mouseleave();
            }
        }
    });


    Tooltip = createClass({
        sizeStyle: 'position: static !important;' +
            'display: block !important;' +
            'visibility: hidden !important;' +
            'float: left !important;',

        init: function (options) {
            var tooltipClassname = options.get('tooltipClassname', 'jqstooltip'),
                sizetipStyle = this.sizeStyle,
                offset;
            this.container = options.get('tooltipContainer') || document.body;
            this.tooltipOffsetX = options.get('tooltipOffsetX', 10);
            this.tooltipOffsetY = options.get('tooltipOffsetY', 12);
            // remove any previous lingering tooltip
            $('#jqssizetip').remove();
            $('#jqstooltip').remove();
            this.sizetip = $('<div/>', {
                id: 'jqssizetip',
                style: sizetipStyle,
                'class': tooltipClassname
            });
            this.tooltip = $('<div/>', {
                id: 'jqstooltip',
                'class': tooltipClassname
            }).appendTo(this.container);
            // account for the container's location
            offset = this.tooltip.offset();
            this.offsetLeft = offset.left;
            this.offsetTop = offset.top;
            this.hidden = true;
            $(window).unbind('resize.jqs scroll.jqs');
            $(window).bind('resize.jqs scroll.jqs', $.proxy(this.updateWindowDims, this));
            this.updateWindowDims();
        },

        updateWindowDims: function () {
            this.scrollTop = $(window).scrollTop();
            this.scrollLeft = $(window).scrollLeft();
            this.scrollRight = this.scrollLeft + $(window).width();
            this.updatePosition();
        },

        getSize: function (content) {
            this.sizetip.html(content).appendTo(this.container);
            this.width = this.sizetip.width() + 1;
            this.height = this.sizetip.height();
            this.sizetip.remove();
        },

        setContent: function (content) {
            if (!content) {
                this.tooltip.css('visibility', 'hidden');
                this.hidden = true;
                return;
            }
            this.getSize(content);
            this.tooltip.html(content)
                .css({
                    'width': this.width,
                    'height': this.height,
                    'visibility': 'visible'
                });
            if (this.hidden) {
                this.hidden = false;
                this.updatePosition();
            }
        },

        updatePosition: function (x, y) {
            if (x === undefined) {
                if (this.mousex === undefined) {
                    return;
                }
                x = this.mousex - this.offsetLeft;
                y = this.mousey - this.offsetTop;

            } else {
                this.mousex = x = x - this.offsetLeft;
                this.mousey = y = y - this.offsetTop;
            }
            if (!this.height || !this.width || this.hidden) {
                return;
            }

            y -= this.height + this.tooltipOffsetY;
            x += this.tooltipOffsetX;

            if (y < this.scrollTop) {
                y = this.scrollTop;
            }
            if (x < this.scrollLeft) {
                x = this.scrollLeft;
            } else if (x + this.width > this.scrollRight) {
                x = this.scrollRight - this.width;
            }

            this.tooltip.css({
                'left': x,
                'top': y
            });
        },

        remove: function () {
            this.tooltip.remove();
            this.sizetip.remove();
            this.sizetip = this.tooltip = undefined;
            $(window).unbind('resize.jqs scroll.jqs');
        }
    });

    initStyles = function() {
        addCSS(defaultStyles);
    };

    $(initStyles);

    pending = [];
    $.fn.sparkline = function (userValues, userOptions) {
        return this.each(function () {
            var options = new $.fn.sparkline.options(this, userOptions),
                 $this = $(this),
                 render, i;
            render = function () {
                var values, width, height, tmp, mhandler, sp, vals;
                if (userValues === 'html' || userValues === undefined) {
                    vals = this.getAttribute(options.get('tagValuesAttribute'));
                    if (vals === undefined || vals === null) {
                        vals = $this.html();
                    }
                    values = vals.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, '').split(',');
                } else {
                    values = userValues;
                }

                width = options.get('width') === 'auto' ? values.length * options.get('defaultPixelsPerValue') : options.get('width');
                if (options.get('height') === 'auto') {
                    if (!options.get('composite') || !$.data(this, '_jqs_vcanvas')) {
                        // must be a better way to get the line height
                        tmp = document.createElement('span');
                        tmp.innerHTML = 'a';
                        $this.html(tmp);
                        height = $(tmp).innerHeight() || $(tmp).height();
                        $(tmp).remove();
                        tmp = null;
                    }
                } else {
                    height = options.get('height');
                }

                if (!options.get('disableInteraction')) {
                    mhandler = $.data(this, '_jqs_mhandler');
                    if (!mhandler) {
                        mhandler = new MouseHandler(this, options);
                        $.data(this, '_jqs_mhandler', mhandler);
                    } else if (!options.get('composite')) {
                        mhandler.reset();
                    }
                } else {
                    mhandler = false;
                }

                if (options.get('composite') && !$.data(this, '_jqs_vcanvas')) {
                    if (!$.data(this, '_jqs_errnotify')) {
                        alert('Attempted to attach a composite sparkline to an element with no existing sparkline');
                        $.data(this, '_jqs_errnotify', true);
                    }
                    return;
                }

                sp = new $.fn.sparkline[options.get('type')](this, values, options, width, height);

                sp.render();

                if (mhandler) {
                    mhandler.registerSparkline(sp);
                }
            };
            if (($(this).html() && !options.get('disableHiddenCheck') && $(this).is(':hidden')) || !$(this).parents('body').length) {
                if (!options.get('composite') && $.data(this, '_jqs_pending')) {
                    // remove any existing references to the element
                    for (i = pending.length; i; i--) {
                        if (pending[i - 1][0] == this) {
                            pending.splice(i - 1, 1);
                        }
                    }
                }
                pending.push([this, render]);
                $.data(this, '_jqs_pending', true);
            } else {
                render.call(this);
            }
        });
    };

    $.fn.sparkline.defaults = getDefaults();


    $.sparkline_display_visible = function () {
        var el, i, pl;
        var done = [];
        for (i = 0, pl = pending.length; i < pl; i++) {
            el = pending[i][0];
            if ($(el).is(':visible') && !$(el).parents().is(':hidden')) {
                pending[i][1].call(el);
                $.data(pending[i][0], '_jqs_pending', false);
                done.push(i);
            } else if (!$(el).closest('html').length && !$.data(el, '_jqs_pending')) {
                // element has been inserted and removed from the DOM
                // If it was not yet inserted into the dom then the .data request
                // will return true.
                // removing from the dom causes the data to be removed.
                $.data(pending[i][0], '_jqs_pending', false);
                done.push(i);
            }
        }
        for (i = done.length; i; i--) {
            pending.splice(done[i - 1], 1);
        }
    };


    /**
     * User option handler
     */
    $.fn.sparkline.options = createClass({
        init: function (tag, userOptions) {
            var extendedOptions, defaults, base, tagOptionType;
            this.userOptions = userOptions = userOptions || {};
            this.tag = tag;
            this.tagValCache = {};
            defaults = $.fn.sparkline.defaults;
            base = defaults.common;
            this.tagOptionsPrefix = userOptions.enableTagOptions && (userOptions.tagOptionsPrefix || base.tagOptionsPrefix);

            tagOptionType = this.getTagSetting('type');
            if (tagOptionType === UNSET_OPTION) {
                extendedOptions = defaults[userOptions.type || base.type];
            } else {
                extendedOptions = defaults[tagOptionType];
            }
            this.mergedOptions = $.extend({}, base, extendedOptions, userOptions);
        },


        getTagSetting: function (key) {
            var prefix = this.tagOptionsPrefix,
                val, i, pairs, keyval;
            if (prefix === false || prefix === undefined) {
                return UNSET_OPTION;
            }
            if (this.tagValCache.hasOwnProperty(key)) {
                val = this.tagValCache.key;
            } else {
                val = this.tag.getAttribute(prefix + key);
                if (val === undefined || val === null) {
                    val = UNSET_OPTION;
                } else if (val.substr(0, 1) === '[') {
                    val = val.substr(1, val.length - 2).split(',');
                    for (i = val.length; i--;) {
                        val[i] = normalizeValue(val[i].replace(/(^\s*)|(\s*$)/g, ''));
                    }
                } else if (val.substr(0, 1) === '{') {
                    pairs = val.substr(1, val.length - 2).split(',');
                    val = {};
                    for (i = pairs.length; i--;) {
                        keyval = pairs[i].split(':', 2);
                        val[keyval[0].replace(/(^\s*)|(\s*$)/g, '')] = normalizeValue(keyval[1].replace(/(^\s*)|(\s*$)/g, ''));
                    }
                } else {
                    val = normalizeValue(val);
                }
                this.tagValCache.key = val;
            }
            return val;
        },

        get: function (key, defaultval) {
            var tagOption = this.getTagSetting(key),
                result;
            if (tagOption !== UNSET_OPTION) {
                return tagOption;
            }
            return (result = this.mergedOptions[key]) === undefined ? defaultval : result;
        }
    });


    $.fn.sparkline._base = createClass({
        disabled: false,

        init: function (el, values, options, width, height) {
            this.el = el;
            this.$el = $(el);
            this.values = values;
            this.options = options;
            this.width = width;
            this.height = height;
            this.currentRegion = undefined;
        },

        /**
         * Setup the canvas
         */
        initTarget: function () {
            var interactive = !this.options.get('disableInteraction');
            if (!(this.target = this.$el.simpledraw(this.width, this.height, this.options.get('composite'), interactive))) {
                this.disabled = true;
            } else {
                this.canvasWidth = this.target.pixelWidth;
                this.canvasHeight = this.target.pixelHeight;
            }
        },

        /**
         * Actually render the chart to the canvas
         */
        render: function () {
            if (this.disabled) {
                this.el.innerHTML = '';
                return false;
            }
            return true;
        },

        /**
         * Return a region id for a given x/y co-ordinate
         */
        getRegion: function (x, y) {
        },

        /**
         * Highlight an item based on the moused-over x,y co-ordinate
         */
        setRegionHighlight: function (el, x, y) {
            var currentRegion = this.currentRegion,
                highlightEnabled = !this.options.get('disableHighlight'),
                newRegion;
            if (x > this.canvasWidth || y > this.canvasHeight || x < 0 || y < 0) {
                return null;
            }
            newRegion = this.getRegion(el, x, y);
            if (currentRegion !== newRegion) {
                if (currentRegion !== undefined && highlightEnabled) {
                    this.removeHighlight();
                }
                this.currentRegion = newRegion;
                if (newRegion !== undefined && highlightEnabled) {
                    this.renderHighlight();
                }
                return true;
            }
            return false;
        },

        /**
         * Reset any currently highlighted item
         */
        clearRegionHighlight: function () {
            if (this.currentRegion !== undefined) {
                this.removeHighlight();
                this.currentRegion = undefined;
                return true;
            }
            return false;
        },

        renderHighlight: function () {
            this.changeHighlight(true);
        },

        removeHighlight: function () {
            this.changeHighlight(false);
        },

        changeHighlight: function (highlight)  {},

        /**
         * Fetch the HTML to display as a tooltip
         */
        getCurrentRegionTooltip: function () {
            var options = this.options,
                header = '',
                entries = [],
                fields, formats, formatlen, fclass, text, i,
                showFields, showFieldsKey, newFields, fv,
                formatter, format, fieldlen, j;
            if (this.currentRegion === undefined) {
                return '';
            }
            fields = this.getCurrentRegionFields();
            formatter = options.get('tooltipFormatter');
            if (formatter) {
                return formatter(this, options, fields);
            }
            if (options.get('tooltipChartTitle')) {
                header += '<div class="jqs jqstitle">' + options.get('tooltipChartTitle') + '</div>\n';
            }
            formats = this.options.get('tooltipFormat');
            if (!formats) {
                return '';
            }
            if (!$.isArray(formats)) {
                formats = [formats];
            }
            if (!$.isArray(fields)) {
                fields = [fields];
            }
            showFields = this.options.get('tooltipFormatFieldlist');
            showFieldsKey = this.options.get('tooltipFormatFieldlistKey');
            if (showFields && showFieldsKey) {
                // user-selected ordering of fields
                newFields = [];
                for (i = fields.length; i--;) {
                    fv = fields[i][showFieldsKey];
                    if ((j = $.inArray(fv, showFields)) != -1) {
                        newFields[j] = fields[i];
                    }
                }
                fields = newFields;
            }
            formatlen = formats.length;
            fieldlen = fields.length;
            for (i = 0; i < formatlen; i++) {
                format = formats[i];
                if (typeof format === 'string') {
                    format = new SPFormat(format);
                }
                fclass = format.fclass || 'jqsfield';
                for (j = 0; j < fieldlen; j++) {
                    if (!fields[j].isNull || !options.get('tooltipSkipNull')) {
                        $.extend(fields[j], {
                            prefix: options.get('tooltipPrefix'),
                            suffix: options.get('tooltipSuffix')
                        });
                        text = format.render(fields[j], options.get('tooltipValueLookups'), options);
                        entries.push('<div class="' + fclass + '">' + text + '</div>');
                    }
                }
            }
            if (entries.length) {
                return header + entries.join('\n');
            }
            return '';
        },

        getCurrentRegionFields: function () {},

        calcHighlightColor: function (color, options) {
            var highlightColor = options.get('highlightColor'),
                lighten = options.get('highlightLighten'),
                parse, mult, rgbnew, i;
            if (highlightColor) {
                return highlightColor;
            }
            if (lighten) {
                // extract RGB values
                parse = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(color) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
                if (parse) {
                    rgbnew = [];
                    mult = color.length === 4 ? 16 : 1;
                    for (i = 0; i < 3; i++) {
                        rgbnew[i] = clipval(Math.round(parseInt(parse[i + 1], 16) * mult * lighten), 0, 255);
                    }
                    return 'rgb(' + rgbnew.join(',') + ')';
                }

            }
            return color;
        }

    });

    barHighlightMixin = {
        changeHighlight: function (highlight) {
            var currentRegion = this.currentRegion,
                target = this.target,
                shapeids = this.regionShapes[currentRegion],
                newShapes;
            // will be null if the region value was null
            if (shapeids) {
                newShapes = this.renderRegion(currentRegion, highlight);
                if ($.isArray(newShapes) || $.isArray(shapeids)) {
                    target.replaceWithShapes(shapeids, newShapes);
                    this.regionShapes[currentRegion] = $.map(newShapes, function (newShape) {
                        return newShape.id;
                    });
                } else {
                    target.replaceWithShape(shapeids, newShapes);
                    this.regionShapes[currentRegion] = newShapes.id;
                }
            }
        },

        render: function () {
            var values = this.values,
                target = this.target,
                regionShapes = this.regionShapes,
                shapes, ids, i, j;

            if (!this.cls._super.render.call(this)) {
                return;
            }
            for (i = values.length; i--;) {
                shapes = this.renderRegion(i);
                if (shapes) {
                    if ($.isArray(shapes)) {
                        ids = [];
                        for (j = shapes.length; j--;) {
                            shapes[j].append();
                            ids.push(shapes[j].id);
                        }
                        regionShapes[i] = ids;
                    } else {
                        shapes.append();
                        regionShapes[i] = shapes.id; // store just the shapeid
                    }
                } else {
                    // null value
                    regionShapes[i] = null;
                }
            }
            target.render();
        }
    };

    /**
     * Line charts
     */
    $.fn.sparkline.line = line = createClass($.fn.sparkline._base, {
        type: 'line',

        init: function (el, values, options, width, height) {
            line._super.init.call(this, el, values, options, width, height);
            this.vertices = [];
            this.regionMap = [];
            this.xvalues = [];
            this.yvalues = [];
            this.yminmax = [];
            this.hightlightSpotId = null;
            this.lastShapeId = null;
            this.initTarget();
        },

        getRegion: function (el, x, y) {
            var i,
                regionMap = this.regionMap; // maps regions to value positions
            for (i = regionMap.length; i--;) {
                if (regionMap[i] !== null && x >= regionMap[i][0] && x <= regionMap[i][1]) {
                    return regionMap[i][2];
                }
            }
            return undefined;
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion;
            return {
                isNull: this.yvalues[currentRegion] === null,
                x: this.xvalues[currentRegion],
                y: this.yvalues[currentRegion],
                color: this.options.get('lineColor'),
                fillColor: this.options.get('fillColor'),
                offset: currentRegion
            };
        },

        renderHighlight: function () {
            var currentRegion = this.currentRegion,
                target = this.target,
                vertex = this.vertices[currentRegion],
                options = this.options,
                spotRadius = options.get('spotRadius'),
                highlightSpotColor = options.get('highlightSpotColor'),
                highlightLineColor = options.get('highlightLineColor'),
                highlightSpot, highlightLine;

            if (!vertex) {
                return;
            }
            if (spotRadius && highlightSpotColor) {
                highlightSpot = target.drawCircle(vertex[0], vertex[1],
                    spotRadius, undefined, highlightSpotColor);
                this.highlightSpotId = highlightSpot.id;
                target.insertAfterShape(this.lastShapeId, highlightSpot);
            }
            if (highlightLineColor) {
                highlightLine = target.drawLine(vertex[0], this.canvasTop, vertex[0],
                    this.canvasTop + this.canvasHeight, highlightLineColor);
                this.highlightLineId = highlightLine.id;
                target.insertAfterShape(this.lastShapeId, highlightLine);
            }
        },

        removeHighlight: function () {
            var target = this.target;
            if (this.highlightSpotId) {
                target.removeShapeId(this.highlightSpotId);
                this.highlightSpotId = null;
            }
            if (this.highlightLineId) {
                target.removeShapeId(this.highlightLineId);
                this.highlightLineId = null;
            }
        },

        scanValues: function () {
            var values = this.values,
                valcount = values.length,
                xvalues = this.xvalues,
                yvalues = this.yvalues,
                yminmax = this.yminmax,
                i, val, isStr, isArray, sp;
            for (i = 0; i < valcount; i++) {
                val = values[i];
                isStr = typeof(values[i]) === 'string';
                isArray = typeof(values[i]) === 'object' && values[i] instanceof Array;
                sp = isStr && values[i].split(':');
                if (isStr && sp.length === 2) { // x:y
                    xvalues.push(Number(sp[0]));
                    yvalues.push(Number(sp[1]));
                    yminmax.push(Number(sp[1]));
                } else if (isArray) {
                    xvalues.push(val[0]);
                    yvalues.push(val[1]);
                    yminmax.push(val[1]);
                } else {
                    xvalues.push(i);
                    if (values[i] === null || values[i] === 'null') {
                        yvalues.push(null);
                    } else {
                        yvalues.push(Number(val));
                        yminmax.push(Number(val));
                    }
                }
            }
            if (this.options.get('xvalues')) {
                xvalues = this.options.get('xvalues');
            }

            this.maxy = this.maxyorg = Math.max.apply(Math, yminmax);
            this.miny = this.minyorg = Math.min.apply(Math, yminmax);

            this.maxx = Math.max.apply(Math, xvalues);
            this.minx = Math.min.apply(Math, xvalues);

            this.xvalues = xvalues;
            this.yvalues = yvalues;
            this.yminmax = yminmax;

        },

        processRangeOptions: function () {
            var options = this.options,
                normalRangeMin = options.get('normalRangeMin'),
                normalRangeMax = options.get('normalRangeMax');

            if (normalRangeMin !== undefined) {
                if (normalRangeMin < this.miny) {
                    this.miny = normalRangeMin;
                }
                if (normalRangeMax > this.maxy) {
                    this.maxy = normalRangeMax;
                }
            }
            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < this.miny)) {
                this.miny = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > this.maxy)) {
                this.maxy = options.get('chartRangeMax');
            }
            if (options.get('chartRangeMinX') !== undefined && (options.get('chartRangeClipX') || options.get('chartRangeMinX') < this.minx)) {
                this.minx = options.get('chartRangeMinX');
            }
            if (options.get('chartRangeMaxX') !== undefined && (options.get('chartRangeClipX') || options.get('chartRangeMaxX') > this.maxx)) {
                this.maxx = options.get('chartRangeMaxX');
            }

        },

        drawNormalRange: function (canvasLeft, canvasTop, canvasHeight, canvasWidth, rangey) {
            var normalRangeMin = this.options.get('normalRangeMin'),
                normalRangeMax = this.options.get('normalRangeMax'),
                ytop = canvasTop + Math.round(canvasHeight - (canvasHeight * ((normalRangeMax - this.miny) / rangey))),
                height = Math.round((canvasHeight * (normalRangeMax - normalRangeMin)) / rangey);
            this.target.drawRect(canvasLeft, ytop, canvasWidth, height, undefined, this.options.get('normalRangeColor')).append();
        },

        render: function () {
            var options = this.options,
                target = this.target,
                canvasWidth = this.canvasWidth,
                canvasHeight = this.canvasHeight,
                vertices = this.vertices,
                spotRadius = options.get('spotRadius'),
                regionMap = this.regionMap,
                rangex, rangey, yvallast,
                canvasTop, canvasLeft,
                vertex, path, paths, x, y, xnext, xpos, xposnext,
                last, next, yvalcount, lineShapes, fillShapes, plen,
                valueSpots, hlSpotsEnabled, color, xvalues, yvalues, i;

            if (!line._super.render.call(this)) {
                return;
            }

            this.scanValues();
            this.processRangeOptions();

            xvalues = this.xvalues;
            yvalues = this.yvalues;

            if (!this.yminmax.length || this.yvalues.length < 2) {
                // empty or all null valuess
                return;
            }

            canvasTop = canvasLeft = 0;

            rangex = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx;
            rangey = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny;
            yvallast = this.yvalues.length - 1;

            if (spotRadius && (canvasWidth < (spotRadius * 4) || canvasHeight < (spotRadius * 4))) {
                spotRadius = 0;
            }
            if (spotRadius) {
                // adjust the canvas size as required so that spots will fit
                hlSpotsEnabled = options.get('highlightSpotColor') &&  !options.get('disableInteraction');
                if (hlSpotsEnabled || options.get('minSpotColor') || (options.get('spotColor') && yvalues[yvallast] === this.miny)) {
                    canvasHeight -= Math.ceil(spotRadius);
                }
                if (hlSpotsEnabled || options.get('maxSpotColor') || (options.get('spotColor') && yvalues[yvallast] === this.maxy)) {
                    canvasHeight -= Math.ceil(spotRadius);
                    canvasTop += Math.ceil(spotRadius);
                }
                if (hlSpotsEnabled ||
                     ((options.get('minSpotColor') || options.get('maxSpotColor')) && (yvalues[0] === this.miny || yvalues[0] === this.maxy))) {
                    canvasLeft += Math.ceil(spotRadius);
                    canvasWidth -= Math.ceil(spotRadius);
                }
                if (hlSpotsEnabled || options.get('spotColor') ||
                    (options.get('minSpotColor') || options.get('maxSpotColor') &&
                        (yvalues[yvallast] === this.miny || yvalues[yvallast] === this.maxy))) {
                    canvasWidth -= Math.ceil(spotRadius);
                }
            }


            canvasHeight--;

            if (options.get('normalRangeMin') !== undefined && !options.get('drawNormalOnTop')) {
                this.drawNormalRange(canvasLeft, canvasTop, canvasHeight, canvasWidth, rangey);
            }

            path = [];
            paths = [path];
            last = next = null;
            yvalcount = yvalues.length;
            for (i = 0; i < yvalcount; i++) {
                x = xvalues[i];
                xnext = xvalues[i + 1];
                y = yvalues[i];
                xpos = canvasLeft + Math.round((x - this.minx) * (canvasWidth / rangex));
                xposnext = i < yvalcount - 1 ? canvasLeft + Math.round((xnext - this.minx) * (canvasWidth / rangex)) : canvasWidth;
                next = xpos + ((xposnext - xpos) / 2);
                regionMap[i] = [last || 0, next, i];
                last = next;
                if (y === null) {
                    if (i) {
                        if (yvalues[i - 1] !== null) {
                            path = [];
                            paths.push(path);
                        }
                        vertices.push(null);
                    }
                } else {
                    if (y < this.miny) {
                        y = this.miny;
                    }
                    if (y > this.maxy) {
                        y = this.maxy;
                    }
                    if (!path.length) {
                        // previous value was null
                        path.push([xpos, canvasTop + canvasHeight]);
                    }
                    vertex = [xpos, canvasTop + Math.round(canvasHeight - (canvasHeight * ((y - this.miny) / rangey)))];
                    path.push(vertex);
                    vertices.push(vertex);
                }
            }

            lineShapes = [];
            fillShapes = [];
            plen = paths.length;
            for (i = 0; i < plen; i++) {
                path = paths[i];
                if (path.length) {
                    if (options.get('fillColor')) {
                        path.push([path[path.length - 1][0], (canvasTop + canvasHeight)]);
                        fillShapes.push(path.slice(0));
                        path.pop();
                    }
                    // if there's only a single point in this path, then we want to display it
                    // as a vertical line which means we keep path[0]  as is
                    if (path.length > 2) {
                        // else we want the first value
                        path[0] = [path[0][0], path[1][1]];
                    }
                    lineShapes.push(path);
                }
            }

            // draw the fill first, then optionally the normal range, then the line on top of that
            plen = fillShapes.length;
            for (i = 0; i < plen; i++) {
                target.drawShape(fillShapes[i],
                    options.get('fillColor'), options.get('fillColor')).append();
            }

            if (options.get('normalRangeMin') !== undefined && options.get('drawNormalOnTop')) {
                this.drawNormalRange(canvasLeft, canvasTop, canvasHeight, canvasWidth, rangey);
            }

            plen = lineShapes.length;
            for (i = 0; i < plen; i++) {
                target.drawShape(lineShapes[i], options.get('lineColor'), undefined,
                    options.get('lineWidth')).append();
            }

            if (spotRadius && options.get('valueSpots')) {
                valueSpots = options.get('valueSpots');
                if (valueSpots.get === undefined) {
                    valueSpots = new RangeMap(valueSpots);
                }
                for (i = 0; i < yvalcount; i++) {
                    color = valueSpots.get(yvalues[i]);
                    if (color) {
                        target.drawCircle(canvasLeft + Math.round((xvalues[i] - this.minx) * (canvasWidth / rangex)),
                            canvasTop + Math.round(canvasHeight - (canvasHeight * ((yvalues[i] - this.miny) / rangey))),
                            spotRadius, undefined,
                            color).append();
                    }
                }

            }
            if (spotRadius && options.get('spotColor') && yvalues[yvallast] !== null) {
                target.drawCircle(canvasLeft + Math.round((xvalues[xvalues.length - 1] - this.minx) * (canvasWidth / rangex)),
                    canvasTop + Math.round(canvasHeight - (canvasHeight * ((yvalues[yvallast] - this.miny) / rangey))),
                    spotRadius, undefined,
                    options.get('spotColor')).append();
            }
            if (this.maxy !== this.minyorg) {
                if (spotRadius && options.get('minSpotColor')) {
                    x = xvalues[$.inArray(this.minyorg, yvalues)];
                    target.drawCircle(canvasLeft + Math.round((x - this.minx) * (canvasWidth / rangex)),
                        canvasTop + Math.round(canvasHeight - (canvasHeight * ((this.minyorg - this.miny) / rangey))),
                        spotRadius, undefined,
                        options.get('minSpotColor')).append();
                }
                if (spotRadius && options.get('maxSpotColor')) {
                    x = xvalues[$.inArray(this.maxyorg, yvalues)];
                    target.drawCircle(canvasLeft + Math.round((x - this.minx) * (canvasWidth / rangex)),
                        canvasTop + Math.round(canvasHeight - (canvasHeight * ((this.maxyorg - this.miny) / rangey))),
                        spotRadius, undefined,
                        options.get('maxSpotColor')).append();
                }
            }

            this.lastShapeId = target.getLastShapeId();
            this.canvasTop = canvasTop;
            target.render();
        }
    });

    /**
     * Bar charts
     */
    $.fn.sparkline.bar = bar = createClass($.fn.sparkline._base, barHighlightMixin, {
        type: 'bar',

        init: function (el, values, options, width, height) {
            var barWidth = parseInt(options.get('barWidth'), 10),
                barSpacing = parseInt(options.get('barSpacing'), 10),
                chartRangeMin = options.get('chartRangeMin'),
                chartRangeMax = options.get('chartRangeMax'),
                chartRangeClip = options.get('chartRangeClip'),
                stackMin = Infinity,
                stackMax = -Infinity,
                isStackString, groupMin, groupMax, stackRanges,
                numValues, i, vlen, range, zeroAxis, xaxisOffset, min, max, clipMin, clipMax,
                stacked, vlist, j, slen, svals, val, yoffset, yMaxCalc, canvasHeightEf;
            bar._super.init.call(this, el, values, options, width, height);

            // scan values to determine whether to stack bars
            for (i = 0, vlen = values.length; i < vlen; i++) {
                val = values[i];
                isStackString = typeof(val) === 'string' && val.indexOf(':') > -1;
                if (isStackString || $.isArray(val)) {
                    stacked = true;
                    if (isStackString) {
                        val = values[i] = normalizeValues(val.split(':'));
                    }
                    val = remove(val, null); // min/max will treat null as zero
                    groupMin = Math.min.apply(Math, val);
                    groupMax = Math.max.apply(Math, val);
                    if (groupMin < stackMin) {
                        stackMin = groupMin;
                    }
                    if (groupMax > stackMax) {
                        stackMax = groupMax;
                    }
                }
            }

            this.stacked = stacked;
            this.regionShapes = {};
            this.barWidth = barWidth;
            this.barSpacing = barSpacing;
            this.totalBarWidth = barWidth + barSpacing;
            this.width = width = (values.length * barWidth) + ((values.length - 1) * barSpacing);

            this.initTarget();

            if (chartRangeClip) {
                clipMin = chartRangeMin === undefined ? -Infinity : chartRangeMin;
                clipMax = chartRangeMax === undefined ? Infinity : chartRangeMax;
            }

            numValues = [];
            stackRanges = stacked ? [] : numValues;
            var stackTotals = [];
            var stackRangesNeg = [];
            for (i = 0, vlen = values.length; i < vlen; i++) {
                if (stacked) {
                    vlist = values[i];
                    values[i] = svals = [];
                    stackTotals[i] = 0;
                    stackRanges[i] = stackRangesNeg[i] = 0;
                    for (j = 0, slen = vlist.length; j < slen; j++) {
                        val = svals[j] = chartRangeClip ? clipval(vlist[j], clipMin, clipMax) : vlist[j];
                        if (val !== null) {
                            if (val > 0) {
                                stackTotals[i] += val;
                            }
                            if (stackMin < 0 && stackMax > 0) {
                                if (val < 0) {
                                    stackRangesNeg[i] += Math.abs(val);
                                } else {
                                    stackRanges[i] += val;
                                }
                            } else {
                                stackRanges[i] += Math.abs(val - (val < 0 ? stackMax : stackMin));
                            }
                            numValues.push(val);
                        }
                    }
                } else {
                    val = chartRangeClip ? clipval(values[i], clipMin, clipMax) : values[i];
                    val = values[i] = normalizeValue(val);
                    if (val !== null) {
                        numValues.push(val);
                    }
                }
            }
            this.max = max = Math.max.apply(Math, numValues);
            this.min = min = Math.min.apply(Math, numValues);
            this.stackMax = stackMax = stacked ? Math.max.apply(Math, stackTotals) : max;
            this.stackMin = stackMin = stacked ? Math.min.apply(Math, numValues) : min;

            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < min)) {
                min = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > max)) {
                max = options.get('chartRangeMax');
            }

            this.zeroAxis = zeroAxis = options.get('zeroAxis', true);
            if (min <= 0 && max >= 0 && zeroAxis) {
                xaxisOffset = 0;
            } else if (zeroAxis == false) {
                xaxisOffset = min;
            } else if (min > 0) {
                xaxisOffset = min;
            } else {
                xaxisOffset = max;
            }
            this.xaxisOffset = xaxisOffset;

            range = stacked ? (Math.max.apply(Math, stackRanges) + Math.max.apply(Math, stackRangesNeg)) : max - min;

            // as we plot zero/min values a single pixel line, we add a pixel to all other
            // values - Reduce the effective canvas size to suit
            this.canvasHeightEf = (zeroAxis && min < 0) ? this.canvasHeight - 2 : this.canvasHeight - 1;

            if (min < xaxisOffset) {
                yMaxCalc = (stacked && max >= 0) ? stackMax : max;
                yoffset = (yMaxCalc - xaxisOffset) / range * this.canvasHeight;
                if (yoffset !== Math.ceil(yoffset)) {
                    this.canvasHeightEf -= 2;
                    yoffset = Math.ceil(yoffset);
                }
            } else {
                yoffset = this.canvasHeight;
            }
            this.yoffset = yoffset;

            if ($.isArray(options.get('colorMap'))) {
                this.colorMapByIndex = options.get('colorMap');
                this.colorMapByValue = null;
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = options.get('colorMap');
                if (this.colorMapByValue && this.colorMapByValue.get === undefined) {
                    this.colorMapByValue = new RangeMap(this.colorMapByValue);
                }
            }

            this.range = range;
        },

        getRegion: function (el, x, y) {
            var result = Math.floor(x / this.totalBarWidth);
            return (result < 0 || result >= this.values.length) ? undefined : result;
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion,
                values = ensureArray(this.values[currentRegion]),
                result = [],
                value, i;
            for (i = values.length; i--;) {
                value = values[i];
                result.push({
                    isNull: value === null,
                    value: value,
                    color: this.calcColor(i, value, currentRegion),
                    offset: currentRegion
                });
            }
            return result;
        },

        calcColor: function (stacknum, value, valuenum) {
            var colorMapByIndex = this.colorMapByIndex,
                colorMapByValue = this.colorMapByValue,
                options = this.options,
                color, newColor;
            if (this.stacked) {
                color = options.get('stackedBarColor');
            } else {
                color = (value < 0) ? options.get('negBarColor') : options.get('barColor');
            }
            if (value === 0 && options.get('zeroColor') !== undefined) {
                color = options.get('zeroColor');
            }
            if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
                color = newColor;
            } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
                color = colorMapByIndex[valuenum];
            }
            return $.isArray(color) ? color[stacknum % color.length] : color;
        },

        /**
         * Render bar(s) for a region
         */
        renderRegion: function (valuenum, highlight) {
            var vals = this.values[valuenum],
                options = this.options,
                xaxisOffset = this.xaxisOffset,
                result = [],
                range = this.range,
                stacked = this.stacked,
                target = this.target,
                x = valuenum * this.totalBarWidth,
                canvasHeightEf = this.canvasHeightEf,
                yoffset = this.yoffset,
                y, height, color, isNull, yoffsetNeg, i, valcount, val, minPlotted, allMin;

            vals = $.isArray(vals) ? vals : [vals];
            valcount = vals.length;
            val = vals[0];
            isNull = all(null, vals);
            allMin = all(xaxisOffset, vals, true);

            if (isNull) {
                if (options.get('nullColor')) {
                    color = highlight ? options.get('nullColor') : this.calcHighlightColor(options.get('nullColor'), options);
                    y = (yoffset > 0) ? yoffset - 1 : yoffset;
                    return target.drawRect(x, y, this.barWidth - 1, 0, color, color);
                } else {
                    return undefined;
                }
            }
            yoffsetNeg = yoffset;
            for (i = 0; i < valcount; i++) {
                val = vals[i];

                if (stacked && val === xaxisOffset) {
                    if (!allMin || minPlotted) {
                        continue;
                    }
                    minPlotted = true;
                }

                if (range > 0) {
                    height = Math.floor(canvasHeightEf * ((Math.abs(val - xaxisOffset) / range))) + 1;
                } else {
                    height = 1;
                }
                if (val < xaxisOffset || (val === xaxisOffset && yoffset === 0)) {
                    y = yoffsetNeg;
                    yoffsetNeg += height;
                } else {
                    y = yoffset - height;
                    yoffset -= height;
                }
                color = this.calcColor(i, val, valuenum);
                if (highlight) {
                    color = this.calcHighlightColor(color, options);
                }
                result.push(target.drawRect(x, y, this.barWidth - 1, height - 1, color, color));
            }
            if (result.length === 1) {
                return result[0];
            }
            return result;
        }
    });

    /**
     * Tristate charts
     */
    $.fn.sparkline.tristate = tristate = createClass($.fn.sparkline._base, barHighlightMixin, {
        type: 'tristate',

        init: function (el, values, options, width, height) {
            var barWidth = parseInt(options.get('barWidth'), 10),
                barSpacing = parseInt(options.get('barSpacing'), 10);
            tristate._super.init.call(this, el, values, options, width, height);

            this.regionShapes = {};
            this.barWidth = barWidth;
            this.barSpacing = barSpacing;
            this.totalBarWidth = barWidth + barSpacing;
            this.values = $.map(values, Number);
            this.width = width = (values.length * barWidth) + ((values.length - 1) * barSpacing);

            if ($.isArray(options.get('colorMap'))) {
                this.colorMapByIndex = options.get('colorMap');
                this.colorMapByValue = null;
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = options.get('colorMap');
                if (this.colorMapByValue && this.colorMapByValue.get === undefined) {
                    this.colorMapByValue = new RangeMap(this.colorMapByValue);
                }
            }
            this.initTarget();
        },

        getRegion: function (el, x, y) {
            return Math.floor(x / this.totalBarWidth);
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion;
            return {
                isNull: this.values[currentRegion] === undefined,
                value: this.values[currentRegion],
                color: this.calcColor(this.values[currentRegion], currentRegion),
                offset: currentRegion
            };
        },

        calcColor: function (value, valuenum) {
            var values = this.values,
                options = this.options,
                colorMapByIndex = this.colorMapByIndex,
                colorMapByValue = this.colorMapByValue,
                color, newColor;

            if (colorMapByValue && (newColor = colorMapByValue.get(value))) {
                color = newColor;
            } else if (colorMapByIndex && colorMapByIndex.length > valuenum) {
                color = colorMapByIndex[valuenum];
            } else if (values[valuenum] < 0) {
                color = options.get('negBarColor');
            } else if (values[valuenum] > 0) {
                color = options.get('posBarColor');
            } else {
                color = options.get('zeroBarColor');
            }
            return color;
        },

        renderRegion: function (valuenum, highlight) {
            var values = this.values,
                options = this.options,
                target = this.target,
                canvasHeight, height, halfHeight,
                x, y, color;

            canvasHeight = target.pixelHeight;
            halfHeight = Math.round(canvasHeight / 2);

            x = valuenum * this.totalBarWidth;
            if (values[valuenum] < 0) {
                y = halfHeight;
                height = halfHeight - 1;
            } else if (values[valuenum] > 0) {
                y = 0;
                height = halfHeight - 1;
            } else {
                y = halfHeight - 1;
                height = 2;
            }
            color = this.calcColor(values[valuenum], valuenum);
            if (color === null) {
                return;
            }
            if (highlight) {
                color = this.calcHighlightColor(color, options);
            }
            return target.drawRect(x, y, this.barWidth - 1, height - 1, color, color);
        }
    });

    /**
     * Discrete charts
     */
    $.fn.sparkline.discrete = discrete = createClass($.fn.sparkline._base, barHighlightMixin, {
        type: 'discrete',

        init: function (el, values, options, width, height) {
            discrete._super.init.call(this, el, values, options, width, height);

            this.regionShapes = {};
            this.values = values = $.map(values, Number);
            this.min = Math.min.apply(Math, values);
            this.max = Math.max.apply(Math, values);
            this.range = this.max - this.min;
            this.width = width = options.get('width') === 'auto' ? values.length * 2 : this.width;
            this.interval = Math.floor(width / values.length);
            this.itemWidth = width / values.length;
            if (options.get('chartRangeMin') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMin') < this.min)) {
                this.min = options.get('chartRangeMin');
            }
            if (options.get('chartRangeMax') !== undefined && (options.get('chartRangeClip') || options.get('chartRangeMax') > this.max)) {
                this.max = options.get('chartRangeMax');
            }
            this.initTarget();
            if (this.target) {
                this.lineHeight = options.get('lineHeight') === 'auto' ? Math.round(this.canvasHeight * 0.3) : options.get('lineHeight');
            }
        },

        getRegion: function (el, x, y) {
            return Math.floor(x / this.itemWidth);
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion;
            return {
                isNull: this.values[currentRegion] === undefined,
                value: this.values[currentRegion],
                offset: currentRegion
            };
        },

        renderRegion: function (valuenum, highlight) {
            var values = this.values,
                options = this.options,
                min = this.min,
                max = this.max,
                range = this.range,
                interval = this.interval,
                target = this.target,
                canvasHeight = this.canvasHeight,
                lineHeight = this.lineHeight,
                pheight = canvasHeight - lineHeight,
                ytop, val, color, x;

            val = clipval(values[valuenum], min, max);
            x = valuenum * interval;
            ytop = Math.round(pheight - pheight * ((val - min) / range));
            color = (options.get('thresholdColor') && val < options.get('thresholdValue')) ? options.get('thresholdColor') : options.get('lineColor');
            if (highlight) {
                color = this.calcHighlightColor(color, options);
            }
            return target.drawLine(x, ytop, x, ytop + lineHeight, color);
        }
    });

    /**
     * Bullet charts
     */
    $.fn.sparkline.bullet = bullet = createClass($.fn.sparkline._base, {
        type: 'bullet',

        init: function (el, values, options, width, height) {
            var min, max, vals;
            bullet._super.init.call(this, el, values, options, width, height);

            // values: target, performance, range1, range2, range3
            this.values = values = normalizeValues(values);
            // target or performance could be null
            vals = values.slice();
            vals[0] = vals[0] === null ? vals[2] : vals[0];
            vals[1] = values[1] === null ? vals[2] : vals[1];
            min = Math.min.apply(Math, values);
            max = Math.max.apply(Math, values);
            if (options.get('base') === undefined) {
                min = min < 0 ? min : 0;
            } else {
                min = options.get('base');
            }
            this.min = min;
            this.max = max;
            this.range = max - min;
            this.shapes = {};
            this.valueShapes = {};
            this.regiondata = {};
            this.width = width = options.get('width') === 'auto' ? '4.0em' : width;
            this.target = this.$el.simpledraw(width, height, options.get('composite'));
            if (!values.length) {
                this.disabled = true;
            }
            this.initTarget();
        },

        getRegion: function (el, x, y) {
            var shapeid = this.target.getShapeAt(el, x, y);
            return (shapeid !== undefined && this.shapes[shapeid] !== undefined) ? this.shapes[shapeid] : undefined;
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion;
            return {
                fieldkey: currentRegion.substr(0, 1),
                value: this.values[currentRegion.substr(1)],
                region: currentRegion
            };
        },

        changeHighlight: function (highlight) {
            var currentRegion = this.currentRegion,
                shapeid = this.valueShapes[currentRegion],
                shape;
            delete this.shapes[shapeid];
            switch (currentRegion.substr(0, 1)) {
                case 'r':
                    shape = this.renderRange(currentRegion.substr(1), highlight);
                    break;
                case 'p':
                    shape = this.renderPerformance(highlight);
                    break;
                case 't':
                    shape = this.renderTarget(highlight);
                    break;
            }
            this.valueShapes[currentRegion] = shape.id;
            this.shapes[shape.id] = currentRegion;
            this.target.replaceWithShape(shapeid, shape);
        },

        renderRange: function (rn, highlight) {
            var rangeval = this.values[rn],
                rangewidth = Math.round(this.canvasWidth * ((rangeval - this.min) / this.range)),
                color = this.options.get('rangeColors')[rn - 2];
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(0, 0, rangewidth - 1, this.canvasHeight - 1, color, color);
        },

        renderPerformance: function (highlight) {
            var perfval = this.values[1],
                perfwidth = Math.round(this.canvasWidth * ((perfval - this.min) / this.range)),
                color = this.options.get('performanceColor');
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(0, Math.round(this.canvasHeight * 0.3), perfwidth - 1,
                Math.round(this.canvasHeight * 0.4) - 1, color, color);
        },

        renderTarget: function (highlight) {
            var targetval = this.values[0],
                x = Math.round(this.canvasWidth * ((targetval - this.min) / this.range) - (this.options.get('targetWidth') / 2)),
                targettop = Math.round(this.canvasHeight * 0.10),
                targetheight = this.canvasHeight - (targettop * 2),
                color = this.options.get('targetColor');
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(x, targettop, this.options.get('targetWidth') - 1, targetheight - 1, color, color);
        },

        render: function () {
            var vlen = this.values.length,
                target = this.target,
                i, shape;
            if (!bullet._super.render.call(this)) {
                return;
            }
            for (i = 2; i < vlen; i++) {
                shape = this.renderRange(i).append();
                this.shapes[shape.id] = 'r' + i;
                this.valueShapes['r' + i] = shape.id;
            }
            if (this.values[1] !== null) {
                shape = this.renderPerformance().append();
                this.shapes[shape.id] = 'p1';
                this.valueShapes.p1 = shape.id;
            }
            if (this.values[0] !== null) {
                shape = this.renderTarget().append();
                this.shapes[shape.id] = 't0';
                this.valueShapes.t0 = shape.id;
            }
            target.render();
        }
    });

    /**
     * Pie charts
     */
    $.fn.sparkline.pie = pie = createClass($.fn.sparkline._base, {
        type: 'pie',

        init: function (el, values, options, width, height) {
            var total = 0, i;

            pie._super.init.call(this, el, values, options, width, height);

            this.shapes = {}; // map shape ids to value offsets
            this.valueShapes = {}; // maps value offsets to shape ids
            this.values = values = $.map(values, Number);

            if (options.get('width') === 'auto') {
                this.width = this.height;
            }

            if (values.length > 0) {
                for (i = values.length; i--;) {
                    total += values[i];
                }
            }
            this.total = total;
            this.initTarget();
            this.radius = Math.floor(Math.min(this.canvasWidth, this.canvasHeight) / 2);
        },

        getRegion: function (el, x, y) {
            var shapeid = this.target.getShapeAt(el, x, y);
            return (shapeid !== undefined && this.shapes[shapeid] !== undefined) ? this.shapes[shapeid] : undefined;
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion;
            return {
                isNull: this.values[currentRegion] === undefined,
                value: this.values[currentRegion],
                percent: this.values[currentRegion] / this.total * 100,
                color: this.options.get('sliceColors')[currentRegion % this.options.get('sliceColors').length],
                offset: currentRegion
            };
        },

        changeHighlight: function (highlight) {
            var currentRegion = this.currentRegion,
                 newslice = this.renderSlice(currentRegion, highlight),
                 shapeid = this.valueShapes[currentRegion];
            delete this.shapes[shapeid];
            this.target.replaceWithShape(shapeid, newslice);
            this.valueShapes[currentRegion] = newslice.id;
            this.shapes[newslice.id] = currentRegion;
        },

        renderSlice: function (valuenum, highlight) {
            var target = this.target,
                options = this.options,
                radius = this.radius,
                borderWidth = options.get('borderWidth'),
                offset = options.get('offset'),
                circle = 2 * Math.PI,
                values = this.values,
                total = this.total,
                next = offset ? (2*Math.PI)*(offset/360) : 0,
                start, end, i, vlen, color;

            vlen = values.length;
            for (i = 0; i < vlen; i++) {
                start = next;
                end = next;
                if (total > 0) {  // avoid divide by zero
                    end = next + (circle * (values[i] / total));
                }
                if (valuenum === i) {
                    color = options.get('sliceColors')[i % options.get('sliceColors').length];
                    if (highlight) {
                        color = this.calcHighlightColor(color, options);
                    }

                    return target.drawPieSlice(radius, radius, radius - borderWidth, start, end, undefined, color);
                }
                next = end;
            }
        },

        render: function () {
            var target = this.target,
                values = this.values,
                options = this.options,
                radius = this.radius,
                borderWidth = options.get('borderWidth'),
                shape, i;

            if (!pie._super.render.call(this)) {
                return;
            }
            if (borderWidth) {
                target.drawCircle(radius, radius, Math.floor(radius - (borderWidth / 2)),
                    options.get('borderColor'), undefined, borderWidth).append();
            }
            for (i = values.length; i--;) {
                if (values[i]) { // don't render zero values
                    shape = this.renderSlice(i).append();
                    this.valueShapes[i] = shape.id; // store just the shapeid
                    this.shapes[shape.id] = i;
                }
            }
            target.render();
        }
    });

    /**
     * Box plots
     */
    $.fn.sparkline.box = box = createClass($.fn.sparkline._base, {
        type: 'box',

        init: function (el, values, options, width, height) {
            box._super.init.call(this, el, values, options, width, height);
            this.values = $.map(values, Number);
            this.width = options.get('width') === 'auto' ? '4.0em' : width;
            this.initTarget();
            if (!this.values.length) {
                this.disabled = 1;
            }
        },

        /**
         * Simulate a single region
         */
        getRegion: function () {
            return 1;
        },

        getCurrentRegionFields: function () {
            var result = [
                { field: 'lq', value: this.quartiles[0] },
                { field: 'med', value: this.quartiles[1] },
                { field: 'uq', value: this.quartiles[2] }
            ];
            if (this.loutlier !== undefined) {
                result.push({ field: 'lo', value: this.loutlier});
            }
            if (this.routlier !== undefined) {
                result.push({ field: 'ro', value: this.routlier});
            }
            if (this.lwhisker !== undefined) {
                result.push({ field: 'lw', value: this.lwhisker});
            }
            if (this.rwhisker !== undefined) {
                result.push({ field: 'rw', value: this.rwhisker});
            }
            return result;
        },

        render: function () {
            var target = this.target,
                values = this.values,
                vlen = values.length,
                options = this.options,
                canvasWidth = this.canvasWidth,
                canvasHeight = this.canvasHeight,
                minValue = options.get('chartRangeMin') === undefined ? Math.min.apply(Math, values) : options.get('chartRangeMin'),
                maxValue = options.get('chartRangeMax') === undefined ? Math.max.apply(Math, values) : options.get('chartRangeMax'),
                canvasLeft = 0,
                lwhisker, loutlier, iqr, q1, q2, q3, rwhisker, routlier, i,
                size, unitSize;

            if (!box._super.render.call(this)) {
                return;
            }

            if (options.get('raw')) {
                if (options.get('showOutliers') && values.length > 5) {
                    loutlier = values[0];
                    lwhisker = values[1];
                    q1 = values[2];
                    q2 = values[3];
                    q3 = values[4];
                    rwhisker = values[5];
                    routlier = values[6];
                } else {
                    lwhisker = values[0];
                    q1 = values[1];
                    q2 = values[2];
                    q3 = values[3];
                    rwhisker = values[4];
                }
            } else {
                values.sort(function (a, b) { return a - b; });
                q1 = quartile(values, 1);
                q2 = quartile(values, 2);
                q3 = quartile(values, 3);
                iqr = q3 - q1;
                if (options.get('showOutliers')) {
                    lwhisker = rwhisker = undefined;
                    for (i = 0; i < vlen; i++) {
                        if (lwhisker === undefined && values[i] > q1 - (iqr * options.get('outlierIQR'))) {
                            lwhisker = values[i];
                        }
                        if (values[i] < q3 + (iqr * options.get('outlierIQR'))) {
                            rwhisker = values[i];
                        }
                    }
                    loutlier = values[0];
                    routlier = values[vlen - 1];
                } else {
                    lwhisker = values[0];
                    rwhisker = values[vlen - 1];
                }
            }
            this.quartiles = [q1, q2, q3];
            this.lwhisker = lwhisker;
            this.rwhisker = rwhisker;
            this.loutlier = loutlier;
            this.routlier = routlier;

            unitSize = canvasWidth / (maxValue - minValue + 1);
            if (options.get('showOutliers')) {
                canvasLeft = Math.ceil(options.get('spotRadius'));
                canvasWidth -= 2 * Math.ceil(options.get('spotRadius'));
                unitSize = canvasWidth / (maxValue - minValue + 1);
                if (loutlier < lwhisker) {
                    target.drawCircle((loutlier - minValue) * unitSize + canvasLeft,
                        canvasHeight / 2,
                        options.get('spotRadius'),
                        options.get('outlierLineColor'),
                        options.get('outlierFillColor')).append();
                }
                if (routlier > rwhisker) {
                    target.drawCircle((routlier - minValue) * unitSize + canvasLeft,
                        canvasHeight / 2,
                        options.get('spotRadius'),
                        options.get('outlierLineColor'),
                        options.get('outlierFillColor')).append();
                }
            }

            // box
            target.drawRect(
                Math.round((q1 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.1),
                Math.round((q3 - q1) * unitSize),
                Math.round(canvasHeight * 0.8),
                options.get('boxLineColor'),
                options.get('boxFillColor')).append();
            // left whisker
            target.drawLine(
                Math.round((lwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                Math.round((q1 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                options.get('lineColor')).append();
            target.drawLine(
                Math.round((lwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 4),
                Math.round((lwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight - canvasHeight / 4),
                options.get('whiskerColor')).append();
            // right whisker
            target.drawLine(Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                Math.round((q3 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 2),
                options.get('lineColor')).append();
            target.drawLine(
                Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 4),
                Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight - canvasHeight / 4),
                options.get('whiskerColor')).append();
            // median line
            target.drawLine(
                Math.round((q2 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.1),
                Math.round((q2 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.9),
                options.get('medianColor')).append();
            if (options.get('target')) {
                size = Math.ceil(options.get('spotRadius'));
                target.drawLine(
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft),
                    Math.round((canvasHeight / 2) - size),
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft),
                    Math.round((canvasHeight / 2) + size),
                    options.get('targetColor')).append();
                target.drawLine(
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft - size),
                    Math.round(canvasHeight / 2),
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft + size),
                    Math.round(canvasHeight / 2),
                    options.get('targetColor')).append();
            }
            target.render();
        }
    });

    // Setup a very simple "virtual canvas" to make drawing the few shapes we need easier
    // This is accessible as $(foo).simpledraw()

    VShape = createClass({
        init: function (target, id, type, args) {
            this.target = target;
            this.id = id;
            this.type = type;
            this.args = args;
        },
        append: function () {
            this.target.appendShape(this);
            return this;
        }
    });

    VCanvas_base = createClass({
        _pxregex: /(\d+)(px)?\s*$/i,

        init: function (width, height, target) {
            if (!width) {
                return;
            }
            this.width = width;
            this.height = height;
            this.target = target;
            this.lastShapeId = null;
            if (target[0]) {
                target = target[0];
            }
            $.data(target, '_jqs_vcanvas', this);
        },

        drawLine: function (x1, y1, x2, y2, lineColor, lineWidth) {
            return this.drawShape([[x1, y1], [x2, y2]], lineColor, lineWidth);
        },

        drawShape: function (path, lineColor, fillColor, lineWidth) {
            return this._genShape('Shape', [path, lineColor, fillColor, lineWidth]);
        },

        drawCircle: function (x, y, radius, lineColor, fillColor, lineWidth) {
            return this._genShape('Circle', [x, y, radius, lineColor, fillColor, lineWidth]);
        },

        drawPieSlice: function (x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            return this._genShape('PieSlice', [x, y, radius, startAngle, endAngle, lineColor, fillColor]);
        },

        drawRect: function (x, y, width, height, lineColor, fillColor) {
            return this._genShape('Rect', [x, y, width, height, lineColor, fillColor]);
        },

        getElement: function () {
            return this.canvas;
        },

        /**
         * Return the most recently inserted shape id
         */
        getLastShapeId: function () {
            return this.lastShapeId;
        },

        /**
         * Clear and reset the canvas
         */
        reset: function () {
            alert('reset not implemented');
        },

        _insert: function (el, target) {
            $(target).html(el);
        },

        /**
         * Calculate the pixel dimensions of the canvas
         */
        _calculatePixelDims: function (width, height, canvas) {
            // XXX This should probably be a configurable option
            var match;
            match = this._pxregex.exec(height);
            if (match) {
                this.pixelHeight = match[1];
            } else {
                this.pixelHeight = $(canvas).height();
            }
            match = this._pxregex.exec(width);
            if (match) {
                this.pixelWidth = match[1];
            } else {
                this.pixelWidth = $(canvas).width();
            }
        },

        /**
         * Generate a shape object and id for later rendering
         */
        _genShape: function (shapetype, shapeargs) {
            var id = shapeCount++;
            shapeargs.unshift(id);
            return new VShape(this, id, shapetype, shapeargs);
        },

        /**
         * Add a shape to the end of the render queue
         */
        appendShape: function (shape) {
            alert('appendShape not implemented');
        },

        /**
         * Replace one shape with another
         */
        replaceWithShape: function (shapeid, shape) {
            alert('replaceWithShape not implemented');
        },

        /**
         * Insert one shape after another in the render queue
         */
        insertAfterShape: function (shapeid, shape) {
            alert('insertAfterShape not implemented');
        },

        /**
         * Remove a shape from the queue
         */
        removeShapeId: function (shapeid) {
            alert('removeShapeId not implemented');
        },

        /**
         * Find a shape at the specified x/y co-ordinates
         */
        getShapeAt: function (el, x, y) {
            alert('getShapeAt not implemented');
        },

        /**
         * Render all queued shapes onto the canvas
         */
        render: function () {
            alert('render not implemented');
        }
    });

    VCanvas_canvas = createClass(VCanvas_base, {
        init: function (width, height, target, interact) {
            VCanvas_canvas._super.init.call(this, width, height, target);
            this.canvas = document.createElement('canvas');
            if (target[0]) {
                target = target[0];
            }
            $.data(target, '_jqs_vcanvas', this);
            $(this.canvas).css({ display: 'inline-block', width: width, height: height, verticalAlign: 'top' });
            this._insert(this.canvas, target);
            this._calculatePixelDims(width, height, this.canvas);
            this.canvas.width = this.pixelWidth;
            this.canvas.height = this.pixelHeight;
            this.interact = interact;
            this.shapes = {};
            this.shapeseq = [];
            this.currentTargetShapeId = undefined;
            $(this.canvas).css({width: this.pixelWidth, height: this.pixelHeight});
        },

        _getContext: function (lineColor, fillColor, lineWidth) {
            var context = this.canvas.getContext('2d');
            if (lineColor !== undefined) {
                context.strokeStyle = lineColor;
            }
            context.lineWidth = lineWidth === undefined ? 1 : lineWidth;
            if (fillColor !== undefined) {
                context.fillStyle = fillColor;
            }
            return context;
        },

        reset: function () {
            var context = this._getContext();
            context.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
            this.shapes = {};
            this.shapeseq = [];
            this.currentTargetShapeId = undefined;
        },

        _drawShape: function (shapeid, path, lineColor, fillColor, lineWidth) {
            var context = this._getContext(lineColor, fillColor, lineWidth),
                i, plen;
            context.beginPath();
            context.moveTo(path[0][0] + 0.5, path[0][1] + 0.5);
            for (i = 1, plen = path.length; i < plen; i++) {
                context.lineTo(path[i][0] + 0.5, path[i][1] + 0.5); // the 0.5 offset gives us crisp pixel-width lines
            }
            if (lineColor !== undefined) {
                context.stroke();
            }
            if (fillColor !== undefined) {
                context.fill();
            }
            if (this.targetX !== undefined && this.targetY !== undefined &&
                context.isPointInPath(this.targetX, this.targetY)) {
                this.currentTargetShapeId = shapeid;
            }
        },

        _drawCircle: function (shapeid, x, y, radius, lineColor, fillColor, lineWidth) {
            var context = this._getContext(lineColor, fillColor, lineWidth);
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            if (this.targetX !== undefined && this.targetY !== undefined &&
                context.isPointInPath(this.targetX, this.targetY)) {
                this.currentTargetShapeId = shapeid;
            }
            if (lineColor !== undefined) {
                context.stroke();
            }
            if (fillColor !== undefined) {
                context.fill();
            }
        },

        _drawPieSlice: function (shapeid, x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            var context = this._getContext(lineColor, fillColor);
            context.beginPath();
            context.moveTo(x, y);
            context.arc(x, y, radius, startAngle, endAngle, false);
            context.lineTo(x, y);
            context.closePath();
            if (lineColor !== undefined) {
                context.stroke();
            }
            if (fillColor) {
                context.fill();
            }
            if (this.targetX !== undefined && this.targetY !== undefined &&
                context.isPointInPath(this.targetX, this.targetY)) {
                this.currentTargetShapeId = shapeid;
            }
        },

        _drawRect: function (shapeid, x, y, width, height, lineColor, fillColor) {
            return this._drawShape(shapeid, [[x, y], [x + width, y], [x + width, y + height], [x, y + height], [x, y]], lineColor, fillColor);
        },

        appendShape: function (shape) {
            this.shapes[shape.id] = shape;
            this.shapeseq.push(shape.id);
            this.lastShapeId = shape.id;
            return shape.id;
        },

        replaceWithShape: function (shapeid, shape) {
            var shapeseq = this.shapeseq,
                i;
            this.shapes[shape.id] = shape;
            for (i = shapeseq.length; i--;) {
                if (shapeseq[i] == shapeid) {
                    shapeseq[i] = shape.id;
                }
            }
            delete this.shapes[shapeid];
        },

        replaceWithShapes: function (shapeids, shapes) {
            var shapeseq = this.shapeseq,
                shapemap = {},
                sid, i, first;

            for (i = shapeids.length; i--;) {
                shapemap[shapeids[i]] = true;
            }
            for (i = shapeseq.length; i--;) {
                sid = shapeseq[i];
                if (shapemap[sid]) {
                    shapeseq.splice(i, 1);
                    delete this.shapes[sid];
                    first = i;
                }
            }
            for (i = shapes.length; i--;) {
                shapeseq.splice(first, 0, shapes[i].id);
                this.shapes[shapes[i].id] = shapes[i];
            }

        },

        insertAfterShape: function (shapeid, shape) {
            var shapeseq = this.shapeseq,
                i;
            for (i = shapeseq.length; i--;) {
                if (shapeseq[i] === shapeid) {
                    shapeseq.splice(i + 1, 0, shape.id);
                    this.shapes[shape.id] = shape;
                    return;
                }
            }
        },

        removeShapeId: function (shapeid) {
            var shapeseq = this.shapeseq,
                i;
            for (i = shapeseq.length; i--;) {
                if (shapeseq[i] === shapeid) {
                    shapeseq.splice(i, 1);
                    break;
                }
            }
            delete this.shapes[shapeid];
        },

        getShapeAt: function (el, x, y) {
            this.targetX = x;
            this.targetY = y;
            this.render();
            return this.currentTargetShapeId;
        },

        render: function () {
            var shapeseq = this.shapeseq,
                shapes = this.shapes,
                shapeCount = shapeseq.length,
                context = this._getContext(),
                shapeid, shape, i;
            context.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
            for (i = 0; i < shapeCount; i++) {
                shapeid = shapeseq[i];
                shape = shapes[shapeid];
                this['_draw' + shape.type].apply(this, shape.args);
            }
            if (!this.interact) {
                // not interactive so no need to keep the shapes array
                this.shapes = {};
                this.shapeseq = [];
            }
        }

    });

    VCanvas_vml = createClass(VCanvas_base, {
        init: function (width, height, target) {
            var groupel;
            VCanvas_vml._super.init.call(this, width, height, target);
            if (target[0]) {
                target = target[0];
            }
            $.data(target, '_jqs_vcanvas', this);
            this.canvas = document.createElement('span');
            $(this.canvas).css({ display: 'inline-block', position: 'relative', overflow: 'hidden', width: width, height: height, margin: '0px', padding: '0px', verticalAlign: 'top'});
            this._insert(this.canvas, target);
            this._calculatePixelDims(width, height, this.canvas);
            this.canvas.width = this.pixelWidth;
            this.canvas.height = this.pixelHeight;
            groupel = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + ' ' + this.pixelHeight + '"' +
                    ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + 'px;height=' + this.pixelHeight + 'px;"></v:group>';
            this.canvas.insertAdjacentHTML('beforeEnd', groupel);
            this.group = $(this.canvas).children()[0];
            this.rendered = false;
            this.prerender = '';
        },

        _drawShape: function (shapeid, path, lineColor, fillColor, lineWidth) {
            var vpath = [],
                initial, stroke, fill, closed, vel, plen, i;
            for (i = 0, plen = path.length; i < plen; i++) {
                vpath[i] = '' + (path[i][0]) + ',' + (path[i][1]);
            }
            initial = vpath.splice(0, 1);
            lineWidth = lineWidth === undefined ? 1 : lineWidth;
            stroke = lineColor === undefined ? ' stroked="false" ' : ' strokeWeight="' + lineWidth + 'px" strokeColor="' + lineColor + '" ';
            fill = fillColor === undefined ? ' filled="false"' : ' fillColor="' + fillColor + '" filled="true" ';
            closed = vpath[0] === vpath[vpath.length - 1] ? 'x ' : '';
            vel = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + ' ' + this.pixelHeight + '" ' +
                 ' id="jqsshape' + shapeid + '" ' +
                 stroke +
                 fill +
                ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + 'px;width:' + this.pixelWidth + 'px;padding:0px;margin:0px;" ' +
                ' path="m ' + initial + ' l ' + vpath.join(', ') + ' ' + closed + 'e">' +
                ' </v:shape>';
            return vel;
        },

        _drawCircle: function (shapeid, x, y, radius, lineColor, fillColor, lineWidth) {
            var stroke, fill, vel;
            x -= radius;
            y -= radius;
            stroke = lineColor === undefined ? ' stroked="false" ' : ' strokeWeight="' + lineWidth + 'px" strokeColor="' + lineColor + '" ';
            fill = fillColor === undefined ? ' filled="false"' : ' fillColor="' + fillColor + '" filled="true" ';
            vel = '<v:oval ' +
                 ' id="jqsshape' + shapeid + '" ' +
                stroke +
                fill +
                ' style="position:absolute;top:' + y + 'px; left:' + x + 'px; width:' + (radius * 2) + 'px; height:' + (radius * 2) + 'px"></v:oval>';
            return vel;

        },

        _drawPieSlice: function (shapeid, x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            var vpath, startx, starty, endx, endy, stroke, fill, vel;
            if (startAngle === endAngle) {
                return '';  // VML seems to have problem when start angle equals end angle.
            }
            if ((endAngle - startAngle) === (2 * Math.PI)) {
                startAngle = 0.0;  // VML seems to have a problem when drawing a full circle that doesn't start 0
                endAngle = (2 * Math.PI);
            }

            startx = x + Math.round(Math.cos(startAngle) * radius);
            starty = y + Math.round(Math.sin(startAngle) * radius);
            endx = x + Math.round(Math.cos(endAngle) * radius);
            endy = y + Math.round(Math.sin(endAngle) * radius);

            if (startx === endx && starty === endy) {
                if ((endAngle - startAngle) < Math.PI) {
                    // Prevent very small slices from being mistaken as a whole pie
                    return '';
                }
                // essentially going to be the entire circle, so ignore startAngle
                startx = endx = x + radius;
                starty = endy = y;
            }

            if (startx === endx && starty === endy && (endAngle - startAngle) < Math.PI) {
                return '';
            }

            vpath = [x - radius, y - radius, x + radius, y + radius, startx, starty, endx, endy];
            stroke = lineColor === undefined ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + lineColor + '" ';
            fill = fillColor === undefined ? ' filled="false"' : ' fillColor="' + fillColor + '" filled="true" ';
            vel = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + ' ' + this.pixelHeight + '" ' +
                 ' id="jqsshape' + shapeid + '" ' +
                 stroke +
                 fill +
                ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + 'px;width:' + this.pixelWidth + 'px;padding:0px;margin:0px;" ' +
                ' path="m ' + x + ',' + y + ' wa ' + vpath.join(', ') + ' x e">' +
                ' </v:shape>';
            return vel;
        },

        _drawRect: function (shapeid, x, y, width, height, lineColor, fillColor) {
            return this._drawShape(shapeid, [[x, y], [x, y + height], [x + width, y + height], [x + width, y], [x, y]], lineColor, fillColor);
        },

        reset: function () {
            this.group.innerHTML = '';
        },

        appendShape: function (shape) {
            var vel = this['_draw' + shape.type].apply(this, shape.args);
            if (this.rendered) {
                this.group.insertAdjacentHTML('beforeEnd', vel);
            } else {
                this.prerender += vel;
            }
            this.lastShapeId = shape.id;
            return shape.id;
        },

        replaceWithShape: function (shapeid, shape) {
            var existing = $('#jqsshape' + shapeid),
                vel = this['_draw' + shape.type].apply(this, shape.args);
            existing[0].outerHTML = vel;
        },

        replaceWithShapes: function (shapeids, shapes) {
            // replace the first shapeid with all the new shapes then toast the remaining old shapes
            var existing = $('#jqsshape' + shapeids[0]),
                replace = '',
                slen = shapes.length,
                i;
            for (i = 0; i < slen; i++) {
                replace += this['_draw' + shapes[i].type].apply(this, shapes[i].args);
            }
            existing[0].outerHTML = replace;
            for (i = 1; i < shapeids.length; i++) {
                $('#jqsshape' + shapeids[i]).remove();
            }
        },

        insertAfterShape: function (shapeid, shape) {
            var existing = $('#jqsshape' + shapeid),
                 vel = this['_draw' + shape.type].apply(this, shape.args);
            existing[0].insertAdjacentHTML('afterEnd', vel);
        },

        removeShapeId: function (shapeid) {
            var existing = $('#jqsshape' + shapeid);
            this.group.removeChild(existing[0]);
        },

        getShapeAt: function (el, x, y) {
            var shapeid = el.id.substr(8);
            return shapeid;
        },

        render: function () {
            if (!this.rendered) {
                // batch the intial render into a single repaint
                this.group.innerHTML = this.prerender;
                this.rendered = true;
            }
        }
    });

}))}(document, Math));

//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return this._offset ? new Date(this.valueOf()) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.13.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
/**
* @version: 2.1.24
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2016 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/
// Follow the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Make globaly available as well
        define(['moment', 'jquery'], function (moment, jquery) {
            return (root.daterangepicker = factory(moment, jquery));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node / Browserify
        //isomorphic issue
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        module.exports = factory(require('moment'), jQuery);
    } else {
        // Browser globals
        root.daterangepicker = factory(root.moment, root.jQuery);
    }
}(this, function(moment, $) {
    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.showCustomRangeLabel = true;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyClass = 'btn-success';
        this.cancelClass = 'btn-default';

        this.locale = {
            direction: 'ltr',
            format: moment.localeData().longDateFormat('L'),
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string' && !(options.template instanceof $))
            options.template = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini form-control" type="text" name="daterangepicker_start" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                      '<input class="input-mini form-control" type="text" name="daterangepicker_end" value="" />' +
                      '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                      '<div class="calendar-time">' +
                        '<div></div>' +
                        '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                '</div>' +
                '<div class="ranges">' +
                    '<div class="range_inputs">' +
                        '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                        '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.direction === 'string')
                this.locale.direction = options.locale.direction;

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string')
              this.locale.customRangeLabel = options.locale.customRangeLabel;

        }
        this.container.addClass(this.locale.direction);

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyClass === 'string')
            this.applyClass = options.applyClass;

        if (typeof options.cancelClass === 'string')
            this.cancelClass = options.cancelClass;

        if (typeof options.dateLimit === 'object')
            this.dateLimit = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.singleClasses === 'string')
            this.singleClasses = options.singleClasses;

        if (typeof options.singleClasses === 'object')
            this.singleClasses = options.singleClasses.join(' ');


        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.showCustomRangeLabel === 'boolean')
            this.showCustomRangeLabel = options.showCustomRangeLabel;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        if (typeof options.isCustomDate === 'function')
            this.isCustomDate = options.isCustomDate;

        if (typeof options.alwaysShowCalendars === 'boolean')
            this.alwaysShowCalendars = options.alwaysShowCalendars;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is('input[type=text]')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or dateLimit
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.dateLimit && maxDate && start.clone().add(this.dateLimit).isAfter(maxDate))
                    maxDate = start.clone().add(this.dateLimit);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day')) 
                  || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                    continue;

                //Support unicode chars in the range names.
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;

                this.ranges[rangeHtml] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li data-range-key="' + range + '">' + range + '</li>';
            }
            if (this.showCustomRangeLabel) {
                list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
            }
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply && typeof options.ranges !== 'object') {
            this.container.find('.ranges').hide();
        } else if (this.autoApply) {
            this.container.find('.applyBtn, .cancelBtn').addClass('hide');
        }

        if (this.singleDatePicker) {
            this.container.addClass('single');
            if (this.singleClasses) {
                this.container.addClass(this.singleClasses);
            }
            this.container.find('.calendar.left').addClass('single');
            this.container.find('.calendar.left').show();
            this.container.find('.calendar.right').hide();
            this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
            if (this.timePicker) {
                this.container.find('.ranges ul').hide();
            } else {
                this.container.find('.ranges').hide();
            }
        }

        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //swap the position of the predefined ranges if opens right
        if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
            this.container.find('.ranges').prependTo( this.container.find('.calendar.left').parent() );
        }

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
            .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
            .on('focus.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsFocused, this))
            .on('blur.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsBlurred, this))
            .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));

        this.container.find('.ranges')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
            .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input') || this.element.is('button')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate)) {
                this.startDate = this.minDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }

            if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                this.startDate = this.maxDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();

            if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.dateLimit);

            this.previousRightTime = this.endDate.clone();

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        isCustomDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate) {
                this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                this.container.find('input[name="daterangepicker_start"]').addClass('active');
            } else {
                this.container.find('input[name="daterangepicker_end"]').addClass('active');
                this.container.find('input[name="daterangepicker_start"]').removeClass('active');
            }
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }

            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
              this.rightCalendar.month = this.maxDate.clone().date(2);
              this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            this.calculateChosenLabel();
        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;
            var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                var minYear = (minDate && minDate.year()) || (currentYear - 50);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the dateLimit setting in order to
            //grey out end dates beyond the dateLimit
            if (this.endDate == null && this.dateLimit) {
                var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';
                else if (this.showISOWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    //apply custom classes for this date
                    var isCustom = this.isCustomDate(calendar[row][col]);
                    if (isCustom !== false) {
                        if (typeof isCustom === 'string')
                            classes.push(isCustom);
                        else
                            Array.prototype.push.apply(classes, isCustom);
                    }

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            // Don't bother updating the time picker if it's currently disabled
            // because an end date hasn't been clicked yet
            if (side == 'right' && !this.endDate) return;

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                maxDate = this.startDate.clone().add(this.dateLimit);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate.clone();
                minDate = this.startDate;

                //Preserve the time already selected
                var timeSelector = this.container.find('.calendar.right .calendar-time div');
                if (!this.endDate && timeSelector.html() != '') {

                    selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                    selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                    selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());

                    if (!this.timePicker24Hour) {
                        var ampm = timeSelector.find('.ampmselect option:selected').val();
                        if (ampm === 'PM' && selected.hour() < 12)
                            selected.hour(selected.hour() + 12);
                        if (ampm === 'AM' && selected.hour() === 12)
                            selected.hour(0);
                    }

                }

                if (selected.isBefore(this.startDate))
                    selected = this.startDate.clone();

                if (maxDate && selected.isAfter(maxDate))
                    selected = maxDate.clone();

            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

        },

        updateFormInputs: function() {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
            if (this.endDate)
                this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

            if (this.opens == 'left') {
                this.container.css({
                    top: containerTop,
                    right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else if (this.opens == 'center') {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                    right: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: containerTop,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate, this.endDate, this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
            this.element.trigger('outsideClick.daterangepicker', this);
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        hoverRange: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                return;

            var label = e.target.getAttribute('data-range-key');

            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
            }

        },

        clickRange: function(e) {
            var label = e.target.getAttribute('data-range-key');
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                if (!this.alwaysShowCalendars)
                    this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore mouse movements while an above-calendar text input has focus
            //if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
            //    return;

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            //have the text inputs above calendars reflect the date being hovered over
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(":focus")) {
                this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
            } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(":focus")) {
                this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
            }

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.calendar td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            // * if one of the inputs above the calendars was focused, cancel that manual input
            //

            if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                //special case: clicking the same date for start/end,
                //but the time of the end date is before the start date
                this.setEndDate(this.startDate.clone());
            } else { // picking end
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply) {
                  this.calculateChosenLabel();
                  this.clickApply();
                }
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

            //This is to cancel the blur event handler if the mouse was in one of the inputs
            e.stopPropagation();

        },

        calculateChosenLabel: function () {
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                if (this.showCustomRangeLabel) {
                    this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                } else {
                    this.chosenLabel = null;
                }
                this.showCalendars();
            }
        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        formInputsChanged: function(e) {
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
            var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

            if (start.isValid() && end.isValid()) {

                if (isRight && end.isBefore(start))
                    start = end.clone();

                this.setStartDate(start);
                this.setEndDate(end);

                if (isRight) {
                    this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                } else {
                    this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                }

            }

            this.updateView();
        },

        formInputsFocused: function(e) {

            // Highlight the focused input
            this.container.find('input[name="daterangepicker_start"], input[name="daterangepicker_end"]').removeClass('active');
            $(e.target).addClass('active');

            // Set the state such that if the user goes back to using a mouse, 
            // the calendars are aware we're selecting the end of the range, not
            // the start. This allows someone to edit the end of a date range without
            // re-selecting the beginning, by clicking on the end date input then
            // using the calendar.
            var isRight = $(e.target).closest('.calendar').hasClass('right');
            if (isRight) {
                this.endDate = null;
                this.setStartDate(this.startDate.clone());
                this.updateView();
            }

        },

        formInputsBlurred: function(e) {

            // this function has one purpose right now: if you tab from the first
            // text input to the second in the UI, the endDate is nulled so that
            // you can click another, but if you tab out without clicking anything
            // or changing the input value, the old endDate should be retained

            if (!this.endDate) {
                var val = this.container.find('input[name="daterangepicker_end"]').val();
                var end = moment(val, this.locale.format);
                if (end.isValid()) {
                    this.setEndDate(end);
                    this.updateView();
                }
            }

        },

        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;
            if (this.element.val().length < this.locale.format.length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            if (!start.isValid() || !end.isValid()) return;

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, callback));
        });
        return this;
    };

    return DateRangePicker;

}));

/*!
 * Bootstrap Colorpicker v2.3.3
 * http://mjolnic.github.io/bootstrap-colorpicker/
 *
 * Originally written by (c) 2012 Stefan Petre
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 */

(function(factory) {
  "use strict";
  if (typeof exports === 'object') {
    module.exports = factory(window.jQuery);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (window.jQuery && !window.jQuery.fn.colorpicker) {
    factory(window.jQuery);
  }
}(function($) {
  'use strict';

  /**
   * Color manipulation helper class
   *
   * @param {Object|String} val
   * @param {Object} predefinedColors
   * @constructor
   */
  var Color = function(val, predefinedColors) {
    this.value = {
      h: 0,
      s: 0,
      b: 0,
      a: 1
    };
    this.origFormat = null; // original string format
    if (predefinedColors) {
      $.extend(this.colors, predefinedColors);
    }
    if (val) {
      if (val.toLowerCase !== undefined) {
        // cast to string
        val = val + '';
        this.setColor(val);
      } else if (val.h !== undefined) {
        this.value = val;
      }
    }
  };

  Color.prototype = {
    constructor: Color,
    // 140 predefined colors from the HTML Colors spec
    colors: {
      "aliceblue": "#f0f8ff",
      "antiquewhite": "#faebd7",
      "aqua": "#00ffff",
      "aquamarine": "#7fffd4",
      "azure": "#f0ffff",
      "beige": "#f5f5dc",
      "bisque": "#ffe4c4",
      "black": "#000000",
      "blanchedalmond": "#ffebcd",
      "blue": "#0000ff",
      "blueviolet": "#8a2be2",
      "brown": "#a52a2a",
      "burlywood": "#deb887",
      "cadetblue": "#5f9ea0",
      "chartreuse": "#7fff00",
      "chocolate": "#d2691e",
      "coral": "#ff7f50",
      "cornflowerblue": "#6495ed",
      "cornsilk": "#fff8dc",
      "crimson": "#dc143c",
      "cyan": "#00ffff",
      "darkblue": "#00008b",
      "darkcyan": "#008b8b",
      "darkgoldenrod": "#b8860b",
      "darkgray": "#a9a9a9",
      "darkgreen": "#006400",
      "darkkhaki": "#bdb76b",
      "darkmagenta": "#8b008b",
      "darkolivegreen": "#556b2f",
      "darkorange": "#ff8c00",
      "darkorchid": "#9932cc",
      "darkred": "#8b0000",
      "darksalmon": "#e9967a",
      "darkseagreen": "#8fbc8f",
      "darkslateblue": "#483d8b",
      "darkslategray": "#2f4f4f",
      "darkturquoise": "#00ced1",
      "darkviolet": "#9400d3",
      "deeppink": "#ff1493",
      "deepskyblue": "#00bfff",
      "dimgray": "#696969",
      "dodgerblue": "#1e90ff",
      "firebrick": "#b22222",
      "floralwhite": "#fffaf0",
      "forestgreen": "#228b22",
      "fuchsia": "#ff00ff",
      "gainsboro": "#dcdcdc",
      "ghostwhite": "#f8f8ff",
      "gold": "#ffd700",
      "goldenrod": "#daa520",
      "gray": "#808080",
      "green": "#008000",
      "greenyellow": "#adff2f",
      "honeydew": "#f0fff0",
      "hotpink": "#ff69b4",
      "indianred": "#cd5c5c",
      "indigo": "#4b0082",
      "ivory": "#fffff0",
      "khaki": "#f0e68c",
      "lavender": "#e6e6fa",
      "lavenderblush": "#fff0f5",
      "lawngreen": "#7cfc00",
      "lemonchiffon": "#fffacd",
      "lightblue": "#add8e6",
      "lightcoral": "#f08080",
      "lightcyan": "#e0ffff",
      "lightgoldenrodyellow": "#fafad2",
      "lightgrey": "#d3d3d3",
      "lightgreen": "#90ee90",
      "lightpink": "#ffb6c1",
      "lightsalmon": "#ffa07a",
      "lightseagreen": "#20b2aa",
      "lightskyblue": "#87cefa",
      "lightslategray": "#778899",
      "lightsteelblue": "#b0c4de",
      "lightyellow": "#ffffe0",
      "lime": "#00ff00",
      "limegreen": "#32cd32",
      "linen": "#faf0e6",
      "magenta": "#ff00ff",
      "maroon": "#800000",
      "mediumaquamarine": "#66cdaa",
      "mediumblue": "#0000cd",
      "mediumorchid": "#ba55d3",
      "mediumpurple": "#9370d8",
      "mediumseagreen": "#3cb371",
      "mediumslateblue": "#7b68ee",
      "mediumspringgreen": "#00fa9a",
      "mediumturquoise": "#48d1cc",
      "mediumvioletred": "#c71585",
      "midnightblue": "#191970",
      "mintcream": "#f5fffa",
      "mistyrose": "#ffe4e1",
      "moccasin": "#ffe4b5",
      "navajowhite": "#ffdead",
      "navy": "#000080",
      "oldlace": "#fdf5e6",
      "olive": "#808000",
      "olivedrab": "#6b8e23",
      "orange": "#ffa500",
      "orangered": "#ff4500",
      "orchid": "#da70d6",
      "palegoldenrod": "#eee8aa",
      "palegreen": "#98fb98",
      "paleturquoise": "#afeeee",
      "palevioletred": "#d87093",
      "papayawhip": "#ffefd5",
      "peachpuff": "#ffdab9",
      "peru": "#cd853f",
      "pink": "#ffc0cb",
      "plum": "#dda0dd",
      "powderblue": "#b0e0e6",
      "purple": "#800080",
      "red": "#ff0000",
      "rosybrown": "#bc8f8f",
      "royalblue": "#4169e1",
      "saddlebrown": "#8b4513",
      "salmon": "#fa8072",
      "sandybrown": "#f4a460",
      "seagreen": "#2e8b57",
      "seashell": "#fff5ee",
      "sienna": "#a0522d",
      "silver": "#c0c0c0",
      "skyblue": "#87ceeb",
      "slateblue": "#6a5acd",
      "slategray": "#708090",
      "snow": "#fffafa",
      "springgreen": "#00ff7f",
      "steelblue": "#4682b4",
      "tan": "#d2b48c",
      "teal": "#008080",
      "thistle": "#d8bfd8",
      "tomato": "#ff6347",
      "turquoise": "#40e0d0",
      "violet": "#ee82ee",
      "wheat": "#f5deb3",
      "white": "#ffffff",
      "whitesmoke": "#f5f5f5",
      "yellow": "#ffff00",
      "yellowgreen": "#9acd32",
      "transparent": "transparent"
    },
    _sanitizeNumber: function(val) {
      if (typeof val === 'number') {
        return val;
      }
      if (isNaN(val) || (val === null) || (val === '') || (val === undefined)) {
        return 1;
      }
      if (val === '') {
        return 0;
      }
      if (val.toLowerCase !== undefined) {
        if (val.match(/^\./)) {
          val = "0" + val;
        }
        return Math.ceil(parseFloat(val) * 100) / 100;
      }
      return 1;
    },
    isTransparent: function(strVal) {
      if (!strVal) {
        return false;
      }
      strVal = strVal.toLowerCase().trim();
      return (strVal === 'transparent') || (strVal.match(/#?00000000/)) || (strVal.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/));
    },
    rgbaIsTransparent: function(rgba) {
      return ((rgba.r === 0) && (rgba.g === 0) && (rgba.b === 0) && (rgba.a === 0));
    },
    //parse a string to HSB
    setColor: function(strVal) {
      strVal = strVal.toLowerCase().trim();
      if (strVal) {
        if (this.isTransparent(strVal)) {
          this.value = {
            h: 0,
            s: 0,
            b: 0,
            a: 0
          };
        } else {
          this.value = this.stringToHSB(strVal) || {
            h: 0,
            s: 0,
            b: 0,
            a: 1
          }; // if parser fails, defaults to black
        }
      }
    },
    stringToHSB: function(strVal) {
      strVal = strVal.toLowerCase();
      var alias;
      if (typeof this.colors[strVal] !== 'undefined') {
        strVal = this.colors[strVal];
        alias = 'alias';
      }
      var that = this,
        result = false;
      $.each(this.stringParsers, function(i, parser) {
        var match = parser.re.exec(strVal),
          values = match && parser.parse.apply(that, [match]),
          format = alias || parser.format || 'rgba';
        if (values) {
          if (format.match(/hsla?/)) {
            result = that.RGBtoHSB.apply(that, that.HSLtoRGB.apply(that, values));
          } else {
            result = that.RGBtoHSB.apply(that, values);
          }
          that.origFormat = format;
          return false;
        }
        return true;
      });
      return result;
    },
    setHue: function(h) {
      this.value.h = 1 - h;
    },
    setSaturation: function(s) {
      this.value.s = s;
    },
    setBrightness: function(b) {
      this.value.b = 1 - b;
    },
    setAlpha: function(a) {
      this.value.a = Math.round((parseInt((1 - a) * 100, 10) / 100) * 100) / 100;
    },
    toRGB: function(h, s, b, a) {
      if (!h) {
        h = this.value.h;
        s = this.value.s;
        b = this.value.b;
      }
      h *= 360;
      var R, G, B, X, C;
      h = (h % 360) / 60;
      C = b * s;
      X = C * (1 - Math.abs(h % 2 - 1));
      R = G = B = b - C;

      h = ~~h;
      R += [C, X, 0, 0, X, C][h];
      G += [X, C, C, X, 0, 0][h];
      B += [0, 0, X, C, C, X][h];
      return {
        r: Math.round(R * 255),
        g: Math.round(G * 255),
        b: Math.round(B * 255),
        a: a || this.value.a
      };
    },
    toHex: function(h, s, b, a) {
      var rgb = this.toRGB(h, s, b, a);
      if (this.rgbaIsTransparent(rgb)) {
        return 'transparent';
      }
      return '#' + ((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
    },
    toHSL: function(h, s, b, a) {
      h = h || this.value.h;
      s = s || this.value.s;
      b = b || this.value.b;
      a = a || this.value.a;

      var H = h,
        L = (2 - s) * b,
        S = s * b;
      if (L > 0 && L <= 1) {
        S /= L;
      } else {
        S /= 2 - L;
      }
      L /= 2;
      if (S > 1) {
        S = 1;
      }
      return {
        h: isNaN(H) ? 0 : H,
        s: isNaN(S) ? 0 : S,
        l: isNaN(L) ? 0 : L,
        a: isNaN(a) ? 0 : a
      };
    },
    toAlias: function(r, g, b, a) {
      var rgb = this.toHex(r, g, b, a);
      for (var alias in this.colors) {
        if (this.colors[alias] === rgb) {
          return alias;
        }
      }
      return false;
    },
    RGBtoHSB: function(r, g, b, a) {
      r /= 255;
      g /= 255;
      b /= 255;

      var H, S, V, C;
      V = Math.max(r, g, b);
      C = V - Math.min(r, g, b);
      H = (C === 0 ? null :
        V === r ? (g - b) / C :
        V === g ? (b - r) / C + 2 :
        (r - g) / C + 4
      );
      H = ((H + 360) % 6) * 60 / 360;
      S = C === 0 ? 0 : C / V;
      return {
        h: this._sanitizeNumber(H),
        s: S,
        b: V,
        a: this._sanitizeNumber(a)
      };
    },
    HueToRGB: function(p, q, h) {
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
      if ((h * 6) < 1) {
        return p + (q - p) * h * 6;
      } else if ((h * 2) < 1) {
        return q;
      } else if ((h * 3) < 2) {
        return p + (q - p) * ((2 / 3) - h) * 6;
      } else {
        return p;
      }
    },
    HSLtoRGB: function(h, s, l, a) {
      if (s < 0) {
        s = 0;
      }
      var q;
      if (l <= 0.5) {
        q = l * (1 + s);
      } else {
        q = l + s - (l * s);
      }

      var p = 2 * l - q;

      var tr = h + (1 / 3);
      var tg = h;
      var tb = h - (1 / 3);

      var r = Math.round(this.HueToRGB(p, q, tr) * 255);
      var g = Math.round(this.HueToRGB(p, q, tg) * 255);
      var b = Math.round(this.HueToRGB(p, q, tb) * 255);
      return [r, g, b, this._sanitizeNumber(a)];
    },
    toString: function(format) {
      format = format || 'rgba';
      var c = false;
      switch (format) {
        case 'rgb':
          {
            c = this.toRGB();
            if (this.rgbaIsTransparent(c)) {
              return 'transparent';
            }
            return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
          }
          break;
        case 'rgba':
          {
            c = this.toRGB();
            return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
          }
          break;
        case 'hsl':
          {
            c = this.toHSL();
            return 'hsl(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%)';
          }
          break;
        case 'hsla':
          {
            c = this.toHSL();
            return 'hsla(' + Math.round(c.h * 360) + ',' + Math.round(c.s * 100) + '%,' + Math.round(c.l * 100) + '%,' + c.a + ')';
          }
          break;
        case 'hex':
          {
            return this.toHex();
          }
          break;
        case 'alias':
          return this.toAlias() || this.toHex();
        default:
          {
            return c;
          }
          break;
      }
    },
    // a set of RE's that can match strings and generate color tuples.
    // from John Resig color plugin
    // https://github.com/jquery/jquery-color/
    stringParsers: [{
      re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
      format: 'rgb',
      parse: function(execResult) {
        return [
          execResult[1],
          execResult[2],
          execResult[3],
          1
        ];
      }
    }, {
      re: /rgb\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
      format: 'rgb',
      parse: function(execResult) {
        return [
          2.55 * execResult[1],
          2.55 * execResult[2],
          2.55 * execResult[3],
          1
        ];
      }
    }, {
      re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format: 'rgba',
      parse: function(execResult) {
        return [
          execResult[1],
          execResult[2],
          execResult[3],
          execResult[4]
        ];
      }
    }, {
      re: /rgba\(\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format: 'rgba',
      parse: function(execResult) {
        return [
          2.55 * execResult[1],
          2.55 * execResult[2],
          2.55 * execResult[3],
          execResult[4]
        ];
      }
    }, {
      re: /hsl\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*?\)/,
      format: 'hsl',
      parse: function(execResult) {
        return [
          execResult[1] / 360,
          execResult[2] / 100,
          execResult[3] / 100,
          execResult[4]
        ];
      }
    }, {
      re: /hsla\(\s*(\d*(?:\.\d+)?)\s*,\s*(\d*(?:\.\d+)?)\%\s*,\s*(\d*(?:\.\d+)?)\%\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/,
      format: 'hsla',
      parse: function(execResult) {
        return [
          execResult[1] / 360,
          execResult[2] / 100,
          execResult[3] / 100,
          execResult[4]
        ];
      }
    }, {
      re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
      format: 'hex',
      parse: function(execResult) {
        return [
          parseInt(execResult[1], 16),
          parseInt(execResult[2], 16),
          parseInt(execResult[3], 16),
          1
        ];
      }
    }, {
      re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
      format: 'hex',
      parse: function(execResult) {
        return [
          parseInt(execResult[1] + execResult[1], 16),
          parseInt(execResult[2] + execResult[2], 16),
          parseInt(execResult[3] + execResult[3], 16),
          1
        ];
      }
    }],
    colorNameToHex: function(name) {
      if (typeof this.colors[name.toLowerCase()] !== 'undefined') {
        return this.colors[name.toLowerCase()];
      }
      return false;
    }
  };

  /*
   * Default plugin options
   */
  var defaults = {
    horizontal: false, // horizontal mode layout ?
    inline: false, //forces to show the colorpicker as an inline element
    color: false, //forces a color
    format: false, //forces a format
    input: 'input', // children input selector
    container: false, // container selector
    component: '.add-on, .input-group-addon', // children component selector
    sliders: {
      saturation: {
        maxLeft: 100,
        maxTop: 100,
        callLeft: 'setSaturation',
        callTop: 'setBrightness'
      },
      hue: {
        maxLeft: 0,
        maxTop: 100,
        callLeft: false,
        callTop: 'setHue'
      },
      alpha: {
        maxLeft: 0,
        maxTop: 100,
        callLeft: false,
        callTop: 'setAlpha'
      }
    },
    slidersHorz: {
      saturation: {
        maxLeft: 100,
        maxTop: 100,
        callLeft: 'setSaturation',
        callTop: 'setBrightness'
      },
      hue: {
        maxLeft: 100,
        maxTop: 0,
        callLeft: 'setHue',
        callTop: false
      },
      alpha: {
        maxLeft: 100,
        maxTop: 0,
        callLeft: 'setAlpha',
        callTop: false
      }
    },
    template: '<div class="colorpicker dropdown-menu">' +
      '<div class="colorpicker-saturation"><i><b></b></i></div>' +
      '<div class="colorpicker-hue"><i></i></div>' +
      '<div class="colorpicker-alpha"><i></i></div>' +
      '<div class="colorpicker-color"><div /></div>' +
      '<div class="colorpicker-selectors"></div>' +
      '</div>',
    align: 'right',
    customClass: null,
    colorSelectors: null
  };

  /**
   * Colorpicker component class
   *
   * @param {Object|String} element
   * @param {Object} options
   * @constructor
   */
  var Colorpicker = function(element, options) {
    this.element = $(element).addClass('colorpicker-element');
    this.options = $.extend(true, {}, defaults, this.element.data(), options);
    this.component = this.options.component;
    this.component = (this.component !== false) ? this.element.find(this.component) : false;
    if (this.component && (this.component.length === 0)) {
      this.component = false;
    }
    this.container = (this.options.container === true) ? this.element : this.options.container;
    this.container = (this.container !== false) ? $(this.container) : false;

    // Is the element an input? Should we search inside for any input?
    this.input = this.element.is('input') ? this.element : (this.options.input ?
      this.element.find(this.options.input) : false);
    if (this.input && (this.input.length === 0)) {
      this.input = false;
    }
    // Set HSB color
    this.color = new Color(this.options.color !== false ? this.options.color : this.getValue(), this.options.colorSelectors);
    this.format = this.options.format !== false ? this.options.format : this.color.origFormat;

    if (this.options.color !== false) {
      this.updateInput(this.color);
      this.updateData(this.color);
    }

    // Setup picker
    this.picker = $(this.options.template);
    if (this.options.customClass) {
      this.picker.addClass(this.options.customClass);
    }
    if (this.options.inline) {
      this.picker.addClass('colorpicker-inline colorpicker-visible');
    } else {
      this.picker.addClass('colorpicker-hidden');
    }
    if (this.options.horizontal) {
      this.picker.addClass('colorpicker-horizontal');
    }
    if (this.format === 'rgba' || this.format === 'hsla' || this.options.format === false) {
      this.picker.addClass('colorpicker-with-alpha');
    }
    if (this.options.align === 'right') {
      this.picker.addClass('colorpicker-right');
    }
    if (this.options.inline === true) {
      this.picker.addClass('colorpicker-no-arrow');
    }
    if (this.options.colorSelectors) {
      var colorpicker = this;
      $.each(this.options.colorSelectors, function(name, color) {
        var $btn = $('<i />').css('background-color', color).data('class', name);
        $btn.click(function() {
          colorpicker.setValue($(this).css('background-color'));
        });
        colorpicker.picker.find('.colorpicker-selectors').append($btn);
      });
      this.picker.find('.colorpicker-selectors').show();
    }
    this.picker.on('mousedown.colorpicker touchstart.colorpicker', $.proxy(this.mousedown, this));
    this.picker.appendTo(this.container ? this.container : $('body'));

    // Bind events
    if (this.input !== false) {
      this.input.on({
        'keyup.colorpicker': $.proxy(this.keyup, this)
      });
      this.input.on({
        'change.colorpicker': $.proxy(this.change, this)
      });
      if (this.component === false) {
        this.element.on({
          'focus.colorpicker': $.proxy(this.show, this)
        });
      }
      if (this.options.inline === false) {
        this.element.on({
          'focusout.colorpicker': $.proxy(this.hide, this)
        });
      }
    }

    if (this.component !== false) {
      this.component.on({
        'click.colorpicker': $.proxy(this.show, this)
      });
    }

    if ((this.input === false) && (this.component === false)) {
      this.element.on({
        'click.colorpicker': $.proxy(this.show, this)
      });
    }

    // for HTML5 input[type='color']
    if ((this.input !== false) && (this.component !== false) && (this.input.attr('type') === 'color')) {

      this.input.on({
        'click.colorpicker': $.proxy(this.show, this),
        'focus.colorpicker': $.proxy(this.show, this)
      });
    }
    this.update();

    $($.proxy(function() {
      this.element.trigger('create');
    }, this));
  };

  Colorpicker.Color = Color;

  Colorpicker.prototype = {
    constructor: Colorpicker,
    destroy: function() {
      this.picker.remove();
      this.element.removeData('colorpicker', 'color').off('.colorpicker');
      if (this.input !== false) {
        this.input.off('.colorpicker');
      }
      if (this.component !== false) {
        this.component.off('.colorpicker');
      }
      this.element.removeClass('colorpicker-element');
      this.element.trigger({
        type: 'destroy'
      });
    },
    reposition: function() {
      if (this.options.inline !== false || this.options.container) {
        return false;
      }
      var type = this.container && this.container[0] !== document.body ? 'position' : 'offset';
      var element = this.component || this.element;
      var offset = element[type]();
      if (this.options.align === 'right') {
        offset.left -= this.picker.outerWidth() - element.outerWidth();
      }
      this.picker.css({
        top: offset.top + element.outerHeight(),
        left: offset.left
      });
    },
    show: function(e) {
      if (this.isDisabled()) {
        return false;
      }
      this.picker.addClass('colorpicker-visible').removeClass('colorpicker-hidden');
      this.reposition();
      $(window).on('resize.colorpicker', $.proxy(this.reposition, this));
      if (e && (!this.hasInput() || this.input.attr('type') === 'color')) {
        if (e.stopPropagation && e.preventDefault) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
      if ((this.component || !this.input) && (this.options.inline === false)) {
        $(window.document).on({
          'mousedown.colorpicker': $.proxy(this.hide, this)
        });
      }
      this.element.trigger({
        type: 'showPicker',
        color: this.color
      });
    },
    hide: function() {
      this.picker.addClass('colorpicker-hidden').removeClass('colorpicker-visible');
      $(window).off('resize.colorpicker', this.reposition);
      $(document).off({
        'mousedown.colorpicker': this.hide
      });
      this.update();
      this.element.trigger({
        type: 'hidePicker',
        color: this.color
      });
    },
    updateData: function(val) {
      val = val || this.color.toString(this.format);
      this.element.data('color', val);
      return val;
    },
    updateInput: function(val) {
      val = val || this.color.toString(this.format);
      if (this.input !== false) {
        if (this.options.colorSelectors) {
          var color = new Color(val, this.options.colorSelectors);
          var alias = color.toAlias();
          if (typeof this.options.colorSelectors[alias] !== 'undefined') {
            val = alias;
          }
        }
        this.input.prop('value', val);
      }
      return val;
    },
    updatePicker: function(val) {
      if (val !== undefined) {
        this.color = new Color(val, this.options.colorSelectors);
      }
      var sl = (this.options.horizontal === false) ? this.options.sliders : this.options.slidersHorz;
      var icns = this.picker.find('i');
      if (icns.length === 0) {
        return;
      }
      if (this.options.horizontal === false) {
        sl = this.options.sliders;
        icns.eq(1).css('top', sl.hue.maxTop * (1 - this.color.value.h)).end()
          .eq(2).css('top', sl.alpha.maxTop * (1 - this.color.value.a));
      } else {
        sl = this.options.slidersHorz;
        icns.eq(1).css('left', sl.hue.maxLeft * (1 - this.color.value.h)).end()
          .eq(2).css('left', sl.alpha.maxLeft * (1 - this.color.value.a));
      }
      icns.eq(0).css({
        'top': sl.saturation.maxTop - this.color.value.b * sl.saturation.maxTop,
        'left': this.color.value.s * sl.saturation.maxLeft
      });
      this.picker.find('.colorpicker-saturation').css('backgroundColor', this.color.toHex(this.color.value.h, 1, 1, 1));
      this.picker.find('.colorpicker-alpha').css('backgroundColor', this.color.toHex());
      this.picker.find('.colorpicker-color, .colorpicker-color div').css('backgroundColor', this.color.toString(this.format));
      return val;
    },
    updateComponent: function(val) {
      val = val || this.color.toString(this.format);
      if (this.component !== false) {
        var icn = this.component.find('i').eq(0);
        if (icn.length > 0) {
          icn.css({
            'backgroundColor': val
          });
        } else {
          this.component.css({
            'backgroundColor': val
          });
        }
      }
      return val;
    },
    update: function(force) {
      var val;
      if ((this.getValue(false) !== false) || (force === true)) {
        // Update input/data only if the current value is not empty
        val = this.updateComponent();
        this.updateInput(val);
        this.updateData(val);
        this.updatePicker(); // only update picker if value is not empty
      }
      return val;

    },
    setValue: function(val) { // set color manually
      this.color = new Color(val, this.options.colorSelectors);
      this.update(true);
      this.element.trigger({
        type: 'changeColor',
        color: this.color,
        value: val
      });
    },
    getValue: function(defaultValue) {
      defaultValue = (defaultValue === undefined) ? '#000000' : defaultValue;
      var val;
      if (this.hasInput()) {
        val = this.input.val();
      } else {
        val = this.element.data('color');
      }
      if ((val === undefined) || (val === '') || (val === null)) {
        // if not defined or empty, return default
        val = defaultValue;
      }
      return val;
    },
    hasInput: function() {
      return (this.input !== false);
    },
    isDisabled: function() {
      if (this.hasInput()) {
        return (this.input.prop('disabled') === true);
      }
      return false;
    },
    disable: function() {
      if (this.hasInput()) {
        this.input.prop('disabled', true);
        this.element.trigger({
          type: 'disable',
          color: this.color,
          value: this.getValue()
        });
        return true;
      }
      return false;
    },
    enable: function() {
      if (this.hasInput()) {
        this.input.prop('disabled', false);
        this.element.trigger({
          type: 'enable',
          color: this.color,
          value: this.getValue()
        });
        return true;
      }
      return false;
    },
    currentSlider: null,
    mousePointer: {
      left: 0,
      top: 0
    },
    mousedown: function(e) {
      if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
        e.pageX = e.originalEvent.touches[0].pageX;
        e.pageY = e.originalEvent.touches[0].pageY;
      }
      e.stopPropagation();
      e.preventDefault();

      var target = $(e.target);

      //detect the slider and set the limits and callbacks
      var zone = target.closest('div');
      var sl = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
      if (!zone.is('.colorpicker')) {
        if (zone.is('.colorpicker-saturation')) {
          this.currentSlider = $.extend({}, sl.saturation);
        } else if (zone.is('.colorpicker-hue')) {
          this.currentSlider = $.extend({}, sl.hue);
        } else if (zone.is('.colorpicker-alpha')) {
          this.currentSlider = $.extend({}, sl.alpha);
        } else {
          return false;
        }
        var offset = zone.offset();
        //reference to guide's style
        this.currentSlider.guide = zone.find('i')[0].style;
        this.currentSlider.left = e.pageX - offset.left;
        this.currentSlider.top = e.pageY - offset.top;
        this.mousePointer = {
          left: e.pageX,
          top: e.pageY
        };
        //trigger mousemove to move the guide to the current position
        $(document).on({
          'mousemove.colorpicker': $.proxy(this.mousemove, this),
          'touchmove.colorpicker': $.proxy(this.mousemove, this),
          'mouseup.colorpicker': $.proxy(this.mouseup, this),
          'touchend.colorpicker': $.proxy(this.mouseup, this)
        }).trigger('mousemove');
      }
      return false;
    },
    mousemove: function(e) {
      if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
        e.pageX = e.originalEvent.touches[0].pageX;
        e.pageY = e.originalEvent.touches[0].pageY;
      }
      e.stopPropagation();
      e.preventDefault();
      var left = Math.max(
        0,
        Math.min(
          this.currentSlider.maxLeft,
          this.currentSlider.left + ((e.pageX || this.mousePointer.left) - this.mousePointer.left)
        )
      );
      var top = Math.max(
        0,
        Math.min(
          this.currentSlider.maxTop,
          this.currentSlider.top + ((e.pageY || this.mousePointer.top) - this.mousePointer.top)
        )
      );
      this.currentSlider.guide.left = left + 'px';
      this.currentSlider.guide.top = top + 'px';
      if (this.currentSlider.callLeft) {
        this.color[this.currentSlider.callLeft].call(this.color, left / this.currentSlider.maxLeft);
      }
      if (this.currentSlider.callTop) {
        this.color[this.currentSlider.callTop].call(this.color, top / this.currentSlider.maxTop);
      }
      // Change format dynamically
      // Only occurs if user choose the dynamic format by
      // setting option format to false
      if (this.currentSlider.callTop === 'setAlpha' && this.options.format === false) {

        // Converting from hex / rgb to rgba
        if (this.color.value.a !== 1) {
          this.format = 'rgba';
          this.color.origFormat = 'rgba';
        }

        // Converting from rgba to hex
        else {
          this.format = 'hex';
          this.color.origFormat = 'hex';
        }
      }
      this.update(true);

      this.element.trigger({
        type: 'changeColor',
        color: this.color
      });
      return false;
    },
    mouseup: function(e) {
      e.stopPropagation();
      e.preventDefault();
      $(document).off({
        'mousemove.colorpicker': this.mousemove,
        'touchmove.colorpicker': this.mousemove,
        'mouseup.colorpicker': this.mouseup,
        'touchend.colorpicker': this.mouseup
      });
      return false;
    },
    change: function(e) {
      this.keyup(e);
    },
    keyup: function(e) {
      if ((e.keyCode === 38)) {
        if (this.color.value.a < 1) {
          this.color.value.a = Math.round((this.color.value.a + 0.01) * 100) / 100;
        }
        this.update(true);
      } else if ((e.keyCode === 40)) {
        if (this.color.value.a > 0) {
          this.color.value.a = Math.round((this.color.value.a - 0.01) * 100) / 100;
        }
        this.update(true);
      } else {
        this.color = new Color(this.input.val(), this.options.colorSelectors);
        // Change format dynamically
        // Only occurs if user choose the dynamic format by
        // setting option format to false
        if (this.color.origFormat && this.options.format === false) {
          this.format = this.color.origFormat;
        }
        if (this.getValue(false) !== false) {
          this.updateData();
          this.updateComponent();
          this.updatePicker();
        }
      }
      this.element.trigger({
        type: 'changeColor',
        color: this.color,
        value: this.input.val()
      });
    }
  };

  $.colorpicker = Colorpicker;

  $.fn.colorpicker = function(option) {
    var pickerArgs = arguments,
      rv = null;

    var $returnValue = this.each(function() {
      var $this = $(this),
        inst = $this.data('colorpicker'),
        options = ((typeof option === 'object') ? option : {});
      if ((!inst) && (typeof option !== 'string')) {
        $this.data('colorpicker', new Colorpicker(this, options));
      } else {
        if (typeof option === 'string') {
          rv = inst[option].apply(inst, Array.prototype.slice.call(pickerArgs, 1));
        }
      }
    });
    if (option === 'getValue') {
      return rv;
    }
    return $returnValue;
  };

  $.fn.colorpicker.constructor = Colorpicker;

}));

/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2016 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.1
*/
!function($) {
    function Inputmask(alias, options) {
        return this instanceof Inputmask ? ($.isPlainObject(alias) ? options = alias : (options = options || {}, 
        options.alias = alias), this.el = void 0, this.opts = $.extend(!0, {}, this.defaults, options), 
        this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
        this.events = {}, void resolveAlias(this.opts.alias, options, this.opts)) : new Inputmask(alias, options);
    }
    function isInputEventSupported(eventName) {
        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
        el = null, isSupported;
    }
    function isElementTypeSupported(input, opts) {
        var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
        if (!isSupported && "INPUT" === input.tagName) {
            var el = document.createElement("input");
            el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
        }
        return isSupported;
    }
    function resolveAlias(aliasStr, options, opts) {
        var aliasDefinition = opts.aliases[aliasStr];
        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
        !1);
    }
    function importAttributeOptions(npt, opts, userOptions) {
        function importOption(option, optionData) {
            optionData = void 0 !== optionData ? optionData : npt.getAttribute("data-inputmask-" + option), 
            null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
            userOptions[option] = optionData);
        }
        var option, dataoptions, optionData, p, attrOptions = npt.getAttribute("data-inputmask");
        if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), 
        dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
            optionData = void 0;
            for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                optionData = dataoptions[p];
                break;
            }
        }
        importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
        for (option in opts) {
            if (dataoptions) {
                optionData = void 0;
                for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                    optionData = dataoptions[p];
                    break;
                }
            }
            importOption(option, optionData);
        }
        return $.extend(!0, opts, userOptions), opts;
    }
    function generateMaskSet(opts, nocache) {
        function analyseMask(mask) {
            function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                this.matches = [], this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, 
                this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                this.quantifier = {
                    min: 1,
                    max: 1
                };
            }
            function insertTestDefinition(mtoken, element, position) {
                var maskdef = opts.definitions[element];
                position = void 0 !== position ? position : mtoken.matches.length;
                var prevMatch = mtoken.matches[position - 1];
                if (maskdef && !escaped) {
                    maskdef.placeholder = $.isFunction(maskdef.placeholder) ? maskdef.placeholder(opts) : maskdef.placeholder;
                    for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                        var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                        mtoken.matches.splice(position++, 0, {
                            fn: validator ? "string" == typeof validator ? new RegExp(validator) : new function() {
                                this.test = validator;
                            }() : new RegExp("."),
                            cardinality: cardinality ? cardinality : 1,
                            optionality: mtoken.isOptional,
                            newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
                            casing: maskdef.casing,
                            def: maskdef.definitionSymbol || element,
                            placeholder: maskdef.placeholder,
                            mask: element
                        }), prevMatch = mtoken.matches[position - 1];
                    }
                    mtoken.matches.splice(position++, 0, {
                        fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator) : new function() {
                            this.test = maskdef.validator;
                        }() : new RegExp("."),
                        cardinality: maskdef.cardinality,
                        optionality: mtoken.isOptional,
                        newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
                        casing: maskdef.casing,
                        def: maskdef.definitionSymbol || element,
                        placeholder: maskdef.placeholder,
                        mask: element
                    });
                } else mtoken.matches.splice(position++, 0, {
                    fn: null,
                    cardinality: 0,
                    optionality: mtoken.isOptional,
                    newBlockMarker: void 0 === prevMatch || prevMatch.def !== element,
                    casing: null,
                    def: opts.staticDefinitionSymbol || element,
                    placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
                    mask: element
                }), escaped = !1;
            }
            function verifyGroupMarker(lastMatch, isOpenGroup) {
                lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
                isOpenGroup !== !0 && insertTestDefinition(lastMatch, opts.groupmarker.end));
            }
            function maskCurrentToken(m, currentToken, lastMatch, extraCondition) {
                currentToken.matches.length > 0 && (void 0 === extraCondition || extraCondition) && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
                verifyGroupMarker(lastMatch)), insertTestDefinition(currentToken, m);
            }
            function defaultCase() {
                if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], maskCurrentToken(m, currentOpeningToken, lastMatch, !currentOpeningToken.isAlternator), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else maskCurrentToken(m, currentToken, lastMatch);
            }
            function reverseTokens(maskToken) {
                function reverseStatic(st) {
                    return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), 
                    st;
                }
                maskToken.matches = maskToken.matches.reverse();
                for (var match in maskToken.matches) {
                    var intMatch = parseInt(match);
                    if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                        var qt = maskToken.matches[match];
                        maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                    }
                    void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
                }
                return maskToken;
            }
            for (var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = []; match = tokenizer.exec(mask); ) if (m = match[0], 
            escaped) defaultCase(); else switch (m.charAt(0)) {
              case opts.escapeChar:
                escaped = !0;
                break;

              case opts.optionalmarker.end:
              case opts.groupmarker.end:
                if (openingToken = openenings.pop(), void 0 !== openingToken) if (openenings.length > 0) {
                    if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
                    currentOpeningToken.isAlternator) {
                        alternator = openenings.pop();
                        for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                        openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                        currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
                    }
                } else currentToken.matches.push(openingToken); else defaultCase();
                break;

              case opts.optionalmarker.start:
                openenings.push(new MaskToken(!1, !0));
                break;

              case opts.groupmarker.start:
                openenings.push(new MaskToken(!0));
                break;

              case opts.quantifiermarker.start:
                var quantifier = new MaskToken(!1, !1, !0);
                m = m.replace(/[{}]/g, "");
                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                if (("*" === mq1 || "+" === mq1) && (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                    min: mq0,
                    max: mq1
                }, openenings.length > 0) {
                    var matches = openenings[openenings.length - 1].matches;
                    match = matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), groupToken.matches.push(match), 
                    match = groupToken), matches.push(match), matches.push(quantifier);
                } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new MaskToken(!0), 
                groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
                currentToken.matches.push(quantifier);
                break;

              case opts.alternatormarker:
                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
                lastMatch = currentOpeningToken.matches.pop()) : lastMatch = currentToken.matches.pop(), 
                lastMatch.isAlternator ? openenings.push(lastMatch) : (alternator = new MaskToken(!1, !1, !1, !0), 
                alternator.matches.push(lastMatch), openenings.push(alternator));
                break;

              default:
                defaultCase();
            }
            for (;openenings.length > 0; ) openingToken = openenings.pop(), verifyGroupMarker(openingToken, !0), 
            currentToken.matches.push(openingToken);
            return currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
            verifyGroupMarker(lastMatch), maskTokens.push(currentToken)), opts.numericInput && reverseTokens(maskTokens[0]), 
            maskTokens;
        }
        function generateMask(mask, metadata) {
            if (null === mask || "" === mask) return void 0;
            if (1 === mask.length && opts.greedy === !1 && 0 !== opts.repeat && (opts.placeholder = ""), 
            opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
            }
            var masksetDefinition;
            return void 0 === Inputmask.prototype.masksCache[mask] || nocache === !0 ? (masksetDefinition = {
                mask: mask,
                maskToken: analyseMask(mask),
                validPositions: {},
                _buffer: void 0,
                buffer: void 0,
                tests: {},
                metadata: metadata
            }, nocache !== !0 && (Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask] = masksetDefinition, 
            masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask]), 
            masksetDefinition;
        }
        function preProcessMask(mask) {
            return mask = mask.toString();
        }
        var ms;
        if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
            if (opts.mask.length > 1) {
                opts.keepStatic = null === opts.keepStatic ? !0 : opts.keepStatic;
                var altMask = "(";
                return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                    altMask.length > 1 && (altMask += ")|("), altMask += preProcessMask(void 0 === msk.mask || $.isFunction(msk.mask) ? msk : msk.mask);
                }), altMask += ")", generateMask(altMask, opts.mask);
            }
            opts.mask = opts.mask.pop();
        }
        return opts.mask && (ms = void 0 === opts.mask.mask || $.isFunction(opts.mask.mask) ? generateMask(preProcessMask(opts.mask), opts.mask) : generateMask(preProcessMask(opts.mask.mask), opts.mask)), 
        ms;
    }
    function maskScope(actionObj, maskset, opts) {
        function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
            minimalPos = minimalPos || 0;
            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
            do {
                if (baseOnInput === !0 && getMaskSet().validPositions[pos]) {
                    var validPos = getMaskSet().validPositions[pos];
                    test = validPos.match, ndxIntlzr = validPos.locator.slice(), maskTemplate.push(includeInput === !0 ? validPos.input : getPlaceholder(pos, test));
                } else testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, 
                ndxIntlzr = testPos.locator.slice(), (opts.jitMasking === !1 || lvp > pos || isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(getPlaceholder(pos, test));
                pos++;
            } while ((void 0 === maxLength || maxLength > pos - 1) && null !== test.fn || null === test.fn && "" !== test.def || minimalPos >= pos);
            return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), maskTemplate;
        }
        function getMaskSet() {
            return maskset;
        }
        function resetMaskSet(soft) {
            var maskset = getMaskSet();
            maskset.buffer = void 0, soft !== !0 && (maskset.tests = {}, maskset._buffer = void 0, 
            maskset.validPositions = {}, maskset.p = 0);
        }
        function getLastValidPosition(closestTo, strict, validPositions) {
            var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
            void 0 === closestTo && (closestTo = -1);
            for (var posNdx in valids) {
                var psNdx = parseInt(posNdx);
                valids[psNdx] && (strict || null !== valids[psNdx].match.fn) && (closestTo >= psNdx && (before = psNdx), 
                psNdx >= closestTo && (after = psNdx));
            }
            return -1 !== before && closestTo - before > 1 || closestTo > after ? before : after;
        }
        function setValidPosition(pos, validTest, fromSetValid, isSelection) {
            if (isSelection || opts.insertMode && void 0 !== getMaskSet().validPositions[pos] && void 0 === fromSetValid) {
                var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition();
                for (i = pos; lvp >= i; i++) delete getMaskSet().validPositions[i];
                getMaskSet().validPositions[pos] = validTest;
                var j, valid = !0, vps = getMaskSet().validPositions, needsValidation = !1;
                for (i = j = pos; lvp >= i; i++) {
                    var t = positionsClone[i];
                    if (void 0 !== t) for (var posMatch = j, prevPosMatch = -1; posMatch < getMaskLength() && (null == t.match.fn && vps[i] && (vps[i].match.optionalQuantifier === !0 || vps[i].match.optionality === !0) || null != t.match.fn); ) {
                        if (null === t.match.fn || !opts.keepStatic && vps[i] && (void 0 !== vps[i + 1] && getTests(i + 1, vps[i].locator.slice(), i).length > 1 || void 0 !== vps[i].alternation) ? posMatch++ : posMatch = seekNext(j), 
                        needsValidation === !1 && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) {
                            getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), 
                            getMaskSet().validPositions[posMatch].input = t.input, j = posMatch, valid = !0;
                            break;
                        }
                        if (positionCanMatchDefinition(posMatch, t.match.def)) {
                            var result = isValid(posMatch, t.input, !0, !0);
                            if (valid = result !== !1, j = result.caret || result.insert ? getLastValidPosition() : posMatch, 
                            needsValidation = !0, valid) break;
                        } else {
                            if (valid = null == t.match.fn, prevPosMatch === posMatch) break;
                            prevPosMatch = posMatch;
                        }
                    }
                    if (!valid) break;
                }
                if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                resetMaskSet(!0), !1;
            } else getMaskSet().validPositions[pos] = validTest;
            return resetMaskSet(!0), !0;
        }
        function stripValidPositions(start, end, nocheck, strict) {
            function IsEnclosedStatic(pos) {
                var posMatch = getMaskSet().validPositions[pos];
                if (void 0 !== posMatch && null === posMatch.match.fn) {
                    var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
                    return void 0 !== prevMatch && void 0 !== nextMatch;
                }
                return !1;
            }
            var i, startPos = start, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), needsValidation = !1;
            for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) void 0 !== getMaskSet().validPositions[i] && (nocheck === !0 || !IsEnclosedStatic(i) && opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) !== !1) && delete getMaskSet().validPositions[i];
            for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
                for (;void 0 !== getMaskSet().validPositions[startPos]; ) startPos++;
                var s = getMaskSet().validPositions[startPos];
                if (startPos > i && (i = startPos + 1), void 0 === getMaskSet().validPositions[i] && isMask(i) || void 0 !== s) i++; else {
                    var t = getTestTemplate(i);
                    needsValidation === !1 && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]), 
                    getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], 
                    i++) : positionCanMatchDefinition(startPos, t.match.def) ? isValid(startPos, t.input || getPlaceholder(i), !0) !== !1 && (delete getMaskSet().validPositions[i], 
                    i++, needsValidation = !0) : isMask(i) || (i++, startPos--), startPos++;
                }
            }
            resetMaskSet(!0);
        }
        function getTestTemplate(pos, ndxIntlzr, tstPs) {
            var testPos = getMaskSet().validPositions[pos];
            if (void 0 === testPos) for (var testPositions = getTests(pos, ndxIntlzr, tstPs), lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], 
            !(testPos.match && (opts.greedy && testPos.match.optionalQuantifier !== !0 || (testPos.match.optionality === !1 || testPos.match.newBlockMarker === !1) && testPos.match.optionalQuantifier !== !0) && (void 0 === lvTest.alternation || lvTest.alternation !== testPos.alternation || void 0 !== testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr)))); ndx++) ;
            return testPos;
        }
        function getTest(pos) {
            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos].match : getTests(pos)[0].match;
        }
        function positionCanMatchDefinition(pos, def) {
            for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                valid = !0;
                break;
            }
            return valid;
        }
        function selectBestMatch(pos, alternateNdx) {
            var bestMatch, indexPos;
            return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
                var ndxPos = lmnt.alternation ? lmnt.locator[lmnt.alternation].toString().indexOf(alternateNdx) : -1;
                (void 0 === indexPos || indexPos > ndxPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                indexPos = ndxPos);
            }), bestMatch;
        }
        function getTests(pos, ndxIntlzr, tstPs) {
            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                function handleMatch(match, loopNdx, quantifierRecurse) {
                    function isFirstMatch(latestMatch, tokenGroup) {
                        var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                        return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
                            return match.isQuantifier === !0 && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1])) ? !1 : void 0;
                        }), firstMatch;
                    }
                    function resolveNdxInitializer(pos, alternateNdx) {
                        var bestMatch = selectBestMatch(pos, alternateNdx);
                        return bestMatch ? bestMatch.locator.slice(bestMatch.alternation + 1) : [];
                    }
                    if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                    if (testPos === pos && void 0 === match.matches) return matches.push({
                        match: match,
                        locator: loopNdx.reverse(),
                        cd: cacheDependency
                    }), !0;
                    if (void 0 !== match.matches) {
                        if (match.isGroup && quantifierRecurse !== match) {
                            if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                        } else if (match.isOptional) {
                            var optionalToken = match;
                            if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
                                insertStop = !0, testPos = pos;
                            }
                        } else if (match.isAlternator) {
                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                            if (-1 === altIndex || "string" == typeof altIndex) {
                                var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
                                for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                    if (amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx), 
                                    match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match, 
                                    match !== !0 && void 0 !== match && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                                        var ntndx = $.inArray(match, maskToken.matches) + 1;
                                        maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ ntndx ].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse), 
                                        match && (altIndexArr.push(ntndx.toString()), $.each(matches, function(ndx, lmnt) {
                                            lmnt.alternation = loopNdx.length - 1;
                                        })));
                                    }
                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                    for (var i = 0; i < ndxInitializerClone.length; i++) ndxInitializer[i] = ndxInitializerClone[i];
                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                        var altMatch = maltMatches[ndx1];
                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                            var altMatch2 = malternateMatches[ndx2];
                                            if (altMatch.match.def === altMatch2.match.def && ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr))) {
                                                altMatch.match.mask === altMatch2.match.mask && (maltMatches.splice(ndx1, 1), ndx1--), 
                                                -1 === altMatch2.locator[altMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) && (altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation], 
                                                altMatch2.alternation = altMatch.alternation);
                                                break;
                                            }
                                        }
                                    }
                                    malternateMatches = malternateMatches.concat(maltMatches);
                                }
                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                    if (isFinite(ndx)) {
                                        var mamatch, alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
                                        lmnt.locator[alternation] = void 0, lmnt.alternation = void 0;
                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) mamatch = -1 !== $.inArray(altLocArr[alndx], altIndexArr), 
                                        mamatch && (void 0 !== lmnt.locator[alternation] ? (lmnt.locator[alternation] += ",", 
                                        lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
                                        lmnt.alternation = alternation);
                                        if (void 0 !== lmnt.locator[alternation]) return lmnt;
                                    }
                                })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0;
                            } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                            if (match) return !0;
                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && pos >= testPos; qndx++) {
                            var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                            if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
                                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                isFirstMatch(latestMatch, tokenGroup)) {
                                    if (qndx > qt.quantifier.min - 1) {
                                        insertStop = !0, testPos = pos;
                                        break;
                                    }
                                    return !0;
                                }
                                return !0;
                            }
                        } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                    } else testPos++;
                }
                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (maskToken.matches[tndx].isQuantifier !== !0) {
                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                    if (match && testPos === pos) return match;
                    if (testPos > pos) break;
                }
            }
            function mergeLocators(tests) {
                var locator = [];
                return $.isArray(tests) || (tests = [ tests ]), void 0 === tests[0].alternation ? locator = tests[0].locator.slice() : $.each(tests, function(ndx, tst) {
                    if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                }), locator;
            }
            var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr || [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
            if (pos > -1) {
                if (void 0 === ndxIntlzr) {
                    for (var test, previousPos = pos - 1; void 0 === (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) && previousPos > -1; ) previousPos--;
                    void 0 !== test && previousPos > -1 && (ndxInitializer = mergeLocators(test), cacheDependency = ndxInitializer.join(""), 
                    testPos = previousPos);
                }
                if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return getMaskSet().tests[pos];
                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
                    if (match && testPos === pos || testPos > pos) break;
                }
            }
            return (0 === matches.length || insertStop) && matches.push({
                match: {
                    fn: null,
                    cardinality: 0,
                    optionality: !0,
                    casing: null,
                    def: ""
                },
                locator: []
            }), getMaskSet().tests[pos] = $.extend(!0, [], matches), getMaskSet().tests[pos];
        }
        function getBufferTemplate() {
            return void 0 === getMaskSet()._buffer && (getMaskSet()._buffer = getMaskTemplate(!1, 1)), 
            getMaskSet()._buffer;
        }
        function getBuffer(noCache) {
            if (void 0 === getMaskSet().buffer || noCache === !0) {
                if (noCache === !0) for (var testNdx in getMaskSet().tests) void 0 === getMaskSet().validPositions[testNdx] && delete getMaskSet().tests[testNdx];
                getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0);
            }
            return getMaskSet().buffer;
        }
        function refreshFromBuffer(start, end, buffer) {
            var i;
            if (buffer = buffer, start === !0) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; end > i; i++) delete getMaskSet().validPositions[i], 
            delete getMaskSet().tests[i];
            for (i = start; end > i; i++) resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter && isValid(i, buffer[i], !0, !0);
        }
        function casing(elem, test) {
            switch (test.casing) {
              case "upper":
                elem = elem.toUpperCase();
                break;

              case "lower":
                elem = elem.toLowerCase();
            }
            return elem;
        }
        function checkAlternationMatch(altArr1, altArr2) {
            for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                isMatch = !0;
                break;
            }
            return isMatch;
        }
        function isValid(pos, c, strict, fromSetValid) {
            function isSelection(posObj) {
                return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 && opts.insertMode : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1 && opts.insertMode;
            }
            function _isValid(position, c, strict, fromSetValid) {
                var rslt = !1;
                return $.each(getTests(position), function(ndx, tst) {
                    for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                    if (c && (chrs += c), getBuffer(!0), rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : c !== test.def && c !== opts.skipOptionalPartCharacter || "" === test.def ? !1 : {
                        c: test.placeholder || test.def,
                        pos: position
                    }, rslt !== !1) {
                        var elem = void 0 !== rslt.c ? rslt.c : c;
                        elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? test.placeholder || test.def : elem;
                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
                        if (void 0 !== rslt.remove && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                        $.each(rslt.remove.sort(function(a, b) {
                            return b - a;
                        }), function(ndx, lmnt) {
                            stripValidPositions(lmnt, lmnt + 1, !0);
                        })), void 0 !== rslt.insert && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                        $.each(rslt.insert.sort(function(a, b) {
                            return a - b;
                        }), function(ndx, lmnt) {
                            isValid(lmnt.pos, lmnt.c, !1, fromSetValid);
                        })), rslt.refreshFromBuffer) {
                            var refresh = rslt.refreshFromBuffer;
                            if (strict = !0, refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
                            void 0 === rslt.pos && void 0 === rslt.c) return rslt.pos = getLastValidPosition(), 
                            !1;
                            if (validatedPos = void 0 !== rslt.pos ? rslt.pos : position, validatedPos !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), 
                            !1;
                        } else if (rslt !== !0 && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos, 
                        refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                        !1;
                        return rslt !== !0 && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (ndx > 0 && resetMaskSet(!0), 
                        setValidPosition(validatedPos, $.extend({}, tst, {
                            input: casing(elem, test)
                        }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
                    }
                }), rslt;
            }
            function alternate(pos, c, strict, fromSetValid) {
                for (var lastAlt, alternation, isValidRslt, altPos, i, validPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), testsClone = $.extend(!0, {}, getMaskSet().tests), lAlt = getLastValidPosition(); lAlt >= 0 && (altPos = getMaskSet().validPositions[lAlt], 
                !altPos || void 0 === altPos.alternation || (lastAlt = lAlt, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                getTestTemplate(lastAlt).locator[altPos.alternation] === altPos.locator[altPos.alternation])); lAlt--) ;
                if (void 0 !== alternation) {
                    lastAlt = parseInt(lastAlt);
                    for (var decisionPos in getMaskSet().validPositions) if (decisionPos = parseInt(decisionPos), 
                    altPos = getMaskSet().validPositions[decisionPos], decisionPos >= lastAlt && void 0 !== altPos.alternation) {
                        var altNdxs;
                        0 === lastAlt ? (altNdxs = [], $.each(getMaskSet().tests[lastAlt], function(ndx, test) {
                            void 0 !== test.locator[alternation] && (altNdxs = altNdxs.concat(test.locator[alternation].toString().split(",")));
                        })) : altNdxs = getMaskSet().validPositions[lastAlt].locator[alternation].toString().split(",");
                        var decisionTaker = void 0 !== altPos.locator[alternation] ? altPos.locator[alternation] : altNdxs[0];
                        decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                        for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                            var validInputs = [], staticInputsBeforePos = 0, staticInputsBeforePosAlternate = 0;
                            if (decisionTaker < altNdxs[mndx]) {
                                for (var possibilityPos, possibilities, dp = decisionPos; dp >= 0; dp--) if (possibilityPos = getMaskSet().validPositions[dp], 
                                void 0 !== possibilityPos) {
                                    var bestMatch = selectBestMatch(dp, altNdxs[mndx]);
                                    getMaskSet().validPositions[dp].match.def !== bestMatch.match.def && (validInputs.push(getMaskSet().validPositions[dp].input), 
                                    getMaskSet().validPositions[dp] = bestMatch, getMaskSet().validPositions[dp].input = getPlaceholder(dp), 
                                    null === getMaskSet().validPositions[dp].match.fn && staticInputsBeforePosAlternate++, 
                                    possibilityPos = bestMatch), possibilities = possibilityPos.locator[alternation], 
                                    possibilityPos.locator[alternation] = parseInt(altNdxs[mndx]);
                                    break;
                                }
                                if (decisionTaker !== possibilityPos.locator[alternation]) {
                                    for (i = decisionPos + 1; i < getLastValidPosition(void 0, !0) + 1; i++) validPos = getMaskSet().validPositions[i], 
                                    validPos && null != validPos.match.fn ? validInputs.push(validPos.input) : pos > i && staticInputsBeforePos++, 
                                    delete getMaskSet().validPositions[i], delete getMaskSet().tests[i];
                                    for (resetMaskSet(!0), opts.keepStatic = !opts.keepStatic, isValidRslt = !0; validInputs.length > 0; ) {
                                        var input = validInputs.shift();
                                        if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(void 0, !0) + 1, input, !1, fromSetValid))) break;
                                    }
                                    if (possibilityPos.alternation = alternation, possibilityPos.locator[alternation] = possibilities, 
                                    isValidRslt) {
                                        var targetLvp = getLastValidPosition(pos) + 1;
                                        for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) validPos = getMaskSet().validPositions[i], 
                                        (void 0 === validPos || null == validPos.match.fn) && pos > i && staticInputsBeforePosAlternate++;
                                        pos += staticInputsBeforePosAlternate - staticInputsBeforePos, isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid);
                                    }
                                    if (opts.keepStatic = !opts.keepStatic, isValidRslt) return isValidRslt;
                                    resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone), getMaskSet().tests = $.extend(!0, {}, testsClone);
                                }
                            }
                        }
                        break;
                    }
                }
                return !1;
            }
            function trackbackAlternations(originalPos, newPos) {
                for (var vp = getMaskSet().validPositions[newPos], targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; newPos > ps; ps++) if (void 0 === getMaskSet().validPositions[ps] && !isMask(ps, !0)) {
                    var tests = getTests(ps), bestMatch = tests[0], equality = -1;
                    $.each(tests, function(ndx, tst) {
                        for (var i = 0; tll > i && (void 0 !== tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","))); i++) i > equality && (equality = i, 
                        bestMatch = tst);
                    }), setValidPosition(ps, $.extend({}, bestMatch, {
                        input: bestMatch.match.placeholder || bestMatch.match.def
                    }), !0);
                }
            }
            strict = strict === !0;
            var maskPos = pos;
            void 0 !== pos.begin && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
            for (var result = !1, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
            var testTemplate;
            for (pndx++; maskPos > pndx; pndx++) void 0 === getMaskSet().validPositions[pndx] && (opts.jitMasking === !1 || opts.jitMasking > pndx) && ((testTemplate = getTestTemplate(pndx)).match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && _isValid(getLastValidPosition(pndx, !0) + 1, testTemplate.match.placeholder || (null == testTemplate.match.fn ? testTemplate.match.def : "" !== getPlaceholder(pndx) ? getPlaceholder(pndx) : getBuffer()[pndx]), !0, fromSetValid);
            if (isSelection(pos) && (handleRemove(void 0, Inputmask.keyCode.DELETE, pos), maskPos = getMaskSet().p), 
            maskPos < getMaskLength() && (result = _isValid(maskPos, c, strict, fromSetValid), 
            (!strict || fromSetValid === !0) && result === !1)) {
                var currentPosValid = getMaskSet().validPositions[maskPos];
                if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                    if ((opts.insertMode || void 0 === getMaskSet().validPositions[seekNext(maskPos)]) && !isMask(maskPos, !0)) {
                        var staticChar = getTestTemplate(maskPos).match;
                        staticChar = staticChar.placeholder || staticChar.def, _isValid(maskPos, staticChar, strict, fromSetValid);
                        for (var nPos = maskPos + 1, snPos = seekNext(maskPos); snPos >= nPos; nPos++) if (result = _isValid(nPos, c, strict, fromSetValid), 
                        result !== !1) {
                            trackbackAlternations(maskPos, nPos), maskPos = nPos;
                            break;
                        }
                    }
                } else result = {
                    caret: seekNext(maskPos)
                };
            }
            return result === !1 && opts.keepStatic && (result = alternate(maskPos, c, strict, fromSetValid)), 
            result === !0 && (result = {
                pos: maskPos
            }), $.isFunction(opts.postValidation) && result !== !1 && !strict && fromSetValid !== !0 && (result = opts.postValidation(getBuffer(!0), result, opts) ? result : !1), 
            void 0 === result.pos && (result.pos = maskPos), result === !1 && (resetMaskSet(!0), 
            getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
        }
        function isMask(pos, strict) {
            var test;
            if (strict ? (test = getTestTemplate(pos).match, "" === test.def && (test = getTest(pos))) : test = getTest(pos), 
            null != test.fn) return test.fn;
            if (strict !== !0 && pos > -1 && !opts.keepStatic && void 0 === getMaskSet().validPositions[pos]) {
                var tests = getTests(pos);
                return tests.length > 2;
            }
            return !1;
        }
        function getMaskLength() {
            var maskLength;
            maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0);
            var pos, lvp = getLastValidPosition(), testPos = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== testPos ? testPos.locator.slice() : void 0;
            for (pos = lvp + 1; void 0 === testPos || null !== testPos.match.fn || null === testPos.match.fn && "" !== testPos.match.def; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice();
            var lastTest = getTest(pos - 1);
            return maskLength = "" !== lastTest.def ? pos : pos - 1, void 0 === maxLength || maxLength > maskLength ? maskLength : maxLength;
        }
        function seekNext(pos, newBlock) {
            var maskL = getMaskLength();
            if (pos >= maskL) return maskL;
            for (var position = pos; ++position < maskL && (newBlock === !0 && (getTest(position).newBlockMarker !== !0 || !isMask(position)) || newBlock !== !0 && !isMask(position) && (opts.nojumps !== !0 || opts.nojumpsThreshold > position)); ) ;
            return position;
        }
        function seekPrevious(pos, newBlock) {
            var position = pos;
            if (0 >= position) return 0;
            for (;--position > 0 && (newBlock === !0 && getTest(position).newBlockMarker !== !0 || newBlock !== !0 && !isMask(position)); ) ;
            return position;
        }
        function getBufferElement(position) {
            return void 0 === getMaskSet().validPositions[position] ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
        }
        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
            if (event && $.isFunction(opts.onBeforeWrite)) {
                var result = opts.onBeforeWrite(event, buffer, caretPos, opts);
                if (result) {
                    if (result.refreshFromBuffer) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                        buffer = getBuffer(!0);
                    }
                    void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
                }
            }
            input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), 
            triggerInputEvent === !0 && (skipInputEvent = !0, $(input).trigger("input"));
        }
        function getPlaceholder(pos, test) {
            if (test = test || getTest(pos), void 0 !== test.placeholder) return test.placeholder;
            if (null === test.fn) {
                if (pos > -1 && !opts.keepStatic && void 0 === getMaskSet().validPositions[pos]) {
                    var prevTest, tests = getTests(pos), staticAlternations = [];
                    if (tests.length > 2) for (var i = 0; i < tests.length; i++) if (tests[i].match.optionality !== !0 && tests[i].match.optionalQuantifier !== !0 && (null === tests[i].match.fn || void 0 === prevTest || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts) !== !1) && (staticAlternations.push(tests[i]), 
                    null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1)) return opts.placeholder.charAt(pos % opts.placeholder.length);
                }
                return test.def;
            }
            return opts.placeholder.charAt(pos % opts.placeholder.length);
        }
        function checkVal(input, writeOut, strict, nptvl) {
            function isTemplateMatch() {
                var isMatch = !1, charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join("").indexOf(charCodes);
                if (-1 !== charCodeNdx && !isMask(initialNdx)) {
                    isMatch = !0;
                    for (var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx), i = 0; i < bufferTemplateArr.length; i++) if (" " !== bufferTemplateArr[i]) {
                        isMatch = !1;
                        break;
                    }
                }
                return isMatch;
            }
            var result, inputValue = nptvl.slice(), charCodes = "", initialNdx = 0;
            if (resetMaskSet(), getMaskSet().p = seekNext(-1), !strict) if (opts.autoUnmask !== !0) {
                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                initialNdx = seekNext(initialNdx));
            } else initialNdx = seekNext(initialNdx);
            $.each(inputValue, function(ndx, charCode) {
                if (void 0 !== charCode) {
                    var keypress = new $.Event("keypress");
                    keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                    var lvp = getLastValidPosition(void 0, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : void 0, lvp);
                    if (!isTemplateMatch() || strict || opts.autoUnmask) {
                        var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                        result = keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, 
                        charCodes = "";
                    } else result = keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                    if (!strict && $.isFunction(opts.onBeforeWrite) && (result = opts.onBeforeWrite(keypress, getBuffer(), result.forwardPosition, opts), 
                    result && result.refreshFromBuffer)) {
                        var refresh = result.refreshFromBuffer;
                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer), 
                        resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret);
                    }
                }
            }), writeOut && writeBuffer(input, getBuffer(), document.activeElement === input ? seekNext(getLastValidPosition(0)) : void 0, new $.Event("checkval"));
        }
        function unmaskedvalue(input) {
            if (input && void 0 === input.inputmask) return input.value;
            var umValue = [], vps = getMaskSet().validPositions;
            for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
            var unmaskedValue = 0 === umValue.length ? null : (isRTL ? umValue.reverse() : umValue).join("");
            if (null !== unmaskedValue) {
                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                $.isFunction(opts.onUnMask) && (unmaskedValue = opts.onUnMask(bufferValue, unmaskedValue, opts) || unmaskedValue);
            }
            return unmaskedValue;
        }
        function caret(input, begin, end, notranslate) {
            function translatePosition(pos) {
                if (notranslate !== !0 && isRTL && "number" == typeof pos && (!opts.greedy || "" !== opts.placeholder)) {
                    var bffrLght = getBuffer().join("").length;
                    pos = bffrLght - pos;
                }
                return pos;
            }
            var range;
            if ("number" != typeof begin) return input.setSelectionRange ? (begin = input.selectionStart, 
            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
            (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) && (begin = range.startOffset, 
            end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), 
            end = begin + range.text.length), {
                begin: translatePosition(begin),
                end: translatePosition(end)
            };
            begin = translatePosition(begin), end = translatePosition(end), end = "number" == typeof end ? end : begin;
            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
            if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || opts.insertMode !== !1 || begin !== end || end++, 
            input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
                    var textNode = document.createTextNode("");
                    input.appendChild(textNode);
                }
                range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                range.collapse(!0);
                var sel = window.getSelection();
                sel.removeAllRanges(), sel.addRange(range);
            } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
            range.moveEnd("character", end), range.moveStart("character", begin), range.select());
        }
        function determineLastRequiredPosition(returnDefinition) {
            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0;
            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
            var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
            for (pos = bl - 1; pos > lvp && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
            return returnDefinition ? {
                l: bl,
                def: positions[bl] ? positions[bl].match : void 0
            } : bl;
        }
        function clearOptionalTail(buffer) {
            for (var rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), buffer;
        }
        function isComplete(buffer) {
            if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
            if ("*" === opts.repeat) return void 0;
            var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
            if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                complete = !0;
                for (var i = 0; aml >= i; i++) {
                    var test = getTestTemplate(i).match;
                    if (null !== test.fn && void 0 === getMaskSet().validPositions[i] && test.optionality !== !0 && test.optionalQuantifier !== !0 || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                        complete = !1;
                        break;
                    }
                }
            }
            return complete;
        }
        function patchValueProperty(npt) {
            function patchValhook(type) {
                if ($.valHooks && (void 0 === $.valHooks[type] || $.valHooks[type].inputmaskpatch !== !0)) {
                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                        return elem.value;
                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                        return elem.value = value, elem;
                    };
                    $.valHooks[type] = {
                        get: function(elem) {
                            if (elem.inputmask) {
                                if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                var result = valhookGet(elem);
                                return -1 !== getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) || opts.nullable !== !0 ? result : "";
                            }
                            return valhookGet(elem);
                        },
                        set: function(elem, value) {
                            var result, $elem = $(elem);
                            return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), 
                            result;
                        },
                        inputmaskpatch: !0
                    };
                }
            }
            function getter() {
                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || opts.nullable !== !0 ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
            }
            function setter(value) {
                valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
            }
            function installNativeValueSetFallback(npt) {
                EventRuler.on(npt, "mouseenter", function(event) {
                    var $input = $(this), input = this, value = input.inputmask._valueGet();
                    value !== getBuffer().join("") && $input.trigger("setvalue");
                });
            }
            var valueGet, valueSet;
            if (!npt.inputmask.__valueGet) {
                if (Object.getOwnPropertyDescriptor) {
                    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function(object) {
                        return object.__proto__;
                    } : function(object) {
                        return object.constructor.prototype;
                    });
                    var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                    valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                    valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                        get: getter,
                        set: setter,
                        configurable: !0
                    })) : "INPUT" !== npt.tagName && (valueGet = function() {
                        return this.textContent;
                    }, valueSet = function(value) {
                        this.textContent = value;
                    }, Object.defineProperty(npt, "value", {
                        get: getter,
                        set: setter,
                        configurable: !0
                    }));
                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                npt.__defineSetter__("value", setter));
                npt.inputmask.__valueGet = valueGet, npt.inputmask._valueGet = function(overruleRTL) {
                    return isRTL && overruleRTL !== !0 ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                }, npt.inputmask.__valueSet = valueSet, npt.inputmask._valueSet = function(value, overruleRTL) {
                    valueSet.call(this.el, null === value || void 0 === value ? "" : overruleRTL !== !0 && isRTL ? value.split("").reverse().join("") : value);
                }, void 0 === valueGet && (valueGet = function() {
                    return this.value;
                }, valueSet = function(value) {
                    this.value = value;
                }, patchValhook(npt.type), installNativeValueSetFallback(npt));
            }
        }
        function handleRemove(input, k, pos, strict) {
            function generalize() {
                if (opts.keepStatic) {
                    resetMaskSet(!0);
                    var lastAlt, validInputs = [], positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                    for (lastAlt = getLastValidPosition(); lastAlt >= 0; lastAlt--) {
                        var validPos = getMaskSet().validPositions[lastAlt];
                        if (validPos && (null != validPos.match.fn && validInputs.push(validPos.input), 
                        delete getMaskSet().validPositions[lastAlt], void 0 !== validPos.alternation && validPos.locator[validPos.alternation] === getTestTemplate(lastAlt).locator[validPos.alternation])) break;
                    }
                    if (lastAlt > -1) for (;validInputs.length > 0; ) {
                        getMaskSet().p = seekNext(getLastValidPosition());
                        var keypress = new $.Event("keypress");
                        keypress.which = validInputs.pop().charCodeAt(0), keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                    } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                }
            }
            if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
            isRTL)) {
                var pend = pos.end;
                pos.end = pos.begin, pos.begin = pend;
            }
            k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode === !1) ? (pos.begin = seekPrevious(pos.begin), 
            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end) ? pos.end + 1 : seekNext(pos.end) + 1, 
            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.end++), 
            stripValidPositions(pos.begin, pos.end, !1, strict), strict !== !0 && generalize();
            var lvp = getLastValidPosition(pos.begin);
            lvp < pos.begin ? (-1 === lvp && resetMaskSet(), getMaskSet().p = seekNext(lvp)) : strict !== !0 && (getMaskSet().p = pos.begin);
        }
        function keydownEvent(e) {
            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
            if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
            handleRemove(input, k, pos), writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
            input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                e.preventDefault();
                var caretPos = seekNext(getLastValidPosition());
                opts.insertMode || caretPos !== getMaskLength() || e.shiftKey || caretPos--, caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
            } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
            caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && e.altKey !== !0 ? (checkVal(input, !0, !1, undoValue.split("")), 
            $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? opts.tabThrough === !0 && k === Inputmask.keyCode.TAB ? (e.shiftKey === !0 ? (null === getTest(pos.begin).fn && (pos.begin = seekNext(pos.begin)), 
            pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
            pos.end = seekNext(pos.begin, !0), pos.end < getMaskLength() && pos.end--), pos.begin < getMaskLength() && (e.preventDefault(), 
            caret(input, pos.begin, pos.end))) : opts.insertMode !== !1 || e.shiftKey || (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
                var caretPos = caret(input);
                caret(input, caretPos.begin);
            }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
                var caretPos = caret(input);
                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskLength() ? pos.begin : pos.begin - 1));
            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
        }
        function keypressEvent(e, checkval, writeOut, strict, ndx) {
            var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
            if (!(checkval === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), 
            setTimeout(function() {
                $input.trigger("change");
            }, 0)), !0;
            if (k) {
                46 === k && e.shiftKey === !1 && "," === opts.radixPoint && (k = 44);
                var forwardPosition, pos = checkval ? {
                    begin: ndx,
                    end: ndx
                } : caret(input), c = String.fromCharCode(k);
                getMaskSet().writeOutBuffer = !0;
                var valResult = isValid(pos, c, strict);
                if (valResult !== !1) {
                    var p = valResult.pos;
                    if (resetMaskSet(!0), void 0 !== valResult.caret) forwardPosition = valResult.caret; else {
                        var vps = getMaskSet().validPositions;
                        forwardPosition = !opts.keepStatic && (void 0 !== vps[p + 1] && getTests(p + 1, vps[p].locator.slice(), p).length > 1 || void 0 !== vps[p].alternation) ? p + 1 : seekNext(p);
                    }
                    getMaskSet().p = forwardPosition;
                }
                if (writeOut !== !1) {
                    var self = this;
                    if (setTimeout(function() {
                        opts.onKeyValidation.call(self, k, valResult, opts);
                    }, 0), getMaskSet().writeOutBuffer && valResult !== !1) {
                        var buffer = getBuffer();
                        writeBuffer(input, buffer, opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== !0), 
                        checkval !== !0 && setTimeout(function() {
                            isComplete(buffer) === !0 && $input.trigger("complete");
                        }, 0);
                    }
                }
                if (opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask), e.preventDefault(), 
                checkval) return valResult.forwardPosition = forwardPosition, valResult;
            }
        }
        function pasteEvent(e) {
            var tempValue, input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
            isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
            var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
            valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
            valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
            isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), 
            window.clipboardData && window.clipboardData.getData ? inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret : ev.clipboardData && ev.clipboardData.getData && (inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret);
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
                if (pasteValue = opts.onBeforePaste(inputValue, opts), pasteValue === !1) return e.preventDefault();
                pasteValue || (pasteValue = inputValue);
            }
            return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
            writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, !0), isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
            e.preventDefault();
        }
        function inputFallBackEvent(e) {
            var input = this, inputValue = input.inputmask._valueGet();
            if (getBuffer().join("") !== inputValue) {
                var caretPos = caret(input);
                if (inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), ""), 
                iemobile) {
                    var inputChar = inputValue.replace(getBuffer().join(""), "");
                    if (1 === inputChar.length) {
                        var keypress = new $.Event("keypress");
                        return keypress.which = inputChar.charCodeAt(0), keypressEvent.call(input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1), 
                        !1;
                    }
                }
                if (caretPos.begin > inputValue.length && (caret(input, inputValue.length), caretPos = caret(input)), 
                getBuffer().length - inputValue.length !== 1 || inputValue.charAt(caretPos.begin) === getBuffer()[caretPos.begin] || inputValue.charAt(caretPos.begin + 1) === getBuffer()[caretPos.begin] || isMask(caretPos.begin)) {
                    for (var lvp = getLastValidPosition() + 1, bufferTemplate = getBuffer().slice(lvp).join(""); null === inputValue.match(Inputmask.escapeRegex(bufferTemplate) + "$"); ) bufferTemplate = bufferTemplate.slice(1);
                    inputValue = inputValue.replace(bufferTemplate, ""), inputValue = inputValue.split(""), 
                    checkVal(input, !0, !1, inputValue), isComplete(getBuffer()) === !0 && $(input).trigger("complete");
                } else e.keyCode = Inputmask.keyCode.BACKSPACE, keydownEvent.call(input, e);
                e.preventDefault();
            }
        }
        function setValueEvent(e) {
            var input = this, value = input.inputmask._valueGet();
            checkVal(input, !0, !1, ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(value, opts) || value : value).split("")), 
            undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
        }
        function focusEvent(e) {
            var input = this, nptValue = input.inputmask._valueGet();
            opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) ? input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : mouseEnter === !1 && caret(input, seekNext(getLastValidPosition())), 
            opts.positionCaretOnTab === !0 && setTimeout(function() {
                caret(input, seekNext(getLastValidPosition()));
            }, 0), undoValue = getBuffer().join("");
        }
        function mouseleaveEvent(e) {
            var input = this;
            if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
                var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
                nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                writeBuffer(input, buffer));
            }
        }
        function clickEvent(e) {
            function doRadixFocus(clickPos) {
                if (opts.radixFocus && "" !== opts.radixPoint) {
                    var vps = getMaskSet().validPositions;
                    if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
                        if (clickPos < seekNext(-1)) return !0;
                        var radixPos = $.inArray(opts.radixPoint, getBuffer());
                        if (-1 !== radixPos) {
                            for (var vp in vps) if (vp > radixPos && vps[vp].input !== getPlaceholder(vp)) return !1;
                            return !0;
                        }
                    }
                }
                return !1;
            }
            var input = this;
            setTimeout(function() {
                if (document.activeElement === input) {
                    var selectedCaret = caret(input);
                    if (selectedCaret.begin === selectedCaret.end) if (doRadixFocus(selectedCaret.begin)) caret(input, opts.numericInput ? seekNext($.inArray(opts.radixPoint, getBuffer())) : $.inArray(opts.radixPoint, getBuffer())); else {
                        var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
                        if (lastPosition > clickPosition) caret(input, isMask(clickPosition) || isMask(clickPosition - 1) ? clickPosition : seekNext(clickPosition)); else {
                            var placeholder = getPlaceholder(lastPosition);
                            ("" !== placeholder && getBuffer()[lastPosition] !== placeholder || !isMask(lastPosition, !0) && getTest(lastPosition).def === placeholder) && (lastPosition = seekNext(lastPosition)), 
                            caret(input, lastPosition);
                        }
                    }
                }
            }, 0);
        }
        function dblclickEvent(e) {
            var input = this;
            setTimeout(function() {
                caret(input, 0, seekNext(getLastValidPosition()));
            }, 0);
        }
        function cutEvent(e) {
            var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
            clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), 
            document.execCommand && document.execCommand("copy"), handleRemove(input, Inputmask.keyCode.DELETE, pos), 
            writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
            input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared"), 
            opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask);
        }
        function blurEvent(e) {
            var $input = $(this), input = this;
            if (input.inputmask) {
                var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                undoValue !== buffer.join("") && setTimeout(function() {
                    $input.trigger("change"), undoValue = buffer.join("");
                }, 0), "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                isComplete(buffer) === !1 && (setTimeout(function() {
                    $input.trigger("incomplete");
                }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                writeBuffer(input, buffer, void 0, e));
            }
        }
        function mouseenterEvent(e) {
            var input = this;
            mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
        }
        function submitEvent(e) {
            undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
            opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
            setTimeout(function() {
                writeBuffer(el, getBuffer());
            }, 0));
        }
        function resetEvent(e) {
            setTimeout(function() {
                $el.trigger("setvalue");
            }, 0);
        }
        function mask(elem) {
            if (el = elem, $el = $(el), opts.showTooltip && (el.title = opts.tooltip || getMaskSet().mask), 
            ("rtl" === el.dir || opts.rightAlign) && (el.style.textAlign = "right"), ("rtl" === el.dir || opts.numericInput) && (el.dir = "ltr", 
            el.removeAttribute("dir"), el.inputmask.isRTL = !0, isRTL = !0), EventRuler.off(el), 
            patchValueProperty(el), isElementTypeSupported(el, opts) && (EventRuler.on(el, "submit", submitEvent), 
            EventRuler.on(el, "reset", resetEvent), EventRuler.on(el, "mouseenter", mouseenterEvent), 
            EventRuler.on(el, "blur", blurEvent), EventRuler.on(el, "focus", focusEvent), EventRuler.on(el, "mouseleave", mouseleaveEvent), 
            EventRuler.on(el, "click", clickEvent), EventRuler.on(el, "dblclick", dblclickEvent), 
            EventRuler.on(el, "paste", pasteEvent), EventRuler.on(el, "dragdrop", pasteEvent), 
            EventRuler.on(el, "drop", pasteEvent), EventRuler.on(el, "cut", cutEvent), EventRuler.on(el, "complete", opts.oncomplete), 
            EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), 
            EventRuler.on(el, "keydown", keydownEvent), EventRuler.on(el, "keypress", keypressEvent), 
            EventRuler.on(el, "input", inputFallBackEvent)), EventRuler.on(el, "setvalue", setValueEvent), 
            "" !== el.inputmask._valueGet() || opts.clearMaskOnLostFocus === !1 || document.activeElement === el) {
                var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(el.inputmask._valueGet(), opts) || el.inputmask._valueGet() : el.inputmask._valueGet();
                checkVal(el, !0, !1, initialValue.split(""));
                var buffer = getBuffer().slice();
                undoValue = buffer.join(""), isComplete(buffer) === !1 && opts.clearIncomplete && resetMaskSet(), 
                opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), 
                writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
            }
        }
        var undoValue, el, $el, maxLength, valueBuffer, isRTL = !1, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !0, EventRuler = {
            on: function(input, eventName, eventHandler) {
                var ev = function(e) {
                    if (void 0 === this.inputmask && "FORM" !== this.nodeName) {
                        var imOpts = $.data(this, "_inputmask_opts");
                        imOpts ? new Inputmask(imOpts).mask(this) : EventRuler.off(this);
                    } else {
                        if ("setvalue" === e.type || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || opts.tabThrough === !1 && e.keyCode === Inputmask.keyCode.TAB))) {
                            switch (e.type) {
                              case "input":
                                if (skipInputEvent === !0) return skipInputEvent = !1, e.preventDefault();
                                break;

                              case "keydown":
                                skipKeyPressEvent = !1, skipInputEvent = !1;
                                break;

                              case "keypress":
                                if (skipKeyPressEvent === !0) return e.preventDefault();
                                skipKeyPressEvent = !0;
                                break;

                              case "click":
                                if (iemobile) {
                                    var that = this;
                                    return setTimeout(function() {
                                        eventHandler.apply(that, arguments);
                                    }, 0), !1;
                                }
                            }
                            var returnVal = eventHandler.apply(this, arguments);
                            return returnVal === !1 && (e.preventDefault(), e.stopPropagation()), returnVal;
                        }
                        e.preventDefault();
                    }
                };
                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
                -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null != input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
            },
            off: function(input, event) {
                if (input.inputmask && input.inputmask.events) {
                    var events;
                    event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, 
                    $.each(events, function(eventName, evArr) {
                        for (;evArr.length > 0; ) {
                            var ev = evArr.pop();
                            -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null != input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                        }
                        delete input.inputmask.events[eventName];
                    });
                }
            }
        };
        if (void 0 !== actionObj) switch (actionObj.action) {
          case "isComplete":
            return el = actionObj.el, isComplete(getBuffer());

          case "unmaskedvalue":
            return el = actionObj.el, void 0 !== el && void 0 !== el.inputmask ? (maskset = el.inputmask.maskset, 
            opts = el.inputmask.opts, isRTL = el.inputmask.isRTL) : (valueBuffer = actionObj.value, 
            opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(valueBuffer, opts) || valueBuffer : valueBuffer).split(""), 
            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite(void 0, getBuffer(), 0, opts)), 
            unmaskedvalue(el);

          case "mask":
            el = actionObj.el, maskset = el.inputmask.maskset, opts = el.inputmask.opts, isRTL = el.inputmask.isRTL, 
            undoValue = getBuffer().join(""), mask(el);
            break;

          case "format":
            return opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(actionObj.value, opts) || actionObj.value : actionObj.value).split(""), 
            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite(void 0, getBuffer(), 0, opts), 
            actionObj.metadata ? {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: maskScope({
                    action: "getmetadata"
                }, maskset, opts)
            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            opts.numericInput && (isRTL = !0), actionObj.value ? (valueBuffer = actionObj.value.split(""), 
            checkVal(void 0, !1, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

          case "getemptymask":
            return getBufferTemplate().join("");

          case "remove":
            el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
            el.inputmask._valueSet(unmaskedvalue(el)), EventRuler.off(el);
            var valueProperty;
            Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), 
            valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                get: el.inputmask.__valueGet,
                set: el.inputmask.__valueSet,
                configurable: !0
            })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
            el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0;
            break;

          case "getmetadata":
            if ($.isArray(maskset.metadata)) {
                for (var alternation, lvp = getLastValidPosition(void 0, !0), firstAlt = lvp; firstAlt >= 0; firstAlt--) if (getMaskSet().validPositions[firstAlt] && void 0 !== getMaskSet().validPositions[firstAlt].alternation) {
                    alternation = getMaskSet().validPositions[firstAlt].alternation;
                    break;
                }
                return void 0 !== alternation ? maskset.metadata[getMaskSet().validPositions[firstAlt].locator[alternation]] : [];
            }
            return maskset.metadata;
        }
    }
    Inputmask.prototype = {
        defaults: {
            placeholder: "_",
            optionalmarker: {
                start: "[",
                end: "]"
            },
            quantifiermarker: {
                start: "{",
                end: "}"
            },
            groupmarker: {
                start: "(",
                end: ")"
            },
            alternatormarker: "|",
            escapeChar: "\\",
            mask: null,
            oncomplete: $.noop,
            onincomplete: $.noop,
            oncleared: $.noop,
            repeat: 0,
            greedy: !0,
            autoUnmask: !1,
            removeMaskOnSubmit: !1,
            clearMaskOnLostFocus: !0,
            insertMode: !0,
            clearIncomplete: !1,
            aliases: {},
            alias: null,
            onKeyDown: $.noop,
            onBeforeMask: null,
            onBeforePaste: function(pastedValue, opts) {
                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(pastedValue, opts) : pastedValue;
            },
            onBeforeWrite: null,
            onUnMask: null,
            showMaskOnFocus: !0,
            showMaskOnHover: !0,
            onKeyValidation: $.noop,
            skipOptionalPartCharacter: " ",
            showTooltip: !1,
            tooltip: void 0,
            numericInput: !1,
            rightAlign: !1,
            undoOnEscape: !0,
            radixPoint: "",
            radixPointDefinitionSymbol: void 0,
            groupSeparator: "",
            radixFocus: !1,
            nojumps: !1,
            nojumpsThreshold: 0,
            keepStatic: null,
            positionCaretOnTab: !1,
            tabThrough: !1,
            supportsInputType: [ "text", "tel", "password" ],
            definitions: {
                "9": {
                    validator: "[0-9]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
                    cardinality: 1
                }
            },
            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 ],
            isComplete: null,
            canClearPosition: $.noop,
            postValidation: null,
            staticDefinitionSymbol: void 0,
            jitMasking: !1,
            nullable: !0
        },
        masksCache: {},
        mask: function(elems) {
            var that = this;
            return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
            elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                var scopedOpts = $.extend(!0, {}, that.opts);
                importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions));
                var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                void 0 !== maskset && (void 0 !== el.inputmask && el.inputmask.remove(), el.inputmask = new Inputmask(), 
                el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), 
                el.inputmask.el = el, el.inputmask.maskset = maskset, el.inputmask.isRTL = !1, $.data(el, "_inputmask_opts", scopedOpts), 
                maskScope({
                    action: "mask",
                    el: el
                }));
            }), elems && elems[0] ? elems[0].inputmask || this : this;
        },
        option: function(options, noremask) {
            return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.userOptions, options), 
            this.el && noremask !== !0 && this.mask(this.el), this) : void 0;
        },
        unmaskedvalue: function(value) {
            return maskScope({
                action: "unmaskedvalue",
                el: this.el,
                value: value
            }, this.el && this.el.inputmask ? this.el.inputmask.maskset : generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        remove: function() {
            return this.el ? (maskScope({
                action: "remove",
                el: this.el
            }), this.el.inputmask = void 0, this.el) : void 0;
        },
        getemptymask: function() {
            return maskScope({
                action: "getemptymask"
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        hasMaskedValue: function() {
            return !this.opts.autoUnmask;
        },
        isComplete: function() {
            return maskScope({
                action: "isComplete",
                el: this.el
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        getmetadata: function() {
            return maskScope({
                action: "getmetadata"
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        isValid: function(value) {
            return maskScope({
                action: "isValid",
                value: value
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        },
        format: function(value, metadata) {
            return maskScope({
                action: "format",
                value: value,
                metadata: metadata
            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
        }
    }, Inputmask.extendDefaults = function(options) {
        $.extend(!0, Inputmask.prototype.defaults, options);
    }, Inputmask.extendDefinitions = function(definition) {
        $.extend(!0, Inputmask.prototype.defaults.definitions, definition);
    }, Inputmask.extendAliases = function(alias) {
        $.extend(!0, Inputmask.prototype.defaults.aliases, alias);
    }, Inputmask.format = function(value, options, metadata) {
        return Inputmask(options).format(value, metadata);
    }, Inputmask.unmask = function(value, options) {
        return Inputmask(options).unmaskedvalue(value);
    }, Inputmask.isValid = function(value, options) {
        return Inputmask(options).isValid(value);
    }, Inputmask.remove = function(elems) {
        $.each(elems, function(ndx, el) {
            el.inputmask && el.inputmask.remove();
        });
    }, Inputmask.escapeRegex = function(str) {
        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    }, Inputmask.keyCode = {
        ALT: 18,
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        CAPS_LOCK: 20,
        COMMA: 188,
        COMMAND: 91,
        COMMAND_LEFT: 91,
        COMMAND_RIGHT: 93,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        MENU: 93,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        WINDOWS: 91,
        X: 88
    };
    var ua = navigator.userAgent, mobile = /mobile/i.test(ua), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile;
    /android.*safari.*/i.test(ua) && !iemobile;
    return window.Inputmask = Inputmask, Inputmask;
}(jQuery), function($, Inputmask) {
    return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
        var nptmask, input = this[0];
        if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
          case "unmaskedvalue":
            return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

          case "remove":
            return this.each(function() {
                this.inputmask && this.inputmask.remove();
            });

          case "getemptymask":
            return input && input.inputmask ? input.inputmask.getemptymask() : "";

          case "hasMaskedValue":
            return input && input.inputmask ? input.inputmask.hasMaskedValue() : !1;

          case "isComplete":
            return input && input.inputmask ? input.inputmask.isComplete() : !0;

          case "getmetadata":
            return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

          case "setvalue":
            $(input).val(options), input && void 0 !== input.inputmask && $(input).triggerHandler("setvalue");
            break;

          case "option":
            if ("string" != typeof options) return this.each(function() {
                return void 0 !== this.inputmask ? this.inputmask.option(options) : void 0;
            });
            if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
            break;

          default:
            return options.alias = fn, nptmask = new Inputmask(options), this.each(function() {
                nptmask.mask(this);
            });
        } else {
            if ("object" == typeof fn) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
                return void 0 !== this.inputmask ? this.inputmask.option(fn) : void nptmask.mask(this);
            }) : this.each(function() {
                nptmask.mask(this);
            });
            if (void 0 === fn) return this.each(function() {
                nptmask = new Inputmask(options), nptmask.mask(this);
            });
        }
    }), $.fn.inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendDefinitions({
        h: {
            validator: "[01][0-9]|2[0-3]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-2]",
                cardinality: 1
            } ]
        },
        s: {
            validator: "[0-5][0-9]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-5]",
                cardinality: 1
            } ]
        },
        d: {
            validator: "0[1-9]|[12][0-9]|3[01]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[0-3]",
                cardinality: 1
            } ]
        },
        m: {
            validator: "0[1-9]|1[012]",
            cardinality: 2,
            prevalidator: [ {
                validator: "[01]",
                cardinality: 1
            } ]
        },
        y: {
            validator: "(19|20)\\d{2}",
            cardinality: 4,
            prevalidator: [ {
                validator: "[12]",
                cardinality: 1
            }, {
                validator: "(19|20)",
                cardinality: 2
            }, {
                validator: "(19|20)\\d",
                cardinality: 3
            } ]
        }
    }), Inputmask.extendAliases({
        "dd/mm/yyyy": {
            mask: "1/2/y",
            placeholder: "dd/mm/yyyy",
            regex: {
                val1pre: new RegExp("[0-3]"),
                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
                }
            },
            leapday: "29/02/",
            separator: "/",
            yearrange: {
                minyear: 1900,
                maxyear: 2099
            },
            isInYearRange: function(chrs, minyear, maxyear) {
                if (isNaN(chrs)) return !1;
                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length))), enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                return (isNaN(enteredyear) ? !1 : enteredyear >= minyear && maxyear >= enteredyear) || (isNaN(enteredyear2) ? !1 : enteredyear2 >= minyear && maxyear >= enteredyear2);
            },
            determinebaseyear: function(minyear, maxyear, hint) {
                var currentyear = new Date().getFullYear();
                if (minyear > currentyear) return minyear;
                if (currentyear > maxyear) {
                    for (var maxYearPrefix = maxyear.toString().slice(0, 2), maxYearPostfix = maxyear.toString().slice(2, 4); maxYearPrefix + hint > maxyear; ) maxYearPrefix--;
                    var maxxYear = maxYearPrefix + maxYearPostfix;
                    return minyear > maxxYear ? minyear : maxxYear;
                }
                if (currentyear >= minyear && maxyear >= currentyear) {
                    for (var currentYearPrefix = currentyear.toString().slice(0, 2); currentYearPrefix + hint > maxyear; ) currentYearPrefix--;
                    var currentYearAndHint = currentYearPrefix + hint;
                    return minyear > currentYearAndHint ? minyear : currentYearAndHint;
                }
                return currentyear;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString()), 
                    $input.trigger("setvalue");
                }
            },
            getFrontValue: function(mask, buffer, opts) {
                for (var start = 0, length = 0, i = 0; i < mask.length && "2" !== mask.charAt(i); i++) {
                    var definition = opts.definitions[mask.charAt(i)];
                    definition ? (start += length, length = definition.cardinality) : length++;
                }
                return buffer.join("").substr(start, length);
            },
            definitions: {
                "1": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.regex.val1.test(chrs);
                        return strict || isValid || chrs.charAt(1) !== opts.separator && -1 === "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val1.test("0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", 
                        {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            pos: pos,
                            c: chrs.charAt(0)
                        });
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var pchrs = chrs;
                            isNaN(maskset.buffer[pos + 1]) || (pchrs += maskset.buffer[pos + 1]);
                            var isValid = 1 === pchrs.length ? opts.regex.val1pre.test(pchrs) : opts.regex.val1.test(pchrs);
                            if (!strict && !isValid) {
                                if (isValid = opts.regex.val1.test(chrs + "0")) return maskset.buffer[pos] = chrs, 
                                maskset.buffer[++pos] = "0", {
                                    pos: pos,
                                    c: "0"
                                };
                                if (isValid = opts.regex.val1.test("0" + chrs)) return maskset.buffer[pos] = "0", 
                                pos++, {
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 1
                    } ]
                },
                "2": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                        -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                        if (!strict && !isValid && (chrs.charAt(1) === opts.separator || -1 !== "-./".indexOf(chrs.charAt(1))) && (isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                        {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            pos: pos,
                            c: chrs.charAt(0)
                        };
                        if (opts.mask.indexOf("2") === opts.mask.length - 1 && isValid) {
                            var dayMonthValue = maskset.buffer.join("").substr(4, 4) + chrs;
                            if (dayMonthValue !== opts.leapday) return !0;
                            var year = parseInt(maskset.buffer.join("").substr(0, 4), 10);
                            return year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
                            var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                            -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                            var isValid = 1 === chrs.length ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
                            return strict || isValid || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                y: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                            var dayMonthValue = maskset.buffer.join("").substr(0, 6);
                            if (dayMonthValue !== opts.leapday) return !0;
                            var year = parseInt(chrs, 10);
                            return year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                        }
                        return !1;
                    },
                    cardinality: 4,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);
                                if (isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                {
                                    pos: pos
                                };
                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2), 
                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                maskset.buffer[pos++] = yearPrefix.charAt(1), {
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }, {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            if (!strict && !isValid) {
                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                                if (isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                {
                                    pos: pos
                                };
                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2), 
                                opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
                                    var dayMonthValue = maskset.buffer.join("").substr(0, 6);
                                    if (dayMonthValue !== opts.leapday) isValid = !0; else {
                                        var year = parseInt(chrs, 10);
                                        isValid = year % 4 === 0 ? year % 100 === 0 ? year % 400 === 0 ? !0 : !1 : !0 : !1;
                                    }
                                } else isValid = !1;
                                if (isValid) return maskset.buffer[pos - 1] = yearPrefix.charAt(0), maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                maskset.buffer[pos++] = chrs.charAt(0), {
                                    refreshFromBuffer: {
                                        start: pos - 3,
                                        end: pos
                                    },
                                    pos: pos
                                };
                            }
                            return isValid;
                        },
                        cardinality: 2
                    }, {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        },
                        cardinality: 3
                    } ]
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        "mm/dd/yyyy": {
            placeholder: "mm/dd/yyyy",
            alias: "dd/mm/yyyy",
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
                    $input.trigger("setvalue");
                }
            }
        },
        "yyyy/mm/dd": {
            mask: "y/1/2",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            leapday: "/02/29",
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()), 
                    $input.trigger("setvalue");
                }
            }
        },
        "dd.mm.yyyy": {
            mask: "1.2.y",
            placeholder: "dd.mm.yyyy",
            leapday: "29.02.",
            separator: ".",
            alias: "dd/mm/yyyy"
        },
        "dd-mm-yyyy": {
            mask: "1-2-y",
            placeholder: "dd-mm-yyyy",
            leapday: "29-02-",
            separator: "-",
            alias: "dd/mm/yyyy"
        },
        "mm.dd.yyyy": {
            mask: "1.2.y",
            placeholder: "mm.dd.yyyy",
            leapday: "02.29.",
            separator: ".",
            alias: "mm/dd/yyyy"
        },
        "mm-dd-yyyy": {
            mask: "1-2-y",
            placeholder: "mm-dd-yyyy",
            leapday: "02-29-",
            separator: "-",
            alias: "mm/dd/yyyy"
        },
        "yyyy.mm.dd": {
            mask: "y.1.2",
            placeholder: "yyyy.mm.dd",
            leapday: ".02.29",
            separator: ".",
            alias: "yyyy/mm/dd"
        },
        "yyyy-mm-dd": {
            mask: "y-1-2",
            placeholder: "yyyy-mm-dd",
            leapday: "-02-29",
            separator: "-",
            alias: "yyyy/mm/dd"
        },
        datetime: {
            mask: "1/2/y h:s",
            placeholder: "dd/mm/yyyy hh:mm",
            alias: "dd/mm/yyyy",
            regex: {
                hrspre: new RegExp("[012]"),
                hrs24: new RegExp("2[0-4]|1[3-9]"),
                hrs: new RegExp("[01][0-9]|2[0-4]"),
                ampm: new RegExp("^[a|p|A|P][m|M]"),
                mspre: new RegExp("[0-5]"),
                ms: new RegExp("[0-5][0-9]")
            },
            timeseparator: ":",
            hourFormat: "24",
            definitions: {
                h: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        if ("24" === opts.hourFormat && 24 === parseInt(chrs, 10)) return maskset.buffer[pos - 1] = "0", 
                        maskset.buffer[pos] = "0", {
                            refreshFromBuffer: {
                                start: pos - 1,
                                end: pos
                            },
                            c: "0"
                        };
                        var isValid = opts.regex.hrs.test(chrs);
                        if (!strict && !isValid && (chrs.charAt(1) === opts.timeseparator || -1 !== "-.:".indexOf(chrs.charAt(1))) && (isValid = opts.regex.hrs.test("0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                        maskset.buffer[pos] = chrs.charAt(0), pos++, {
                            refreshFromBuffer: {
                                start: pos - 2,
                                end: pos
                            },
                            pos: pos,
                            c: opts.timeseparator
                        };
                        if (isValid && "24" !== opts.hourFormat && opts.regex.hrs24.test(chrs)) {
                            var tmp = parseInt(chrs, 10);
                            return 24 === tmp ? (maskset.buffer[pos + 5] = "a", maskset.buffer[pos + 6] = "m") : (maskset.buffer[pos + 5] = "p", 
                            maskset.buffer[pos + 6] = "m"), tmp -= 12, 10 > tmp ? (maskset.buffer[pos] = tmp.toString(), 
                            maskset.buffer[pos - 1] = "0") : (maskset.buffer[pos] = tmp.toString().charAt(1), 
                            maskset.buffer[pos - 1] = tmp.toString().charAt(0)), {
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos + 6
                                },
                                c: maskset.buffer[pos]
                            };
                        }
                        return isValid;
                    },
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.hrspre.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.hrs.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                s: {
                    validator: "[0-5][0-9]",
                    cardinality: 2,
                    prevalidator: [ {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.mspre.test(chrs);
                            return strict || isValid || !(isValid = opts.regex.ms.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                            pos++, {
                                pos: pos
                            });
                        },
                        cardinality: 1
                    } ]
                },
                t: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return opts.regex.ampm.test(chrs + "m");
                    },
                    casing: "lower",
                    cardinality: 1
                }
            },
            insertMode: !1,
            autoUnmask: !1
        },
        datetime12: {
            mask: "1/2/y h:s t\\m",
            placeholder: "dd/mm/yyyy hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "mm/dd/yyyy hh:mm xm": {
            mask: "1/2/y h:s t\\m",
            placeholder: "mm/dd/yyyy hh:mm xm",
            alias: "datetime12",
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            leapday: "02/29/",
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                    var today = new Date();
                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
                    $input.trigger("setvalue");
                }
            }
        },
        "hh:mm t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "h:s t": {
            mask: "h:s t\\m",
            placeholder: "hh:mm xm",
            alias: "datetime",
            hourFormat: "12"
        },
        "hh:mm:ss": {
            mask: "h:s:s",
            placeholder: "hh:mm:ss",
            alias: "datetime",
            autoUnmask: !1
        },
        "hh:mm": {
            mask: "h:s",
            placeholder: "hh:mm",
            alias: "datetime",
            autoUnmask: !1
        },
        date: {
            alias: "dd/mm/yyyy"
        },
        "mm/yyyy": {
            mask: "1/y",
            placeholder: "mm/yyyy",
            leapday: "donotuse",
            separator: "/",
            alias: "mm/dd/yyyy"
        },
        shamsi: {
            regex: {
                val2pre: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "[0-3])");
                },
                val2: function(separator) {
                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + escapedSeparator + "30)|((0[1-6])" + escapedSeparator + "31)");
                },
                val1pre: new RegExp("[01]"),
                val1: new RegExp("0[1-9]|1[012]")
            },
            yearrange: {
                minyear: 1300,
                maxyear: 1499
            },
            mask: "y/1/2",
            leapday: "/12/30",
            placeholder: "yyyy/mm/dd",
            alias: "mm/dd/yyyy",
            clearIncomplete: !0
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendDefinitions({
        A: {
            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        },
        "&": {
            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
            cardinality: 1,
            casing: "upper"
        },
        "#": {
            validator: "[0-9A-Fa-f]",
            cardinality: 1,
            casing: "upper"
        }
    }), Inputmask.extendAliases({
        url: {
            definitions: {
                i: {
                    validator: ".",
                    cardinality: 1
                }
            },
            mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
            insertMode: !1,
            autoUnmask: !1
        },
        ip: {
            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
            definitions: {
                i: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
                        chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
                        new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                    },
                    cardinality: 1
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            }
        },
        email: {
            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
            greedy: !1,
            onBeforePaste: function(pastedValue, opts) {
                return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
            },
            definitions: {
                "*": {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                    cardinality: 1,
                    casing: "lower"
                },
                "-": {
                    validator: "[0-9A-Za-z-]",
                    cardinality: 1,
                    casing: "lower"
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                return maskedValue;
            }
        },
        mac: {
            mask: "##:##:##:##:##:##"
        },
        vin: {
            mask: "V{13}9{4}",
            definitions: {
                V: {
                    validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                    cardinality: 1,
                    casing: "upper"
                }
            },
            clearIncomplete: !0,
            autoUnmask: !0
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendAliases({
        numeric: {
            mask: function(opts) {
                function autoEscape(txt) {
                    for (var escapedTxt = "", i = 0; i < txt.length; i++) escapedTxt += opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? "\\" + txt.charAt(i) : txt.charAt(i);
                    return escapedTxt;
                }
                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
                opts.autoGroup && ("string" == typeof opts.groupSize && isFinite(opts.groupSize) && (opts.groupSize = parseInt(opts.groupSize)), 
                isFinite(opts.integerDigits))) {
                    var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                    opts.integerDigits = parseInt(opts.integerDigits) + (0 === mod ? seps - 1 : seps), 
                    opts.integerDigits < 1 && (opts.integerDigits = "*");
                }
                opts.placeholder.length > 1 && (opts.placeholder = opts.placeholder.charAt(0)), 
                opts.radixFocus = opts.radixFocus && "" !== opts.placeholder && opts.integerOptional === !0, 
                opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
                opts.numericInput === !0 && (opts.radixFocus = !1, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), 
                opts.decimalProtect = !1);
                var mask = autoEscape(opts.prefix);
                return mask += "[+]", mask += opts.integerOptional === !0 ? "~{1," + opts.integerDigits + "}" : "~{" + opts.integerDigits + "}", 
                void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (opts.decimalProtect && (opts.radixPointDefinitionSymbol = ":"), 
                mask += opts.digitsOptional ? "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]" : (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}"), 
                mask += "[-]", mask += autoEscape(opts.suffix), opts.greedy = !1, null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, "."))), 
                null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, "."))), 
                mask;
            },
            placeholder: "",
            greedy: !1,
            digits: "*",
            digitsOptional: !0,
            radixPoint: ".",
            radixFocus: !0,
            groupSize: 3,
            groupSeparator: "",
            autoGroup: !1,
            allowPlus: !0,
            allowMinus: !0,
            negationSymbol: {
                front: "-",
                back: ""
            },
            integerDigits: "+",
            integerOptional: !0,
            prefix: "",
            suffix: "",
            rightAlign: !0,
            decimalProtect: !0,
            min: null,
            max: null,
            step: 1,
            insertMode: !0,
            autoUnmask: !1,
            unmaskAsNumber: !1,
            postFormat: function(buffer, pos, opts) {
                opts.numericInput === !0 && (buffer = buffer.reverse(), isFinite(pos) && (pos = buffer.join("").length - pos - 1));
                var i, l, suffixStripped = !1;
                buffer.length >= opts.suffix.length && buffer.join("").indexOf(opts.suffix) === buffer.length - opts.suffix.length && (buffer.length = buffer.length - opts.suffix.length, 
                suffixStripped = !0), pos = pos >= buffer.length ? buffer.length - 1 : pos < opts.prefix.length ? opts.prefix.length : pos;
                var needsRefresh = !1, charAtPos = buffer[pos], cbuf = buffer.slice();
                charAtPos === opts.groupSeparator && (cbuf.splice(pos--, 1), charAtPos = cbuf[pos]), 
                charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && (cbuf[pos] = "?");
                var bufVal = cbuf.join(""), bufValOrigin = bufVal;
                if (bufVal.length > 0 && opts.autoGroup || -1 !== bufVal.indexOf(opts.groupSeparator)) {
                    var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
                    needsRefresh = 0 === bufVal.indexOf(opts.groupSeparator), bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
                    var radixSplit = bufVal.split(opts.radixPoint);
                    if (bufVal = "" === opts.radixPoint ? bufVal : radixSplit[0], bufVal !== opts.prefix + "?0" && bufVal.length >= opts.groupSize + opts.prefix.length) for (var reg = new RegExp("([-+]?[\\d?]+)([\\d?]{" + opts.groupSize + "})"); reg.test(bufVal) && "" !== opts.groupSeparator; ) bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2"), 
                    bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
                    "" !== opts.radixPoint && radixSplit.length > 1 && (bufVal += opts.radixPoint + radixSplit[1]);
                }
                for (needsRefresh = bufValOrigin !== bufVal, buffer.length = bufVal.length, i = 0, 
                l = bufVal.length; l > i; i++) buffer[i] = bufVal.charAt(i);
                var newPos = $.inArray("?", buffer);
                if (-1 === newPos && (newPos = $.inArray(charAtPos, buffer)), buffer[newPos] = charAtPos, 
                !needsRefresh && suffixStripped) for (i = 0, l = opts.suffix.length; l > i; i++) buffer.push(opts.suffix.charAt(i));
                return newPos = opts.numericInput && isFinite(pos) ? buffer.join("").length - newPos - 1 : newPos, 
                opts.numericInput && (buffer = buffer.reverse(), $.inArray(opts.radixPoint, buffer) < newPos && buffer.join("").length - opts.suffix.length !== newPos && (newPos -= 1)), 
                {
                    pos: newPos,
                    refreshFromBuffer: needsRefresh,
                    buffer: buffer
                };
            },
            onBeforeWrite: function(e, buffer, caretPos, opts) {
                var rslt;
                if (e && ("blur" === e.type || "checkval" === e.type || "keydown" === e.type)) {
                    var maskedValue = opts.numericInput ? buffer.slice().reverse().join("") : buffer.join(""), processValue = maskedValue.replace(opts.prefix, "");
                    processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    "," === opts.radixPoint && (processValue = processValue.replace(opts.radixPoint, "."));
                    var isNegative = processValue.match(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"));
                    if (isNegative = null !== isNegative && 1 === isNegative.length, processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    isNaN(opts.placeholder) && (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "")), 
                    processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue, 
                    "" !== processValue && isFinite(processValue)) {
                        var floatValue = parseFloat(processValue), signedFloatValue = isNegative ? -1 * floatValue : floatValue;
                        if (null !== opts.min && isFinite(opts.min) && signedFloatValue < parseFloat(opts.min) ? (floatValue = Math.abs(opts.min), 
                        isNegative = opts.min < 0, maskedValue = void 0) : null !== opts.max && isFinite(opts.max) && signedFloatValue > parseFloat(opts.max) && (floatValue = Math.abs(opts.max), 
                        isNegative = opts.max < 0, maskedValue = void 0), processValue = floatValue.toString().replace(".", opts.radixPoint).split(""), 
                        isFinite(opts.digits)) {
                            var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
                            -1 === radixPosition && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
                            for (var i = 1; i <= opts.digits; i++) opts.digitsOptional || void 0 !== processValue[radixPosition + i] && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? -1 !== rpb && void 0 !== maskedValue[rpb + i] && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = "0";
                            processValue[processValue.length - 1] === opts.radixPoint && delete processValue[processValue.length - 1];
                        }
                        if (floatValue.toString() !== processValue && floatValue.toString() + "." !== processValue || isNegative) return !isNegative || 0 === floatValue && "blur" === e.type || (processValue.unshift(opts.negationSymbol.front), 
                        processValue.push(opts.negationSymbol.back)), processValue = (opts.prefix + processValue.join("")).split(""), 
                        opts.numericInput && (processValue = processValue.reverse()), rslt = opts.postFormat(processValue, opts.numericInput ? caretPos : caretPos - 1, opts), 
                        rslt.buffer && (rslt.refreshFromBuffer = rslt.buffer.join("") !== buffer.join("")), 
                        rslt;
                    }
                }
                return opts.autoGroup ? (rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : caretPos - 1, opts), 
                rslt.caret = caretPos <= opts.prefix.length ? rslt.pos : rslt.pos + 1, rslt) : void 0;
            },
            regex: {
                integerPart: function(opts) {
                    return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
                },
                integerNPart: function(opts) {
                    return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
                }
            },
            signHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) {
                    var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (matchRslt && matchRslt[0].length > 0) return maskset.buffer[matchRslt.index] === ("-" === chrs ? "+" : opts.negationSymbol.front) ? "-" === chrs ? "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        remove: matchRslt.index,
                        caret: pos,
                        insert: {
                            pos: maskset.buffer.length - opts.suffix.length - 1,
                            c: opts.negationSymbol.back
                        }
                    } : {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        remove: matchRslt.index,
                        caret: pos
                    } : "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: "+",
                        remove: [ matchRslt.index, maskset.buffer.length - opts.suffix.length - 1 ],
                        caret: pos
                    } : {
                        pos: matchRslt.index,
                        c: "+",
                        remove: matchRslt.index,
                        caret: pos
                    } : maskset.buffer[matchRslt.index] === ("-" === chrs ? opts.negationSymbol.front : "+") ? "-" === chrs && "" !== opts.negationSymbol.back ? {
                        remove: [ matchRslt.index, maskset.buffer.length - opts.suffix.length - 1 ],
                        caret: pos - 1
                    } : {
                        remove: matchRslt.index,
                        caret: pos - 1
                    } : "-" === chrs ? "" !== opts.negationSymbol.back ? {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        caret: pos + 1,
                        insert: {
                            pos: maskset.buffer.length - opts.suffix.length,
                            c: opts.negationSymbol.back
                        }
                    } : {
                        pos: matchRslt.index,
                        c: opts.negationSymbol.front,
                        caret: pos + 1
                    } : {
                        pos: matchRslt.index,
                        c: chrs,
                        caret: pos + 1
                    };
                }
                return !1;
            },
            radixHandler: function(chrs, maskset, pos, strict, opts) {
                if (!strict && opts.numericInput !== !0 && chrs === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                    var radixPos = $.inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));
                    if (-1 !== radixPos && maskset.validPositions[radixPos]) return maskset.validPositions[radixPos - 1] ? {
                        caret: radixPos + 1
                    } : {
                        pos: integerValue.index,
                        c: integerValue[0],
                        caret: radixPos + 1
                    };
                    if (!integerValue || "0" === integerValue[0] && integerValue.index + 1 !== pos) return maskset.buffer[integerValue ? integerValue.index : pos] = "0", 
                    {
                        pos: (integerValue ? integerValue.index : pos) + 1,
                        c: opts.radixPoint
                    };
                }
                return !1;
            },
            leadingZeroHandler: function(chrs, maskset, pos, strict, opts, isSelection) {
                if (!strict) if (opts.numericInput === !0) {
                    var buffer = maskset.buffer.slice("").reverse(), char = buffer[opts.prefix.length];
                    if ("0" === char && void 0 === maskset.validPositions[pos - 1]) return {
                        pos: pos,
                        remove: buffer.length - opts.prefix.length - 1
                    };
                } else {
                    var radixPosition = $.inArray(opts.radixPoint, maskset.buffer), matchRslt = maskset.buffer.slice(0, -1 !== radixPosition ? radixPosition : void 0).join("").match(opts.regex.integerNPart(opts));
                    if (matchRslt && (-1 === radixPosition || radixPosition >= pos)) {
                        var decimalPart = -1 === radixPosition ? 0 : parseInt(maskset.buffer.slice(radixPosition + 1).join(""));
                        if (0 === matchRslt[0].indexOf("" !== opts.placeholder ? opts.placeholder.charAt(0) : "0") && (matchRslt.index + 1 === pos || isSelection !== !0 && 0 === decimalPart)) return maskset.buffer.splice(matchRslt.index, 1), 
                        {
                            pos: matchRslt.index,
                            remove: matchRslt.index
                        };
                        if ("0" === chrs && pos <= matchRslt.index && matchRslt[0] !== opts.groupSeparator) return !1;
                    }
                }
                return !0;
            },
            definitions: {
                "~": {
                    validator: function(chrs, maskset, pos, strict, opts, isSelection) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid && (isValid = opts.radixHandler(chrs, maskset, pos, strict, opts), 
                        !isValid && (isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs), 
                        isValid === !0 && (isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts, isSelection), 
                        isValid === !0)))) {
                            var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
                            isValid = -1 !== radixPosition && (opts.digitsOptional === !1 || maskset.validPositions[pos]) && opts.numericInput !== !0 && pos > radixPosition && !strict ? {
                                pos: pos,
                                remove: pos
                            } : {
                                pos: pos
                            };
                        }
                        return isValid;
                    },
                    cardinality: 1
                },
                "+": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        return !isValid && (strict && opts.allowMinus && chrs === opts.negationSymbol.front || opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) && (isValid = strict || "-" !== chrs ? !0 : "" !== opts.negationSymbol.back ? {
                            pos: pos,
                            c: "-" === chrs ? opts.negationSymbol.front : "+",
                            caret: pos + 1,
                            insert: {
                                pos: maskset.buffer.length,
                                c: opts.negationSymbol.back
                            }
                        } : {
                            pos: pos,
                            c: "-" === chrs ? opts.negationSymbol.front : "+",
                            caret: pos + 1
                        }), isValid;
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                "-": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        return !isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back && (isValid = !0), 
                        isValid;
                    },
                    cardinality: 1,
                    placeholder: ""
                },
                ":": {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
                        if (!isValid) {
                            var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
                            isValid = new RegExp(radix).test(chrs), isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
                                caret: pos + 1
                            });
                        }
                        return isValid ? {
                            c: opts.radixPoint
                        } : isValid;
                    },
                    cardinality: 1,
                    placeholder: function(opts) {
                        return opts.radixPoint;
                    }
                }
            },
            onUnMask: function(maskedValue, unmaskedValue, opts) {
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
                Number(processValue)) : processValue;
            },
            isComplete: function(buffer, opts) {
                var maskedValue = buffer.join(""), bufClone = buffer.slice();
                if (opts.postFormat(bufClone, 0, opts), bufClone.join("") !== maskedValue) return !1;
                var processValue = maskedValue.replace(opts.prefix, "");
                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                "," === opts.radixPoint && (processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), 
                isFinite(processValue);
            },
            onBeforeMask: function(initialValue, opts) {
                if ("" !== opts.radixPoint && isFinite(initialValue)) initialValue = initialValue.toString().replace(".", opts.radixPoint); else {
                    var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                    dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
                    initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, ""), 
                    initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "") : initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                }
                if (0 === opts.digits && (-1 !== initialValue.indexOf(".") ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : -1 !== initialValue.indexOf(",") && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
                "" !== opts.radixPoint && isFinite(opts.digits) && -1 !== initialValue.indexOf(opts.radixPoint)) {
                    var valueParts = initialValue.split(opts.radixPoint), decPart = valueParts[1].match(new RegExp("\\d*"))[0];
                    if (parseInt(opts.digits) < decPart.toString().length) {
                        var digitsFactor = Math.pow(10, parseInt(opts.digits));
                        initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), "."), 
                        initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor, 
                        initialValue = initialValue.toString().replace(".", opts.radixPoint);
                    }
                }
                return initialValue.toString();
            },
            canClearPosition: function(maskset, position, lvp, strict, opts) {
                var positionInput = maskset.validPositions[position].input, canClear = positionInput !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && opts.decimalProtect === !1 || isFinite(positionInput) || position === lvp || positionInput === opts.groupSeparator || positionInput === opts.negationSymbol.front || positionInput === opts.negationSymbol.back;
                return canClear;
            },
            onKeyDown: function(e, buffer, caretPos, opts) {
                var $input = $(this);
                if (e.ctrlKey) switch (e.keyCode) {
                  case Inputmask.keyCode.UP:
                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue");
                    break;

                  case Inputmask.keyCode.DOWN:
                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue");
                }
            }
        },
        currency: {
            prefix: "$ ",
            groupSeparator: ",",
            alias: "numeric",
            placeholder: "0",
            autoGroup: !0,
            digits: 2,
            digitsOptional: !1,
            clearMaskOnLostFocus: !1
        },
        decimal: {
            alias: "numeric"
        },
        integer: {
            alias: "numeric",
            digits: 0,
            radixPoint: ""
        },
        percentage: {
            alias: "numeric",
            digits: 2,
            radixPoint: ".",
            placeholder: "0",
            autoGroup: !1,
            min: 0,
            max: 100,
            suffix: " %",
            allowPlus: !1,
            allowMinus: !1
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendAliases({
        phone: {
            url: "phone-codes/phone-codes.js",
            countrycode: "",
            phoneCodeCache: {},
            mask: function(opts) {
                if (void 0 === opts.phoneCodeCache[opts.url]) {
                    var maskList = [];
                    opts.definitions["#"] = opts.definitions[9], $.ajax({
                        url: opts.url,
                        async: !1,
                        type: "get",
                        dataType: "json",
                        success: function(response) {
                            maskList = response;
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                            alert(thrownError + " - " + opts.url);
                        }
                    }), opts.phoneCodeCache[opts.url] = maskList.sort(function(a, b) {
                        return (a.mask || a) < (b.mask || b) ? -1 : 1;
                    });
                }
                return opts.phoneCodeCache[opts.url];
            },
            keepStatic: !1,
            nojumps: !0,
            nojumpsThreshold: 1,
            onBeforeMask: function(value, opts) {
                var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                return (processedValue.indexOf(opts.countrycode) > 1 || -1 === processedValue.indexOf(opts.countrycode)) && (processedValue = "+" + opts.countrycode + processedValue), 
                processedValue;
            }
        },
        phonebe: {
            alias: "phone",
            url: "phone-codes/phone-be.js",
            countrycode: "32",
            nojumpsThreshold: 4
        }
    }), Inputmask;
}(jQuery, Inputmask), function($, Inputmask) {
    return Inputmask.extendAliases({
        Regex: {
            mask: "r",
            greedy: !1,
            repeat: "*",
            regex: null,
            regexTokens: null,
            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            quantifierFilter: /[0-9]+[^,]/,
            isComplete: function(buffer, opts) {
                return new RegExp(opts.regex).test(buffer.join(""));
            },
            definitions: {
                r: {
                    validator: function(chrs, maskset, pos, strict, opts) {
                        function RegexToken(isGroup, isQuantifier) {
                            this.matches = [], this.isGroup = isGroup || !1, this.isQuantifier = isQuantifier || !1, 
                            this.quantifier = {
                                min: 1,
                                max: 1
                            }, this.repeaterPart = void 0;
                        }
                        function analyseRegex() {
                            var match, m, currentToken = new RegexToken(), opengroups = [];
                            for (opts.regexTokens = []; match = opts.tokenizer.exec(opts.regex); ) switch (m = match[0], 
                            m.charAt(0)) {
                              case "(":
                                opengroups.push(new RegexToken(!0));
                                break;

                              case ")":
                                groupToken = opengroups.pop(), opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(groupToken) : currentToken.matches.push(groupToken);
                                break;

                              case "{":
                              case "+":
                              case "*":
                                var quantifierToken = new RegexToken(!1, !0);
                                m = m.replace(/[{}]/g, "");
                                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                                if (quantifierToken.quantifier = {
                                    min: mq0,
                                    max: mq1
                                }, opengroups.length > 0) {
                                    var matches = opengroups[opengroups.length - 1].matches;
                                    match = matches.pop(), match.isGroup || (groupToken = new RegexToken(!0), groupToken.matches.push(match), 
                                    match = groupToken), matches.push(match), matches.push(quantifierToken);
                                } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new RegexToken(!0), 
                                groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
                                currentToken.matches.push(quantifierToken);
                                break;

                              default:
                                opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(m) : currentToken.matches.push(m);
                            }
                            currentToken.matches.length > 0 && opts.regexTokens.push(currentToken);
                        }
                        function validateRegexToken(token, fromGroup) {
                            var isvalid = !1;
                            fromGroup && (regexPart += "(", openGroupCount++);
                            for (var mndx = 0; mndx < token.matches.length; mndx++) {
                                var matchToken = token.matches[mndx];
                                if (matchToken.isGroup === !0) isvalid = validateRegexToken(matchToken, !0); else if (matchToken.isQuantifier === !0) {
                                    var crrntndx = $.inArray(matchToken, token.matches), matchGroup = token.matches[crrntndx - 1], regexPartBak = regexPart;
                                    if (isNaN(matchToken.quantifier.max)) {
                                        for (;matchToken.repeaterPart && matchToken.repeaterPart !== regexPart && matchToken.repeaterPart.length > regexPart.length && !(isvalid = validateRegexToken(matchGroup, !0)); ) ;
                                        isvalid = isvalid || validateRegexToken(matchGroup, !0), isvalid && (matchToken.repeaterPart = regexPart), 
                                        regexPart = regexPartBak + matchToken.quantifier.max;
                                    } else {
                                        for (var i = 0, qm = matchToken.quantifier.max - 1; qm > i && !(isvalid = validateRegexToken(matchGroup, !0)); i++) ;
                                        regexPart = regexPartBak + "{" + matchToken.quantifier.min + "," + matchToken.quantifier.max + "}";
                                    }
                                } else if (void 0 !== matchToken.matches) for (var k = 0; k < matchToken.length && !(isvalid = validateRegexToken(matchToken[k], fromGroup)); k++) ; else {
                                    var testExp;
                                    if ("[" == matchToken.charAt(0)) {
                                        testExp = regexPart, testExp += matchToken;
                                        for (var j = 0; openGroupCount > j; j++) testExp += ")";
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        isvalid = exp.test(bufferStr);
                                    } else for (var l = 0, tl = matchToken.length; tl > l; l++) if ("\\" !== matchToken.charAt(l)) {
                                        testExp = regexPart, testExp += matchToken.substr(0, l + 1), testExp = testExp.replace(/\|$/, "");
                                        for (var j = 0; openGroupCount > j; j++) testExp += ")";
                                        var exp = new RegExp("^(" + testExp + ")$");
                                        if (isvalid = exp.test(bufferStr)) break;
                                    }
                                    regexPart += matchToken;
                                }
                                if (isvalid) break;
                            }
                            return fromGroup && (regexPart += ")", openGroupCount--), isvalid;
                        }
                        var bufferStr, groupToken, cbuffer = maskset.buffer.slice(), regexPart = "", isValid = !1, openGroupCount = 0;
                        null === opts.regexTokens && analyseRegex(), cbuffer.splice(pos, 0, chrs), bufferStr = cbuffer.join("");
                        for (var i = 0; i < opts.regexTokens.length; i++) {
                            var regexToken = opts.regexTokens[i];
                            if (isValid = validateRegexToken(regexToken, regexToken.isGroup)) break;
                        }
                        return isValid;
                    },
                    cardinality: 1
                }
            }
        }
    }), Inputmask;
}(jQuery, Inputmask);

;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Meta info, accessible in the global scope unless you use AMD option.
 */

require.loader = 'component';

/**
 * Internal helper object, contains a sorting function for semantiv versioning
 */
require.helper = {};
require.helper.semVerSort = function(a, b) {
  var aArray = a.version.split('.');
  var bArray = b.version.split('.');
  for (var i=0; i<aArray.length; ++i) {
    var aInt = parseInt(aArray[i], 10);
    var bInt = parseInt(bArray[i], 10);
    if (aInt === bInt) {
      var aLex = aArray[i].substr((""+aInt).length);
      var bLex = bArray[i].substr((""+bInt).length);
      if (aLex === '' && bLex !== '') return 1;
      if (aLex !== '' && bLex === '') return -1;
      if (aLex !== '' && bLex !== '') return aLex > bLex ? 1 : -1;
      continue;
    } else if (aInt > bInt) {
      return 1;
    } else {
      return -1;
    }
  }
  return 0;
}

/**
 * Find and require a module which name starts with the provided name.
 * If multiple modules exists, the highest semver is used. 
 * This function can only be used for remote dependencies.

 * @param {String} name - module name: `user~repo`
 * @param {Boolean} returnPath - returns the canonical require path if true, 
 *                               otherwise it returns the epxorted module
 */
require.latest = function (name, returnPath) {
  function showError(name) {
    throw new Error('failed to find latest module of "' + name + '"');
  }
  // only remotes with semvers, ignore local files conataining a '/'
  var versionRegexp = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
  var remoteRegexp = /(.*)~(.*)/;
  if (!remoteRegexp.test(name)) showError(name);
  var moduleNames = Object.keys(require.modules);
  var semVerCandidates = [];
  var otherCandidates = []; // for instance: name of the git branch
  for (var i=0; i<moduleNames.length; i++) {
    var moduleName = moduleNames[i];
    if (new RegExp(name + '@').test(moduleName)) {
        var version = moduleName.substr(name.length+1);
        var semVerMatch = versionRegexp.exec(moduleName);
        if (semVerMatch != null) {
          semVerCandidates.push({version: version, name: moduleName});
        } else {
          otherCandidates.push({version: version, name: moduleName});
        } 
    }
  }
  if (semVerCandidates.concat(otherCandidates).length === 0) {
    showError(name);
  }
  if (semVerCandidates.length > 0) {
    var module = semVerCandidates.sort(require.helper.semVerSort).pop().name;
    if (returnPath === true) {
      return module;
    }
    return require(module);
  }
  // if the build contains more than one branch of the same module
  // you should not use this funciton
  var module = otherCandidates.sort(function(a, b) {return a.name > b.name})[0].name;
  if (returnPath === true) {
    return module;
  }
  return require(module);
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("abpetkov~transitionize@0.0.3", function (exports, module) {

/**
 * Transitionize 0.0.2
 * https://github.com/abpetkov/transitionize
 *
 * Authored by Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2013, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * Expose `Transitionize`.
 */

module.exports = Transitionize;

/**
 * Initialize new Transitionize.
 *
 * @param {Object} element
 * @param {Object} props
 * @api public
 */

function Transitionize(element, props) {
  if (!(this instanceof Transitionize)) return new Transitionize(element, props);

  this.element = element;
  this.props = props || {};
  this.init();
}

/**
 * Detect if Safari.
 *
 * @returns {Boolean}
 * @api private
 */

Transitionize.prototype.isSafari = function() {
  return (/Safari/).test(navigator.userAgent) && (/Apple Computer/).test(navigator.vendor);
};

/**
 * Loop though the object and push the keys and values in an array.
 * Apply the CSS3 transition to the element and prefix with -webkit- for Safari.
 *
 * @api private
 */

Transitionize.prototype.init = function() {
  var transitions = [];

  for (var key in this.props) {
    transitions.push(key + ' ' + this.props[key]);
  }

  this.element.style.transition = transitions.join(', ');
  if (this.isSafari()) this.element.style.webkitTransition = transitions.join(', ');
};
});

require.register("ftlabs~fastclick@v0.6.11", function (exports, module) {
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchMove = function() { return FastClick.prototype.onTouchMove.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !this.deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	'use strict';

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;
	var chromeVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			
			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}

});

require.register("component~indexof@0.0.3", function (exports, module) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});

require.register("component~classes@1.2.1", function (exports, module) {
/**
 * Module dependencies.
 */

var index = require('component~indexof@0.0.3');

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el) throw new Error('A DOM element reference is required');
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var str = this.el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

});

require.register("component~event@0.1.4", function (exports, module) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});

require.register("component~query@0.0.3", function (exports, module) {
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

});

require.register("component~matches-selector@0.1.5", function (exports, module) {
/**
 * Module dependencies.
 */

var query = require('component~query@0.0.3');

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

});

require.register("component~closest@0.1.4", function (exports, module) {
var matches = require('component~matches-selector@0.1.5')

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? {parentNode: element} : element

  root = root || document

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector))
      return element
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root)
      return
  }
}

});

require.register("component~delegate@0.2.3", function (exports, module) {
/**
 * Module dependencies.
 */

var closest = require('component~closest@0.1.4')
  , event = require('component~event@0.1.4');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};

});

require.register("component~events@1.0.9", function (exports, module) {

/**
 * Module dependencies.
 */

var events = require('component~event@0.1.4');
var delegate = require('component~delegate@0.2.3');

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

});

require.register("switchery", function (exports, module) {
/**
 * Switchery 0.8.1
 * http://abpetkov.github.io/switchery/
 *
 * Authored by Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2013-2015, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * External dependencies.
 */

var transitionize = require('abpetkov~transitionize@0.0.3')
  , fastclick = require('ftlabs~fastclick@v0.6.11')
  , classes = require('component~classes@1.2.1')
  , events = require('component~events@1.0.9');

/**
 * Expose `Switchery`.
 */

module.exports = Switchery;

/**
 * Set Switchery default values.
 *
 * @api public
 */

var defaults = {
    color             : '#64bd63'
  , secondaryColor    : '#dfdfdf'
  , jackColor         : '#fff'
  , jackSecondaryColor: null
  , className         : 'switchery'
  , disabled          : false
  , disabledOpacity   : 0.5
  , speed             : '0.4s'
  , size              : 'default'
};

/**
 * Create Switchery object.
 *
 * @param {Object} element
 * @param {Object} options
 * @api public
 */

function Switchery(element, options) {
  if (!(this instanceof Switchery)) return new Switchery(element, options);

  this.element = element;
  this.options = options || {};

  for (var i in defaults) {
    if (this.options[i] == null) {
      this.options[i] = defaults[i];
    }
  }

  if (this.element != null && this.element.type == 'checkbox') this.init();
  if (this.isDisabled() === true) this.disable();
}

/**
 * Hide the target element.
 *
 * @api private
 */

Switchery.prototype.hide = function() {
  this.element.style.display = 'none';
};

/**
 * Show custom switch after the target element.
 *
 * @api private
 */

Switchery.prototype.show = function() {
  var switcher = this.create();
  this.insertAfter(this.element, switcher);
};

/**
 * Create custom switch.
 *
 * @returns {Object} this.switcher
 * @api private
 */

Switchery.prototype.create = function() {
  this.switcher = document.createElement('span');
  this.jack = document.createElement('small');
  this.switcher.appendChild(this.jack);
  this.switcher.className = this.options.className;
  this.events = events(this.switcher, this);

  return this.switcher;
};

/**
 * Insert after element after another element.
 *
 * @param {Object} reference
 * @param {Object} target
 * @api private
 */

Switchery.prototype.insertAfter = function(reference, target) {
  reference.parentNode.insertBefore(target, reference.nextSibling);
};

/**
 * Set switch jack proper position.
 *
 * @param {Boolean} clicked - we need this in order to uncheck the input when the switch is clicked
 * @api private
 */

Switchery.prototype.setPosition = function (clicked) {
  var checked = this.isChecked()
    , switcher = this.switcher
    , jack = this.jack;

  if (clicked && checked) checked = false;
  else if (clicked && !checked) checked = true;

  if (checked === true) {
    this.element.checked = true;

    if (window.getComputedStyle) jack.style.left = parseInt(window.getComputedStyle(switcher).width) - parseInt(window.getComputedStyle(jack).width) + 'px';
    else jack.style.left = parseInt(switcher.currentStyle['width']) - parseInt(jack.currentStyle['width']) + 'px';

    if (this.options.color) this.colorize();
    this.setSpeed();
  } else {
    jack.style.left = 0;
    this.element.checked = false;
    this.switcher.style.boxShadow = 'inset 0 0 0 0 ' + this.options.secondaryColor;
    this.switcher.style.borderColor = this.options.secondaryColor;
    this.switcher.style.backgroundColor = (this.options.secondaryColor !== defaults.secondaryColor) ? this.options.secondaryColor : '#fff';
    this.jack.style.backgroundColor = (this.options.jackSecondaryColor !== this.options.jackColor) ? this.options.jackSecondaryColor : this.options.jackColor;
    this.setSpeed();
  }
};

/**
 * Set speed.
 *
 * @api private
 */

Switchery.prototype.setSpeed = function() {
  var switcherProp = {}
    , jackProp = {
        'background-color': this.options.speed
      , 'left': this.options.speed.replace(/[a-z]/, '') / 2 + 's'
    };

  if (this.isChecked()) {
    switcherProp = {
        'border': this.options.speed
      , 'box-shadow': this.options.speed
      , 'background-color': this.options.speed.replace(/[a-z]/, '') * 3 + 's'
    };
  } else {
    switcherProp = {
        'border': this.options.speed
      , 'box-shadow': this.options.speed
    };
  }

  transitionize(this.switcher, switcherProp);
  transitionize(this.jack, jackProp);
};

/**
 * Set switch size.
 *
 * @api private
 */

Switchery.prototype.setSize = function() {
  var small = 'switchery-small'
    , normal = 'switchery-default'
    , large = 'switchery-large';

  switch (this.options.size) {
    case 'small':
      classes(this.switcher).add(small)
      break;
    case 'large':
      classes(this.switcher).add(large)
      break;
    default:
      classes(this.switcher).add(normal)
      break;
  }
};

/**
 * Set switch color.
 *
 * @api private
 */

Switchery.prototype.colorize = function() {
  var switcherHeight = this.switcher.offsetHeight / 2;

  this.switcher.style.backgroundColor = this.options.color;
  this.switcher.style.borderColor = this.options.color;
  this.switcher.style.boxShadow = 'inset 0 0 0 ' + switcherHeight + 'px ' + this.options.color;
  this.jack.style.backgroundColor = this.options.jackColor;
};

/**
 * Handle the onchange event.
 *
 * @param {Boolean} state
 * @api private
 */

Switchery.prototype.handleOnchange = function(state) {
  if (document.dispatchEvent) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, true);
    this.element.dispatchEvent(event);
  } else {
    this.element.fireEvent('onchange');
  }
};

/**
 * Handle the native input element state change.
 * A `change` event must be fired in order to detect the change.
 *
 * @api private
 */

Switchery.prototype.handleChange = function() {
  var self = this
    , el = this.element;

  if (el.addEventListener) {
    el.addEventListener('change', function() {
      self.setPosition();
    });
  } else {
    el.attachEvent('onchange', function() {
      self.setPosition();
    });
  }
};

/**
 * Handle the switch click event.
 *
 * @api private
 */

Switchery.prototype.handleClick = function() {
  var switcher = this.switcher;

  fastclick(switcher);
  this.events.bind('click', 'bindClick');
};

/**
 * Attach all methods that need to happen on switcher click.
 *
 * @api private
 */

Switchery.prototype.bindClick = function() {
  var parent = this.element.parentNode.tagName.toLowerCase()
    , labelParent = (parent === 'label') ? false : true;

  this.setPosition(labelParent);
  this.handleOnchange(this.element.checked);
};

/**
 * Mark an individual switch as already handled.
 *
 * @api private
 */

Switchery.prototype.markAsSwitched = function() {
  this.element.setAttribute('data-switchery', true);
};

/**
 * Check if an individual switch is already handled.
 *
 * @api private
 */

Switchery.prototype.markedAsSwitched = function() {
  return this.element.getAttribute('data-switchery');
};

/**
 * Initialize Switchery.
 *
 * @api private
 */

Switchery.prototype.init = function() {
  this.hide();
  this.show();
  this.setSize();
  this.setPosition();
  this.markAsSwitched();
  this.handleChange();
  this.handleClick();
};

/**
 * See if input is checked.
 *
 * @returns {Boolean}
 * @api public
 */

Switchery.prototype.isChecked = function() {
  return this.element.checked;
};

/**
 * See if switcher should be disabled.
 *
 * @returns {Boolean}
 * @api public
 */

Switchery.prototype.isDisabled = function() {
  return this.options.disabled || this.element.disabled || this.element.readOnly;
};

/**
 * Destroy all event handlers attached to the switch.
 *
 * @api public
 */

Switchery.prototype.destroy = function() {
  this.events.unbind();
};

/**
 * Enable disabled switch element.
 *
 * @api public
 */

Switchery.prototype.enable = function() {
  if (this.options.disabled) this.options.disabled = false;
  if (this.element.disabled) this.element.disabled = false;
  if (this.element.readOnly) this.element.readOnly = false;
  this.switcher.style.opacity = 1;
  this.events.bind('click', 'bindClick');
};

/**
 * Disable switch element.
 *
 * @api public
 */

Switchery.prototype.disable = function() {
  if (!this.options.disabled) this.options.disabled = true;
  if (!this.element.disabled) this.element.disabled = true;
  if (!this.element.readOnly) this.element.readOnly = true;
  this.switcher.style.opacity = this.options.disabledOpacity;
  this.destroy();
};

});

if (typeof exports == "object") {
  module.exports = require("switchery");
} else if (typeof define == "function" && define.amd) {
  define("Switchery", [], function(){ return require("switchery"); });
} else {
  (this || window)["Switchery"] = require("switchery");
}
})()
