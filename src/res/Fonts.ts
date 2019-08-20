import { shared } from 'tabris-decorators';
import { resolve } from './resource';

@shared export class Fonts {

  public h4: string = resolve({ value: '34px', ios: 'bold 34px' });
  public h5: string = resolve({ value: '24px', ios: 'bold 24px' });
  public h6: string = resolve({ value: 'medium 20px', ios: 'bold 20px' });
  public subtitle1: string = '16px';
  public subtitle2: string = 'medium 14px';
  public body1: string = '16px';
  public body2: string = '14px';

}
