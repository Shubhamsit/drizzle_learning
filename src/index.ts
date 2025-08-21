
import {db} from './drizzle/db.js'
import { UserTable } from './drizzle/schema.js'

async function main(){

    // here UserTable is Schema which we have defined 


    // await db.insert(UserTable).values({

    //     name:"sachin-kumar",
    //     roll:27,
    //     age:20,
    //     x:3,
    //     email:"sachin@gmail.com",

    // });

    // // find first will give the first User

    // const user=await db.query.UserTable.findFirst();
    // console.log(user);
    
}

main();





