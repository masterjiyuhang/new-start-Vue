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
