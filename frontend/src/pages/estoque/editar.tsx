import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Estoque } from "@/types";
import axios from "axios";
import { ESTOQUE_API } from "@/constants";
import { useRouter } from "next/router";

export default function EditProducts() {
  const router = useRouter()
  const [description, setDescription] = useState('');
  const [unitary, setUnitary] = useState('');
  const [quantity, setQuantity] = useState('');

  const getData = useCallback(async () => {
    const { data } = await axios.get(`${ESTOQUE_API}/products/${router.asPath.split('id=')[1]}`);
    setDescription(data.data.description);
    setUnitary(data.data.unitaryValue);
    setQuantity(data.data.quantity);
  }, [router])

  const submitData = useCallback(async () => {
    await axios.patch(`${ESTOQUE_API}/products/${router.query.id}`, {
      description: description,
      unitaryValue: +unitary,
      quantity: +quantity
    });

    router.push('/estoque');
  }, [router, description, unitary, quantity])

  const remove = useCallback(async () => {
    await axios.delete(`${ESTOQUE_API}/products/${router.query.id}`)

    router.push('/estoque');
  }, [router])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-col items-center p-2 sm:p-10">
      <Link href="/estoque" className="fixed text-slate-900 text-xl inset-8 font-bold h-8 w-16 text-center">Voltar</Link>
      <div className="text-5xl font-semibold text-slate-900">Editar Produto</div>
      <div className="w-[90%] lg:w-[1000px] mt-20 flex justify-center items-center">
        <div className="flex flex-col gap-6 w-80">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="description" className="text-slate-900 font-semibold">Descrição</label>
            <input id="description" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={description} onInput={(e) => setDescription((e.target as HTMLInputElement).value)} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="unitary" className="text-slate-900 font-semibold">Valor unitário</label>
            <input id="unitary" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={unitary} onInput={(e) => setUnitary((e.target as HTMLInputElement).value)} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="quantity" className="text-slate-900 font-semibold">Quantidade</label>
            <input id="quantity" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={quantity} onInput={(e) => setQuantity((e.target as HTMLInputElement).value)} />
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
