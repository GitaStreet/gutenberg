/**
 * External dependencies
 */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
/**
 * Internal dependencies
 */
import { COLORS, rtl } from '../../utils';
import NumberControl from '../../number-control';
import type { SelectSize } from '../types';
import { space } from '../../ui/utils/space';

// Using `selectSize` instead of `size` to avoid a type conflict with the
// `size` HTML attribute of the `select` element.
type SelectProps = {
	selectSize: SelectSize;
};

type InputProps = {
	disableUnits?: boolean;
	size: SelectSize;
};

export const Root = styled.div`
	box-sizing: border-box;
	position: relative;
`;

const paddingStyles = ( { disableUnits }: InputProps ) => {
	if ( disableUnits ) return '';

	return css`
		${ rtl( { paddingRight: 8 } )() };
	`;
};

const arrowStyles = ( { disableUnits }: InputProps ) => {
	if ( disableUnits ) return '';

	return css`
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	`;
};

// TODO: Resolve need to use &&& to increase specificity
// https://github.com/WordPress/gutenberg/issues/18483

export const ValueInput = styled( NumberControl )`
	&&& {
		input {
			appearance: none;
			-moz-appearance: textfield;
			display: block;
			width: 100%;

			${ arrowStyles };
			${ paddingStyles };
		}
	}
`;

const baseUnitLabelStyles = ( { selectSize }: SelectProps ) => {
	const base = css`
		appearance: none;
		background: transparent;
		border-radius: 2px;
		border: none;
		box-sizing: border-box;
		display: block;
		outline: none;
		text-align-last: center;

		${ rtl( { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } )() }
	`;
	const defaultLabelSize = css`
		padding: 2px 1px;
		width: 20px;
		color: ${ COLORS.darkGray[ 500 ] };
		font-size: 8px;
		letter-spacing: -0.5px;
		text-transform: uppercase;
	`;
	const largeLabelSize = css`
		padding-left: ${ space( 1 ) };
		padding-right: ${ space( 4 ) };
		color: ${ COLORS.ui.theme };
		font-size: 13px;
	`;
	const labelSize = {
		default: defaultLabelSize,
		small: defaultLabelSize,
		'__unstable-large': largeLabelSize,
	};

	return css`
		${ base };
		${ labelSize[ selectSize ] };
	`;
};

export const UnitLabel = styled.div< SelectProps >`
	&&& {
		pointer-events: none;

		${ baseUnitLabelStyles };
	}
`;

export const UnitSelect = styled.select< SelectProps >`
	&&& {
		${ baseUnitLabelStyles };
		cursor: pointer;
		border: 1px solid transparent;
		height: 100%;
		font-family: inherit;

		&:hover {
			background-color: ${ COLORS.lightGray[ 300 ] };
		}

		&:focus {
			border-color: ${ COLORS.ui.borderFocus };
			outline: 2px solid transparent;
			outline-offset: 0;
		}

		&:disabled {
			cursor: initial;

			&:hover {
				background-color: transparent;
			}
		}
	}
`;
