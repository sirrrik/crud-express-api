
import {  request, response, Router } from "express";
import mockusers from "../constants/mockusers.mjs";

import resolveUserByIDMiddleware from "../middleware/usermiddleWare.mjs";
import { query, validationResult } from "express-validator";


const route = Router();

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
// the query creats a validation chain 
route.get('/api/users/',query('filter').isString().notEmpty(),(request,response)=>{

    // send all users
    const users = mockusers;
    console.log(users);
    // validate and filter users
    const result = validationResult(request);
    console.log(result);

    // query the filtered fields else return the entire fields 

    // destructure the filter and value in the request body 
    const {
        query: {filter,value} 
    } = request;

    if(filter && value ) return response.status(200).send(mockusers.filter((user) => user[filter].includes(value)));

    //   return  response.status(200).send(users);
});

// Update type with put-replace the entire row

route.put('/api/users/:id',resolveUserByIDMiddleware,(request,response)=>{
    const {
        body,
        findUserByindex

    } = request;


    // find the specific user in the database
    mockusers[findUserByindex] = {id:mockusers[findUserByindex].id, ...body};
    return response.send(mockusers).status(200); 
});

// update the user details but onlt the specific field
route.patch('/api/users/:id',resolveUserByIDMiddleware,(request,response)=>{
    const {
        body,
        params: {id},
        findUserByindex
    }=request;
    // find user in the list and 
    mockusers[findUserByindex] = {...mockusers[findUserByindex], ...body}
    return response.status(201).send([{msg:"User field updated"}]);
});

// delete user 

route.delete('/api/users/:id',resolveUserByIDMiddleware,(request,response)=>{
      const {
        params: {id},
        findUserByindex
    }=request;
    // find the user
    const parseID = parseInt(id);
    console.log(findUserByindex);

    mockusers.splice(findUserByindex,1);
    return response.status(200).send([{msg:"User deleted"}]);
});

export default route;