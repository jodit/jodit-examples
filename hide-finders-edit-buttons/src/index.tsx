import React from 'react';
import { createRoot } from 'react-dom/client';
import JoditEditor, { Jodit } from 'jodit-pro-react';

import './index.css';

function App() {
	const [value, setValue] = React.useState('Editor');

	const config = React.useMemo(
		() => ({
			toolbarAdaptive: false,
			buttons: ['image', 'bold', 'about'],
			filebrowser: {
				permissionsPresets: {
					allowFiles: false,
					allowFileMove: false,
					allowFileUpload: false,
					allowFileUploadRemote: false,
					allowFileRemove: false,
					allowFileRename: false,
					allowFolders: false,
					allowFolderCreate: false,
					allowFolderMove: false,
					allowFolderRemove: false,
					allowFolderRename: false,
					allowImageResize: false,
					allowImageCrop: false
				},
				ajax: {
					url: 'https://xdsoft.net/jodit/finder/'
				}
			}
		}),
		[]
	);

	const onChangeValue = React.useCallback((newValue: string) => {
		setValue(newValue);
	}, []);

	return (
		<div>
			<JoditEditor config={config} value={value} onBlur={onChangeValue} />
		</div>
	);
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
