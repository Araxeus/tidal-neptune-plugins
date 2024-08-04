import { html } from '@neptune/voby';
import { NumberRangeInput } from 'lib/components/number-input';
import { getSettings } from 'lib/storage';

export const settings = getSettings({
    steps: 10,
});
export const Settings = () => html`<div>
    	<${NumberRangeInput}
		value=${settings.steps}
		onValue=${(text: string) => {
            settings.steps = parseInt(text);
        }}
		title="Volume Steps"
		tooltip="The volume percentage to adjust by"
	/>
</div>`;
