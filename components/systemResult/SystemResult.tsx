import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SystemPIResponse } from "@/lib/types/types";
import { toRoman } from "@/lib/math";

function SystemResult({ data }: { data: SystemPIResponse | null }) {
  if (!data) return <div>No system found</div>;
  const { systemId, systemName, securityStatus, planets } = data;

  return (
    <Card className="mx-auto mt-4 w-full sm:max-w-md">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">{systemName}</CardTitle>
        <CardDescription>
          <p>{`System ID: ${systemId}`}</p>
          <p>{`Security Status: ${securityStatus.toFixed(1)}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {planets.map((planet, index) => {
            const romanIndex = toRoman(index + 1);

            return (
              <AccordionItem value={String(planet.planetId)} key={planet.planetId}>
                <AccordionTrigger className="text-lg font-semibold capitalize">
                  {systemName} {romanIndex} {planet.planetType.key}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2 text-lg font-semibold">Materials P0:</p>
                  {planet.materials.map((mat) => {
                    return (
                      <div key={mat.id}>
                        <p className="capitalize">{mat.name}</p>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default SystemResult;
