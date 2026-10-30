import type { Metadata } from "next";
import { ProductTour } from "@/components/tour/ProductTour";

export const metadata: Metadata = {
  title: "Product Tour",
  description: "Tour guiado pelas telas reais do Kombexa: tela Início, alunos, mensalidades, recibos, financeiro, presença, Área do Aluno, comunicados, documentos e equipe.",
  alternates: { canonical: "/tour" },
  openGraph: { url: "/tour", title: "Product Tour do Kombexa" },
};

export default function TourPage() {
  return <ProductTour />;
}
