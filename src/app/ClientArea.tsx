"use client";

import { FilterBar } from "@/library/fase-1-ui/FilterBar";
import { ProductCarousel } from "@/library/fase-1-ui/ProductCarousel";

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
    <main className="w-full">
      <div className="w-full max-w-4xl mx-auto">
        <FilterBar onSearchChange={handleSearch} onSortChange={handleSort} />
        <ProductCarousel images={mockProducts} />
      </div>
    </main>
  );
}
