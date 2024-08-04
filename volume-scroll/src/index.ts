import { actions, store } from '@neptune';
import { settings } from './settings';

const footerPlayer = document.querySelector<HTMLElement>('#footerPlayer');
const audioElement = footerPlayer?.querySelector<HTMLElement>(
    '#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]',
);
const onWheelElement = footerPlayer;

onWheelElement?.addEventListener('wheel', onWheel);

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
        audioElement?.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
    }, 500);
}

export function onUnload() {
    onWheelElement?.removeEventListener('wheel', onWheel);
}
export { Settings } from './settings';
