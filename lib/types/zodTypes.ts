import * as z from "zod";
import { systemFormSchema } from "../validations/systemFormValidations";

export type systemFormType = z.infer<typeof systemFormSchema>;