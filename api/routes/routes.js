const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/", userController.greeting);
router.get("/users", userController.getAllUsers);
router.post("/createUsers", userController.createUser);
router.get("/getusersById/:userId", userController.getOneUser);
router.put("/updateUsersById/:userId", userController.updateUser);
router.delete("/deleteUserById/:userId", userController.deleteUser);

module.exports = router;
