import { shared } from 'tabris-decorators';
import { ColorValue } from 'tabris';

@shared export class Colors {

  public primary: ColorValue = '#039be5';
  public primaryDark: ColorValue = '#0288d1';
  public primaryLight: ColorValue = '#00dfff';
  public secondary: ColorValue = '#ffab00';
  public secondaryVariant: ColorValue = '#ffd740';
  public background: ColorValue = '#ffffff';
  public surface: ColorValue = '#ffffff';

  public onPrimary: ColorValue = '#ffffff';
  public onPrimaryMedium: ColorValue = '#ffffffdc';
  public onSecondary: ColorValue = '#ffffffff';
  public onBackground: ColorValue = '#000000de';
  public onBackgroundMedium: ColorValue = '#00000099';
  public onBackgroundDivider: ColorValue = '#0000001e';
  public onSurface: ColorValue = this.onBackground;
  public onSurfaceMedium: ColorValue = this.onBackgroundMedium;
  public onSurfaceDivider: ColorValue = this.onBackgroundDivider;

  public actionIcon: ColorValue = '#757575';
  public actionIconMedium: ColorValue = '#bdbdbd';

  public tabBackground: ColorValue = '#efefef';

}
