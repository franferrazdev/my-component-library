"use client";

import * as React from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "./cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog as SheetPrimitive } from "@base-ui/react";
import { Slot } from "@radix-ui/react-slot";

export function CartDrawer() {
  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);
  // Consumindo os estados e funções da loja global do Zustand
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } =
    useCartStore();

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  const totalItems = hasHydrated ? getTotalItems() : 0;

  return (
    <Sheet>
      {/* Botão flutuante ou fixo para abrir o carrinho com o contador */}
      <SheetTrigger className="relative h-10 w-10 inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-bs-zinc-800 bg-white hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 transition-colors">
        <ShoppingCart className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 w-5 flex items-center justify-center p-0 text-[10px] bg-red-600 hover:bg-red-700 text-white rounded-full">
            {totalItems}
          </Badge>
        )}
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Meu Carrinho
          </SheetTitle>
        </SheetHeader>

        {/* Lista de Items do Carrinho */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-2">
              <ShoppingCart className="h-12 w-12 text-zinc-300" />
              <p className="text-sm">Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-lg border border-zinc-100 dark:border-zinc-900"
              >
                <div className="w-16 h-16 relative rounded-md overflow-hidden bg-zinc-100 border shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-shadow-zinc-800 dark:text-zinc-200 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {formatCurrency(item.price)}
                  </p>

                  {/* Controles de Quantidade */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-red-600"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com Totais e Botão do Stripe */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 bg-white dark:bg-zinc-950 space-y-4">
            <div className="flex items-center justify-between text-base font-semibold text-zinc-900 dark:text-zinc-50">
              <span>Total:</span>
              <span>{formatCurrency(getTotalPrice())}</span>
            </div>
            <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-shadow-zinc-900 dark:hover:bg-zinc-200 font-medium py-6 rounded-lg transition-colors">
              Ir para o Checkout (Stripe)
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
