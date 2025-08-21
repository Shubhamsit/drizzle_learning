import {defineConfig} from 'drizzle-kit';
import 'dotenv/config'


export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/drizzle/schema.ts', // path of my schema 
  out:'./src/drizzle/migerations',   // here the migerations will be generated
  // driver:'pglite',  // driver to get connceted (lekin ye migeration me issue kar rha tha , hame p)



  dbCredentials:{

    url:process.env.DATABASE_URL as string,
    
  },
  strict: true,
  verbose: true,
})







 /*


The error happens because your configuration uses driver: 'pglite' with a url that points to a Postgres connection string. The pglite driver is for SQLite-like files (not for a real Postgres server), so it expects a file path (e.g., ./database/) or :memory:, not a Postgres URL1234.

How to fix:

If you want to use PGlite (embedded local database), set your url to a file path (e.g., ./database/) or :memory:.


  */
