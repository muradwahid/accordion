import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    Button,
    ButtonGroup,
} from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { items, style, expandIcon, collapseIcon, textColor, backgroundColor } = attributes;

    const blockProps = useBlockProps({
        className: `b-blocks-accordion style-${style}`,
        style: {
            '--text-color': textColor,
            '--bg-color': backgroundColor,
        },
    });

    const addNewItem = () => {
        const newItems = [...items, {
            title: __('New Accordion Title', 'b-blocks'),
            content: __('New accordion content...', 'b-blocks'),
            isOpen: false
        }];
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setAttributes({ items: newItems });
    };

    const updateItemTitle = (title, index) => {
        const newItems = [...items];
        newItems[index].title = title;
        setAttributes({ items: newItems });
    };

    const updateItemContent = (content, index) => {
        const newItems = [...items];
        newItems[index].content = content;
        setAttributes({ items: newItems });
    };

    const toggleItem = (index) => {
        const newItems = items.map((item, i) => ({
            ...item,
            isOpen: i === index ? !item.isOpen : false
        }));
        setAttributes({ items: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Accordion Settings', 'b-blocks')}>
                    <SelectControl
                        label={__('Style', 'b-blocks')}
                        value={style}
                        options={[
                            { label: 'Style 1', value: 'style1' },
                            { label: 'Style 2', value: 'style2' },
                            { label: 'Style 3', value: 'style3' },
                            { label: 'Style 4', value: 'style4' },
                            { label: 'Style 5', value: 'style5' },
                        ]}
                        onChange={(value) => setAttributes({ style: value })}
                    />
                    <SelectControl
                        label={__('Expand Icon', 'b-blocks')}
                        value={expandIcon}
                        options={[
                            { label: 'Plus', value: 'plus' },
                            { label: 'Arrow Down', value: 'arrow-down' },
                            { label: 'Chevron Down', value: 'chevron-down' },
                        ]}
                        onChange={(value) => setAttributes({ expandIcon: value })}
                    />
                    <SelectControl
                        label={__('Collapse Icon', 'b-blocks')}
                        value={collapseIcon}
                        options={[
                            { label: 'Minus', value: 'minus' },
                            { label: 'Arrow Up', value: 'arrow-up' },
                            { label: 'Chevron Up', value: 'chevron-up' },
                        ]}
                        onChange={(value) => setAttributes({ collapseIcon: value })}
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Text Color', 'b-blocks')}
                        </label>
                        <ColorPalette
                            value={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                        />
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Color', 'b-blocks')}
                        </label>
                        <ColorPalette
                            value={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {items.map((item, index) => (
                    <div key={index} className="accordion-item">
                        <div 
                            className={`accordion-header ${item.isOpen ? 'active' : ''}`}
                            onClick={() => toggleItem(index)}
                        >
                            <RichText
                                tagName="h4"
                                value={item.title}
                                onChange={(value) => updateItemTitle(value, index)}
                                placeholder={__('Add title...', 'b-blocks')}
                            />
                            <span className="accordion-icon">
                                {item.isOpen ? collapseIcon : expandIcon}
                            </span>
                            <Button
                                isDestructive
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(index);
                                }}
                                className="remove-item"
                            >
                                {__('Remove', 'b-blocks')}
                            </Button>
                        </div>
                        {item.isOpen && (
                            <div className="accordion-content">
                                <RichText
                                    tagName="div"
                                    value={item.content}
                                    onChange={(value) => updateItemContent(value, index)}
                                    placeholder={__('Add content...', 'b-blocks')}
                                />
                            </div>
                        )}
                    </div>
                ))}
                <Button
                    variant="secondary"
                    onClick={addNewItem}
                    className="add-new-item"
                >
                    {__('Add New Accordion Item', 'b-blocks')}
                </Button>
            </div>
        </>
    );
};

export default Edit;