"use server";
import rawSystems from "@/lib/esd/systems-pi.json";
import rawDictionary from "@/lib/esd/dictionary-pi.json";
import rawSystemDict from "@/lib/esd/systems-names.json";
import {
  type Lang,
  type SystemPI,
  type Dictionary,
  type SystemPIResponse,
  type SystemsDictMap,
} from "@/lib/types/types";

const systemsData = rawSystems as Record<number, SystemPI>;
const dictionary = rawDictionary as Dictionary;

export const getSystemInfo = async (
  systemId: string,
  lang: Lang = "en"
): Promise<SystemPIResponse | null> => {
  //parse systemId to number
  const id = Number(systemId);
  if (Number.isNaN(id)) return null;

  const system = systemsData[id];
  if (!system) return null;

  const systemName = (rawSystemDict as SystemsDictMap)[id]?.name[lang];

  return {
    systemId: id,
    systemName: systemName,
    securityStatus: system.securityStatus,
    planets: system.planets.map(
      (planet: { planetType: string; planetId: number; piMaterials: number[] }) => {
        const planetTypeDict = dictionary.planetTypes[planet.planetType];

        return {
          planetId: planet.planetId,
          planetType: {
            key: planet.planetType,
            name: planetTypeDict?.name[lang] ?? planetTypeDict?.name.en ?? planet.planetType,
          },
          materials: planet.piMaterials.map((matId: number) => {
            const mat = dictionary.materials[matId];

            return {
              id: matId,
              name: mat?.name[lang] ?? mat?.name.en ?? "Unknown material",
              volume: mat?.volume ?? 0,
            };
          }),
        };
      }
    ),
  };
};
