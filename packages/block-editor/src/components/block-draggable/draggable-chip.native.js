/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { dragHandle } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import styles from './style.scss';
import { store as blockEditorStore } from '../../store';

const shadowStyle = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,

	elevation: 5,
};

export default function BlockDraggableChip() {
	const { blockIcon } = useSelect( ( select ) => {
		const { getBlockName, getDraggedBlockClientIds } = select(
			blockEditorStore
		);
		const draggedBlockClientIds = getDraggedBlockClientIds();
		const blockName = getBlockName( draggedBlockClientIds[ 0 ] );

		return {
			blockIcon: getBlockType( blockName )?.icon,
		};
	} );

	return (
		<View style={ [ styles[ 'draggable-chip__container' ], shadowStyle ] }>
			<BlockIcon icon={ dragHandle } />
			<BlockIcon icon={ blockIcon } />
		</View>
	);
}