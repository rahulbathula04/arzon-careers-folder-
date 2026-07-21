import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SectionItem = { id: string; label: string };

type NavSectionsContextValue = {
  sections: SectionItem[];
  setSections: (sections: SectionItem[]) => void;
};

const NavSectionsContext = createContext<NavSectionsContextValue | null>(null);

export function NavSectionsProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<SectionItem[]>([]);
  const value = useMemo(() => ({ sections, setSections }), [sections]);

  return <NavSectionsContext.Provider value={value}>{children}</NavSectionsContext.Provider>;
}

export function useNavSectionsContext() {
  const value = useContext(NavSectionsContext);
  if (!value) return { sections: [] as SectionItem[], setSections: () => undefined };
  return value;
}

export function useNavSections(sections: SectionItem[]) {
  const { setSections } = useNavSectionsContext();

  useEffect(() => {
    setSections(sections);
    return () => setSections([]);
  }, [sections, setSections]);
}
