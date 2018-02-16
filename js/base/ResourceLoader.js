//资源文件加载器，确保在图片资源加载完成后才渲染
import {Resources} from "./Resource.js";

export class ResourceLoader {

    constructor() {
        //导入资源
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            //微信官方的创建img的API
            const image = wx.createImage();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onload(callback) {
        let loadedCounter = 0;
        for (let value of this.map.values()) {
            //使this指向当前的ResourceLoader
            value.onload = () => {
                loadedCounter++;
                if (loadedCounter >= this.map.size) {
                    callback(this.map)
                }
            }
        }
    }

    static creaate() {
        return new ResourceLoader();
    }

}