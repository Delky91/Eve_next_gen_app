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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { systemFormType } from "@/lib/types/zodTypes";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const langAccepted = ["en", "es", "ko", "zh", "ja"];

export const SystemForm = () => {
    const systemForm = useForm<systemFormType>({
        resolver: zodResolver(systemFormSchema),
        defaultValues: {
            lang: "en",
            system: ""
        }
    })

    function onSubmit(data: systemFormType){
        console.log(data); 
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>
                    System Search
                </CardTitle>
                <CardDescription>
                    placeholder
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="systemForm" onSubmit={systemForm.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller name="lang"
                        control={systemForm.control}
                        render={({field, fieldState})=> (
                            <FieldSet>
                                <FieldLegend>
                                    Select your language for the search
                                </FieldLegend>
                                <FieldDescription>PlaceHolder</FieldDescription>
                                <RadioGroup name={field.name} value={field.value} onValueChange={field.onChange}>
                                    
                                </RadioGroup>
                            </FieldSet>
                        )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}