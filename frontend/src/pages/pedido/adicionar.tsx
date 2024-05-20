import { PEDIDO_API, CLIENTE_API, ESTOQUE_API } from "@/constants";
import { Cliente, Estoque, Produto } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Image from 'next/image';

export default function Products() {
  const router = useRouter()
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [isSelectingProduct, setIsSelectingProduct] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Produto[]>([]);
  const [products, setProducts] = useState<Estoque[]>([]);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString());
  const [payment, setPayment] = useState('');
  const [currentProductValue, setCurrentProductValue] = useState('');
  const [currentProductId, setCurrentProductId] = useState('');
  const [currentProductName, setCurrentProductName] = useState('');

  const getCustomers = useCallback(async () => {
    const response = await axios.get(`${CLIENTE_API}/customers`);
    setCustomers(response.data.data);
  }, [])

  const getProducts = useCallback(async () => {
    const response = await axios.get(`${ESTOQUE_API}/products`);
    setProducts(response.data.data);
  }, [])

  const handleChangeAddProduct = useCallback((id: string, name: string) => {
    setCurrentProductName(name);
    setCurrentProductId(id);
    setIsSelectingProduct(false);
  }, [])

  const handleAddProduct = useCallback(() => {
    const obj = {
      product: currentProductId,
      value: +currentProductValue
    }

    let arr = selectedProducts;
    arr.push(obj);
    setSelectedProducts(arr);

    setIsSelectingProduct(true);
    setCurrentProductId('');
    setCurrentProductName('');
    setCurrentProductValue('');
  }, [currentProductId, currentProductValue, selectedProducts])

  useEffect(()=> {
    setSelectedProducts(selectedProducts);
  },[])

  const submitData = useCallback(async () => {
    let totalValue = 0;
    selectedProducts.map((item) => {
      totalValue += item.value;
    })

    await axios.post(`${PEDIDO_API}/orders`, {
      customer: selectedCustomer,
      products: selectedProducts,
      totalValue: totalValue,
      deliveryDate: deliveryDate,
      payment: payment
    });

    router.push('/pedido');
  }, [router, selectedCustomer, selectedProducts, deliveryDate, payment])

  useEffect(() => {
    getCustomers();
    getProducts();
  }, [])

  return (
    <div className="flex flex-col items-center p-2 sm:p-10">
      <Link href="/pedido" className="fixed text-slate-900 text-xl inset-8 font-bold h-8 w-16 text-center">Voltar</Link>
      <div className="text-5xl font-semibold text-slate-900">Adicionar Pedido</div>
      <div className="w-[90%] lg:w-[1000px] mt-20 justify-center items-center flex flex-col gap-5">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="customer" className="text-slate-900 font-semibold">Selecione um cliente</label>
          <div id="customer" className="mt-2 border-slate-200 border-2 rounded-lg overflow-x-auto">
            <table className="table-auto w-full max-w-[100vw]">
              <thead className="border-slate-200 border-b-2 h-14">
                <tr>
                  <th className="px-4 text-left text-slate-900 font-semibold">Nome</th>
                  <th className="px-4 text-left text-slate-900 font-semibold">Celular</th>
                  <th className="px-4 text-left text-slate-900 font-semibold">Email</th>
                  <th className="px-4 text-left text-slate-900 font-semibold">Endereço</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 font-medium">
                {customers.map((item) => 
                  <tr onClick={() => setSelectedCustomer(selectedCustomer === item.id ? '' : item.id)} className={`${selectedCustomer === item.id ? 'bg-indigo-500 text-white' : 'even:bg-slate-100 hover:bg-gray-200'} h-14 text-nowrap cursor-pointer`}>
                    <td className="px-4">{ item.name }</td>
                    <td className="px-4">{ item.cellphone }</td>
                    <td className="px-4">{ item.email }</td>
                    <td className="px-4">{ item.address }</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {!isSelectingProduct ? 
          (<div className="flex gap-2 items-end">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="value" className="text-slate-900 font-semibold">Produto</label>
              <input disabled id="value" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900 cursor-not-allowed" value={currentProductName} />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="value" className="text-slate-900 font-semibold">Valor</label>
              <input id="value" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={currentProductValue} onInput={(e) => setCurrentProductValue((e.target as HTMLInputElement).value)} />
            </div>
            <button onClick={handleAddProduct} className="bg-black text-white font-bold text-2xl rounded-lg min-w-14 h-14 leading-3">+</button>
          </div>) : 
          (<div className="flex flex-col gap-1 w-full">
            <label htmlFor="product" className="text-slate-900 font-semibold">Selecione um produto (Já selecionados: {selectedProducts.length})</label>
            <div id="product" className="mt-2 border-slate-200 border-2 rounded-lg overflow-x-auto">
              <table className="table-auto w-full max-w-[100vw]">
                <thead className="border-slate-200 border-b-2 h-14">
                  <tr>
                    <th className="px-4 text-left text-slate-900 font-semibold">Descrição</th>
                    <th className="px-4 text-left text-slate-900 font-semibold">Valor unitário</th>
                    <th className="px-4 text-left text-slate-900 font-semibold">Quantidade</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 font-medium">
                  {products.map((item) => 
                    <tr onClick={() => handleChangeAddProduct(item.id, item.description)} className={`even:bg-slate-100 hover:bg-gray-200 h-14 text-nowrap cursor-pointer`}>
                      <td className="px-4">{ item.description }</td>
                      <td className="px-4">{ item.unitaryValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</td>
                      <td className="px-4">{ item.quantity }</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {selectedProducts.length > 0 && 
              <div className="mt-2 border-slate-200 border-2 rounded-lg overflow-x-auto">
                <table className="table-auto w-full max-w-[100vw]">
                  <thead className="border-slate-200 border-b-2 h-14">
                    <tr>
                      <th className="px-4 text-left text-slate-900 font-semibold">Selecionados</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 font-medium">
                    {selectedProducts.map((item) => 
                      <tr className={`even:bg-slate-100 h-14 text-nowrap`}>
                        <td className="px-4">{ products.find((i) => i.id === item.product)?.description }</td>
                        <td className="px-4">{ item.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
          </div>)
        }
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="date" className="text-slate-900 font-semibold">Data de entrega</label>
          <input id="date" type="date" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={deliveryDate} onInput={(e) => setDeliveryDate((e.target as HTMLInputElement).value)} />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="payment" className="text-slate-900 font-semibold">Meio de pagamento</label>
          <div className="flex gap-1 items-center">
            <input type="radio" id="card" name="payment" onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="CARD"/>
            <label htmlFor="card">Cartão</label>
          </div>
          <div className="flex gap-1 items-center">
            <input type="radio" id="money" name="payment" onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="MONEY"/>
            <label htmlFor="money">Dinheiro</label>
          </div>
          <div className="flex gap-1 items-center">
            <input type="radio" id="pix" name="payment" onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="PIX"/>
            <label htmlFor="pix">PIX</label>
          </div>
          <div className="flex gap-1 items-center">
            <input type="radio" id="bank" name="payment" onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="BANK"/>
            <label htmlFor="bank">Transferência bancaria</label>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-80">
          <button onClick={submitData} className="bg-black px-10 py-2 text-white font-bold rounded-lg w-80">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
