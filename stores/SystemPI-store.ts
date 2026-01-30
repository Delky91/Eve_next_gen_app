import { createStore } from "zustand/vanilla";
import { SystemPIPlanets } from "@/lib/types/types";

export interface SystemPIState {
  systemID: number;
  planets: SystemPIPlanets[];
}

export type SystemPIActions = {
  saveInfoSystem: () => void;
  deleteInfo: () => void;
};

export type SystemPIStore = SystemPIState & SystemPIActions;

export const defaultInitState: SystemPIState = {
  systemID: 0,
  planets: [],
};

export const createSystemPIStore = (initState: SystemPIState = defaultInitState) => {
  return createStore<SystemPIStore>()((set) => ({
    ...initState,
    saveInfoSystem: () => set((state) => state),
    deleteInfo: () => set(defaultInitState),
  }));
};
