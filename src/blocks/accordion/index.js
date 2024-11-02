import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

registerBlockType('b-blocks/accordion', {
    title: __('Accordion', 'b-blocks'),
    description: __('Add expandable accordion sections.', 'b-blocks'),
    category: 'widgets',
    icon: 'list-view',
    supports: {
        html: false,
        align: ['wide', 'full']
    },
    attributes: {
        items: {
            type: 'array',
            default: [{
                title: __('Accordion Title', 'b-blocks'),
                content: __('Accordion content goes here...', 'b-blocks'),
                isOpen: false
            }]
        },
        style: {
            type: 'string',
            default: 'style1'
        },
        expandIcon: {
            type: 'string',
            default: 'plus'
        },
        collapseIcon: {
            type: 'string',
            default: 'minus'
        },
        textColor: {
            type: 'string',
            default: '#222'
        },
        backgroundColor: {
            type: 'string',
            default: '#fff'
        }
    },
    edit: Edit,
    save: Save,
});