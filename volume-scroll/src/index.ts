import { actions, store } from '@neptune';
import { settings } from './settings';

const audioElement = document.querySelector<HTMLElement>(
    '#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]',
);

audioElement?.addEventListener('wheel', onWheel);

// Event.deltaY < 0 means wheel-up (increase), > 0 means wheel-down (decrease)
function onWheel(e: WheelEvent) {
    if (!e.deltaY) return;
    e.preventDefault();
    const toIncrease = e.deltaY < 0;
    if (settings.precise) {
        changeVolumePrecise(toIncrease);
    } else {
        changeVolume(toIncrease);
    }
}

function changeVolume(toIncrease: boolean) {
    toIncrease
        ? actions.playbackControls.increaseVolume()
        : actions.playbackControls.decreaseVolume();
}

function changeVolumePrecise(toIncrease: boolean) {
    const currentVolume = store.getState().playbackControls.volume;
    const volume = Math.round(
        toIncrease
            ? Math.min(currentVolume + 1, 100)
            : Math.max(currentVolume - 1, 0),
    );
    actions.playbackControls.setVolume({ volume });
}

export function onUnload() {
    audioElement?.removeEventListener('wheel', onWheel);
}
