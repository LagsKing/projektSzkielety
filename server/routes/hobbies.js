const router = require("express").Router();
const { Hobby } = require("../models/hobby");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization; // Pobierz token JWT z localStorage
    const cleanedToken = token.replace("Bearer ", "");
    // Weryfikuj i dekoduj token JWT
    const decodedToken = jwt.verify(cleanedToken,process.env.JWTPRIVATEKEY);
    if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
    }
    const userId = decodedToken.id; // Pobierz identyfikator użytkownika z dekodowanego tokenu
     
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    
    // Dodaj hobby do użytkownika
    user.hobbies.push({
        date: req.body.date,
        hobby: req.body.hobby,
    });
    
    await user.save();
    
    res.status(201).send({ message: "Hobby added successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
