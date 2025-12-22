import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SystemResult({ system, planets }: { system: string; planets: string[] }) {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="border-b">
        <CardTitle> {system} </CardTitle>
        <CardDescription> The system has {planets.length} planets </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {planets.map((planet) => {
            return (
              <AccordionItem value={planet} key={planet}>
                <AccordionTrigger>{planet}</AccordionTrigger>
                <AccordionContent>you are looking at {planet}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default SystemResult;
