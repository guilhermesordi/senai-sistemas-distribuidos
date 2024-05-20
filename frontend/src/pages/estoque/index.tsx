import { ESTOQUE_API } from "@/constants";
import { Estoque } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export default function Products() {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(true);
  const [tableData, setTableData] = useState<Estoque[]>([]);

  const getTableData = useCallback(async () => {
    try {
      const response = await axios.get(`${ESTOQUE_API}/products`);
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
      <div className="text-5xl font-semibold text-slate-900">Estoque</div>
      <div className="w-[90%] lg:w-[1000px] mt-20">
        { !isEmpty &&
          <>
            <div className="flex items-center justify-end">
              <Link href="/estoque/adicionar" className="bg-black px-10 py-2 text-white font-bold rounded-lg">Adicionar</Link>
            </div>
            <div className="mt-2 border-slate-200 border-2 rounded-lg overflow-x-auto">
              <table className="table-auto w-full max-w-[100vw]">
                <thead className="border-slate-200 border-b-2 h-14">
                  <tr>
                    <th className="px-4 text-left text-slate-900 font-semibold">Descrição</th>
                    <th className="px-4 text-left text-slate-900 font-semibold">Valor unitário</th>
                    <th className="px-4 text-left text-slate-900 font-semibold">Quantidade</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 font-medium">
                  {tableData.map((item) => 
                    <tr onClick={() => router.push({ pathname: '/estoque/editar/', query: { id: item.id } })} className="h-14 even:bg-slate-100 text-nowrap hover:bg-gray-200 cursor-pointer">
                      <td className="px-4">{ item.description }</td>
                      <td className="px-4">{ item.unitaryValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</td>
                      <td className="px-4">{ item.quantity }</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        }
        { isEmpty && <p className="text-center text-xl text-slate-900">Nenhum produto encontrado</p>}
      </div>
    </div>
  );
}
