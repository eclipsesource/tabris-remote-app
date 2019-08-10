
class Color {

  public primary: string = '#039be5';
  public primaryDark: string = '#0288d1';
  public primaryLight: string = '#00dfff';
  public secondary: string = '#ffab00';
  public secondaryVariant: string = '#ffd740';
  public background: string = '#ffffff';
  public surface: string = '#ffffff';

  public onPrimary: string = '#ffffff';
  public onPrimaryMedium: string = '#ffffffdc';
  public onSecondary: string = '#ffffffff';
  public onBackground: string = '#000000de';
  public onBackgroundMedium: string = '#00000099';
  public onBackgroundDivider: string = '#0000001e';
  public onSurface: string = this.onBackground;
  public onSurfaceMedium: string = this.onBackgroundMedium;
  public onSurfaceDivider: string = this.onBackgroundDivider;

  public actionIcon: string = '#757575';
  public actionIconMedium: string = '#bdbdbd';

  public tabBackground: string = '#efefef';

}

export default new Color();
