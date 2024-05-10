# Use ESM build

This example demonstrates how to use the ESM build of Jodit.
Without webpack, you can use the ESM build of Jodit by importing it directly into your HTML file.

```html
<script type="importmap">
    {
        "imports": {
            "autobind-decorator": "https://cdn.jsdelivr.net/npm/autobind-decorator@2.4.0/+esm",
            "jodit": "/node_modules/jodit/esm/index.js"
        }
    }
</script>
<link rel="stylesheet" href="/node_modules/jodit/es2021.en/jodit.fat.min.css">
<script type="module">
    import {Jodit} from 'jodit';
    const editor = new Jodit('#root');
</script>
```
