import { actions, intercept, store } from '@neptune';
import { settings } from './settings';

type Div = HTMLDivElement | undefined | null;

let footerPlayer: Div;
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
    footerPlayer ??= document.querySelector<HTMLDivElement>('#footerPlayer');
    audioElement ??= footerPlayer?.querySelector<HTMLDivElement>(
        '#footerPlayer>[class^="moreContainer"]>[class^="sliderContainer"]',
    );
    onWheelElement ??= footerPlayer;
    if (onWheelElement) {
        onWheelElement.addEventListener('wheel', onWheel);
        console.log('Set up volume wheel control');
        setupDone = true;
    }
}

const unloadIntercept = intercept(
    'playbackControls/SET_VOLUME',
    setup,
    true,
);
setup();

import allActions from 'lib/actions' ;

intercept(allActions, console.log);

// intercept([
//     'page/IS_DONE_LOADING',
//     'playQueue/LOAD_PLAYER_SETTINGS_FROM_LOCAL_STORAGE_SUCCESS',
//     'launchHandler/LAUNCH',
//     'session/RECEIVED_COUNTRY_CODE',
//     'locale/LOAD_BUNDLE_SUCCESS',
//     'windows/ACTIVATED',
//     'userProfiles/INITIALIZE_USER_PROFILE',
//     'userProfiles/FETCH_USER_PROFILE_DATA_SUCCESS',
//     'user/LOAD_USER_SUCCESS',
//     'player/SET_ACTIVE_PLAYER',
//     'player/SET_CURRENT_STREAMING_SESSION_ID',
//     'playbackControls/SET_PLAYBACK_STATE'
// ], console.log);

export function onUnload() {
    unloadIntercept();
    onWheelElement?.removeEventListener('wheel', onWheel);
}
export { Settings } from './settings';
