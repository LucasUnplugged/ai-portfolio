// config/flags.ts — Feature flag registry (managed by epic skill)
// Do not edit flag entries manually — use /epic to create and manage flags.

type Environment = 'dev' | 'staging' | 'prod';

interface FlagDefinition {
  description: string;
  added: string; // YYYY-MM-DD
  default: boolean;
  overrides?: Partial<Record<Environment, boolean>>;
}

const flagRegistry = {
  foundation_landing_case_studies: {
    description: 'Portfolio site foundation: shadcn/ui, landing page, case studies, demo layouts',
    added: '2026-03-03',
    default: false,
    overrides: { dev: true, staging: true },
  },
  // ← new flags are inserted here (newest first)
} as const satisfies Record<string, FlagDefinition>;

// -- Derived types ----------------------------------------------------------

export type FlagName = keyof typeof flagRegistry;

// -- Runtime helper ----------------------------------------------------------

const ENV: Environment =
  (process.env.APP_ENV as Environment) ??
  (process.env.NODE_ENV === 'production' ? 'prod' : 'dev');

export function getFlag(name: FlagName, env: Environment = ENV): boolean {
  const flag = flagRegistry[name];
  return (flag.overrides as Partial<Record<Environment, boolean>> | undefined)?.[env] ?? flag.default;
}

// -- Full registry export (for tooling / status commands) --------------------

export { flagRegistry };
