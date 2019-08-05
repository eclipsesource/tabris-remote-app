export default interface ScrollReceiver {

  onScroll(delty: number): any;

  resetScrollPosition(animated: boolean): any;

}
