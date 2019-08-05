import { Composite, Properties } from 'tabris';
import { ComponentJSX } from 'tabris-decorators';

export default class Divider extends Composite {

    public jsxProperties: ComponentJSX<this>;

    constructor(properties: Properties<Composite>) {
        super({ height: 1, ...properties });
    }
}
