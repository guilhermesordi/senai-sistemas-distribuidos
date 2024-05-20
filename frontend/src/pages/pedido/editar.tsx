import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CLIENTE_API, ESTOQUE_API, PEDIDO_API } from "@/constants";
import { useRouter } from "next/router";
import { Cliente, Estoque, Pedido, Produto } from "@/types";

export default function Products() {
  const router = useRouter()
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [isSelectingProduct, setIsSelectingProduct] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Produto[]>([]);
  const [products, setProducts] = useState<Estoque[]>([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [payment, setPayment] = useState('');
  const [currentProductValue, setCurrentProductValue] = useState('');
  const [currentProductId, setCurrentProductId] = useState('');
  const [currentProductName, setCurrentProductName] = useState('');
  const [isLoading, setIsLoading] = useState(true)

  const getData = useCallback(async () => {
    const { data: responseData } = await axios.get(`${PEDIDO_API}/orders/${router.asPath.split('id=')[1]}`);
    const data = responseData.data as Pedido;

    setSelectedCustomer(data.customer);
    setSelectedProducts(data.products);
    setDeliveryDate(data.deliveryDate);
    setPayment(data.payment);
    setIsLoading(false)
  }, [router])

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
    setSelectedProducts((state) => [...state, obj]);
    setIsSelectingProduct(true);
    setCurrentProductId('');
    setCurrentProductName('');
    setCurrentProductValue('');
  }, [currentProductId, currentProductValue])

  const submitData = useCallback(async () => {
    let totalValue = 0;
    selectedProducts.map((item) => {
      totalValue += item.value;
    })

    await axios.patch(`${PEDIDO_API}/orders/${router.query.id}`, {
      customer: selectedCustomer,
      products: selectedProducts,
      totalValue: totalValue,
      deliveryDate: deliveryDate,
      payment: payment
    });

    router.push('/pedido');
  }, [router, selectedCustomer, selectedProducts, deliveryDate, payment])

  const remove = useCallback(async () => {
    await axios.delete(`${PEDIDO_API}/orders/${router.query.id}`)

    router.push('/pedido');
  }, [router])

  useEffect(() => {
    getCustomers();
    getProducts();
    getData();
  }, [])

  if(isLoading) return 'Carregando...'

  return (
    <div className="flex flex-col items-center p-2 sm:p-10">
      <Link href="/pedido" className="fixed text-slate-900 text-xl inset-8 font-bold h-8 w-16 text-center">Voltar</Link>
      <div className="text-5xl font-semibold text-slate-900">Editar Pedido</div>
      <div className="w-[90%] lg:w-[1000px] mt-20 flex justify-center items-center">
        <div className="flex flex-col gap-6">
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
            </div>)
          }
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="date" className="text-slate-900 font-semibold">Data de entrega</label>
            <input id="date" type="date" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={deliveryDate} onInput={(e) => setDeliveryDate((e.target as HTMLInputElement).value)} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="payment" className="text-slate-900 font-semibold">Meio de pagamento</label>
            <div className="flex gap-1 items-center">
              <input type="radio" id="card" name="payment" checked={payment === 'CARD'} onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="CARD"/>
              <label htmlFor="card">Cartão</label>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" id="money" name="payment" checked={payment === 'MONEY'} onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="MONEY"/>
              <label htmlFor="money">Dinheiro</label>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" id="pix" name="payment" checked={payment === 'PIX'} onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="PIX"/>
              <label htmlFor="pix">PIX</label>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" id="bank" name="payment" checked={payment === 'BANK'} onInput={(e) => setPayment((e.target as HTMLInputElement).value)} value="BANK"/>
              <label htmlFor="bank">Transferência bancaria</label>
            </div>
          </div>
          <div className="gap-3 flex">
            <button onClick={remove} className="bg-red-500 p-2 text-white font-bold rounded-lg">
              <Image src={'/trash.png'} width={28} height={24} alt="" />
            </button>
            <button onClick={submitData} className="bg-black px-10 py-2 text-white font-bold rounded-lg w-full">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
