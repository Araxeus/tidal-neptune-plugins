import { actions } from '@neptune';

const audioElement = document.querySelector<HTMLElement>(
    '#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]',
);

function onWheel(e: WheelEvent) {
    e.preventDefault();
    if (e.deltaY > 0) {
        actions.playbackControls.decreaseVolume();
    } else {
        actions.playbackControls.increaseVolume();
    }
}

audioElement?.addEventListener('wheel', onWheel);

export function onUnload() {
    audioElement?.removeEventListener('wheel', onWheel);
}
