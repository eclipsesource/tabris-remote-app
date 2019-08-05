import { Tab } from 'tabris';
import { property, component } from 'tabris-decorators';

@component export default class OnboardingTab extends Tab {

  @property public readonly selectionIndex: number;

}
