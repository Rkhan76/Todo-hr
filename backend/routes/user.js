const express = require("express")
const {userSignup, userSignIn} = require("../controllers/user")

const router = express.Router()

router.post('/signup', userSignup)
router.post("/signin", userSignIn)


module.exports = router