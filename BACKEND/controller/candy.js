const Candy = require("../model/candy");

exports.getAllCandy = async (req, res, next) => {
  try {
    const candies = await Candy.findAll();
    return res.json(candies);
  } catch (error) {
    console.log(error);
  }
};

exports.postCandy = async (req, res, next) => {
  const candyName = req.body.candyName;
  const candyDescription = req.body.candyDescription;
  const candyPrice = req.body.candyPrice;
  const candyQty = req.body.candyQty;

  try {
    const candy = await Candy.create({
      candyName: candyName,
      candyDescription: candyDescription,
      candyPrice: candyPrice,
      candyQty: candyQty,
    });
    return res.json(candy);
  } catch (error) {
    console.log(error);
  }
};

exports.buying = async (req, res, next) => {
  const candyId = req.params.id;
  let candyQty;

  if (req.body.buying === "one") candyQty = req.body.candyObj.candyQty - 1;
  else if (req.body.buying === "two") candyQty = req.body.candyObj.candyQty - 2;
  else if (req.body.buying === "three")
    candyQty = req.body.candyObj.candyQty - 3;
  // console.log(candyId);
  let candy;

  try {
    candy = await Candy.findAll({ where: { id: candyId } });
  } catch (error) {
    console.log(error);
  }

  try {
    candy = await candy[0].update(
      {
        id: candyId,
        candyName: req.body.candyObj.candyName,
        candyDescription: req.body.candyObj.candyDescription,
        candyPrice: req.body.candyObj.candyPrice,
        candyQty: candyQty,
      },
      { where: { id: candyId } }
    );
    return res.json(candy);
  } catch (error) {
    console.log(error);
  }
};
