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
  planetType: PlanetType;
  materials: Material[];
};

export type PlanetType = {
  key: string;
  name: string;
};

type Material = {
  id: number;
  name: string;
  volume: number | null;
  amount?: number;
};

export type SystemsDictMap = Record<
  number,
  {
    name: Record<Lang, string>;
  }
>;

export type MaterialSystemPI = {
  id: number;
  amount: number;
};

export type SystemPIPlanets = {
  planetID: number;
  planetType: PlanetType;
  materials: MaterialSystemPI[];
};
