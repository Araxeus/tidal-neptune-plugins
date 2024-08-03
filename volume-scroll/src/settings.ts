import { html } from '@neptune/voby';
import { getSettings } from '../lib/storage';
import { SwitchSetting } from '../lib/components/switch-settings';

export const settings = getSettings({
    useTidalFullscreen: false as boolean,
});

export const Settings = () => html`<div>
	<${SwitchSetting} checked=${settings.useTidalFullscreen} onClick=${() => {
        settings.useTidalFullscreen = !settings.useTidalFullscreen;
    }} title="Always use Tidal Fullscreen mode" />
</div>`;
