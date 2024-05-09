import React from "react";
import { createRoot } from "react-dom/client";
import JoditEditor, { Jodit } from "jodit-pro-react";

import "./index.css";

const { component, watch } = Jodit.decorators;

@component
class UIButtonX extends Jodit.modules.UIElement {
	className(): string {
		return "UIButtonX";
	}

	state = {
		value: 1
	};

	render() {
		return `<div><span class="&__counter">1</span></div>`;
	}

	@watch("state.value")
	protected onChangeValue() {
		this.getElm("counter")!.innerText = this.state.value.toString();
	}

	@watch("container:click")
	protected onClick() {
		console.log("click");
		this.state.value += 1;
	}
}

function App() {
	const [value, setValue] = React.useState("Editor");

	const config = React.useMemo(
		() => ({
			toolbarAdaptive: false,
			buttons: [
				"image",
				"bold",
				{
					name: "button",
					iconURL: require("./icon.svg"),
					popup: (jodit: Jodit) => {
						const btn = new UIButtonX(jodit);
						return btn.container;
					}
				}
			]
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

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
