## Migerations



### What is Migeration

- A set of instructions (usually SQL or ORM-generated code) that transforms the current state of your database schema into a new desired state.
- It is basically a delta (difference) between two schema versions.

- below will Creates a drizzle.config.ts file.
```
npx drizzle-kit init

```


- below  will generate migeration as per `drizzle.config.ts`

```
npx drizzle-kit generate
```


```
npx drizzle-kit migrate
```

- for this project

```ts

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

```



- To remove migerations file

```
npx drizzle-kit drop
```


### can add scripts in package.json for migeration

```json

  "gen-migeration":"npx drizzle-kit generate",
  "del-migeration":"npx drizzle-kit drop"


```

- then can run using :

```
npm run gen-migeration
```
- to delete migeration
```
npm run del-migeration
```

- New Cli command to  migerate 

```
npx drizzle-kit migrate
```


