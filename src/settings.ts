class Settings {

  private SCHEME: string = 'tabris-js-app:';
  private KEY_ONBOARDING_COMPLETE: string = this.SCHEME + 'onboarding-complete';
  private KEY_SELECTED_TAB_ID: string = this.SCHEME + 'selected-tab-id';
  private KEY_RECENT_URLS: string = this.SCHEME + 'recent-urls';
  private KEY_ANALYTICS_ENABLED: string = this.SCHEME + 'analytics-enabled';
  private KEY_SNIPPET_LAUNCH_TARGET: string = this.SCHEME + 'snippet-launch-target';

  set analyticsEnabled(enabled: boolean) {
    localStorage.setItem(this.KEY_ANALYTICS_ENABLED, JSON.stringify(enabled));
  }

  get analyticsEnabled(): boolean {
    const item = localStorage.getItem(this.KEY_ANALYTICS_ENABLED);
    return item != null ? JSON.parse(item) === true : true;
  }

  set onboardingComplete(done: boolean) {
    localStorage.setItem(this.KEY_ONBOARDING_COMPLETE, JSON.stringify(done));
  }

  get onboardingComplete(): boolean {
    return JSON.parse(localStorage.getItem(this.KEY_ONBOARDING_COMPLETE)) === true;
  }

  set selectedTabId(id: string) {
    localStorage.setItem(this.KEY_SELECTED_TAB_ID, id);
  }

  get selectedTabId(): string {
    return localStorage.getItem(this.KEY_SELECTED_TAB_ID);
  }

  set recentUrls(urls: string[]) {
    localStorage.setItem(this.KEY_RECENT_URLS, urls.join('|'));
  }

  get recentUrls(): string[] {
    const item = localStorage.getItem(this.KEY_RECENT_URLS);
    return item === null ? [] : item.split('|');
  }

  set snippetLaunchTarget(target: string) {
    localStorage.setItem(this.KEY_SNIPPET_LAUNCH_TARGET, target);
  }

  get snippetLaunchTarget(): string {
    return localStorage.getItem(this.KEY_SNIPPET_LAUNCH_TARGET);
  }

}

export default new Settings();
