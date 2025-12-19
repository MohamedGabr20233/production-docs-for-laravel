import { createContext, useContext, useState, ReactNode } from "react";

interface Section {
  id: string;
  label: string;
}

interface SectionGroup {
  id: string;
  label: string;
  sections: Section[];
}

interface IntegrationContextType {
  sections: Section[];
  setSections: (sections: Section[]) => void;
  sectionGroups: SectionGroup[];
  setSectionGroups: (groups: SectionGroup[]) => void;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

export function IntegrationProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionGroups, setSectionGroups] = useState<SectionGroup[]>([]);

  return (
    <IntegrationContext.Provider value={{ sections, setSections, sectionGroups, setSectionGroups }}>
      {children}
    </IntegrationContext.Provider>
  );
}

export function useIntegrationSections() {
  const context = useContext(IntegrationContext);
  if (context === undefined) {
    throw new Error("useIntegrationSections must be used within an IntegrationProvider");
  }
  return context;
}

export type { Section, SectionGroup };
