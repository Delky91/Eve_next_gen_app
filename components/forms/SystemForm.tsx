"use client";
//form
import { systemFormSchema } from "@/lib/validations/systemFormValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
//components
import { toast } from "sonner";
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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { systemFormType } from "@/lib/types/zodTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { langOptions } from "@/lib/const";

export const SystemForm = () => {
  const systemForm = useForm<systemFormType>({
    resolver: zodResolver(systemFormSchema),
    mode: "onSubmit",
    defaultValues: {
      lang: "en",
      system: "",
    },
  });

  function onSubmit(data: systemFormType) {
    console.log(data);
    toast.success("System Search Successful");
  }

  return (
    <Card className="w-full sm:max-w-md">
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
                  <FieldSet>
                    <FieldLegend>Language</FieldLegend>
                    <FieldDescription>Select a language for the search</FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {langOptions.map((lang) => (
                        <FieldLabel key={lang.id} htmlFor={`form-radio-${lang.lang}`}>
                          <Field orientation={"horizontal"} data-invalid={isInvalid}>
                            <FieldContent>
                              <FieldTitle>{lang.description}</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem
                              value={lang.lang}
                              id={`form-radio-${lang.lang}`}
                              aria-invalid={isInvalid}
                            />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {isInvalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
                );
              }}
            />

            <FieldSeparator />

            <Controller
              name="system"
              control={systemForm.control}
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid;

                return (
                  <Field aria-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>System Name</FieldLabel>
                    <Input {...field} id={field.name} aria-invalid={isInvalid} />
                    {isInvalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                );
              }}
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
