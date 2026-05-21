export interface TurntableItem {
  location: number;
  type: number;
  icon: string;
  result_img: string;
  rate: number;
  min?: number;
  max?: number;
}

export const lists: TurntableItem[] = [
  {
    location: 1,
    type: 1,
    icon: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    result_img: "",
    rate: 90,
  },
  {
    location: 2,
    type: 2,
    icon: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    result_img: "",
    rate: 20,
  },
  {
    location: 3,
    type: 1,
    icon: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    result_img: "",
    rate: 20,
  },
  {
    location: 4,
    type: 2,
    icon: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    result_img: "",
    rate: 20,
  },
  {
    location: 5,
    type: 1,
    icon: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    result_img: "",
    rate: 10,
  },
  {
    location: 6,
    type: 1,
    icon: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
    result_img: "",
    rate: 10,
  },
];
