import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { items, style, expandIcon, collapseIcon, textColor, backgroundColor } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `b-blocks-accordion style-${style}`,
        style: {
            '--text-color': textColor,
            '--bg-color': backgroundColor,
        },
    });

    return (
        <div {...blockProps}>
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <div 
                        className={`accordion-header ${item.isOpen ? 'active' : ''}`}
                        data-index={index}
                    >
                        <RichText.Content
                            tagName="h4"
                            value={item.title}
                        />
                        <span className="accordion-icon">
                            {item.isOpen ? collapseIcon : expandIcon}
                        </span>
                    </div>
                    <div className={`accordion-content ${item.isOpen ? 'active' : ''}`}>
                        <RichText.Content
                            tagName="div"
                            value={item.content}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Save;