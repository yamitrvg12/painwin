import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Canvas.styled';
import { useOnDraw } from '../util/Hooks';

const Canvas = ({ width, height }) => {
	const { setCanvasRef, onMouseDown } = useOnDraw(onDraw);

	function onDraw(ctx, point) {
		ctx.lineWidth = 1;
		ctx.lineCap = 'round';
		ctx.lineTo(point.x, point.y);
		ctx.strokeStyle = '#f2f';
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
	}

	return (
		<Styled.Canvas
			width={width}
			height={height}
			ref={setCanvasRef}
			onMouseDown={onMouseDown}
		/>
	);
};

Canvas.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};

export default Canvas;
