import {NavigationView, Button, TextInput, CheckBox, ActivityIndicator, Page, ui, AlertDialog} from 'tabris';
import {BasicLauncher} from 'tabris-js-remote';

const LAST_LAUNCH_CONFIG_KEY = 'last_launch_config';

interface LaunchConfig {
  url: string;
  id: string;
  version: 2 | 3;
  debug: boolean;
}

let urlInput: TextInput,
    debugCheck: CheckBox,
    launchButton: Button;

createUI();
restoreState();

function createUI() {
  new NavigationView({left: 0, top: 0, right: 0, bottom: 0}).append(
    new Page({title: 'Tabris for RAP'}).append(
      urlInput = new TextInput({
        message: 'Server URL',
        top: 24, left: 16, right: 16,
        font: '16px'
      }).on({
        accept: launch
      }),
      debugCheck = new CheckBox({
        text: 'Debug mode',
        top: 'prev() 16', left: 16,
        font: '16px'
      }),
      launchButton = new Button({
        text: 'Connect',
        top: 'prev() 32', left: 16, right: 16,
      }).on({
        select: launch
      })
    )
  ).appendTo(ui.contentView);
}

function restoreState() {
  let config: LaunchConfig = JSON.parse(localStorage.getItem(LAST_LAUNCH_CONFIG_KEY));
  if (config) {
    urlInput.text = config.url;
    debugCheck.checked = config.debug;
  }
}

function launch() {
  let config = createLaunchConfig();
  localStorage.setItem(LAST_LAUNCH_CONFIG_KEY, JSON.stringify(config));
  try {
    new BasicLauncher().start(config);
    ui.contentView.children().dispose();
  } catch (ex) {
    new AlertDialog({title: 'Error', message: ex.message, buttons: {ok: 'OK'}})
      .open();
  }
}

function createLaunchConfig(): LaunchConfig {
  return {
    url: urlInput.text,
    debug: debugCheck.checked,
    version: 3,
    id: ''
  };
}
