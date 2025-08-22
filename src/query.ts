import { UserTable } from "./drizzle/schema.js";
import { db } from "./drizzle/db.js";
import { sql } from "drizzle-orm";

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
  const users2= await db.query.UserTable.findMany({

    columns:{email:true,name:true},
    extras:{lowerCaseName:sql<string>`lower(${UserTable.name})`.as("lowerCase")},
    limit:1, // used to limit how many rows want to see 
    offset:1 // it will skip first if we give 1 , skip 2 entries if we give 2
    with:

    // with allows you to select different relationship but you need to setup the relationship at drzzle level as at database level we have mapped it already when defining schema,  so see schema.ts file






  })

  console.log(users);
  console.log(users2);
  
}
