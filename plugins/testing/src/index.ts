import { intercept } from '@neptune';

import allActions from 'lib/actions';

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
