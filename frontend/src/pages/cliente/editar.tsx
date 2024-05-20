import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CLIENTE_API } from "@/constants";
import { useRouter } from "next/router";

export default function EditCustomers() {
  const router = useRouter()
  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const getData = useCallback(async () => {
    const { data } = await axios.get(`${CLIENTE_API}/customers/${router.asPath.split('id=')[1]}`);
    setName(data.data.name);
    setCellphone(data.data.cellphone);
    setEmail(data.data.email);
    setAddress(data.data.address);
  }, [router])

  const submitData = useCallback(async () => {
    await axios.patch(`${CLIENTE_API}/customers/${router.query.id}`, {
      name,
      cellphone,
      email,
      address
    });

    router.push('/cliente');
  }, [router, name, cellphone, email, address])

  const remove = useCallback(async () => {
    await axios.delete(`${CLIENTE_API}/customers/${router.query.id}`)

    router.push('/cliente');
  }, [router])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-col items-center p-2 sm:p-10">
      <Link href="/cliente" className="fixed text-slate-900 text-xl inset-8 font-bold h-8 w-16 text-center">Voltar</Link>
      <div className="text-5xl font-semibold text-slate-900">Editar Cliente</div>
      <div className="w-[90%] lg:w-[1000px] mt-20 flex justify-center items-center">
        <div className="flex flex-col gap-6 w-80">
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-slate-900 font-semibold">Nome</label>
            <input id="name" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="cellphone" className="text-slate-900 font-semibold">Celular</label>
            <input id="cellphone" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={cellphone} onInput={(e) => setCellphone((e.target as HTMLInputElement).value)} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-slate-900 font-semibold">Email</label>
            <input id="email" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="address" className="text-slate-900 font-semibold">Endereço</label>
            <input id="address" className="border-2 border-slate-200 px-2 h-[56px] rounded-lg w-full outline-none focus:border-slate-900" value={address} onInput={(e) => setAddress((e.target as HTMLInputElement).value)} />
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
