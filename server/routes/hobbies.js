const router = require("express").Router();
const { User } = require("../models/user");
const { Hobby } = require("../models/hobby");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const cleanedToken = token.replace("Bearer ", "");
    const decodedToken = jwt.verify(cleanedToken, process.env.JWTPRIVATEKEY);
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const userId = decodedToken.id;

    const user = await User.findById(userId).select("hobbies");

    const hobbies = user.hobbies.map((hobby) => ({
      _id: hobby._id,
      date: hobby.date.toISOString().replace(/T.+$/, ""),
      hobby: hobby.hobby,
    }));

    res.json(hobbies);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/details/:hobbyId", async (req, res) => {
  try {
    const hobbyId = req.params.hobbyId;
    const user = await User.findOne({ "hobbies._id": hobbyId });
    if (!user) {
      return res.status(404).send({ message: "Hobby not found" });
    }
    const hobby = user.hobbies.id(hobbyId);
    res.json(hobby);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:hobbyId", async (req, res) => {
  try {
    const hobbyId = req.params.hobbyId;
    const token = req.headers.authorization;
    const cleanedToken = token.replace("Bearer ", "");
    const decodedToken = jwt.verify(cleanedToken, process.env.JWTPRIVATEKEY);
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const userId = decodedToken.id;

    const user = await User.findById(userId).select("hobbies");

    const hobby = user.hobbies.id(hobbyId);

    if (!hobby) {
      return res.status(404).send({ message: "Hobby not found" });
    }

    user.hobbies.pull(hobby);
    
    await user.save();
    

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/edit/:hobbyId", async (req, res) => {
  try {
    const hobbyId = req.params.hobbyId;
    const updatedHobby = req.body;
    const token = req.headers.authorization;
    const cleanedToken = token.replace("Bearer ", "");
    const decodedToken = jwt.verify(cleanedToken, process.env.JWTPRIVATEKEY);
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const userId = decodedToken.id;

    const user = await User.findById(userId).select("hobbies");

    const hobby = user.hobbies.id(hobbyId);
    if (!hobby) {
      return res.status(404).send({ message: "Hobby not found" });
    }

    hobby.set(updatedHobby);
    await user.save();

    res.json(hobby);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const cleanedToken = token.replace("Bearer ", "");
    const decodedToken = jwt.verify(cleanedToken, process.env.JWTPRIVATEKEY);
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const userId = decodedToken.id;

    const user = await User.findById(req.body.userId).select("hobbies"); // Znajdź użytkownika na podstawie przesłanego userId
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

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
