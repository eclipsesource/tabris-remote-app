import { Composite, Properties } from 'tabris';

export default class Divider extends Composite {

    constructor(properties: Properties<Composite>) {
        super({ height: 1, ...properties });
    }

}
