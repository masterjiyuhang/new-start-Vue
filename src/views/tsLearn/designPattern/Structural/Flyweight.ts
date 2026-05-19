/**
 * 享元模式
 *
 * 通过共享技术有效的支持大量细粒度对象
 *
 * 减少创建对象的数量，以减少内存占用和提高性能。
 * 属于结构型设计模式，提供了减少对象数量从而改善应用所需要的对象结构的方式。
 *
 * 享元模式尝试重用现有的同类对象，如果未找到匹配对象，则创建新对象。
 *
 * 运用共享技术有效地支持大量细粒度对象
 */

class Flyweight {
  private sharedState: Record<string, any>;

  constructor(sharedState: Record<string, any>) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: Record<string, any>) {
    const s = JSON.stringify(this.sharedState);
    const us = JSON.stringify(uniqueState);
    console.log(
      `Flyweight: Displaying shared state ${s} and unique state ${us}.`,
    );
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: Record<string, any>[]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: Record<string, any>) {
    return JSON.stringify(state);
  }

  public getFlyweight(sharedState: Record<string, any>) {
    const key = this.getKey(sharedState);

    if (!(key in this.flyweights)) {
      console.log(
        `FlyweightFactory: Can't find a flyweight, creating new one.`,
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log(`FlyweightFactory: Reusing existing flyweight.`);
    }
    return this.flyweights[key];
  }
}

export const factoryFly = new FlyweightFactory([
  { color: "green", model: "BMW", type: "sedan" },
  { color: "red", model: "BMW", type: "sedan" },
  { color: "blue", model: "BMW", type: "sedan" },
  { color: "green", model: "BMW", type: "convertible" },
  { color: "red", model: "BMW", type: "convertible" },
]);
