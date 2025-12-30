"use server";

import systemsData from "@/lib/esd/systemsAutocomplete.json";

export const systemFormActions = async (lang: string, systemName: string) => {
  if (!systemName || systemName.length < 2) {
    return [];
  }
  // validate the language
  const validLangs = ["en", "es", "ja", "ko", "zh"];
  if (!validLangs.includes(lang)) {
    return [];
  }

  // filter system
  const filteredSystems = systemsData.filter((system) => {
    const systemNameInLang = system.name[lang as keyof typeof system.name];
    return systemNameInLang?.toLowerCase().includes(systemName.toLowerCase());
  });

  // return only the first teen result for suggestions
  return filteredSystems.slice(0, 10).map((system) => ({
    id: system.id,
    name: system.name[lang as keyof typeof system.name],
    regionID: system.regionID,
    constellationID: system.constellationID,
  }));
};
