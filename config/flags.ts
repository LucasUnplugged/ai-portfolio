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
  // ← new flags are inserted here (newest first)
} as const satisfies Record<string, FlagDefinition>;

// -- Derived types ----------------------------------------------------------

export type FlagName = keyof typeof flagRegistry;

// -- Runtime helper ----------------------------------------------------------

const ENV: Environment =
  (process.env.APP_ENV as Environment) ??
  (process.env.NODE_ENV === 'production' ? 'prod' : 'dev');

export function getFlag(name: FlagName, env: Environment = ENV): boolean {
  const flag: FlagDefinition = flagRegistry[name];
  return flag.overrides?.[env] ?? flag.default;
}

// -- Full registry export (for tooling / status commands) --------------------

export { flagRegistry };
