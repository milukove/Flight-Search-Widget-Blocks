/**
 * SkyScanner Simple Flight Search Widget block
 *
 * @since 1.0.0
 * @param  object blocks     wp-blocks
 * @param  object editor     wp-editor
 * @param  object element    wp-element
 * @param  object components wp-component
 * @param  object i18n       wp-i18n
 * @param  object domReady   wp-domReady
 * @param  object options    plugin options
 */
( function( blocks, editor, element, components, i18n, domReady, options ) {

	var el = element.createElement,
	registerBlockType = blocks.registerBlockType,
	InspectorControls = editor.InspectorControls,
	TextControl = components.TextControl,
	Panel = components.Panel,
	PanelBody = components.PanelBody,
	PanelRow = components.PanelRow,
	Fragment = element.Fragment,
	__ = i18n.__,
	domReady = domReady,
	PanelColorSettings = editor.PanelColorSettings,
	ToggleControl = components.ToggleControl,
	options = options;

	/**
	 * Widget SVG icon
	 * @since 1.0.0
	 * @type <svg> DOM element
	 */
	var iconEl = el('svg',
		{
			width: 23,
			height: 21,
		},
	  el(
			'g',
			null,
			el(
				'path',
				{
					d: 'M17.8 20.1l.6-.6c.2-.2.3-.5.2-.8l-2.2-9.3 4.1-4.2c.5-.5.5-1.3 0-1.9-.5-.5-1.4-.5-1.9 0l-4.2 4.1-9.1-2c-.3-.1-.6 0-.8.2l-.6.6c-.4.4-.3 1.1.2 1.4l7.2 3.2-3.7 3.7-2.3-.8c-.3-.1-.6 0-.8.2L3 15.2l4.2 1.6L8.8 21l1.3-1.5c.2-.2.3-.6.2-.8l-.8-2.3 3.7-3.7 3.2 7.2c.3.5 1 .6 1.4.2z',
					fill: '#00B2D6',
				}
			)
		)
	);

	/**
	 *
	 * @since 1.0.0
	 */
	 registerBlockType( 'fswb/simple-flight-search-widget', {
		 title: __( 'SkyScanner Simple Flight Search Widget', 'fswb' ),
		 icon: iconEl,
		 category: 'fswb',
		 attributes: {
			 blockId: {
				 type: 'string',
			 },
			 dataSkyscannerWidget: {
				 type: 'string',
				 default: 'SearchWidget',
			 },
			 dataLocale: {
				 type: 'string',
				 default: options['locale'],
			 },
			 dataButtonLabel: {
				 type: 'string',
			 },
			 dataColour: {
				 type: 'string',
			 },
			 dataFontColour: {
				 type: 'string',
			 },
			 dataButtonColour: {
				 type: 'string',
			 },
			 dataButtonFontColour: {
				 type: 'string',
			 },
			 dataTarget: {
				 type: 'string',
				 default: '_blank',
			 },
			 dataArrowIcon: {
				 type: 'string',
				 default: false,
			 },
			 dataAssociateId: {
				 type: 'string',
				 default: options['associate-id'],
			 },
			 dataEnablePlaceholders: {
				 type: 'string',
			 }
		 },

		 edit: function( props ) {

			 /**
			  * Set unique block id if new
			  * @since 1.0.0
			  */
			 if( ! props.attributes.blockId ) {
				 var ts = Math.round((new Date()).getTime());
				 props.setAttributes( { blockId: 'fswb-unique-block-' + ts });
			 }

			 /**
			  * [onChangeSetting description]
			  * @since 1.0.0
			  * @param  string attributeName
			  * @param  string newValue
			  */
			 function onChangeSetting( attributeName, newValue ) {
				 props.setAttributes( { [attributeName]: newValue } );
			 };

			 /**
			  * Sets attribute value controlled by Toggle component
			  * @since	1.0.0
			  * @param  string attributeName
			  * @param  bool boolValue    toggle state
			  * @param  array values        values for toggle on|off states
			  */
			 function onChangeToggle( attributeName, boolValue, values ) {

				 if( boolValue ) {
					 props.setAttributes( { [attributeName]: values[0] } );
				 } else {
					 props.setAttributes( { [attributeName]: values[1] } );
				 }

			 };

			 /**
			  * Current block attributes
			  * @since 1.0.0
			  * @return	array			current block attributes
			  */
			 var myAttributes = props.attributes;

			 return el(
				 Fragment,
				 null,
				 el(
					 InspectorControls,
					 null,
					 el(
						 PanelRow,
						 null,
						 el(
							 TextControl,
							 {
								 label: __( 'Button Label', 'fswb' ),
								 value: myAttributes.dataButtonLabel,
								 onChange: function(e) {
									 onChangeSetting('dataButtonLabel', e);
								 },
							 }
						 )
					 ),
					 el(
						 PanelRow,
						 null,
						 el(
							 ToggleControl,
							 {
								 label: __( 'Show arrow icon insted of a plane', 'fswb' ),
								 checked: (myAttributes.dataArrowIcon == 'true'),
								 onChange: function(e) {
									 onChangeToggle('dataArrowIcon', e, [ 'true', 'false' ] );
								 },
							 }
						 )
					 ),
					 el(
						 ToggleControl,
						 {
							 label: __( 'Open in new tab', 'fswb' ),
							 checked: (myAttributes.dataTarget == '_blank'),
							 onChange: function(e) {
								 onChangeToggle('dataTarget', e, [ '_blank', '_self' ] );
							 },
						 }
					 ),
					 el(
						 ToggleControl,
						 {
							 label: __( 'Enable Placeholders', 'fswb' ),
							 checked: (myAttributes.dataEnablePlaceholders == 'true'),
							 onChange: function(e) {
								 onChangeToggle('dataEnablePlaceholders', e, [ 'true', 'false' ] );
							 },
							 hint: __( 'Show placeholders inside input tags instead of label tags', 'fswb' ),
						 }
					 ),
					 el(
						 PanelColorSettings,
						 {
							 title: __( 'Widget colors', 'fswb' ),
							 initialOpen: false,
							 colorSettings: [
								 {
									 value: myAttributes.dataColour,
									 onChange: function(e) {
										 return onChangeSetting('dataColour', e)
									 },
									 label: __( 'Background color', 'fswb' ),
								 },
								 {
									 value: myAttributes.dataFontColour,
									 onChange: function(e) {
										 return onChangeSetting('dataFontColour', e)
									 },
									 label: __( 'Font color', 'fswb' ),
								 },
								 {
									 value: myAttributes.dataButtonColour,
									 onChange: function(e) {
										 return onChangeSetting('dataButtonColour', e)
									 },
									 label: __( 'Button background color', 'fswb' ),
								 },
								 {
									 value: myAttributes.dataButtonFontColour,
									 onChange: function(e) {
										 return onChangeSetting('dataButtonFontColour', e)
									 },
									 label: __( 'Button font color', 'fswb' ),
								 }
							 ],
						 }
					 )
				 ),
				 el(
					 'div',
					 {
						 id: myAttributes.blockId,
						 'data-skyscanner-widget': myAttributes.dataSkyscannerWidget,
						 'data-locale': myAttributes.dataLocale,
						 'data-button-label': myAttributes.dataButtonLabel,
						 'data-colour': myAttributes.dataColour,
						 'data-target': myAttributes.dataTarget,
						 'data-arrow-icon': myAttributes.dataArrowIcon,
						 'data-associate-id': myAttributes.dataAssociateId,
						 'data-font-colour': myAttributes.dataFontColour,
						 'data-button-font-colour': myAttributes.dataButtonFontColour,
						 'data-button-colour': myAttributes.dataButtonColour,
						 'data-enable-placeholders': myAttributes.dataEnablePlaceholders,

						 /**
						  * Tricky part. Reappend skyscanner js loader to reload widgets content when attributes changed. It is that ugly only in admin panel. Will be improved in future releases. Saved block doesn't perform DOM manipulations others then Skyscanner loader does on page load.
						  * @since 1.0.0
						  */
						 onChange: domReady(function() {
							 $('body').on('click', '.skyscanner-widget-container a', function(e){
								 e.preventDefault();
							 });
							 $('body').on('submit', '.skyscanner-widget-container form', function(e){
								 e.preventDefault();
							 });
							 $('#' + myAttributes.blockId + '[data-skyscanner-widget-loaded="true"]')
							 .html( '<img style="display: block; margin: 0 auto;" align="center" src="' + options['loading_path'] + '" />' )
							 .removeAttr('data-skyscanner-widget-loaded')
							 .attr('data-skyscanner-widget', myAttributes.dataSkyscannerWidget)
							 .attr('data-locale', myAttributes.dataLocale)
							 .attr('data-colour', myAttributes.dataColour)
							 .attr('data-target', myAttributes.dataTarget)
							 .attr('data-arrow-icon', myAttributes.dataArrowIcon)
							 .attr('data-button-label', myAttributes.dataButtonLabel)
							 .attr('data-font-colour', myAttributes.dataFontColour)
							 .attr('data-button-colour', myAttributes.dataButtonColour)
							 .attr('data-button-font-colour', myAttributes.dataButtonFontColour)
							 .attr('data-enable-placeholders', myAttributes.dataEnablePlaceholders)
							 .attr('data-associate-id', myAttributes.dataAssociateId);

							 /**
							  * Waits a bit until reacts createElement done and append skyscanner loader
							  * @since 1.0.0
							  */
							 setTimeout(function(){
								 var old = document.getElementById('fswb-skyscanner-loader-script');
								 if( old ) {
									 old.parentNode.removeChild(old);
								 }
								 var script = document.createElement("script");
								 script.src = "https://widgets.skyscanner.net/widget-server/js/loader.js";
								 script.async = true;
								 script.id = 'fswb-skyscanner-loader-script';
								 document.body.appendChild(script);
							 }, 500);
						 }),
					 },
					 el(
						 'img',
						 {
							 src: options['loading_path'],
							 style:
							 {
								 display: 'block',
								 margin: '0 auto',
							 }
						 }
					 )
				 )
			 )
		 },

		 save: function( props ) {

			 var myAttributes = props.attributes;

			 return el(
				 'div',
				 null,
				 el(
					 'div',
					 {
						 id: myAttributes.blockId,
						 'data-skyscanner-widget': myAttributes.dataSkyscannerWidget,
						 'data-locale': myAttributes.dataLocale,
						 'data-button-label': myAttributes.dataButtonLabel,
						 'data-colour': myAttributes.dataColour,
						 'data-target': myAttributes.dataTarget,
						 'data-arrow-icon': myAttributes.dataArrowIcon,
						 'data-associate-id': myAttributes.dataAssociateId,
						 'data-font-colour': myAttributes.dataFontColour,
						 'data-button-font-colour': myAttributes.dataButtonFontColour,
						 'data-button-colour': myAttributes.dataButtonColour,
						 'data-enable-placeholders': myAttributes.dataEnablePlaceholders,
					 },
					 __( 'SkyScanner Simple Flight Search Widget', 'fswb' )
				 )
			);
		},
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.element,
	window.wp.components,
	window.wp.i18n,
	window.wp.domReady,
	options
);
