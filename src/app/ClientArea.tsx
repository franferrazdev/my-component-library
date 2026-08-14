"use client";

import { FilterBar } from "@/library/fase-1-ui/FilterBar";
import { ProductCarousel } from "@/library/fase-1-ui/ProductCarousel";
import { AuthForm } from "@/library/fase-2-state/AuthForm";
import {
  ProductTable,
  ProductItem,
} from "@/library/fase-2-state/ProductsTable";

const mockProducts = [
  { id: "1", title: "Notebook Gamer", url: "/products/notebook.jpg" },
  { id: "2", title: "Teclado Mecânico", url: "/products/teclado.jpg" },
  { id: "3", title: "Mouse Sem Fio Ergonômico", url: "/products/mouse.jpg" },
  { id: "4", title: "Monitor Curvo", url: "/products/monitor.jpg" },
];

const tableMockData: ProductItem[] = [
  {
    id: "1",
    name: "Notebook Gamer",
    category: "Eletrônicos",
    price: 4999.0,
    stock: 12,
    imageUrl: "/products/notebook.jpg",
  },
  {
    id: "2",
    name: "Teclado Mecânico",
    category: "Acessórios",
    price: 150.9,
    stock: 4,
    imageUrl: "/products/teclado.jpg",
  },
  {
    id: "3",
    name: "Mouse Sem Fio Ergonômico",
    category: "Acessórios",
    price: 39.0,
    stock: 15,
    imageUrl: "/products/mouse.jpg",
  },
  {
    id: "4",
    name: "Monitor Curvo",
    category: "Eletrônicos",
    price: 2999.0,
    stock: 10,
    imageUrl: "/products/monitor.jpg",
  },
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
      <h2 className="text-xl font-semibold text-center mb-6 text-zinc-500">
        Fase 1: Interfaces e Propriedades Estáticas
      </h2>
      {/* Componentes da Fase 1 */}
      <FilterBar onSearchChange={handleSearch} onSortChange={handleSort} />
      <ProductCarousel images={mockProducts} />

      {/* Linha divisória de Fase */}
      <hr className="border-zinc-200 dark:border-zinc-800 my-4" />

      {/* Componentes da Fase 2 */}
      <div className="w-full py-4">
        <h2 className="text-xl font-semibold text-center mb-6 text-zinc-500">
          Fase 2: Validação de Formulários com Zod
        </h2>
        <AuthForm />
      </div>

      <div className="w-full">
        <h2 className="text-xl font-semibold text-center mb-6 text-zinc-500">
          Fase 2: Manipulação de Dados e Interface TypeScript
        </h2>
        <ProductTable initialProducts={tableMockData} />
      </div>
    </div>
  );
}
