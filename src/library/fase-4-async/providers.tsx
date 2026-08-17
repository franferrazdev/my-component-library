"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AsyncProviders({ children }: { children: React.ReactNode }) {
  /* Criar o QueryClient dentro de um estado para garantir que cada usuário/aba tenha sua própria instância de cachê isolada e estável */
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configuração de boas práticas
            staleTime: 1000 * 60 * 5, // Os dados são considerados "frescos" por 5 minutos
            refetchOnWindowFocus: false, // Não refaz a busca só porque o usuário mudou de aba
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
