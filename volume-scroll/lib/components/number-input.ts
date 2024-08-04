import { html, $ } from '@neptune/voby';
import { DivWithTooltip } from './div-with-tooltip';

type NumberInputProps = {
    value: number;
    onValue?: (text: string) => void;
    title: string;
    tooltip?: string;
};
export const NumberRangeInput = ({
    value,
    onValue,
    title,
    tooltip,
}: NumberInputProps) => {
    const reactiveValue = $(value);
    const onChange = (event: Event) => {
        if (parseInt((event.target as HTMLInputElement).value) < 1) {
            // @ts-expect-error
            event.target.value = '1';
            return;
        }
        onValue?.((event.target as HTMLInputElement).value);
    };

    const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        const step = event.deltaY < 0 ? 1 : -1;
        const newValue = Math.min(20, Math.max(1, reactiveValue() + step));
        reactiveValue(newValue);
        onValue?.(newValue.toString());
    };

    return html`
		<${DivWithTooltip} tooltip=${tooltip}>
			<label for="text-${title}" style="font-size: 1.2em;margin-right: 16px;">${title}</label>
			<input type="number" min="1" max="20" id="text-${title}" value=${reactiveValue} onChange=${onChange} onwheel=${onWheel} style="flex-grow: 1; max-width: 35px; margin-right: 8px;" />
            <input type="range" min="0" max="20" id="range-${title}" value=${reactiveValue} onChange=${onChange} onwheel=${onWheel} style="flex-grow: 1;" />
		<//>
	`;
};
