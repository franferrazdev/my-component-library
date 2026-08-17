"use client";
import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageMinus } from "lucide-react";

//  1. Tipagem TypeScript das propriedades que o componente vai receber
interface CarouselImage {
  id: string;
  url: string;
  title: string;
}

interface ProductCarouselProps {
  images: CarouselImage[];
}

export function ProductCarousel({ images }: ProductCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  // Se não houver imagens, exibe um aviso
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center border-2 border-dashed rounded-xl bg-muted text-muted-foreground">
        Nenhuma imagem disponível para o slide.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.play()}
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col p-0 aspect-square relative">
                    {/* Imagem otimizada usando o component Image do Next.js */}
                    <div className="w-full h-48 relative bg-zinc-100">
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        priority
                        loading="eager"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {/* Legenda/ Título do Produto embaixo do slide */}
                    <div className="p-4 bg-white dark:bg-zinc-950 flex-1 flex items-center">
                      <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 line-clamp-2">
                        {image.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Setas de navegação lateral */}
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </div>
  );
}
