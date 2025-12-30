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
import useDebounce from "@/lib/debouncer/debouncer";
import { useCallback, useState, useRef, useEffect } from "react";
import { systemFormActions } from "@/lib/actions/systemFormActios";
import { SystemSuggestionsModal } from "@/components/forms/SystemSuggestionsModal";
import { type SuggestionItem } from "@/lib/types/types";

export const SystemForm = () => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const justSelectedRef = useRef(false);
  const selectedValueRef = useRef<string>("");

  const systemForm = useForm<systemFormType>({
    resolver: zodResolver(systemFormSchema),
    mode: "onSubmit",
    defaultValues: {
      lang: "en",
      system: "",
    },
  });

  const systemValue = systemForm.watch("system");
  const langValue = systemForm.watch("lang");
  const debouncedSystemValue = useDebounce(systemValue, 300);

  // look for suggestions when the debouncer change
  useEffect(() => {
    // don't doble look for the answer once selected
    if (justSelectedRef.current && debouncedSystemValue === selectedValueRef.current) {
      justSelectedRef.current = false;
      selectedValueRef.current = "";
      return;
    }

    const fetchSuggestions = async () => {
      if (debouncedSystemValue && debouncedSystemValue.length >= 2) {
        try {
          const results = await systemFormActions(langValue, debouncedSystemValue);
          setSuggestions(results);
          setIsModalOpen(results.length > 0);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setIsModalOpen(false);
        }
      } else {
        setSuggestions([]);
        setIsModalOpen(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSystemValue, langValue]);

  function onSubmit(data: systemFormType) {
    console.log(data);
    toast.success(`looking for ${data.system} in ${data.lang} language...`);
    systemForm.reset();
    setSuggestions([]);
    setIsModalOpen(false);
  }

  const handleSelectSuggestion = useCallback(
    (suggestion: SuggestionItem) => {
      justSelectedRef.current = true;
      selectedValueRef.current = suggestion.name;
      systemForm.setValue("system", suggestion.name);
      setSuggestions([]);
      setIsModalOpen(false);
    },
    [systemForm]
  );

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
                        ref={inputRef}
                        id={field.name}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          // reset the flag if the user is writing
                          if (
                            justSelectedRef.current &&
                            e.target.value !== selectedValueRef.current
                          ) {
                            justSelectedRef.current = false;
                            selectedValueRef.current = "";
                          }
                          if (e.target.value.length >= 2 && !justSelectedRef.current) {
                            setIsModalOpen(true);
                          } else if (e.target.value.length < 2) {
                            setIsModalOpen(false);
                          }
                        }}
                        onFocus={() => {
                          if (suggestions.length > 0 && !justSelectedRef.current) {
                            setIsModalOpen(true);
                          }
                        }}
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
      <SystemSuggestionsModal
        suggestions={suggestions}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectSuggestion}
        inputRef={inputRef}
      />
    </Card>
  );
};
