//变量缓存器，方便我们在不同的类中访问和修改变量
//数据管理

//每一局（整个游戏）都要用的变量作为类的内部对象
//而每一局都需要结束后销毁的变量，放在

export class DataStore {
    //单例
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        //存储容器
        this.map = new Map();
    }

    put(key, value) {
        //如果传入的参数是函数，则new function
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        //可以链式使用put
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    //销毁
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}