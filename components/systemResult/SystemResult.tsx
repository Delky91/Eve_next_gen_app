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
import PlanetForm from "@/components/forms/PlanetForm";

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
            const planetName = systemName + " " + romanIndex + " " + planet.planetType.key;

            return (
              <AccordionItem value={String(planet.planetId)} key={planet.planetId}>
                <AccordionTrigger className="text-lg font-semibold capitalize">
                  {planetName}
                </AccordionTrigger>
                <AccordionContent>
                  <PlanetForm planet={planet} systemName={systemName} />
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
