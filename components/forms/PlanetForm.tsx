"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { planetFormType } from "@/lib/types/zodTypes";
import { Input } from "@/components/ui/input";
import { planetFormSchema } from "@/lib/validations/formsSchemas";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type PlanetFormProps = {
  systemName: string;
  planetName: string;
  materialName: string;
};

const PlanetForm = ({ systemName, planetName, materialName }: PlanetFormProps) => {
  const [value, setValue] = useState<number>(0);
  const planetFormOptions = useForm<planetFormType>({
    resolver: zodResolver(planetFormSchema),
    mode: "onSubmit",
    defaultValues: {
      planetName: planetName,
      materialName: materialName,
      materialAmount: undefined,
    },
  });

  function onSubmit(data: planetFormType) {
    setValue(data.materialAmount);
  }

  function manualReset() {
    setValue(0);
  }

  return (
    <div className="flex-3">
      {value === 0 ? (
        <form
          id="planetForm"
          onSubmit={planetFormOptions.handleSubmit(onSubmit)}
          className="flex space-x-2"
        >
          <Controller
            name="materialAmount"
            control={planetFormOptions.control}
            render={({ field, fieldState }) => {
              return (
                <FieldGroup>
                  <div className="flex">
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="max-w-4/5"
                        type="number"
                        placeholder="1-100"
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                    <Field orientation="horizontal">
                      <Button type="submit" form="planetForm">
                        Submit
                      </Button>
                    </Field>
                  </div>
                </FieldGroup>
              );
            }}
          />
        </form>
      ) : (
        <div className="flex items-center">
          <p className="max-w-4/5">{value}</p>
          <Button type="button" variant="ghost" onClick={() => manualReset()}>
            x
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanetForm;
