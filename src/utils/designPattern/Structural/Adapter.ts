/**
 * 适配器模式
 *
 * 意图
 * 将一个类的接口转换成客户希望的另一个接口。
 * 这种模式涉及到一个单一的类，该类负责加入独立的或不兼容的接口功能。
 *
 * 作为两个兼容的接口之间的桥梁。
 * 涉及到一个单一的类，该类负责加入独立的或不兼容的接口功能。
 *
 * 结构
 * 类适配器使用多重继承对一个接口与另一个接口进行匹配。
 *
 * 适用性
 * 1.你需要使用一个已经存在的类，而它的接口不符合你的需求。
 * 2.你想使用一些已经存在的子类，但是这些子类没有一个适合的扩展点。
 *
 * 读卡器是作为内存卡和笔记本之间的适配器。您将内存卡插入读卡器，再将读卡器插入笔记本，这样就可以通过笔记本来读取内存卡；
 */

class OldPaymentSystem {
  processPayment(amount: number) {
    console.log(
      `🚀 ~ file: Adapter.ts:23 ~ OldPaymentSystem ~ processPayment ~ amount:
      %c Processing payment of $${amount} using OldPaymentSystem`,
      "color: #ff8800",
    );
  }
}

interface NewPaymentSystem {
  makePayment(amount: number): void;
}

class PaymentAdapter implements NewPaymentSystem {
  private oldPaymentSystem: OldPaymentSystem;

  constructor(oldPaymentSystem: OldPaymentSystem) {
    this.oldPaymentSystem = oldPaymentSystem;
  }

  makePayment(amount: number): void {
    // 调用旧系统的 processPayment 方法
    this.oldPaymentSystem.processPayment(amount);
  }
}

// 客户端期望使用新系统
const newPaymentSystem: NewPaymentSystem = new PaymentAdapter(
  new OldPaymentSystem(),
);

// // 使用适配器实现的新接口
// newPaymentSystem.makePayment(100); // 输出: "Processing payment of $100 using OldPaymentSystem"

export default {
  newPaymentSystem,
};
