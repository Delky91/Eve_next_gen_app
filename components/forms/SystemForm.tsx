"use client";

import { systemFormSchema } from "@/lib/validations/systemFormValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { systemFormType } from "@/lib/types/zodTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Autocomplete, AutocompleteOption } from "@/components/ui/autocomplete";
import systemsData from "@/lib/esd/systemsAutocomplete.json";
import { useMemo } from "react";

const langAccepted = ["en", "es", "ko", "zh", "ja"] as const;

const langLabels: Record<string, string> = {
  en: "English",
  es: "Español",
  ko: "한국어",
  zh: "中文",
  ja: "日本語",
};

export const SystemForm = () => {
  const systemForm = useForm<systemFormType>({
    resolver: zodResolver(systemFormSchema),
    defaultValues: {
      lang: "en",
      system: "",
    },
  });

  const selectedLang = systemForm.watch("lang");

  const systemOptions = useMemo<AutocompleteOption[]>(() => {
    return systemsData.map((system) => ({
      value: system.id.toString(),
      label: system.name[selectedLang],
      data: system,
    }));
  }, [selectedLang]);

  function onSubmit(data: systemFormType) {
    console.log(data);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>System Search</CardTitle>
        <CardDescription>Search for an EVE Online system by name</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="systemForm" onSubmit={systemForm.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="lang"
              control={systemForm.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">Language</FieldLegend>
                  <FieldDescription>Select your language for system names</FieldDescription>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {langAccepted.map((lang) => (
                      <div key={lang} className="flex items-center gap-2">
                        <RadioGroupItem value={lang} id={`lang-${lang}`} />
                        <Label htmlFor={`lang-${lang}`}>{langLabels[lang]}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FieldError errors={[fieldState.error]} />
                </FieldSet>
              )}
            />

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
        <Button type="submit" form="systemForm" className="w-full">
          Search System
        </Button>
      </CardFooter>
    </Card>
  );
};