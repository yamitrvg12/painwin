import { useCallback, useEffect, useRef } from 'react';

export const useOnDraw = (onDraw) => {
	const canvasRef = useRef(null);
	let isDrawingRef = useRef(false);
	let ctx = null;

	const initMouseMoveListener = useCallback(
		(e) => {
			if (!isDrawingRef.current) return;

			const point = computePointInCanvas(e.clientX, e.clientY);

			onDraw(ctx, point);
		},
		[ctx, onDraw]
	);

	const initMouseUpListener = useCallback(() => {
		isDrawingRef.current = false;
		ctx.beginPath();
	}, [ctx]);

	function onMouseDown(e) {
		isDrawingRef.current = true;
		initMouseMoveListener(e);
	}

	function computePointInCanvas(clientX, clientY) {
		const { left, top } = canvasRef.current.getBoundingClientRect();

		return {
			x: clientX - left,
			y: clientY - top,
		};
	}

	useEffect(() => {
		if (canvasRef.current && onDraw) {
			window.addEventListener('mousemove', initMouseMoveListener);
			window.addEventListener('mouseup', initMouseUpListener);
		}

		return () => {
			window.removeEventListener('mousemove', initMouseMoveListener);
			window.removeEventListener('mouseup', initMouseUpListener);
		};
	}, [initMouseMoveListener, initMouseUpListener, onDraw]);

	function crispAllMonitors() {
		const dpr = window.devicePixelRatio;
		const canvasRefCurrent = canvasRef.current;
		const { width, height } = canvasRefCurrent.getBoundingClientRect();

		canvasRefCurrent.width = width * dpr;
		canvasRefCurrent.height = height * dpr;
		canvasRefCurrent.style.width = width + 'px';
		canvasRefCurrent.style.height = height + 'px';

		ctx = canvasRefCurrent.getContext('2d');
		ctx.scale(dpr, dpr);
	}

	function setCanvasRef(ref) {
		if (!ref) return;

		canvasRef.current = ref;
		crispAllMonitors();
	}

	return {
		setCanvasRef,
		onMouseDown,
	};
};
