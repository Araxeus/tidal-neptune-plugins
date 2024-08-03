import { html } from '@neptune/voby';
import { SwitchSetting } from '../lib/components/switch-settings';
import { getSettings } from '../lib/storage';

export const settings = getSettings({
    precise: false as boolean,
});

export const Settings = () => html`<div>
	<${SwitchSetting} checked=${settings.precise} onClick=${() => {
        settings.precise = !settings.precise;
    }} title="Always use Tidal Fullscreen mode" />
</div>`;
