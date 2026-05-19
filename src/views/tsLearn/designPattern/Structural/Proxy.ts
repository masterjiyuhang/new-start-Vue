/**
 * 为其他对象提供一种代理以控制对这个对象的访问
 *
 * 适用性
 * 代理对适用于在需要比较通用和复杂的对象指针代替简单的指针的时候
 * - 远程代理 为一个对象在不同地址空间提供局部代表
 * - 虚代理 根据需要创建开销很大的对象
 * - 保护代理 控制对原始对象的访问，用于对象应该有不同的访问权限的时候
 * - 智能引用 取代了简单的指针，它在访问对象时执行一些附加操作。
 *
 *
 * 在代理模式中，创建具有现有对象的对象，以便向外界提供功能接口。
 * 为其他对象提供一种代理以控制对这个对象的访问。
 *
 * windows 里面的快捷方式。
 * 买火车票不一定非要去火车站买，也可以去代售点买。
 * 一张支票时账户中资金的代理。支票在市场交易中用来代替现金，并提供对签发人账号上的资金控制。
 * Spring AOP
 */

class RealSubject {
  request() {
    console.log("🚀 ~ file: Proxt.ts:3 ~ RealSubject ~ request ");
  }
}

class PProxy {
  private realSubject: RealSubject;
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }
  request() {
    console.log(
      "🚀 ~ file: Proxt.ts:16 ~ PProxy ~ request ~ 'Proxy controls access to real subject':",
      "Proxy controls access to real subject",
    );
    this.realSubject.request();
  }
}

const realSubject = new RealSubject();
const proxy = new PProxy(realSubject);

proxy.request();
