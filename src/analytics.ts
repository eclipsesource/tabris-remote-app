import settings from './settings';

// tslint:disable-next-line:no-any
declare var firebase: any;

class Analytics {

  public enabled: boolean = settings.analyticsEnabled;

  private analyticsActive: boolean = this.enabled && typeof firebase !== 'undefined';

  constructor() {
    if (this.analyticsActive) {
      // TODO: Investigate alternative for the 'app.debugBuild'.
      // firebase.Analytics.analyticsCollectionEnabled = !app.debugBuild;
      firebase.Analytics.analyticsCollectionEnabled = true;
    }
  }

  set screenName(name: string) {
    if (this.analyticsActive) {
      firebase.Analytics.screenName = name;
    }
  }

  public logOnboardingSkipped(screen: string) {
    if (this.analyticsActive) {
      firebase.Analytics.logEvent('onboarding_skipped', {screen});
    }
  }

  public logOnboardingCompleted() {
    if (this.analyticsActive) {
      firebase.Analytics.logEvent('onboarding_completed');
    }
  }

  public logLaunchUrl(name: string) {
    if (this.analyticsActive) {
      firebase.Analytics.logEvent('launch_url', {name});
    }
  }

  public logShowDocs(widget: string) {
    if (this.analyticsActive) {
      firebase.Analytics.logEvent('show_docs', {widget});
    }
  }

  public logShowSnippetSource(widget: string) {
    if (this.analyticsActive) {
      firebase.Analytics.logEvent('show_snippet_source', {widget});
    }
  }
}

export default new Analytics();
