### Migerations

- it will generate migeration as per `drizzle.config.ts`

```
npx drizzle-kit generate
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


