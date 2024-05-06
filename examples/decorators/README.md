## Use decorators

This example demonstrates how to use decorators to add custom functionality to the Jodit editor.

```typescript
import { Jodit } from 'jodit';
const { component } = Jodit.decorators;

@component
class UIButtonX extends Jodit.modules.UIElement {}
```
