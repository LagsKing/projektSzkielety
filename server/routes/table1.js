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

router.get("/details/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
    
      const user = await User.findById(userId);
      
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      
      res.json(user);
      
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  
router.delete("/delete/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});



module.exports = router;
