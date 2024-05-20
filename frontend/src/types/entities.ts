export type Estoque = {
  id: string;
  description: string;
  unitaryValue: number;
  quantity: number;
}

export type Cliente = {
  id: string;
  name: string;
  cellphone: string;
  email: string;
  address: string;
}

export type Produto = {
  product: string;
  value: number;
}

export type Pedido = {
  id: string,
  customer: string;
  products: Produto[];
  totalValue: number;
  deliveryDate: string;
  payment: string;
}
