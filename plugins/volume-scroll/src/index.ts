import { actions, intercept, store } from '@neptune';
import { settings } from './settings';

type Div = HTMLDivElement | undefined | null;

let audioElement: Div;
let onWheelElement: Div;

// Event.deltaY < 0 means wheel-up (increase), > 0 means wheel-down (decrease)
function onWheel(e: WheelEvent) {
    if (!e.deltaY) return;
    e.preventDefault();
    const toIncrease = e.deltaY < 0;
    if (settings.steps === 10) {
        changeVolumeBy10(toIncrease);
    } else {
        changeVolumePrecise(toIncrease);
    }
    showVolume();
}

function changeVolumeBy10(toIncrease: boolean) {
    toIncrease
        ? actions.playbackControls.increaseVolume()
        : actions.playbackControls.decreaseVolume();
}

function changeVolumePrecise(toIncrease: boolean) {
    const currentVolume = store.getState().playbackControls.volume;
    const volume = Math.round(
        toIncrease
            ? Math.min(currentVolume + settings.steps, 100)
            : Math.max(currentVolume - settings.steps, 0),
    );
    actions.playbackControls.setVolume({ volume });
}

function showVolume() {
    audioElement?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    setTimeout(() => {
        audioElement?.dispatchEvent(
            new MouseEvent('mouseout', { bubbles: true }),
        );
    }, 500);
}

let setupDone = false;
function setup() {
    if (setupDone) return;
    onWheelElement ??= document.querySelector<HTMLDivElement>('#footerPlayer');
    audioElement ??= onWheelElement?.querySelector<HTMLDivElement>(
        '#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]',
    );
    if (onWheelElement) {
        onWheelElement.addEventListener('wheel', onWheel);
        console.log('Set up volume wheel control');
        setupDone = true;
    }
}
// session/TOGGLE_SHOW_DESKTOP_RELEASE_NOTES
// eventTracking/DISPLAY_PAGE
// page/IS_DONE_LOADING
const unloadIntercept = intercept('favorites/SET_FAVORITE_IDS', setup, true);
setup();

export function onUnload() {
    unloadIntercept();
    onWheelElement?.removeEventListener('wheel', onWheel);
}
export { Settings } from './settings';
