import { StandardMaterial as BabylonStandardMaterial } from '@babylonjs/core';

export default class StandardMaterial extends BabylonStandardMaterial {
    public constructor(name: string) {
        super(name);
    }
}
