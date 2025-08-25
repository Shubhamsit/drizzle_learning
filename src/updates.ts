import { eq } from "drizzle-orm";
import { db } from "./drizzle/db.js";
import { UserTable } from "./drizzle/schema.js";

export async function updates(){

    const users=await db.update(UserTable).set({age:30}).where(eq(UserTable.age, 30))

}