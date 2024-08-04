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
    const onChange = (event: Event) =>
        onValue?.((event.target as HTMLInputElement).value);

    return html`
		<${DivWithTooltip} tooltip=${tooltip}>
			<label for="text-${title}" style="font-size: 1.2em;margin-right: 16px;">${title}</label>
			<input type="number" min="1" max="20" id="text-${title}" value=${reactiveValue} onChange=${onChange} style="flex-grow: 1;" />
            <input type="range" min="1" max="20" id="range-${title}" value=${reactiveValue} onChange=${onChange} style="flex-grow: 1;" />
		<//>
	`;
};
