import React, { MouseEvent } from 'react';
import { createRoot } from 'react-dom/client';
import JoditEditor from 'jodit-react';

import './index.css';

type SizeType = 'tiny' | 'xsmall' | 'small' | 'middle' | 'large';
const sizes: SizeType[] = ['tiny', 'xsmall', 'small', 'middle', 'large'];

function App() {
	const [size, setSize] = React.useState<SizeType>('middle');

	const config = React.useMemo(
		() => ({
			toolbarButtonSize: size
		}),
		[size]
	);

	const onClick = React.useCallback((e: MouseEvent) => {
		if (e.target instanceof HTMLElement)
			setSize(e.target.dataset.size as SizeType);
	}, []);

	return (
		<div>
			<div className={'button-group'}>
				{sizes.map((s) => (
					<button
						onClick={onClick}
						data-size={s}
						key={s}
						className={`button button-${s}`}
						aria-pressed={s === size}
					>
						{s}
					</button>
				))}
			</div>
			<JoditEditor config={config} value={''} />
		</div>
	);
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
