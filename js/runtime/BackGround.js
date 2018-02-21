//背景
import {Sprite} from "../base/Sprite.js";

export class BackGround extends Sprite {
    constructor(ctx,image) {
        // const image = Sprite.getImage('background');
        super(ctx, image,
            0, 0,
            image.width, image.height,
            0, 0,
            window.innerWidth, window.innerHeight);
    }
}