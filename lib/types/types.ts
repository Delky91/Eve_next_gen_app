export type Lang = "en" | "es" | "ja" | "ko" | "zh";

export type SystemPI = {
  securityStatus: number;
  planets: PlanetPI[];
};

export type PlanetPI = {
  planetId: number;
  planetType: string; // key: temperate, lava, etc
  piMaterials: number[];
};

export type Dictionary = {
  planetTypes: Record<
    string,
    {
      name: Record<string, string>;
    }
  >;
  materials: Record<
    number,
    {
      name: Record<string, string>;
      volume: number;
    }
  >;
};

export type SystemPIResponse = {
  systemId: number;
  systemName: string;
  securityStatus: number;
  planets: Planet[];
};

export type Planet = {
  planetId: string;
  planetType: {
    key: string;
    name: string;
  };
  materials: Material[];
};

type Material = {
  id: number;
  name: string;
  volume: number | null;
};

export type SystemsDictMap = Record<
  number,
  {
    name: Record<Lang, string>;
  }
>;
