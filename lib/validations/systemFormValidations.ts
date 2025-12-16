import * as z from "zod";

export const systemFormSchema = z.object({
    lang: z.enum(["en", "es", "ko", "zh", "ja"]),
    system: z.string().min(1,"Field is required")
});