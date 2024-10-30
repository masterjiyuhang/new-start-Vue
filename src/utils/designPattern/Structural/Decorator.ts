/**
 * 装饰器模式
 *
 * 动态的给一个对象添加一些额外的参数，就增加功能而言，Decorator模式比生成子类更加灵活。
 *
 * 在不影响其他对象的情况下，以动态的、透明的方式给单个对象添加职责。
 *
 */

/**
 * 优点：
 * 1. 符合开闭原则，对抽象部分开放，对具体部分隐藏。
 * 2. 符合单一职责原则，将具体职责分离，便于管理。
 * 3. 符合里氏替换原则，因为子类可以替换父类。
 * 4. 符合依赖倒置原则，因为子类无需关心父类的内部细节。
 *
 * 缺点：
 * 1. 继承只能实现一次，如果要实现多次，需要使用组合。
 *    但是组合也存在缺点，比如无法在运行时动态地添加新的职责，因为组合无法动态地添加新的职责。
 * 2. 继承只能实现一次，如果要实现多次，需要使用组合。
 *    但是组合也存在缺点，比如无法在运行时动态地添加新的职责，因为组合无法动态地添加新的职责。
 */

function ClassDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  console.log("ClassDecorator called");

  constructor.prototype.run = function () {
    console.log("run");
  };

  constructor.prototype.eat = function () {
    console.log("eat");
  };

  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
    }
  };
}

@ClassDecorator
class MyClass {
  constructor() {
    console.log("MyClass called");
  }
}

const obj: any = new MyClass() as InstanceType<typeof MyClass>;

function Log(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();

export default {
  obj,
  calculator,
};
