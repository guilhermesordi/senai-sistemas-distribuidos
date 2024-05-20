import { CLIENTE_API } from "@/constants";
import { Cliente } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Customers() {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(true);
  const [tableData, setTableData] = useState<Cliente[]>([]);

  const getTableData = useCallback(async () => {
    try {
      const response = await axios.get(`${CLIENTE_API}/customers`);
      setTableData(response.data.data)
      setIsEmpty(false)
    } catch(e) {
      setIsEmpty(true)
    }
  }, [])

  useEffect(() => {
    getTableData()
  },[])

  return (
    <div className="flex flex-col items-center p-2 sm:p-10">
      <Link href="/" className="fixed text-slate-900 text-xl inset-8 font-bold h-8 w-16 text-center">Voltar</Link>
      <div className="text-5xl font-semibold text-slate-900">Clientes</div>
      <div className="w-[90%] lg:w-[1000px] mt-20">
        { !isEmpty &&
          <>
            <div className="flex items-center justify-end">
              <Link href="/cliente/adicionar" className="bg-black px-10 py-2 text-white font-bold rounded-lg">Adicionar</Link>
            </div>
            <div className="mt-2 border-slate-200 border-2 rounded-lg overflow-x-auto">
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
                  {tableData.map((item) => 
                    <tr onClick={() => router.push({ pathname: '/cliente/editar/', query: { id: item.id } })} className="h-14 even:bg-slate-100 text-nowrap hover:bg-gray-200 cursor-pointer">
                      <td className="px-4">{ item.name }</td>
                      <td className="px-4">{ item.cellphone }</td>
                      <td className="px-4">{ item.email }</td>
                      <td className="px-4">{ item.address }</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        }
        { isEmpty && <p className="text-center text-xl text-slate-900">Nenhum cliente encontrado</p>}
      </div>
    </div>
  );
}
