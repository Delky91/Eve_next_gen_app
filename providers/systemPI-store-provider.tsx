"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";
import { type SystemPIStore, createSystemPIStore } from "@/stores/SystemPI-store";

export type SystemPIStoreAPI = ReturnType<typeof createSystemPIStore>;

export const SystemPIStoreContext = createContext<SystemPIStoreAPI | undefined>(undefined);

export interface SystemPIStoreProviderProps {
  children: ReactNode;
}

const SystemPIStoreProvider = ({ children }: SystemPIStoreProviderProps) => {};

export default SystemPIStoreProvider;
