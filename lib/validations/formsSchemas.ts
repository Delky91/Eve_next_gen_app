import * as z from "zod";

export const systemFormSchema = z.object({
  lang: z.enum(["en", "es", "ko", "zh", "ja"]),
  system: z.string().min(1, "Field is required"),
});

export const planetFormV2 = z.object({
  materials: z
    .array(
      z.object({
        materialId: z.number().min(1),
        amount: z
          .union([z.string(), z.number()]) // 👈 Acepta string o number
          .transform((val) => {
            if (typeof val === "string") {
              const num = parseFloat(val);
              return isNaN(num) ? 0 : num;
            }
            return val;
          })
          .pipe(z.number().min(1, "Any number between 1-100").max(100, "Any number between 1-100")),
      })
    )
    .min(1),
});
