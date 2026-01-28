"use client";
//form
import { systemFormSchema } from "@/lib/validations/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
//components
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Autocomplete, AutocompleteOption } from "@/components/Autocomplete";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import systemsData from "@/lib/esd/systemsAutocomplete.json";
import { systemFormType } from "@/lib/types/zodTypes";
import { langOptions, langLabels } from "@/lib/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export const SystemForm = () => {
  const router = useRouter();
  const systemForm = useForm<systemFormType>({
    resolver: zodResolver(systemFormSchema),
    mode: "onSubmit",
    defaultValues: {
      lang: "en",
      system: "",
    },
  });

  const langValue = systemForm.watch("lang");

  const systemOptions = useMemo<AutocompleteOption[]>(() => {
    return systemsData.map((system) => ({
      value: system.id.toString(),
      label: system.name[langValue],
      data: system,
    }));
  }, [langValue]);

  function onSubmit(data: systemFormType) {
    console.log(data);
    toast.success(`looking for ${data.system} in ${data.lang} language...`);
    router.push(`/system?id=${data.system}&lang=${data.lang}`);
    systemForm.reset();
  }

  return (
    <Card className="mx-auto w-full sm:max-w-md">
      <CardHeader className="border-b">
        <CardTitle>System Search</CardTitle>
        <CardDescription>placeholder</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="systemForm" onSubmit={systemForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="lang"
              control={systemForm.control}
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={"form-system-select"}>
                        Select a Language for the search
                      </FieldLabel>
                      {isInvalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id={"form-system-select"}
                        aria-invalid={isInvalid}
                        className="min-w-32"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {langOptions.map((lang) => (
                          <SelectItem key={lang.id} value={lang.lang} className="hover:font-bold">
                            {langLabels[lang.lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />

            <FieldSeparator />

            <Controller
              name="system"
              control={systemForm.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>System</FieldLabel>
                  <FieldDescription>Select the system you want to analyze</FieldDescription>
                  <Autocomplete
                    options={systemOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select a system..."
                    searchPlaceholder="Search systems..."
                    emptyMessage="No system found."
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="systemForm" disabled={!systemForm.formState.isValid}>
            Search
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
