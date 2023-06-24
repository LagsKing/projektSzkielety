const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1,firstName: 1, lastName: 1 }); // Pobierz tylko imię i nazwisko użytkowników

    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
