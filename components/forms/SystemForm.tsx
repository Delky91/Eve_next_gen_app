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
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { systemFormType } from "@/lib/types/zodTypes";
import { langOptions } from "@/lib/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

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
    toast.success(`looking for ${data.system} in ${data.lang} language...`);
    systemForm.reset();
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
                            {lang.description}
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
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid;

                return (
                  <Field aria-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>System Name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={"Jita"}
                      />
                      <InputGroupAddon>
                        <Search />
                      </InputGroupAddon>
                    </InputGroup>
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
