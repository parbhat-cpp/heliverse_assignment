const asyncHandler = require("express-async-handler");
const User = require("../model/user_model");

const getUsers = asyncHandler(async (request, response) => {
  try {
    let page = Number(request.query.page) || 1;
    let limit = Number(request.query.limit);
    let skip = (page - 1) * limit;

    const queryObj = { ...request.query };
    for (let key in queryObj) {
      if (key === "page" || key === "limit") {
        delete queryObj[key];
      }
      if (key === "available") {
        queryObj[key] = queryObj[key] === "true";
      }
      if (key === "name") {
        let val = queryObj[key];
        delete queryObj[key];
        queryObj["first_name"] = val;
      }
    }
    let users = await User.find(queryObj).skip(skip).limit(limit);
    response.status(200).json(users);
  } catch (error) {
    response.status(401);
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const user = await User.findOne({ id });
  if (user) {
    response.json(user);
  } else {
    response.status(401);
    throw new Error("Something went wrong");
  }
});

const createNewUser = asyncHandler(async (request, response) => {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  } = request.body;

  const user = await User.create({
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar,
    domain,
    available,
  });

  if (user) {
    response.status(200).json(user);
  } else {
    response.status(401);
    throw new Error("Something went wrong");
  }
});

const updateUser = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const { first_name, last_name, email, gender, avatar, domain, available } =
    request.body;

  const user = await User.findOneAndUpdate(
    { id },
    { first_name, last_name, email, gender, avatar, domain, available },
    { new: true }
  );

  if (user) {
    response.status(200).json(user);
  } else {
    response.status(401);
    throw new Error("Something went wrong");
  }
});

const deleteUser = asyncHandler(async (request, response) => {
  const { id } = request.params;
  try {
    await User.deleteOne({ id });
    response.send(`User with id: ${id} is deleted successfully`);
  } catch (error) {
    response.status(401);
    throw new Error("Something went wrong");
  }
});

module.exports = {
  getUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};
