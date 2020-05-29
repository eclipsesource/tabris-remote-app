import { AlertDialog, contentView } from 'tabris';
import { shared, inject } from 'tabris-decorators';
import { BasicLauncher } from 'tabris-js-remote';
import { Texts } from './res/Texts';
import settings from './settings';

const MAX_RECENT_URLS = 5;

interface LaunchConfig {
  url: string;
  id: string;
  version: 2 | 3;
  debug: boolean;
}

@shared export default class AppLauncher {

  constructor(@inject protected readonly texts: Texts) { }

  public recentUrls: string[] = settings.recentUrls;

  public getLastLaunchedUrl() {
    return this.recentUrls.length === 0 ? '' : this.recentUrls[0];
  }

  public addToRecentUrls(url: string) {
    const urlIndex = this.recentUrls.indexOf(url);
    if (urlIndex !== -1) {
      this.recentUrls.splice(urlIndex, 1);
    }
    this.recentUrls.splice(0, 0, url);
    if (this.recentUrls.length > MAX_RECENT_URLS) {
      this.recentUrls = this.recentUrls.slice(0, MAX_RECENT_URLS);
    }
    settings.recentUrls = this.recentUrls;
  }

  public launchUrl(appUrl: string) {
    if (this.isValidUrl(appUrl)) {
      this.launchApp(appUrl, url => this.addToRecentUrls(url));
    } else {
      this.showDialog(null, this.texts.invalidUrlError(appUrl));
    }
  }

  public launchApp(url: string, beforeStart?: (url: string) => void) {
    this.sendRequest(url, (_response, status) => {
      if (status === 200) {
        if (beforeStart) {
          beforeStart.apply(null, [url]);
        }
        this.launch(url)
      } else {
        this.showDialog(this.texts.connectionFailed, this.texts.loadError(url, status));
      }
    });
  }

  private launch(url: string) {
    let config = this.createLaunchConfig(url);
    try {
      new BasicLauncher().start(config);
      contentView.children().dispose();
    } catch (ex) {
      this.showDialog(this.texts.error, ex.message);
    }
  }

  private sendRequest(url: string, callback: (responseText: string, status: number) => void) {
    const request = new XMLHttpRequest();
    request.timeout = 4000;
    request.onreadystatechange = () => {
      if (callback && request.readyState === request.DONE) {
        callback.apply(null, [request.responseText, request.status]);
      }
    };
    request.open('GET', url);
    request.send();
  }

  private createLaunchConfig(url: string, debug: boolean = false): LaunchConfig {
    return { url, debug, version: 3, id: '' };
  }

  private showDialog(title: string, message: string) {
    new AlertDialog({
      title,
      message,
      buttons: { ok: this.texts.ok }
    }).open();
  }

  private isValidUrl(url: string) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)' +                                 // scheme
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain
      '((\\d{1,3}\\.){3}\\d{1,3})|' +                      // or ip (v4) address
      '([a-z\\d]([a-z\\d-]*[a-z\\d])*))' +                 // or local domain
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +                  // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +                         // query string
      '(\\#[-a-z\\d_]*)?$', 'i');                          // fragment locator
    return url && pattern.test(url);
  }

}
