import { MockMethod } from "vite-plugin-mock";
import { resultPageSuccess, resultSuccess } from "../_utils";

const carList = (() => {
  const brands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Tesla", "Volkswagen"];
  const types = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback"];
  const result: any[] = [];
  for (let i = 1; i <= 50; i++) {
    result.push({
      id: `${i}`,
      name: `${brands[i % brands.length]} ${types[i % types.length]} ${i}`,
      brand: brands[i % brands.length],
      type: types[i % types.length],
      price: Math.floor(Math.random() * 300000) + 100000,
      year: 2020 + (i % 5),
    });
  }
  return result;
})();

const carTypeList = [
  { id: "1", name: "Sedan" },
  { id: "2", name: "SUV" },
  { id: "3", name: "Truck" },
  { id: "4", name: "Coupe" },
  { id: "5", name: "Hatchback" },
  { id: "6", name: "Convertible" },
  { id: "7", name: "Minivan" },
  { id: "8", name: "Pickup" },
];

export default [
  {
    url: "/basic-api/car/list",
    timeout: 100,
    method: "get",
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      return resultPageSuccess(page, pageSize, carList);
    },
  },
  {
    url: "/basic-api/car/create",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ id: Date.now().toString() });
    },
  },
  {
    url: "/basic-api/car/update",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ success: true });
    },
  },
  {
    url: "/basic-api/car/del",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ success: true });
    },
  },
  {
    url: "/basic-api/car/getListByName",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      const name = body?.name || "";
      const filtered = name
        ? carList.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
        : carList;
      return resultSuccess(filtered);
    },
  },
  {
    url: "/basic-api/car/detail/:id",
    timeout: 100,
    method: "get",
    response: ({ query }) => {
      const car = carList.find((item) => item.id === query.id);
      return resultSuccess(car || null);
    },
  },
  {
    url: "/basic-api/carType/all",
    timeout: 100,
    method: "get",
    response: () => {
      return resultSuccess(carTypeList);
    },
  },
] as MockMethod[];
