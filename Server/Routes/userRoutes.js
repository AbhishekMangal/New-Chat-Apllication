
const { Register, login, getUserRoute, setAvatar, getAllUser } = require("../Controllers/userControllers");
const fetchUser = require("../MiddleWare/fetchuser");

const router = require("express").Router();

router.post("/register", Register)
router.post("/login", login)
router.get("/getUser",fetchUser,getUserRoute);
router.post("/setAvtar/:id", setAvatar)
router.get("/allusers", fetchUser , getAllUser)


module.exports = router;