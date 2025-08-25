import { UserPrefrencesTable, UserTable } from "./drizzle/schema.js";
import { db } from "./drizzle/db.js";

export async function insert() {

    await db.delete(UserTable);

  const user = await db
    .insert(UserTable)
    .values({
      name: "shubham",
      age: 20,
      email: "shubhamsit31@gmail.com",
    })
    .returning({
      id: UserTable.id,
      name: UserTable.name,
    });

  // here returning is specifing which values you want to return after inserting into table , here we are returning id , we can also return multiple values

  // its return type is   [ { id: 'df213cc2-15fd-4347-acf5-ae395f134805', name: 'shubham' } ], array of objects

  // console.log(user);

  //------------------------------------to insert multiple rows at same time --------------


  // here we are using array of objects to pass values into table 

  // const user2=await db.insert(UserTable).values([{},{},{}])  like this 

  const user2 = await db
    .insert(UserTable)
    .values([
      {
        name: "saurabh",
        age: 23,
        email: "saurabh@gmail.com",
      },
      {
        name: "sachin",
        age: 21,
        email: "sachin31@gmail.com",
      },
    ])
    .returning({
      id: UserTable.id,
      name: UserTable.name,
    });


    await db.insert(UserPrefrencesTable).values({
      emailUpdates:true,
      userId:"861546c5-be67-4708-9868-573f83f19aef"
    })


    // now will see about upsert like onConflictDoUpdate


    const user3 = await db
    .insert(UserTable)
    .values([
      {
        name: "saurabh",
        age: 23,
        email: "saurabh@gmail.com",
      },
      {
        name: "sachin",
        age: 21,
        email: "sachin31@gmail.com",
      },
    ])
    .returning({
      id: UserTable.id,
      name: UserTable.name,
    }).onConflictDoUpdate({


        target:UserTable.email,
        set:{name:"sahil"}
    })

// here when it find  the duplicate incoming email then it update the name field with rajeev


}