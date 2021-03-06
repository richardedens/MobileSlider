/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, location, dojo, MobileSliderBackground, $, document, window, device, setTimeout */
/*mendix */
/*
    MobileSliderBackground
    ========================

    @file      : MobileSliderBackground.js
    @version   : 1.0
    @author    : Gerhard Richard Edens
    @date      : Wed, 25 Mar 2015 10:48:53 GMT
    @copyright : Mendix b.v.
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
require([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
    'MobileSliderBackground/lib/jquery-1.11.2.min', 'dojo/text!MobileSliderBackground/widget/template/MobileSliderBackground.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, _jQuery, widgetTemplate) {
    'use strict';

    // Declare widget's prototype.
    return declare('MobileSliderBackground.widget.MobileSliderBackground', [_WidgetBase, _TemplatedMixin], {  //'MobileSliderBackground.widget.MobileSliderBackground', 
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        mfToExecute: "",
        messageString: "",
        backgroundColor: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,
        _objProperty: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._objProperty = {};
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');

            if ($('#mx-slider-background').length === 0) {
                var backgroundImage = $('<div></div>'),
                    backgroundImageLayer = $('<div></div>');
                backgroundImage.attr('id', 'mx-slider-background');
                backgroundImageLayer.attr('id', 'mx-slider-background-layer');
                backgroundImage.append(backgroundImageLayer);
                $('#content').prepend(backgroundImage.wrapAll('<div>').parent().html());
            }

            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {

        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {

        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _setupEvents: function () {
            $('#mx-slider-background-layer').on('mx.slide.set.background', lang.hitch(this, function(event, data) {
                $('#mx-slider-background-layer').css('background-image', 'url(\'' + mx.appUrl + data.background + '\')');
                $('#mx-slider-background-layer').css('background-size', '100% auto');
                $('#mx-slider-background-layer').css('width', data.width + 'px');
                $('#mx-slider-background-layer').css('height', data.height + 'px');
            }));
            // iOS and android compatible resize!
            window.addEventListener('resize', lang.hitch(this, this._orientationChanged));
        },

        _orientationChanged: function(){
            $('#mx-slider-background').css('width', window.innerWidth + 'px');
            $('#mx-slider-background').css('height', window.innerHeight + 'px');
            $('#mx-slider-background-layer').css('height', window.innerHeight + 'px');
            $('#mx-slider-background-layer').css('background-size', '100% auto');
        },

        _updateRendering: function () {
        },

        _resetSubscriptions: function () {
            // Release handle on previous object, if any.
            if (this._handle) {
                this.unsubscribe(this._handle);
                this._handle = null;
            }

            if (this._contextObj) {
                this._handle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: this._updateRendering
                });
            }
        }
    });
});
