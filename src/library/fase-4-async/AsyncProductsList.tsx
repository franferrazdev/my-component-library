"use client";

import * as React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/library/fase-3-global/cart-store";
import Ca from "zod/v4/locales/ca.cjs";

// Interface dos dados que a "API" vai retornar
interface ApiProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
}

// Função que simula uma requisição HTTP para uma API com atraso de 2 segundos
async function fetchProductsFromAPi(): Promise<ApiProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay internacional

  // Retorna dados simulando uma resposta JSON de servidor
  return [
    {
      id: "api-1",
      title: "Notebook Gamer",
      price: 4999.0,
      category: "Eletrônicos",
      image: "/products/notebook.jpg",
    },
    {
      id: "2",
      title: "Teclado Mecânico",
      category: "Acessórios",
      price: 150.9,
      image: "/products/teclado.jpg",
    },
    {
      id: "3",
      title: "Mouse Sem Fio Ergonômico",
      category: "Acessórios",
      price: 39.0,
      image: "/products/mouse.jpg",
    },
    {
      id: "4",
      title: "Monitor Curvo",
      category: "Monitores",
      price: 2999.0,
      image: "/products/monitor.jpg",
    },
  ];
}

export function AsyncProductsList() {
  const addItem = useCartStore((state) => state.addItem);

  // Gerenciar cachê, loading e dados sozinho usando TanStack Query
  const {
    data: products,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products-api"], // Chave única identificadora do cache
    queryFn: fetchProductsFromAPi, // Função que busca os dados
  });

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  // ESTADO DE CARREGAMENTO (Renderiza os Skeletons cinzas piscando na tela)
  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto px-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden border-zinc-200 dark:border-bs-zinc-800 shadow-sm"
          >
            <CardContent className="p-0 aspect-square flex flex-col">
              <Skeleton className="w-full h-40 bg-zinc-200 dark:bg-zinc-800 animate-pulse rouded-t-xl" />
              <div className="p-4 flex-1 space-y-3">
                <Skeleton className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
                <Skeleton className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
                  <Skeleton className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // ESTADO DE ERRO (Caso a API falhe)
  if (isError) {
    return (
      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center text-center border-2 border-dashed border-red-200 dark:border-red-900 rounded-zl bg-red-50/50 dark:bg-red-950/20 gap-3">
        <AlertTriangle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-shadow-red-900 dark:text-red-400">
          Falha ao carregar produtos assíncronos
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="border-red-200 hover:bg-red-100 text-red-900"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  // ESTADO DE SUCESSO (Renderiza os dados reais vindo da API)
  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-4">
      <div className="flex justify-end pr-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="text-zinc-500 border-zinc-200 dark:border-bs-zinc-800"
        >
          <RefreshCw
            className={`h-3 w-3.5 mr-2 ${isRefetching ? "animate-spin" : ""}`}
          />
          {isRefetching ? "Atualizando..." : "Recarregar API"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products?.map((products) => (
          <Card
            key={products.id}
            className="overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm hover:shad-w-md transition-all"
          >
            <CardContent className="flex flex-col p-0 aspect-square relative">
              <div className="w-full h-40 relative bg-zinc-100 border-b border-zinc-100 dark:border-bs-zinc-900">
                <Image
                  src={products.image}
                  alt={products.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-4 bg-white dark:bg-zinc-950 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase">
                    {products.category}
                  </span>
                  <h3 className="font-semibold text-xs text-zinc-800 dark:text-zinc-200 line-clamp-2 mt-0.5">
                    {products.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-50 dark:border-zinc-900">
                  <span className="font-bold text-sm text-shadow-zinc-900 dark:text-zinc-100">
                    {formatCurrency(products.price)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-shadow-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    onClick={() =>
                      addItem({
                        id: products.id,
                        name: products.title,
                        price: products.price,
                        imageUrl: products.image,
                      })
                    }
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
