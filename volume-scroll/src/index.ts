import {
    //intercept,
    actions,
} from '@neptune';

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

// This is where you would typically put cleanup code.
export function onUnload() {
    audioElement?.removeEventListener('wheel', onWheel);
}

// import { settings } from './settings';

// let enterNormalFullscreen: true | undefined = undefined;
// const unloadInterceptAllowed = intercept('view/FULLSCREEN_ALLOWED', () => {
//     if (enterNormalFullscreen || settings.useTidalFullscreen) {
//         enterNormalFullscreen = undefined;
//         return true;
//     }
//     return true;
// });
// const unloadInterceptRequest = intercept('view/REQUEST_FULLSCREEN', () => {
//     enterNormalFullscreen = true;
// });
// const onKeyDown = (event: KeyboardEvent) => {
//     if (event.key === 'F11') {
//         event.preventDefault();
//         document.fullscreenElement
//             ? document.exitFullscreen()
//             : document.documentElement.requestFullscreen();

//         if (!settings.useTidalFullscreen && !document.fullscreenElement) {
//             const bar = document.querySelector<HTMLElement>(
//                 "div[class^='bar--']",
//             );
//             const contentContainer = document.querySelector<HTMLElement>(
//                 "div[class^='mainContainer--'] > div[class^='containerRow--']",
//             );

//             if (bar !== null && contentContainer !== null) {
//                 if (document.fullscreenElement) {
//                     // Exiting fullscreen
//                     contentContainer.style.maxHeight = '';
//                     bar.style.display = '';
//                     document.body.removeAttribute('is-fullscreen');
//                 } else {
//                     // Entering fullscreen
//                     contentContainer.style.maxHeight = '100%';
//                     bar.style.display = 'none';
//                     document.body.setAttribute('is-fullscreen', '');
//                 }
//             }
//         }
//     }
// };
// window.addEventListener('keydown', onKeyDown);
// export const onUnload = () => {
//     unloadInterceptAllowed();
//     unloadInterceptRequest();
//     window.removeEventListener('keydown', onKeyDown);
// };
// export { Settings } from './settings';
