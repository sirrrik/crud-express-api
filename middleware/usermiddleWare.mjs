import mockusers from "../constants/mockusers.mjs";



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
export default resolveUserByIDMiddleware;
