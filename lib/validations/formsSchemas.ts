import * as z from "zod";

export const systemFormSchema = z.object({
  lang: z.enum(["en", "es", "ko", "zh", "ja"]),
  system: z.string().min(1, "Field is required"),
});

export const planetFormSchema = z.object({
  planetName: z.string().min(1),
  materialName: z.string().min(1),
  materialAmount: z
    .string()
    .transform((value) => parseInt(value, 10))
    .pipe(z.number().min(1, "Any number between 1-100").max(100, "Any number between 1-100")),
});
