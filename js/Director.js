//导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    //基于ES6实现的单例模式
    static getInstance() {
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    run() {
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
    }

}