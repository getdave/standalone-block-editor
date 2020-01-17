const { __ } = wp.i18n;
const {
	InnerBlocks,
} = wp.editor;

const makeEdit = function(template) {
	return function({ attributes, setAttributes }) {
		return (          
			<InnerBlocks
				template={template}
			/>
		);
	}
};

export default makeEdit;