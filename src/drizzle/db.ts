import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config'
import * as schema from  './schema.js'


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(queryClient,{schema,logger:true});

