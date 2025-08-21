import {pgTable,uuid,serial,varchar} from 'drizzle-orm/pg-core'  // here diff options can be according to driver

export const UserTable =pgTable('user',{


    id:uuid("id").primaryKey().defaultRandom(), // here id is primary key and an default value will be assigned

   //  id2:serial("id2").primaryKey() // this is autoincreement id and also primary key we can use it also insted of uuid type id

   name:varchar("name",{length:255}).notNull()




})