const express = require("express");

const router = express.Router();

const candyController = require("../controller/candy");

router.get("/", candyController.getAllCandy);

router.post("/add-candy", candyController.postCandy);

router.put("/buy-one/:id", candyController.buyOne);

router.put("/buy-two/:id", candyController.buyTwo);

router.put("/buy-three/:id", candyController.buyThree);

module.exports = router;
