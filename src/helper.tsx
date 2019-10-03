import { device, statusBar } from 'tabris';
import dimen from './res/dimen';

export const isAndroid = () => device.platform === 'Android';
export const isIos = () => device.platform === 'iOS';

export const statusBarOffset = () => isIos() ? 0 : statusBar.height;
export const contentTopOffset = () => statusBarOffset() + dimen.urlBarHeight + dimen.urlBarTop;
