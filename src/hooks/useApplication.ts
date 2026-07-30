import { useCallback, useEffect, useMemo, useState } from "react";

export type ApplyStep = "profile" | "review" | "confirm" | "success";

export interface ApplicantProfile {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  yearOfStudy: string;
  background: string;
  goal: string;
}

export interface ApplicationState {
  applicationId?: string;
  step: ApplyStep;
  profile: Partial<ApplicantProfile>;
  programmeSlug?: string;
  cohortId?: string;
  /** Attribution: where the applicant entered the funnel (e.g. domain-grid). */
  source?: string;
  depositPaid: boolean;
  depositAt?: string;
  createdAt?: string;
}

const KEY = "arzon_application_v1";

const EMPTY: ApplicationState = {
  step: "profile",
  profile: {},
  depositPaid: false,
};

function read(): ApplicationState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<ApplicationState>) };
  } catch {
    return EMPTY;
  }
}

function write(state: ApplicationState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function makeId() {
  return `AG-${Date.now().toString(36).toUpperCase()}`;
}

export interface ApplicationSeed {
  programme?: string;
  cohort?: string;
  source?: string;
}

export function useApplication(seed?: ApplicationSeed) {
  const [state, setState] = useState<ApplicationState>(EMPTY);

  useEffect(() => {
    const stored = read();
    // Hydrate context from seed (URL search) only if not already chosen by user.
    let next = stored;
    if (seed) {
      const patch: Partial<ApplicationState> = {};
      // URL is an explicit signal - the most recent entry-point always wins.
      // This makes the "switch domain on /apply" flow Just Work without
      // requiring the user to clear storage manually.
      if (seed.programme) patch.programmeSlug = seed.programme;
      if (seed.cohort) patch.cohortId = seed.cohort;
      // Attribution: latest entry-point wins so a re-entry via a different
      // tile overwrites the stale value.
      if (seed.source) patch.source = seed.source;
      if (Object.keys(patch).length) {
        next = { ...stored, ...patch };
        write(next);
      }
    }
    setState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.programme, seed?.cohort]);

  const persist = useCallback((updater: (prev: ApplicationState) => ApplicationState) => {
    setState((prev) => {
      const next = updater(prev);
      write(next);
      return next;
    });
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<ApplicantProfile>) => {
      persist((prev) => ({
        ...prev,
        applicationId: prev.applicationId ?? makeId(),
        createdAt: prev.createdAt ?? new Date().toISOString(),
        profile: { ...prev.profile, ...patch },
      }));
    },
    [persist],
  );

  const setProgramme = useCallback(
    (programmeSlug: string) => persist((p) => ({ ...p, programmeSlug })),
    [persist],
  );

  const setCohort = useCallback(
    (cohortId: string) => persist((p) => ({ ...p, cohortId })),
    [persist],
  );

  const setStep = useCallback((step: ApplyStep) => persist((p) => ({ ...p, step })), [persist]);

  const markDepositPaid = useCallback(
    () =>
      persist((p) => ({
        ...p,
        depositPaid: true,
        depositAt: new Date().toISOString(),
        step: "success",
      })),
    [persist],
  );

  const reset = useCallback(() => persist(() => EMPTY), [persist]);

  const completion = useMemo(() => {
    const p = state.profile;
    // yearOfStudy lives in the optional details panel on step 1 and is not
    // a hard requirement to proceed to programme selection.
    const profileDone = !!(p.fullName && p.email && p.phone);
    return {
      profileDone,
      programmeDone: !!state.programmeSlug && !!state.cohortId,
      depositDone: state.depositPaid,
    };
  }, [state]);

  return {
    state,
    completion,
    updateProfile,
    setProgramme,
    setCohort,
    setStep,
    markDepositPaid,
    reset,
  };
}
