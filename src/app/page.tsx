import { ProductCarousel } from "@/library/fase-1-ui/ProductCarousel";

// Dados de teste para simular produtos de um e-commerce
const mockProducts = [
  { id: "1", title: "Notebook Gamer", url: "/products/notebook.jpg" },
  { id: "2", title: "Teclado Mecânico", url: "/products/teclado.jpg" },
  { id: "3", title: "Mouse Sem Fio Ergonômico", url: "/products/mouse.jpg" },
  { id: "4", title: "Monitor Curvo", url: "/products/monitor.jpg" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-4xl text-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Minha Biblioteca de Componentes
        </h1>
        <p className="text-zinc-500 mt-2">
          Fase 1: Componente de Carrossel de Produtos
        </p>
      </div>

      {/* Renderizando o componente finalizado */}
      <ProductCarousel images={mockProducts} />
    </main>
  );
}
