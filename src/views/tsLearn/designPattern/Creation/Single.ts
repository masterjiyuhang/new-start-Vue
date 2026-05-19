// 创建型模式 单例模式 工厂模式 抽象工厂模式 建造者模式 原型模式

export class Singleton {
  static instance: any;
  data: string | undefined;
  constructor(data: string = "Some data") {
    if (!Singleton.instance) {
      this.data = data;
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  getData() {
    return this.data;
  }
}

const instance1 = new Singleton("ss");
const instance2 = new Singleton("sw");
console.log("🚀 ~ file: index.ts:20 ~ :", instance1 === instance2);
