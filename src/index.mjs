
import express,{ request, response }  from "express"
import route from "../routes/userroute.mjs";
// import resolveUserByIDMiddleware from "../middleware/usermiddleWare.mjs";


// register the express app
const app = express();
app.use(express.json());

app.use(resolveUserByIDMiddleware);
app.use(route);

// crea app entry
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    // the first middleware
    console.log("Express Test app running")

});