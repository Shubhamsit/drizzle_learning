import {defineConfig} from 'drizzle-kit';
import 'dotenv/config'


export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/drizzle/schema.ts', // path of my schema 
  out:'./src/drizzle/migerations',   // here the migerations will be generated
  driver:'pglite',  // driver to get connceted
  dbCredentials:{

    url:process.env.DATABASE_URL as string,
    
  },
  strict: true,
  verbose: true,
})

