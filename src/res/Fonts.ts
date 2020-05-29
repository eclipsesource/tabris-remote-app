import { shared } from 'tabris-decorators';
import { resolve } from './resource';
import { FontValue } from 'tabris';

@shared export class Fonts {

  public h4: FontValue = resolve({ value: '34px', ios: 'bold 34px' });
  public h5: FontValue = resolve({ value: '24px', ios: 'bold 24px' });
  public h6: FontValue = resolve({ value: 'medium 20px', ios: 'bold 20px' });
  public subtitle1: FontValue = '16px';
  public subtitle2: FontValue = 'medium 14px';
  public body1: FontValue = '16px';
  public body2: FontValue = '14px';

}
