AUI.add('aui-tool-item', function(A) {
/**
 * The ToolItem Utility - ToolItems are iconic buttons that provide
 * interaction states and event handling
 *
 * @module aui-tool
 * @submodule aui-tool-item
 */

var Lang = A.Lang,
	isString = Lang.isString,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,

	getClassName = A.ClassNameManager.getClassName,

	TOOL = 'tool',
	ICON = 'icon',
	STATE = 'state',

	CSS_TOOL = getClassName(TOOL),
	CSS_ICON = getClassName(ICON),

	TPL_GENERIC = '<span></span>',
	TPL_ICON = TPL_GENERIC,
	TPL_TOOL = TPL_GENERIC;

/**
 * <p><img src="assets/images/aui-tool-item/main.png"/></p>
 *
 * A base class for ToolItem, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Iconic buttons that provide interaction states and event handling</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.ToolItem({
 *   icon: 'circle-plus'
 * }).render();
 * </code></pre>
 *
 * <p>List of valid icons:</p>
 * 
 * <ul>
 *  <li>carat-1-t</li>
 *  <li>carat-1-tr</li>
 *  <li>carat-1-r</li>
 *  <li>carat-1-br</li>
 *  <li>carat-1-b</li>
 *  <li>carat-1-bl</li>
 *  <li>carat-1-l</li>
 *  <li>carat-1-tl</li>
 *  <li>carat-2-t-b</li>
 *  <li>carat-2-r-l</li>
 *  <li>triangle-1-t</li>
 *  <li>triangle-1-tr</li>
 *  <li>triangle-1-r</li>
 *  <li>triangle-1-br</li>
 *  <li>triangle-1-b</li>
 *  <li>triangle-1-bl</li>
 *  <li>triangle-1-l</li>
 *  <li>triangle-1-tl</li>
 *  <li>triangle-2-t-b</li>
 *  <li>triangle-2-r-l</li>
 *  <li>arrow-1-t</li>
 *  <li>arrow-1-tr</li>
 *  <li>arrow-1-r</li>
 *  <li>arrow-1-br</li>
 *  <li>arrow-1-b</li>
 *  <li>arrow-1-bl</li>
 *  <li>arrow-1-l</li>
 *  <li>arrow-1-tl</li>
 *  <li>arrow-2-t-b</li>
 *  <li>arrow-2-tr-bl</li>
 *  <li>arrow-2-r-l</li>
 *  <li>arrow-2-br-tl</li>
 *  <li>arrowstop-1-t</li>
 *  <li>arrowstop-1-r</li>
 *  <li>arrowstop-1-b</li>
 *  <li>arrowstop-1-l</li>
 *  <li>arrowthick-1-t</li>
 *  <li>arrowthick-1-tr</li>
 *  <li>arrowthick-1-r</li>
 *  <li>arrowthick-1-br</li>
 *  <li>arrowthick-1-b</li>
 *  <li>arrowthick-1-bl</li>
 *  <li>arrowthick-1-l</li>
 *  <li>arrowthick-1-tl</li>
 *  <li>arrowthick-2-t-b</li>
 *  <li>arrowthick-2-tr-bl</li>
 *  <li>arrowthick-2-r-l</li>
 *  <li>arrowthick-2-br-tl</li>
 *  <li>arrowthickstop-1-t</li>
 *  <li>arrowthickstop-1-r</li>
 *  <li>arrowthickstop-1-b</li>
 *  <li>arrowthickstop-1-l</li>
 *  <li>arrowreturnthick-1-l</li>
 *  <li>arrowreturnthick-1-t</li>
 *  <li>arrowreturnthick-1-r</li>
 *  <li>arrowreturnthick-1-b</li>
 *  <li>arrowreturn-1-l</li>
 *  <li>arrowreturn-1-t</li>
 *  <li>arrowreturn-1-r</li>
 *  <li>arrowreturn-1-b</li>
 *  <li>arrowrefresh-1-l</li>
 *  <li>arrowrefresh-1-t</li>
 *  <li>arrowrefresh-1-r</li>
 *  <li>arrowrefresh-1-b</li>
 *  <li>arrow-4</li>
 *  <li>arrow-4-diag</li>
 *  <li>extlink</li>
 *  <li>newwin</li>
 *  <li>refresh</li>
 *  <li>shuffle</li>
 *  <li>transfer-r-l</li>
 *  <li>transferthick-r-l</li>
 *  <li>folder-collapsed</li>
 *  <li>folder-open</li>
 *  <li>document</li>
 *  <li>document-b</li>
 *  <li>note</li>
 *  <li>mail-closed</li>
 *  <li>mail-open</li>
 *  <li>suitcase</li>
 *  <li>comment</li>
 *  <li>person</li>
 *  <li>print</li>
 *  <li>trash</li>
 *  <li>locked</li>
 *  <li>unlocked</li>
 *  <li>bookmark</li>
 *  <li>tag</li>
 *  <li>home</li>
 *  <li>flag</li>
 *  <li>calendar</li>
 *  <li>cart</li>
 *  <li>pencil</li>
 *  <li>clock</li>
 *  <li>disk</li>
 *  <li>calculator</li>
 *  <li>zoomin</li>
 *  <li>zoomout</li>
 *  <li>search</li>
 *  <li>wrench</li>
 *  <li>gear</li>
 *  <li>heart</li>
 *  <li>star</li>
 *  <li>link</li>
 *  <li>cancel</li>
 *  <li>plus</li>
 *  <li>plusthick</li>
 *  <li>minus</li>
 *  <li>minusthick</li>
 *  <li>close</li>
 *  <li>closethick</li>
 *  <li>key</li>
 *  <li>lightbulb</li>
 *  <li>scissors</li>
 *  <li>clipboard</li>
 *  <li>copy</li>
 *  <li>contact</li>
 *  <li>image</li>
 *  <li>video</li>
 *  <li>script</li>
 *  <li>alert</li>
 *  <li>info</li>
 *  <li>notice</li>
 *  <li>help</li>
 *  <li>check</li>
 *  <li>bullet</li>
 *  <li>radio-off</li>
 *  <li>radio-on</li>
 *  <li>pin-l</li>
 *  <li>pin-b</li>
 *  <li>play</li>
 *  <li>pause</li>
 *  <li>seek-next</li>
 *  <li>seek-prev</li>
 *  <li>seek-end</li>
 *  <li>seek-first</li>
 *  <li>stop</li>
 *  <li>eject</li>
 *  <li>volume-off</li>
 *  <li>volume-on</li>
 *  <li>power</li>
 *  <li>signal-diag</li>
 *  <li>signal</li>
 *  <li>battery-0</li>
 *  <li>battery-1</li>
 *  <li>battery-2</li>
 *  <li>battery-3</li>
 *  <li>circle-plus</li>
 *  <li>circle-minus</li>
 *  <li>circle-close</li>
 *  <li>circle-triangle-r</li>
 *  <li>circle-triangle-b</li>
 *  <li>circle-triangle-l</li>
 *  <li>circle-triangle-t</li>
 *  <li>circle-arrow-r</li>
 *  <li>circle-arrow-b</li>
 *  <li>circle-arrow-l</li>
 *  <li>circle-arrow-t</li>
 *  <li>circle-zoomin</li>
 *  <li>circle-zoomout</li>
 *  <li>circle-check</li>
 *  <li>circlesmall-plus</li>
 *  <li>circlesmall-minus</li>
 *  <li>circlesmall-close</li>
 *  <li>squaresmall-plus</li>
 *  <li>squaresmall-minus</li>
 *  <li>squaresmall-close</li>
 *  <li>grip-dotted-vertical</li>
 *  <li>grip-dotted-horizontal</li>
 *  <li>grip-solid-vertical</li>
 *  <li>grip-solid-horizontal</li>
 *  <li>gripsmall-diagonal-br</li>
 *  <li>grip-diagonal-br</li>
 *  <li>loading</li>
 *</ul>
 * 
 * Check the list of <a href="ToolItem.html#configattributes">Configuration Attributes</a> available for
 * ToolItem.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ToolItem
 * @constructor
 * @extends Component
 */
var ToolItem = function(config) {
	if (isString(config)) {
		config = {
			icon: config
		};
	}

	ToolItem.superclass.constructor.apply(this, arguments);
};

/**
 * Static property provides a string to identify the class.
 *
 * @property ToolItem.NAME
 * @type String
 * @static
 */
ToolItem.NAME = 'tool-item';

/**
 * Static property used to define the default attribute
 * configuration for the ToolItem.
 *
 * @property ToolItem.ATTRS
 * @type Object
 * @static
 */
ToolItem.ATTRS = {
	classNames: {},

	/**
	 * Receives an interaction state of active when the user clicks on it.
	 *
	 * @attribute activeState
	 * @type boolean
	 */
	activeState: {
		value: false
	},

	/**
	 * Receives a default interaction state.
	 *
	 * @attribute defaultState
	 * @type boolean
	 */
	defaultState: {},

	handler: {
		lazyAdd: false,
		value: null,
		setter: function(value) {
			var instance = this;

			var fn = value;
			var context = instance;
			var args = instance;
			var type = 'click';

			if (isObject(fn)) {
				var handlerConfig = fn;

				fn = handlerConfig.fn || fn;
				context = handlerConfig.context || context;
				type = handlerConfig.type || type;
			}

			if (isFunction(fn)) {
				instance.on(type, A.rbind(fn, context, args, handlerConfig.args));
			}

			return value;
		}
	},

	/**
	 * Receives an interaction state of hover during the
     * <code>mouseover</code> event.
	 *
	 * @attribute hoverState
	 * @type boolean
	 */
	hoverState: {},

	iconNode: {
		valueFn: function() {
			var instance = this;

			return A.Node.create(TPL_ICON);
		}
	},

	icon: {
		lazyAdd: false,
		setter: function(value) {
			var instance = this;

			instance._uiSetIcon(value);

			return value;
		}
	},

	id: {
		valueFn: function() {
			return A.guid();
		}
	},

	renderTo: {
		value: null
	}
};

A.extend(
	ToolItem,
	A.Component,
	{
		/**
		 * UI_EVENTS empty. See <a href="Widget.html">Widget UI_EVENTS</a>.
		 *
		 * @property UI_EVENTS
		 * @type Object
		 * @protected
		 */
		UI_EVENTS: {},
		BOUNDING_TEMPLATE: TPL_GENERIC,
		CONTENT_TEMPLATE: TPL_GENERIC,

		/**
		 * Construction logic executed during ToolItem instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			var renderTo = instance.get('renderTo');

			if (renderTo) {
				instance.render(renderTo);
			}
		},

		/**
		 * Create the DOM structure for the ToolItem. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
		renderUI: function() {
			var instance = this;

			var contentBox = instance.get('contentBox');
			var iconNode = instance.get('iconNode');

			contentBox.addClass(CSS_TOOL);

			iconNode.addClass(CSS_ICON);

			instance.plug(
				A.StateInteractionPlugin,
				{
					activeState: instance.get('activeState'),
					classNames: instance.get('classNames'),
					defaultState: instance.get('defaultState'),
					hoverState: instance.get('hoverState'),
					bubbleTarget: instance
				}
			);

			contentBox.appendChild(iconNode);
		},

		/**
		 * Bind the events on the ToolItem UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this;

			instance.after('iconChange', instance._afterIconChange);
		},

		/**
		 * Descructor lifecycle implementation for the ToolItem class.
		 * Purges events attached to the node (and all child nodes).
		 *
		 * @method destroy
		 * @protected
		 */
		destroy: function() {
			var instance = this;
			var boundingBox = instance.get('boundingBox');

			boundingBox.remove();
		},

		/**
		 * Fires after the value of the
		 * <a href="ToolItem.html#config_icon">icon</a> attribute change.
		 *
		 * @method _afterIconChange
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterIconChange: function(event) {
			var instance = this;

			instance._uiSetIcon(event.newVal, event.prevVal);
		},

		/**
		 * Sets the icon <a href="ToolItem.html#assets_cssClasses">class
         * name</a> on the <code>contentBox</code>.
		 *
		 * @method _uiSetIcon
		 * @param {Type} name description
		 * @protected
		 */
		_uiSetIcon: function(newVal, prevVal) {
			var instance = this;

			var contentBox = instance.get('iconNode');

			newVal = getClassName(ICON, newVal);

			if (prevVal) {
				prevVal = getClassName(ICON, prevVal);
			}

			contentBox.replaceClass(prevVal, newVal);
		}
	}
);

A.ToolItem = ToolItem;

}, '@VERSION@' ,{requires:['aui-base','aui-state-interaction']});
AUI.add('aui-tool-set', function(A) {
/**
 * The ToolSet Utility is a managed collection of <a
 * href="ToolItem.html">ToolItems</a>.
 *
 * @module aui-tool
 * @submodule aui-tool-set
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	isToolItem = function(item) {
		return (item instanceof A.ToolItem);
	},

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'toolset',

	CSS_FIRST = getClassName(NAME, 'first'),
	CSS_ITEM = getClassName(NAME, 'item'),
	CSS_ITEM_CONTENT = getClassName(NAME, 'item', 'content'),
	CSS_LAST = getClassName(NAME, 'last'),
	CSS_TOOLSET = getClassName(NAME),

	TPL_GENERIC = '<span></span>';

/**
 * <p><img src="assets/images/aui-tool-set/main.png"/></p>
 *
 * A base class for ToolSet, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Managed collection for <a href="ToolItems.html">ToolItems</a></li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.ToolSet({
 *  tools: [
 *  	{
 *  		id: 'close',
 *  		icon: 'close'
 *  	},
 *  	{
 *  		id: 'expand',
 *  		icon: 'plus'
 *  	}
 *  ]
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="ToolSet.html#configattributes">Configuration Attributes</a> available for
 * ToolSet.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ToolSet
 * @constructor
 * @extends Component
 */
var ToolSet = function() {
	ToolSet.superclass.constructor.apply(this, arguments);
};

/**
 * Static property provides a string to identify the class.
 *
 * @property ToolSet.NAME
 * @type String
 * @static
 */
ToolSet.NAME = NAME;

/**
 * Static property used to define the default attribute
 * configuration for the ToolSet.
 *
 * @property ToolSet.ATTRS
 * @type Object
 * @static
 */
ToolSet.ATTRS = {
	/**
	 * Receives an interaction state of active when the user clicks on it.
	 *
	 * @attribute activeState
	 * @type boolean
	 */
	activeState: {},

	/**
	 * Receives a default interaction state.
	 *
	 * @attribute defaultState
	 * @type boolean
	 */
	defaultState: {},

	/**
	 * Receives an interaction state of hover during the
     * <code>mouseover</code> event.
	 *
	 * @attribute hoverState
	 * @type boolean
	 */
	hoverState: {},

	/**
	 * Array of <a href="ToolItem.html">ToolItem</a> elements to render when
     * the ToolSet renders.
	 *
	 * @attribute tools
	 * @default []
	 * @type Array
	 */
	tools: {
		value: [],
		validator: isArray
	}
};

A.extend(
	ToolSet,
	A.Component,
	{
		BOUNDING_TEMPLATE: TPL_GENERIC,
		CONTENT_TEMPLATE: TPL_GENERIC,

		/**
		 * Construction logic executed during ToolSet instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.tools = new A.DataSet();

			instance.tools.on('add', instance._afterAddToolItem, instance);
			instance.tools.on('remove', instance._afterRemoveToolItem, instance);
		},

		/**
		 * Create the DOM structure for the ToolSet. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
		renderUI: function() {
			var instance = this;
			var toolItems = instance.get('tools');

			A.each(toolItems, function(item, i) {
				instance.add(item);
			});
		},

		/**
		 * Sync the ToolSet UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
		syncUI: function() {
			var instance = this;
			var toolItems = instance.get('tools');
			var toolSet = instance.tools;
			var length = toolSet.size() - 1;

			// loop all items applying the CSS_FIRST and
			// CSS_LAST class names on the correct elements
			toolSet.each(function(item, index) {
				var itemBoundingBox = item.get('boundingBox');

				itemBoundingBox.removeClass(CSS_FIRST);
				itemBoundingBox.removeClass(CSS_LAST);

				if (index == 0) {
					itemBoundingBox.addClass(CSS_FIRST);
				}

				if (index == length) {
					itemBoundingBox.addClass(CSS_LAST);
				}
			});
		},

		/**
		 * Add a <a href="ToolItem.html">ToolItem</a> to this ToolSet.
		 *
		 * @method add
		 * @param {Object} toolItem
		 */
		add: function(toolItem) {
			var instance = this;
			var toolSet = instance.tools;

			// fix the toolItem argument the user passed, supports plain object, ToolItem and String
			// NOTE: if ToolItem passed as argument it will return the same instance
			toolItem = instance._createToolItem(toolItem);

			if (!toolSet.contains(toolItem)) {
				toolSet.add(toolItem);
			}
		},

		/**
		 * Get a <a href="ToolItem.html">ToolItem</a> by its <code>key</code>.
		 *
		 * @method item
		 * @param {String} key
		 */
		item: function(key) {
			var instance = this;

			return instance.tools.item(key);
		},

		/**
		 * Remove a <a href="ToolItem.html">ToolItem</a> from this ToolSet.
		 *
		 * @method remove
		 * @param {Object} item
		 */
		remove: function(item) {
			var instance = this;
			var toolSet = instance.tools;

			if (isNumber(item)) {
				toolSet.removeAt(item);
			}
			if (isString(item)) {
				toolSet.removeKey(item);
			}
			else {
				toolSet.remove(item);
			}
		},

		/**
		 * Create a new <a href="ToolItem.html">ToolItem</a>.
		 *
		 * @method _createToolItem
		 * @param {Object} toolItem
		 * @protected
		 * @return {ToolItem}
		 */
		_createToolItem: function(item) {
			var instance = this;
			var toolItem = null;

			// check if is needed to instantiate a new ToolItem
			if (isToolItem(item)) {
				toolItem = item;
			}
			else {
				var defaultToolConfig = {
					activeState: instance.get('activeState'),
					defaultState: instance.get('defaultState'),
					hoverState: instance.get('hoverState')
				};

				if (isString(item)) {
					item = {
						icon: item
					};
				}

				A.mix(item, defaultToolConfig);

				toolItem = new A.ToolItem(item);
			}

			var itemBoundingBox = toolItem.get('boundingBox');
			var itemContentBox = toolItem.get('contentBox');

			itemBoundingBox.addClass(CSS_ITEM);
			itemContentBox.addClass(CSS_ITEM_CONTENT);

			return toolItem;
		},

		/**
		 * Fires after add a <a href="ToolItem.html">ToolItem</a>.
		 *
		 * @method _afterAddToolItem
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterAddToolItem: function(event) {
			var instance = this;
			var toolItem = event.item;
			var contentBox = instance.get('contentBox');

			if (isToolItem(toolItem)) {
				toolItem.render(contentBox);
			}

			instance.syncUI();
		},

		/**
		 * Fires after remove a <a href="ToolItem.html">ToolItem</a>.
		 *
		 * @method _afterRemoveToolItem
		 * @param {EventFacade} event
		 * @protected
		 */
		_afterRemoveToolItem: function(event) {
			var instance = this;
			var toolItem = event.item;
			var contentBox = instance.get('contentBox');

			if (isToolItem(toolItem)) {
				toolItem.destroy();
			}

			instance.syncUI();
		}
	}
);

A.ToolSet = ToolSet;

}, '@VERSION@' ,{requires:['aui-data-set','aui-tool-item'], skinnable:true});


AUI.add('aui-tool', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-tool-item','aui-tool-set']});
