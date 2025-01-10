"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Input } from "../ui/input";

type PetType = "Dog" | "Cat" | "Rabbit" | "Bird" | "Hamster" | "Fish";

const petTypes: PetType[] = ["Dog", "Cat", "Rabbit", "Bird", "Hamster", "Fish"];

interface NutritionalContent {
  [key: string]: {
    description: string;
    nutrients: { [nutrient: string]: string };
  };
}

const nutritionalData: NutritionalContent = {
  Dog: {
    description:
      "Dogs need a balanced diet of protein, fats, and carbohydrates. Ensure they have access to fresh water and avoid feeding them human food.",
    nutrients: {
      Protein: "18-25%",
      Fat: "5-15%",
      Fiber: "2-5%",
    },
  },
  Cat: {
    description:
      "Cats require a high protein diet, including amino acids like taurine. It's important to provide them with wet food or fresh water.",
    nutrients: {
      Protein: "26-35%",
      Fat: "9-15%",
      Fiber: "1-5%",
    },
  },
  Rabbit: {
    description:
      "Rabbits need a fiber-rich diet, including hay, vegetables, and water. Ensure their diet is balanced to avoid digestive issues.",
    nutrients: {
      Fiber: "18-20%",
      Protein: "14-16%",
      Fat: "1-2%",
    },
  },
  Bird: {
    description:
      "Birds have varied nutritional needs based on species, often including seeds, fruits, and vegetables. Consult an expert for specific needs.",
    nutrients: {
      Seeds: "Varies by species",
      Fruits: "Fresh daily",
      Vegetables: "Fresh daily",
    },
  },
  Hamster: {
    description:
      "Hamsters benefit from grains, vegetables, and protein sources. Ensure they have fresh food and clean water daily.",
    nutrients: {
      Protein: "15-20%",
      Fat: "3-5%",
      Fiber: "5-10%",
    },
  },
  Fish: {
    description:
      "Fish diets vary widely, often including pellets and occasional treats. Ensure to feed them suitable food based on their species.",
    nutrients: {
      Protein: "30-45%",
      Fat: "5-10%",
      Fiber: "1-5%",
    },
  },
};

export default function NutritionPdfGenerator() {
  const [loading, setLoading] = useState(false);
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");

  const generatePdf = async (petType: PetType) => {
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const data = nutritionalData[petType];
      const title = `${petType} Nutrition Needs`;

      page.drawText(title, {
        x: 50,
        y: height - 50,
        size: 24,
        font,
      });

      const descriptionHeight = 80;
      page.drawText(data.description, {
        x: 50,
        y: height - 70,
        size: 12,
        font,
        maxWidth: 500,
      });

      page.drawText(`Age: ${petAge} years`, {
        x: 50,
        y: height - 150,
        size: 12,
        font,
      });
      page.drawText(`Weight: ${petWeight} kg`, {
        x: 50,
        y: height - 170,
        size: 12,
        font,
      });

      let yPosition = height - descriptionHeight - 200;

      page.drawText("Nutrient", { x: 50, y: yPosition, size: 14, font });
      page.drawText("Recommended", { x: 300, y: yPosition, size: 14, font });
      yPosition -= 20;

      for (const [nutrient, value] of Object.entries(data.nutrients)) {
        page.drawText(nutrient, { x: 50, y: yPosition, size: 12, font });
        page.drawText(value, { x: 300, y: yPosition, size: 12, font });
        yPosition -= 18;
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${petType}_Pawfect_Nutrition_Needs.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Age (in years)"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            className="border p-2"
          />
          <Input
            type="number"
            placeholder="Weight (in kg)"
            value={petWeight}
            onChange={(e) => setPetWeight(e.target.value)}
            className="border p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {petTypes.map((pet) => (
          <Button key={pet} onClick={() => generatePdf(pet)} disabled={loading}>
            {loading ? "Generating..." : pet}
          </Button>
        ))}
      </div>
    </div>
  );
}
