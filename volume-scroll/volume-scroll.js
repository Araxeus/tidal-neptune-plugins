import { intercept } from '@neptune';
import { html as vobyHtml } from '@neptune/voby';
import { storage as pluginStorage } from '@plugin';

const initializeSettings = (defaults) => {
    pluginStorage.settings ??= {};
    for (const key of Object.keys(defaults)) {
        pluginStorage.settings[key] ??= defaults[key];
    }
    return pluginStorage.settings;
};

import { html as vobyHtmlInstance1 } from '@neptune/voby';
import { html as vobyHtmlInstance2 } from '@neptune/voby';

const TooltipContainer = ({ children, tooltip }) => vobyHtmlInstance2`
	<div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;" title="${tooltip}">
        ${children}
    </div>
`;

const Switch = ({ checked, onClick, title, tooltip }) => (
    (checked ??= false),
    vobyHtmlInstance1`
		<${TooltipContainer} tooltip=${tooltip}>
			<label for="switch-${title}" style="font-size: 1.2em; margin-bottom: 5px;">${title}</label>
			<input id="switch-${title}" class="neptune-switch-checkbox" type="checkbox" checked=${checked} />
			<span onClick=${onClick} class="neptune-switch" />
		<//>
	`
);

const settings = initializeSettings({ useTidalFullscreen: false });

const Settings = () => vobyHtml`
    <div>
        <${Switch} checked=${settings.useTidalFullscreen} onClick=${() => (settings.useTidalFullscreen = !settings.useTidalFullscreen)} title="Always use Tidal Fullscreen mode" />
    </div>
`;

let enterNormalFullscreen;
const unloadInterceptAllowed = intercept('view/FULLSCREEN_ALLOWED', () =>
    enterNormalFullscreen || settings.useTidalFullscreen
        ? (enterNormalFullscreen = undefined)
        : true,
);
const unloadInterceptRequest = intercept('view/REQUEST_FULLSCREEN', () => {
    enterNormalFullscreen = true;
});

const onKeyDown = (event) => {
    if (event.key === 'F11') {
        event.preventDefault();
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }

        if (!settings.useTidalFullscreen && !document.fullscreenElement) {
            const barElement = document.querySelector("div[class^='bar--']");
            const contentContainerElement = document.querySelector(
                "div[class^='mainContainer--'] > div[class^='containerRow--']",
            );

            if (barElement !== null && contentContainerElement !== null) {
                if (document.fullscreenElement) {
                    contentContainerElement.style.maxHeight = '';
                    barElement.style.display = '';
                    document.body.removeAttribute('is-fullscreen');
                } else {
                    contentContainerElement.style.maxHeight = '100%';
                    barElement.style.display = 'none';
                    document.body.setAttribute('is-fullscreen', '');
                }
            }
        }
    }
};

window.addEventListener('keydown', onKeyDown);

const onUnload = () => {
    unloadInterceptAllowed();
    unloadInterceptRequest();
    window.removeEventListener('keydown', onKeyDown);
};

export { Settings, onUnload };
