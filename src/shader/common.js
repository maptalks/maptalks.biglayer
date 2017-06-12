import { Browser, Util } from 'maptalks';
export const maxUniformLength = (Browser.ie || Browser.edge) ? 504 : Util.IS_NODE ? 1014 : 240; // 3900 for 64-bit chrome 56.0, 240 for 32-bit chrome 56.0
