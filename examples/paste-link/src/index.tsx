import React from 'react';
import { createRoot } from 'react-dom/client';
import JoditEditor, { Jodit } from 'jodit-react';

import './index.css';

function preparePaste(jodit: Jodit) {
	jodit.e.on(
		'paste',
		(e: ClipboardEvent) => {
			const html = Jodit.modules.Helpers.getDataTransfer(e)!.getData(
				Jodit.constants.TEXT_PLAIN
			);

			if (Jodit.modules.Helpers.isURL(html)) {
				jodit.e.stopPropagation('paste');
				const range = jodit.s.range;
				const fragment = range.extractContents();
				const a = jodit.createInside.a();
				a.href = html;
				a.appendChild(fragment);
				range.insertNode(a);

				if (!a.textContent) {
					a.innerText = html;
				}

				jodit.synchronizeValues();

				return false;
			}
		},
		{ top: true }
	);
}

Jodit.plugins.add('preparePaste', preparePaste);

function App() {
	const [value, setValue] = React.useState('Editor');

	const config = React.useMemo(
		() => ({
			toolbarAdaptive: false,
			buttons: ['image', 'bold']
		}),
		[]
	);

	const onChangeValue = React.useCallback((newValue: string) => {
		setValue(newValue);
	}, []);

	return (
		<div>
			<h1>Paste example</h1>
			<p>Try paste link. It will be wrapped inside &lt;A&gt; tag</p>
			<JoditEditor config={config} value={value} onBlur={onChangeValue} />
		</div>
	);
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
