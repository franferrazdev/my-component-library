"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useCartStore } from "@/library/fase-3-global/cart-store";
import { ShoppingBag } from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface ProductsTableProps {
  initialProducts: ProductItem[];
}

export function ProductTable({ initialProducts }: ProductsTableProps) {
  // Estado global para gerenciar a lista de produtos
  const [products, setProducts] =
    React.useState<ProductItem[]>(initialProducts);

  const addItem = useCartStore((state) => state.addItem);

  // Função para simular a remoção de um item do array em tempo real
  function handleDeleteProduct(id: string) {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  }

  // Função utilitária para formatar valores em Reais (R$)
  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <Table>
        <TableCaption>Lista de produtos ativos em estoque</TableCaption>
        <TableHeader>
          <TableRow className="bg-zinc-50 dark:bg-zinc-900/50">
            <TableHead className="w-62.5 font-semibold">Produto</TableHead>
            <TableHead className="font-semibold">Categoria</TableHead>
            <TableHead className="font-semibold">Estoque</TableHead>
            <TableHead className="text-right font-semibold">Preço</TableHead>
            <TableHead className="w-25 text-center font-semibold">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                Nenhum produto cadastrado no momento.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
              >
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 dark:border-zinc-800 shrink-0">
                    <img
                      src={product.imageUrl ?? "/images/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400">
                  {product.category}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 5
                        ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {product.stock} un
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-center">
                  {/* Botão de comprar para disparar a ação de colocar produto no carrinho */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-shadow-zinc-900 hover:bg-zinc-100"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl ?? "",
                      })
                    }
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                  {/* Botão de Excluir que dispara a alteração do array no estado local */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-50 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir produto</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
