export type Stock = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export type Portfolio = {
  id: string;
  name: string;
  description: string;
  stocks?: Stock[] | never[];
};
