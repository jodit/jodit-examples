## Use ESM build

This example demonstrates how to use the ESM build of Jodit.
Without webpack, you can use the ESM build of Jodit by importing it directly into your HTML file.

```html
<script type="importmap">
	{
		"imports": {
			"autobind-decorator": "https://cdn.jsdelivr.net/npm/autobind-decorator@2.4.0/+esm",
			"jodit-pro": "https://cdn.jsdelivr.net/npm/jodit-pro@4.3.2/esm/index.js",
			"jodit": "https://cdn.jsdelivr.net/npm/jodit@4.3.2/esm/index.js",
			"jodit/": "https://cdn.jsdelivr.net/npm/jodit@4.3.2/esm/"
		}
	}
</script>
<script type="module">
	import { Jodit } from 'jodit';
	//import { Jodit } from 'jodit-pro';

	const editor = Jodit.make('#editor');
</script>
```
