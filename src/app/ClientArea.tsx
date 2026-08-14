"use client";

import { FilterBar } from "@/library/fase-1-ui/FilterBar";
import { ProductCarousel } from "@/library/fase-1-ui/ProductCarousel";
import {AuthForm} from '@/library/fase-2-state/AuthForm'

const mockProducts = [
  { id: "1", title: "Notebook Gamer", url: "/products/notebook.jpg" },
  { id: "2", title: "Teclado Mecânico", url: "/products/teclado.jpg" },
  { id: "3", title: "Mouse Sem Fio Ergonômico", url: "/products/mouse.jpg" },
  { id: "4", title: "Monitor Curvo", url: "/products/monitor.jpg" },
];

export default function ClientArea() {
  const handleSearch = (text: string) => {
    console.log("Usuário digitou:", text);
  };

  const handleSort = (filter: string | null) => {
    if (filter != null) console.log("Filtro selecionado:", filter);
  };

  return (
      <div className="w-full flex flex-col gap-12">
        {/* Componentes da Fase 1 */}
        <FilterBar onSearchChange={handleSearch} onSortChange={handleSort} />
        <ProductCarousel images={mockProducts} />

        {/* Linha divisória de Fase */}
        <hr className="border-zinc-200 dark:border-zinc-800 my-4" />

        {/* Componentes da Fase 2 */}
        <div className="w-full py-4">
<h2 className="text-xl font-semibold text-center mb-6 text-zinc-500">Fase 2: Validação de Formulários</h2>
<AuthForm />
        </div>
      </div>
  );
}
