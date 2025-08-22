import { Many, relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  integer,
  pgEnum,
  unique,
  uniqueIndex,
  boolean,
  real,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core"; // here diff options can be according to driver

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const UserTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(), // here id is primary key and an default value will be assigned

    //  id2:serial("id2").primaryKey() // this is autoincreement id and also primary key we can use it also insted of uuid type id

    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: UserRole("userRole").default("BASIC").notNull(),
  },

  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email), // here we are indexing it for fast query

      uniqueNameAndAge: unique("uniqueNameAndAge").on(table.name, table.age), // here we are creating a index combination of name and age and as this combination is unique so we cant add the another entery with same name and age .  Combination of nbame and age must be unique
    };
  }
);

// UserPrefrences table is one-to-one relationship with UserTable

export const UserPrefrencesTable = pgTable("userPrefrences", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),

  userId: uuid("userId")
    .references(() => UserTable.id)
    .notNull(), // here it refrences to userTable by using 'id' field in userTable and 'userId' in UserPrefrencesTable, basically foreign key relation , so by doing this UserPrefrencesTable and UserTable get connected
});

// below will do one-to-many relationship

// here one users can do many posts so this is one-to-many relation

export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().notNull(),
  title: varchar("title", { length: 245 }).notNull(),
  averageRating: real("averageRating").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull(),
});

// below is many-to-many-relationship

/*

-> One Post can belong to many Categories
-> One Category can have many Posts

*/

export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().notNull(),
  name: varchar("name", { length: 245 }).notNull(),
});

export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId")
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => CategoryTable.id)
      .notNull(),
  },

  (table) => {
    return {
      pk: primaryKey({ columns: [table.categoryId, table.postId] }), // it composite primary key using postId and categoryId
    };
  }
);




// Relations


export const userTableRelations=relations(UserTable,({one,many})=>{
return{

  prefrences:one(UserPrefrencesTable),
  post:many(PostTable)
}

})