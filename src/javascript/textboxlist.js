
AUI().add(
	'textboxlist',
	function(A) {
		var Lang = A.Lang,

			getClassName = A.ClassNameManager.getClassName,

			ENTRY_NAME = 'textboxlistentry',
			NAME = 'textboxlist',

			BOUNDING_BOX = 'boundingBox',
			CONTENT_BOX = 'contentBox',

			CONFIG_ANIM = {
				from: {
					opacity: 1
				},
				to: {
					opacity: 0.3
				},
				duration: 0.1,
				on: {
					end: function(event) {
						var instance = this;

						var reverse = instance.get('reverse');

						if (!reverse) {
							instance.run();
						}

						instance.set('reverse', !reverse);
					}
				}
			},

			CSS_CLEARFIX = getClassName('helper', 'clearfix'),

			CSS_ICON = getClassName('icon'),
			CSS_ICON_CLOSE = getClassName('icon', 'close'),
			CSS_ICON_CLOSE_HOVER = getClassName(ENTRY_NAME, 'close', 'hover'),
			CSS_ENTRY_CLOSE = getClassName(ENTRY_NAME, 'close'),
			CSS_ENTRY_HOLDER = getClassName(ENTRY_NAME, 'holder'),
			CSS_ENTRY_TEXT = getClassName(ENTRY_NAME, 'text'),
			CSS_ENTRY_ITEM = getClassName(ENTRY_NAME, 'item'),

			CSS_INPUT_CONTAINER = getClassName(NAME, 'input','container'),

			KEY_BACKSPACE = 8,
			KEY_RIGHT = 39,
			KEY_LEFT = 37,

			TPL_ENTRY_CLOSE = '<span class="' + [CSS_ICON, CSS_ICON_CLOSE, CSS_ENTRY_CLOSE].join(' ') + '"></span>',
			TPL_ENTRY_TEXT = '<span class="' + CSS_ENTRY_TEXT + '"></span>',
			TPL_ENTRY_HOLDER = '<ul class="' + [CSS_CLEARFIX, CSS_ENTRY_HOLDER].join(' ') + '"></ul>',

			TPL_INPUT_CONTAINER = '<li tabindex="0" class="' + CSS_INPUT_CONTAINER + '"></li>';

		var TextboxList = function() {
			TextboxList.superclass.constructor.apply(this, arguments);
		};

		TextboxList.NAME = NAME;

		TextboxList.ATTRS = {
			delimChar: {
				value: ''
			}
		};

		A.extend(
			TextboxList,
			A.AutoComplete,
			{
				initializer: function(config) {
					var instance = this;

					var matchKey = instance.get('matchKey');

					instance.entries = new A.DataSet(
						{
							getKey: function(obj) {
								var instance = this;

								return obj[matchKey];
							}
						}
					);

					instance._lastSelectedEntry = -1;
				},

				renderUI: function() {
					var instance = this;

					instance._renderEntryHolder();

					TextboxList.superclass.renderUI.apply(instance, arguments);
				},

				bindUI: function() {
					var instance = this;

					TextboxList.superclass.bindUI.apply(instance, arguments);

					instance.after('itemSelect', instance._afterItemSelect);
					instance.after('focusedChange', instance._afterTBLFocusedChange);
					instance.after('textboxlistentry:focusedChange', instance._afterTBLFocusedChange);

					var entries = instance.entries;
					var entryHolder = instance.entryHolder;
					var closeSelector = '.' + CSS_ICON_CLOSE;

					entries.on('add', instance._updateEntryHolder, instance);
					entries.on('replace', instance._updateEntryHolder, instance);
					entries.on('remove', instance._updateEntryHolder, instance);

					entryHolder.delegate('click', A.bind(instance._removeItem, instance), closeSelector);
					entryHolder.delegate('mouseenter', A.bind(instance._onCloseIconMouseOver, instance), closeSelector);
					entryHolder.delegate('mouseleave', A.bind(instance._onCloseIconMouseOut, instance), closeSelector);

					A.on(
						'key',
						instance._onTBLKeypress,
						instance.get(BOUNDING_BOX),
						'down:39,40,37,38,8',
						instance
					);
				},

				_afterItemSelect: function(elListItem) {
					var instance = this;

					instance.entries.add(elListItem._resultData);

				},

				_afterTBLFocusedChange: function(event) {
					var instance = this;

					if (event.type.indexOf('textboxlistentry') > -1) {
						if (event.newVal) {
							var entryBoundingBox = event.target.get(BOUNDING_BOX);

							instance._lastSelectedEntry = instance.entryHolder.all('li').indexOf(entryBoundingBox);
						}
					}
					else if (event.newVal && instance._lastSelectedEntry == -1) {
						instance.inputNode.focus();
					}
				},

				_onCloseIconMouseOut: function(event) {
					var instance = this;

					event.currentTarget.removeClass(CSS_ICON_CLOSE_HOVER);
				},

				_onCloseIconMouseOver: function(event) {
					var instance = this;

					event.currentTarget.addClass(CSS_ICON_CLOSE_HOVER);
				},

				_onTBLKeypress: function(event) {
					var instance = this;

					if (!instance.inputNode.val()) {
						var keyCode = event.keyCode;

						var lastSelectedEntry = instance._lastSelectedEntry;
						var currentSelectedEntry = -1;

						var unselected = (lastSelectedEntry == -1);

						var deleteEntry = (keyCode == KEY_BACKSPACE);
						var deleteBack = (deleteEntry && unselected);
						var moveBack = keyCode == KEY_LEFT || deleteBack;
						var moveForward = (keyCode == KEY_RIGHT);

						var entries = instance.entries;

						var entriesSize = entries.size();
						var lastEntryIndex = entriesSize - 1;

						if (moveBack) {
							if (unselected) {
								currentSelectedEntry = lastEntryIndex;
							}
							else if (lastSelectedEntry == 0) {
								currentSelectedEntry = lastSelectedEntry;
							}
							else {
								currentSelectedEntry = lastSelectedEntry - 1;
							}
						}
						else if (moveForward) {
							if (unselected || (lastSelectedEntry == lastEntryIndex)) {
								currentSelectedEntry = -1;
							}
							else {
								currentSelectedEntry = lastSelectedEntry + 1;
							}
						}
						else if (deleteEntry) {
							entries.removeAt(lastSelectedEntry);

							entriesSize = entries.size();

							if (lastSelectedEntry == entriesSize) {
								currentSelectedEntry = -1;
							}
							else {
								currentSelectedEntry = lastSelectedEntry;
							}
						}

						if (deleteBack || deleteEntry) {
							event.halt();
						}

						if (currentSelectedEntry != -1) {
							entries.item(currentSelectedEntry).entry.focus();
						}
						else {
							instance.inputNode.focus();
						}

						instance._lastSelectedEntry = currentSelectedEntry;
					}
				},

				_removeItem: function(event) {
					var instance = this;

					var entry = A.Widget.getByNode(event.currentTarget);

					entry = entry.get(BOUNDING_BOX);

					var currentIndex = instance.entryHolder.all('li').indexOf(entry);

					instance.entries.removeAt(currentIndex);
				},

				_renderEntryHolder: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var entryHolder = A.Node.create(TPL_ENTRY_HOLDER);

					contentBox.prepend(entryHolder);

					instance.entryHolder = entryHolder;
				},

				_renderInput: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var input = instance.get('input');

					var fieldConfig = {
						labelText: false
					};

					var inputReference = null;
					var inputParent = null;

					if (input) {
						input = A.get(input);

						fieldConfig.node = input;

						inputReference = input.next();
						inputParent = input.get('parentNode');
					}

					var inputContainer = A.Node.create(TPL_INPUT_CONTAINER);

					instance.entryHolder.append(inputContainer);

					var inputField = new A.Textfield(fieldConfig).render(inputContainer);

					if (inputParent) {
						var inputBoundingBox = inputField.get(BOUNDING_BOX);

						inputParent.insertBefore(inputBoundingBox, inputReference);
					}

					instance.inputContainer = inputContainer;
					instance.inputField = inputField;
					instance.inputNode = inputField.get('node');
					instance.button = new A.ToolItem();

					instance.set('uniqueName', A.stamp(instance.inputNode));
				},

				_updateEntryHolder: function(event) {
					var instance = this;

					var eventType = event.type;
					var inputNode = instance.inputNode;
					var entryHolder = instance.entryHolder;
					var item = event.item;
					var index = event.index;

					if (eventType == 'dataset:add') {
						var entry = new TextboxListEntry(
							{
								labelText: event.attrName
							}
						);

						entry.addTarget(instance);

						var entryNode = entry.get(BOUNDING_BOX);

						entry.render(entryHolder);

						entryHolder.all('li').item(index).placeBefore(entryNode);

						entryNode.plug(A.Plugin.NodeFX, CONFIG_ANIM);

						item.entry = entry;

						inputNode.val('');
					}
					else if (eventType == 'dataset:replace') {
						inputNode.val('');

						var entry = event.prevVal.entry;

						item.entry = entry;

						entry.get(BOUNDING_BOX).fx.run();
					}
					else if (eventType == 'dataset:remove') {
						var entryNodes = entryHolder.all('li');

						if (entryNodes) {
							entryNodes.item(index).remove();
						}
					}
				}
			}
		);

		var TextboxListEntry = function() {
			TextboxListEntry.superclass.constructor.apply(this, arguments);
		};

		TextboxListEntry.NAME = ENTRY_NAME;

		TextboxListEntry.ATTRS = {
			labelText: {
				value: ''
			}
		};

		A.extend(
			TextboxListEntry,
			A.Widget,
			{
				BOUNDING_TEMPLATE: '<li></li>',
				CONTENT_TEMPLATE: '<span></span>',
				renderUI: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);

					var text = A.Node.create(TPL_ENTRY_TEXT);
					var close = A.Node.create(TPL_ENTRY_CLOSE);

					var labelText = instance.get('labelText');

					text.set('innerHTML', labelText);

					contentBox.appendChild(text);
					contentBox.appendChild(close);
				}
			}
		);

		A.TextboxList = TextboxList;
		A.TextboxListEntry = TextboxListEntry;
	},
	'@VERSION',
	{
		requires: ['aui-base', 'autocomplete', 'anim-node-plugin', 'node-focusmanager'],
		use: []
	}
);