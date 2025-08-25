import { eq } from "drizzle-orm";
import { db } from "./drizzle/db.js";
import { UserTable } from "./drizzle/schema.js";

export async function delette_inTable(){

    const users=await db.delete(UserTable).where(eq(UserTable.age, 29))

}