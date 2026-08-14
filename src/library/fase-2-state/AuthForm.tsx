"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

// Definição das regras de validação com Zod
const authSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um e-mail válido (ex.:nome@exemplo.com)." }),
  password: z
    .string()
    .min(10, { message: "A senha de conter no mínimo 10 caracteres." })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula.",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula.",
    })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
    .regex(/[^A-Za-z0-9]/, {
      message: "A senha deve conter pelo menos umcaractere especial.",
    }),
});

type AuthFormValues = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  // Configuração do formulário
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: AuthFormValues) {
    setIsLoading(true);

    // Simula uma requisição de autenticação para o backend de 2 segundos
    setTimeout(() => {
      console.log("Dados validados pelo Zod com sucesso:", data);
      setIsLoading(false);
      alert("Login simulado com sucesso! Dados exibidos no console.");
      form.reset();
    }, 2000);
  }

  return (
    <Card className="w-full max-w-md mx-auto border-zinc-200 dark:border-zinc-800 shadow-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="tex-2xl font-bold tracking-tight">
          Acessar Conta
        </CardTitle>
        <CardDescription>Insira seu e-mail e senha</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de E-mail */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="nome@exemplo.com"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  className="border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
                />
                {fieldState.invalid && (
                  <FieldError className="text-red-500 text-xs mt-1">
                    {fieldState.error?.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Campo de Senha */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="**********"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  className="border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400"
                />
                {fieldState.invalid && (
                  <FieldError className="text-red-500 text-xs mt-1">
                    {fieldState.error?.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {/* Botão de envio com feedback de carregamento */}
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mt-2 h-4 w-4 animate-spin" />
                Autenticando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
