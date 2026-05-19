/**
 * 建造者模式 （生成器模式）
 *
 * 该类模式负责创建自己的对象。同时确保只有单个对象被创建。
 * 这个类提供了一种访问其唯一的对象的方式。 可以直接访问，不需要实例化该类的对象。
 *
 * 意图
 * 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
 *
 * 结构
 * Builder 为创建一个 Product 对象的各个部件指定抽象接口。
 * ConcreteBuilder 实现Builder 的接口以构造和装配该产品的各个部件， 定义并明确它所创建的表示，提供一个检索产品的接口。
 * Director 构造一个使用 Builder 接口的对象。
 * Product 表示被构造的复杂对象。 ConcreteBuilder 创建该产品的内部表示并定义他的装配过程。 包含定义组成组件的类，包括将这些组件装配成最终产品的接口。
 *
 * 适用性
 * 当创建复杂对象的算法应该独立于该对象的组成部分以及它们的装配方式时。
 * 当构造过程必须允许被构造的对象有不同的表示时。
 *
 * 应用实例：
 * 1、去肯德基，汉堡、可乐、薯条、炸鸡翅等是不变的，而其组合是经常变化的，生成出所谓的“套餐”；
 * 2、Java 中的 StringBuilder。
 */

class House {
  foundation: any; // 地基
  walls: any; // 墙体
  roof: any; // 屋顶
  setFoundation(foundation) {
    this.foundation = foundation;
  }

  setWalls(walls) {
    this.walls = walls;
  }

  setRoof(roof) {
    this.roof = roof;
  }
}

class HouseBuilder {
  house: House;
  constructor() {
    this.house = new House();
  }

  buildFoundation() {
    this.house.setFoundation("Concrete");
    return this;
  }

  buildWalls() {
    this.house.setWalls("Brick");
    return this;
  }

  buildRoof() {
    this.house.setRoof("Shingles");
    return this;
  }

  getHouse() {
    return this.house;
  }
}

const builder = new HouseBuilder();
const house = builder.buildFoundation().buildWalls().buildRoof().getHouse();
console.log(house);
