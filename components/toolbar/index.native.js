/**
 * External dependencies
 */
import classnames from 'classnames';
import { flatMap } from 'lodash';
import { View } from 'react-native';

/**
 * Internal dependencies
 */
import styles from './style.scss';
import IconButton from '../icon-button';

function Toolbar( { controls = [], children, className } ) {
	if (
		( ! controls || ! controls.length ) &&
		! children
	) {
		return null;
	}

	// Normalize controls to nested array of objects (sets of controls)
	let controlSets = controls;
	if ( ! Array.isArray( controlSets[ 0 ] ) ) {
		controlSets = [ controlSets ];
	}

	return (
		<View style={ [ styles[ 'components-toolbar' ], className ] }>
			{ flatMap( controlSets, ( controlSet, setIndex ) => (
				controlSet.map( ( control, controlIndex ) => (
					<div
						key={ [ setIndex, controlIndex ].join() }
						className={ setIndex > 0 && controlIndex === 0 ? 'has-left-divider' : null }
					>
						<IconButton
							icon={ control.icon }
							label={ control.title }
							data-subscript={ control.subscript }
							onClick={ ( event ) => {
								event.stopPropagation();
								control.onClick();
							} }
							className={ classnames( 'components-toolbar__control', {
								'is-active': control.isActive,
							} ) }
							aria-pressed={ control.isActive }
							disabled={ control.isDisabled }
						/>
						{ control.children }
					</div>
				) )
			) ) }
			{ children }
		</View>
	);
}

export default Toolbar;
