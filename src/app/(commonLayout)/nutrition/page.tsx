import NutritionPdfGenerator from "@/components/nutrition/NutritionPdfGenerator";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";

export default function NutritionPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 lg:p-12 bg-default">
        <h1 className="text-2xl font-bold">Download Nutrition Needs PDF</h1>
        <p>Select a pet to download its nutrition needs guide:</p>
        <NutritionPdfGenerator />
      </div>
    </Suspense>
  );
}
