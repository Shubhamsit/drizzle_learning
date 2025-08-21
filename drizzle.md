## Drizzle database Config
- Some docs is in `readme.md`

- below will Creates a drizzle.config.ts file.
```
npx drizzle-kit init

```

- `schema.ts`

``` ts

import {pgTable,uuid,serial,varchar,integer,text} from 'drizzle-orm/pg-core'  // here diff options can be according to driver

export const UserTable =pgTable('user',{


    id:uuid("id").primaryKey().defaultRandom(), // here id is primary key and an default value will be assigned

   //  id2:serial("id2").primaryKey() // this is autoincreement id and also primary key we can use it also insted of uuid type id

   name:varchar("name",{length:255}).notNull(),

   roll:integer().notNull(),
   age:integer().notNull(),
   x:integer().notNull(),
    email: text("email").notNull(),


})


```
- `db.ts`

```ts
import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config'
import * as schema from  './schema.js'


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(queryClient,{schema,logger:true});

```