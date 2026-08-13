"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipagem das funções que o componente vai disparar ao ser chamado
interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string | null) => void;
}

export function FilterBar({ onSearchChange, onSortChange }: FilterBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 gap-4 flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      {/* Bloco de Barra de Pesquisa */}
      <div className="relative w-full sm:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Procurando produtos..."
          className="pl-10 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Bloco do Dropdown de Seleção/Filtro */}
      <div className="w-full sm:w-52">
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-full border-zinc-200 dark:border-zinc-800 focus:ring-zinc-400">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevant">Mais Relevante</SelectItem>
            <SelectItem value="price-asc">
              Preço: Do Menor para o Maior
            </SelectItem>
            <SelectItem value="price-desc">
              Preço: Do Maior para o Menor
            </SelectItem>
            <SelectItem value="rating">Melhor Avaliação</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
