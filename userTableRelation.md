## Notes on userTableRelations

- used in `with` in `users2` in `query.ts` file
- inside   `schema.ts`

```ts
export const userTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    prefrences: one(UserPrefrencesTable),
    post: many(PostTable)
  }
})

```

### 1. What is happening here?

- We are defining relationships between database tables using Drizzle ORM.

- relations() tells Drizzle how different tables are connected to each other.

### 2. relations(UserTable, ...)

- This means we are defining relationships for the UserTable.

- All relations inside this function belong to UserTable.

### 3. { one, many }

- These are helper functions provided by Drizzle.

- one(...): means One-to-One relation.

- many(...): means One-to-Many relation.

### 4. Inside return { ... }
- We define specific relations:
-  `prefrences:` one(UserPrefrencesTable)

- Each user has one set of preferences.

- One-to-One Relation → UserTable → UserPreferencesTable.

- `post: many(PostTable)`

- Each user can have multiple posts.

- One-to-Many Relation → `UserTable` → `PostTable.`

- example Uses:-
```ts
const userWithPosts = await db.query.UserTable.findMany({
  with: {
    post: true,          // fetch all posts of user
    prefrences: true     // fetch user preferences
  }
})


```

- This will return:

``` json

[
  {
    "id": 1,
    "name": "Shubham",
    "prefrences": { "theme": "dark", "lang": "en" },
    "post": [
      { "id": 101, "title": "First post" },
      { "id": 102, "title": "Second post" }
    ]
  }
]


```

### Final Summary:

- relations() defines how tables connect.

- one() → one-to-one (user → preferences).

- many() → one-to-many (user → posts).

- Makes querying related data super easy without manual joins.