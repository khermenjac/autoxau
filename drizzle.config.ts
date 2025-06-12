import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/Schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
