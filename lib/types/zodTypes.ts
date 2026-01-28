import * as z from "zod";
import { planetFormV2, systemFormSchema } from "../validations/formsSchemas";

export type systemFormType = z.infer<typeof systemFormSchema>;
export type planetFormV2Type = z.infer<typeof planetFormV2>;
