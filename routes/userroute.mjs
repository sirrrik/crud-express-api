
import { request, response, Router } from "express";
import mockusers from "../constants/mockusers.mjs";

// import resolveUserByIDMiddleware from "../middleware/usermiddleWare.mjs";


const route = Router();

const resolveUserByIDMiddleware = (request, response, next) => {
  const { body, params: { id }, } = request;
  // parse the id to interger
  const parseID = parseInt(id);
  // if the user ID doesnt exist
  if (isNaN(parseID))
    return response.status(400).send([{ msg: "Invalid User ID" }]);
  const findUserByindex = mockusers.findIndex((user) => user.id === parseID);
  console.log(findUserByindex);
  // if the user ID  is not in the list
  if (findUserByindex === -1)
    return response
      .status(404)
      .send([{ msg: "The user ID is not in this list " }]);
  request.findUserByindex = findUserByindex;
    next();
};

// declare the first route
route.get('/',(request,response)=>{
   return response.sendStatus(200).send([{msg:"Server Is Running perfect"}]);

});

// CRUD - CREATE READ UPDATE DELETE

// create a user
route.post('/api/users',(request,response)=>{
    // destructure the request body
    const{
        body,
    }=request;

    // this checks for the last user in the list and then increments the id and then attachs the body
    const users = {id: mockusers[mockusers.length -1].id +1, ...body};
     mockusers.push(users);
     return response.send(mockusers).status(201);

});

// reads all the users
route.get('/api/users/',(request,response)=>{

    // send all users
    const users = mockusers;
    console.log(users);
  return  response.status(200).send(users);
});

// Update type with put-replace the entire row

route.put('/api/users/:id',resolveUserByIDMiddleware(),(request,response)=>{
    const {
        body,
        params:{id}

    } = request;


    // find the specific user in the database
    mockusers[findUserByindex] = {id:mockusers[findUserByindex].id, ...body};
    return response.send(mockusers).status(200); 
});



export default route;