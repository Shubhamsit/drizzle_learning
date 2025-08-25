import { eq } from "drizzle-orm";
import { db } from "./drizzle/db.js";
import { UserPrefrencesTable, UserTable } from "./drizzle/schema.js";

export async function sql_style() {
  const users = await db
    .select({
      id: UserTable.id,
      age: UserTable.age,
      emailUpdates: UserPrefrencesTable.emailUpdates,
    })
    .from(UserTable)
    .where(eq(UserTable.age, 29))
    .leftJoin(
      UserPrefrencesTable,
      eq(UserPrefrencesTable.userId, UserTable.id)
    );

  

  console.log(users);
}
