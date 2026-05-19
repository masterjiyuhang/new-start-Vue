class AbstractFactory {
  createCar() {}
}

class BMWFactory extends AbstractFactory {
  createCar() {
    return new BMW();
  }
}
class AudiFactory extends AbstractFactory {
  createCar() {
    return new Audi();
  }
}

class BaseCar {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  drive() {
    return `${this.name} is driving`;
  }
}

class BMW extends BaseCar {
  constructor() {
    super("BMW");
  }
}
class Audi extends BaseCar {
  constructor() {
    super("Audi");
  }
}

const bmwFactory = new BMWFactory();
const audiFactory = new AudiFactory();

const b = bmwFactory.createCar();
const a = audiFactory.createCar();

a.drive();
b.drive();
