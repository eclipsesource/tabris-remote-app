import { device } from 'tabris';
import { resolve } from './resource';

class Dimen {

  public xxxs: number = resolve({ value: 2 });
  public xxs: number = resolve({ value: 4 });
  public xs: number = resolve({ value: 8 });
  public s: number = resolve({ value: 12 });
  public m: number = resolve({ value: 16 });
  public l: number = resolve({ value: 24 });
  public xl: number = resolve({ value: 32 });
  public xxl: number = resolve({ value: 48 });
  public xxxl: number = resolve({ value: 72 });

  public p: string = 'prev()';
  public pxxxs: [string, number] = ['prev()', this.xxxs];
  public pxxs: [string, number] = ['prev()', this.xxs];
  public pxs: [string, number] = ['prev()', this.xs];
  public ps: [string, number] = ['prev()', this.s];
  public pm: [string, number] = ['prev()', this.m];
  public pl: [string, number] = ['prev()', this.l];
  public pxl: [string, number] = ['prev()', this.xl];
  public pxxl: [string, number] = ['prev()', this.xxl];
  public pxxxl: [string, number] = ['prev()', this.xxxl];

  public n: string = 'next()';
  public nxxxs: [string, number] = ['next()', this.xxxs];
  public nxxs: [string, number] = ['next()', this.xxs];
  public nxs: [string, number] = ['next()', this.xs];
  public ns: [string, number] = ['next()', this.s];
  public nm: [string, number] = ['next()', this.m];

  public cardCornerRadius: number = resolve({ value: 8, ios: 12 });
  public urlBarHeight: number = resolve({ value: 48, ios: 40 });
  public urlBarTop: number = resolve({ value: 16 });
  public urlBarCornerRadius: number = resolve({ value: 8, ios: 12 });
  public urlInputOneIconSpacing: number = resolve({ value: 32, ios: 40 });

  public isSmallDevice() {
    return device.screenWidth <= 360;
  }

}

export default new Dimen();
