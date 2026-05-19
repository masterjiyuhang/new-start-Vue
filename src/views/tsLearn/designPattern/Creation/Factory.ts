class Car {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
  drive() {
    return `${this.name} is driving`;
  }
}

class CarFactory {
  createCar(type: string) {
    switch (type) {
      case "A":
        return new Car("Audi");
      case "B":
        return new Car("BMW");
      default:
        return new Car("Generic Car");
    }
  }
}

const factory = new CarFactory();

const audi = factory.createCar("A");
audi.drive();
