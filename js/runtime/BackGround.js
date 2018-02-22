//背景
import {Sprite} from "../base/Sprite.js";

export class BackGround extends Sprite {
    constructor() {
        const image = Sprite.getImage('background');
        //super之前不可以使用类关键字this
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            window.innerWidth, window.innerHeight);
    }
}