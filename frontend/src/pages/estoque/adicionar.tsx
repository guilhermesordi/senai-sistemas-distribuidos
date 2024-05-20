import { ESTOQUE_API } from "@/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function AddProducts() {
  const router = useRouter()
  const [description, setDescription] = useState('');
  const [unitary, setUnitary] = useState('');
  const [quantity, setQuantity] = useState('');

  const submitData = useCallback(async () => {
    await axios.post(`${ESTOQUE_API}/products`, {
      description: description,
      unitaryValue: +unitary,
      quantity: +quantity
    });

    router.push('/estoque');
  }, [router, description, unitary, quantity])

  return (
    <div className="flex flex-col items-center p-2 sm:p-10">
      <Link href="/estoque" className="fixed text-slate-900 text-xl inset-8 font-bold h-8 w-16 text-center">Voltar</Link>
      <div className="text-5xl font-semibold text-slate-900">Adicionar Produto</div>
      <div className="w-[90%] lg:w-[1000px] mt-20 justify-center items-center flex">
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
          <button onClick={submitData} className="bg-black px-10 py-2 text-white font-bold rounded-lg w-80">Adicionar</button>
        </div>
      </div>
    </div>
  );
}
