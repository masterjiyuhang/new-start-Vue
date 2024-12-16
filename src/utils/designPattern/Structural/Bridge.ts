/**
 * 桥接模式（Bridge Pattern）是用于把抽象化与实现化解耦，使得二者可以独立变化。
 * 它通过提供抽象化和实现化之间的桥接结构，来实现二者的解耦。
 *
 * 这种模式涉及到一个作为桥接的接口，使得实体类的功能独立于接口实现类。
 * 这两种类型的类可被结构化改变而互不影响。
 */
interface BridgeDevice {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
}

class BridgeProduct {
  device: BridgeDevice;
  constructor(device: BridgeDevice) {
    this.device = device;
  }

  togglePower() {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }
}

class TV implements BridgeDevice {
  isEnabled(): boolean {
    return true;
  }

  enable(): void {
    console.log("🚀 ~ file: Bridge.ts:28 ~ TV ~ enable ~ ");
  }

  disable(): void {
    console.log("🚀 ~ file: Bridge.ts:32 ~ TV ~ disable ~ ");
  }
}

const tv = new TV();
const bridgeProduct = new BridgeProduct(tv);

export { tv, bridgeProduct };
