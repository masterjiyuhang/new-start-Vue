/**
 * 原型模式
 *
 * 用原型实例指定创建对象的种类，并且通过复制这些原型创建新的对象。
 *
 */

class Prototype {
  public data: string;
  constructor(data) {
    this.data = data;
  }

  clone() {
    return new Prototype(this.data);
  }
}

const original = new Prototype("Hello");
const clone = original.clone();
console.log(clone.data); // Hello

interface IPrototype {
  clone(): IPrototype;
}

class ConcretePrototype implements IPrototype {
  public data: string;
  constructor(data) {
    this.data = data;
  }

  clone() {
    return new ConcretePrototype(this.data);
  }
}
const original1 = new ConcretePrototype("Hello");
const clone1 = original1.clone();
console.log(clone1.data);
console.log(original1 === clone1);
console.log(original1.data === clone1.data);
console.log(original1.data !== clone1.data);
