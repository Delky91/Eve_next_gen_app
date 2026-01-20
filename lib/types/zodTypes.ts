import * as z from "zod";
import { planetFormSchema, systemFormSchema } from "../validations/formsSchemas";

export type systemFormType = z.infer<typeof systemFormSchema>;
export type planetFormType = z.infer<typeof planetFormSchema>;
