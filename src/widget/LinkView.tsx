import { Composite, Properties } from 'tabris';
import { ComponentJSX, inject, bind, component } from 'tabris-decorators';
import { Images } from '../res/Images';
import { Fonts } from '../res/Fonts';
import ActionIcon from './ActionIcon';
import dimen from '../res/dimen';

@component export default class LinkView extends Composite {

    public jsxProperties: ComponentJSX<this>;
    @bind('#title.text') public title: string;

    constructor(
        properties: Properties<Composite>,
        @inject protected readonly images: Images,
        @inject protected readonly fonts: Fonts) {
        super();
        this.append(
            <widgetCollection>
                <ActionIcon
                    left={dimen.xxs} centerY={0}
                    image={this.images.codeLink} />
                <textView
                    id='title'
                    left={dimen.pxxs} right={dimen.m} centerY={0}
                    markupEnabled={true}
                    maxLines={2}
                    font={fonts.subtitle2} />
            </widgetCollection>
        );
        this.set({
            highlightOnTouch: true,
            height: 40,
            ...properties
        });
    }

}
