# Use ESM build

This example demonstrates how to use the ESM build of Jodit.
Without webpack, you can use the ESM build of Jodit by importing it directly into your HTML file.

```html
<script type="module">
  import { Jodit } from 'https://cdn.jsdelivr.net/npm/jodit@3.5.0/dist/jodit.esm.min.js';

  const editor = new Jodit.default('#editor');
</script>
```
