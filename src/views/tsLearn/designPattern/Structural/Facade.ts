/**
 * 外观模式
 *
 * Facade
 *
 * 为子系统中的一组接口提供一个一致的洁面。 Facade 模式定义了一个高层接口，这个接口使得子系统更加容易使用。
 *
 * 最上层Facade知道哪些子系统负责处理请求； 将客户的请求代理给适当的子系统对象。
 * Subsystem classes 实现子系统的功能； 处理Facade指派的任务； 没有facade的任何相关信息，即没有指向Facade的指针。
 *
 * 适用于：
 * 要为一个复杂子系统提供一个简单的接口时。 子系统因为不断的演化变得越来越复杂，大多数模式使用时都会产生更多更小的类，使得子系统更具有可重用性， 也更容易对子系统进行定制。
 * 但是同样给那些不需要定制的子系统带来了一些使用上的困难。Facade可以提供一个简单的默认视图，这一视图对大多数用户来说已经足够了。
 * 而那些需要更多功能的可定制性的用户可以越过Facade层。
 *
 * 客户程序与抽象类的实现部分之间存在着很大的依赖关系。
 *
 *当需要构建一个层次结构的子系统时，使用Facade模式定义子系统中的每一个节点。如果子系统之间是相互依赖的，则可以让他们仅通过Facade进行相互通信。
 *
 */

class CPU {
  start() {
    console.log("CPU start");
  }
}

class Memory {
  load() {
    console.log("Memory load");
  }
}

class Computer {
  private cpu: CPU;
  private memory: Memory;

  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
  }

  start() {
    this.cpu.start();
    this.memory.load();
  }
}

const computer = new Computer();

computer.start();
