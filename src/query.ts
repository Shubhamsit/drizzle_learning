import { UserTable } from "./drizzle/schema.js";
import { db } from "./drizzle/db.js";
import { asc, desc, sql } from "drizzle-orm";

export async function query() {
  const users = await db.query.UserTable.findMany({
    // columns: { email: true, name: true }, // for this below is output giving only email and name
    /*
        
        [
  { email: 'shubhamsit31@gmail.com', name: 'shubham' },
  { email: 'saurabh@gmail.com', name: 'sahil' },
  { email: 'sachin31@gmail.com', name: 'sahil' }
]
        */
    // columns: { email: false },  // For this below is output , giving all fields except email
    /*


        [
  {
    id: '861546c5-be67-4708-9868-573f83f19aef',
    name: 'shubham',
    age: 20,
    role: 'BASIC'
  },
  {
    id: '5fa61ce6-5e4a-4a4e-bf14-e2c1c1e4127c',
    name: 'sahil',
    age: 23,
    role: 'BASIC'
  },
  {
    id: '1238d2df-c232-44ee-9cd2-4bf878f71ce9',
    name: 'sahil',
    age: 21,
    role: 'BASIC'
  }
]


*/
    // columns: { email: true, name: true },
  });

  // ------------------with more parameterers like extras--------------------------------

  /*
extras:- used to return more info using raw sql 

*/
  const users2 = await db.query.UserTable.findMany({
    columns: { email: true, name: true },
    extras: {
      lowerCaseName: sql<string>`lower(${UserTable.name})`.as("lowerCase"),
    },
    limit: 5, // used to limit how many rows want to see
    offset: 1, // it will skip first if we give 1 , skip 2 entries if we give 2
    with: { prefrences: true },

    // with allows you to select different relationship but you need to setup the relationship at drzzle level as at database level we have mapped it already when defining schema,  so see schema.ts file

    // here with:{prefrences:true } basically we have mapped usertable and prefrences table so if we set 'prefrences:true' it will join both table and will return query with it
  });

  console.log(users);
  console.log(users2);

  // const users3= await db.query.UserTable.findMany({

  //   columns: { email: true, name: true },

  //   with: {
  //     post: { with: { PostCategories: true } }
  //   }

  // })

  //-------------------order by--------------------------------
  /*

1. Normal version
2. Function version

*/

  // -------------------- order by normal version----------------------------

  const users3 = await db.query.UserTable.findMany({
    columns: { email: true, name: true },
    // orderBy:asc(UserTable.name) // will return result in ascending order on name
    orderBy: desc(UserTable.name), // will return result in descendinng order on name
  });

  //--------------------------order by function version-------------------------------

  const users4 = await db.query.UserTable.findMany({
    columns: { email: true, name: true },
    orderBy: (table, func) => func.asc(table.age),
    //orderBy:(table,func)=>func.desc(table.age)
  });

  //-----------------where -----------------------------------------

  const users5 = await db.query.UserTable.findMany({
    columns: { email: true, name: true },
    // where:(table,func)=>func.eq(table.age,29) // where age is equal to 29

    where: (table, func) => func.between(table.age, 20, 25), // where age is between 20 and 25
  });
}
