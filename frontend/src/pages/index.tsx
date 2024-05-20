import Link from "next/link";

  export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[100vh] gap-12 bg-white">
      <Link href="/pedido" className="flex items-center justify-center bg-slate-900 w-60 min-h-[300px] shadow-xl rounded-lg text-white font-bold text-3xl hover:-translate-y-2 hover:shadow-2xl transition-all">Pedidos</Link>
      <Link href="/estoque" className="flex items-center justify-center  bg-slate-900 w-60 min-h-[300px] shadow-xl rounded-lg text-white font-bold text-3xl hover:-translate-y-2 hover:shadow-2xl transition-all">Estoque</Link>
      <Link href="/cliente" className="flex items-center justify-center  bg-slate-900 w-60 min-h-[300px] shadow-xl rounded-lg text-white font-bold text-3xl hover:-translate-y-2 hover:shadow-2xl transition-all">Clientes</Link>
    </div>
  );
}
