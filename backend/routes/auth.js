const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users.js');

const router = express.Router();

//const authMiddleware = require('../middleware/authmiddleware.js');

//REGISTER
router.post("/register", async(req, resp) =>{
    const {name, email, password} = req.body;
    try{
        const existingUSer = await User.findOne({ email });
        if(existingUSer) return resp.status(400).json({ msg:"User already exists" });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        resp.status(201).json({ msg: "User registered successfully" })
    }catch(error){
        resp.status(500).json({ msg: err.message })
    }
})

router.post("/login", async(req, res)=> {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){return res.status(400).json({ msg: "Invalid Credentials" }) }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
    }catch(error){
        res.status(500).json({ msg: error.message })
    }
});

router.get("/user", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
});


module.exports = router;