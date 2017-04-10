import { Browser, Util } from 'maptalks';
export const maxUniformLength = (Browser.ie || Browser.edge) ? 504 : Util.isNode ? 1014 : 3900;
