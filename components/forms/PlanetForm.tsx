"use client";

import { useReducer } from "react";
import { useForm, Controller, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";

import { Planet } from "@/lib/types/types";
import { planetFormV2 } from "@/lib/validations/formsSchemas";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type MaterialFormValue = {
  materialId: number;
  amount: number;
};

type PlanetFormProps = {
  systemName: string;
  planet: Planet;
};

type PlanetFormValues = {
  materials: MaterialFormValue[];
};

type EditState = {
  editing: Set<number>;
  hasSubmitted: boolean;
};

type EditAction =
  | { type: "TOGGLE"; materialId: number }
  | { type: "RESET" }
  | { type: "SET_SUBMITTED" };

function editReducer(state: EditState, action: EditAction): EditState {
  switch (action.type) {
    case "TOGGLE": {
      const next = new Set(state.editing);
      next.has(action.materialId) ? next.delete(action.materialId) : next.add(action.materialId);
      return { ...state, editing: next };
    }

    case "RESET":
      return { editing: new Set(), hasSubmitted: false };

    case "SET_SUBMITTED":
      return { ...state, hasSubmitted: true, editing: new Set() };

    default:
      return state;
  }
}

const PlanetForm = ({ planet }: PlanetFormProps) => {
  const form = useForm<PlanetFormValues>({
    resolver: zodResolver(planetFormV2),
    defaultValues: {
      materials: planet.materials.map((m) => ({
        materialId: m.id,
        amount: m.amount ?? 0,
      })),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  const { fields } = useFieldArray({
    control,
    name: "materials",
  });

  const [editState, dispatch] = useReducer(editReducer, {
    editing: new Set<number>(),
    hasSubmitted: false,
  });

  const onSubmit: SubmitHandler<PlanetFormValues> = (data) => {
    console.log("SUBMIT:", data);
    dispatch({ type: "SET_SUBMITTED" });
  };

  const onReset = () => {
    dispatch({ type: "RESET" });
    form.reset();
  };

  return (
    // @ts-expect-error onSubmit works
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {fields.map((field, index) => {
          const material = planet.materials[index];
          const materialId = material.id;
          const currentValue = getValues(`materials.${index}.amount`);

          const canEdit = !editState.hasSubmitted || editState.editing.has(materialId);
          const showEditButton = editState.hasSubmitted && currentValue > 0;

          return (
            <Field key={field.id} className="flex items-center gap-2">
              <FieldLabel className="min-w-[120px]">{material.name}</FieldLabel>

              <div className="flex items-center gap-2">
                <Controller
                  name={`materials.${index}.amount`}
                  control={control}
                  render={({ field: controllerField, fieldState }) => (
                    <Input
                      type="number"
                      value={controllerField.value?.toString() || ""}
                      disabled={!canEdit}
                      data-invalid={fieldState.invalid}
                      className="w-24"
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue = value === "" ? 0 : Number(value);
                        controllerField.onChange(numericValue);
                      }}
                      onBlur={controllerField.onBlur}
                      name={controllerField.name}
                    />
                  )}
                />

                {showEditButton && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: "TOGGLE", materialId })}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Field>
          );
        })}

        <Field className="flex gap-2">
          <Button type="button" variant="secondary" onClick={onReset}>
            Reset
          </Button>

          <Button type="submit">Save</Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default PlanetForm;
