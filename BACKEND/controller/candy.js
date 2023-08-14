const Candy = require("../model/candy");

exports.getAllCandy = (req, res, next) => {
  Candy.findAll()
    .then((candies) => {
      res.json(candies);
    })
    .catch((err) => console.log(err));
};

exports.postCandy = (req, res, next) => {
  const candyName = req.body.candyName;
  const candyDescription = req.body.candyDescription;
  const candyPrice = req.body.candyPrice;
  const candyQty = req.body.candyQty;
  Candy.create({
    candyName: candyName,
    candyDescription: candyDescription,
    candyPrice: candyPrice,
    candyQty: candyQty,
  })
    .then((candy) => {
      res.json(candy);
    })
    .catch((err) => console.log(err.message));
};

exports.buyOne = (req, res, next) => {
  const candyId = req.params.id;
  // console.log(req.body);
  // console.log(candyId);
  Candy.findAll({ where: { id: candyId } })
    .then((candy) => {
      candy[0]
        .update(
          {
            id: candyId,
            candyName: req.body.candyName,
            candyDescription: req.body.candyDescription,
            candyPrice: req.body.candyPrice,
            candyQty: req.body.candyQty - 1,
          },
          { where: { id: candyId } }
        )
        .then((candy) => {
          res.json(candy);
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

exports.buyTwo = (req, res, next) => {
  const candyId = req.params.id;
  // console.log(req.body);
  // console.log(candyId);
  Candy.findAll({ where: { id: candyId } })
    .then((candy) => {
      candy[0]
        .update(
          {
            id: candyId,
            candyName: req.body.candyName,
            candyDescription: req.body.candyDescription,
            candyPrice: req.body.candyPrice,
            candyQty: req.body.candyQty - 2,
          },
          { where: { id: candyId } }
        )
        .then((candy) => {
          res.json(candy);
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

exports.buyThree = (req, res, next) => {
  const candyId = req.params.id;
  // console.log(req.body);
  // console.log(candyId);
  Candy.findAll({ where: { id: candyId } })
    .then((candy) => {
      candy[0]
        .update(
          {
            id: candyId,
            candyName: req.body.candyName,
            candyDescription: req.body.candyDescription,
            candyPrice: req.body.candyPrice,
            candyQty: req.body.candyQty - 3,
          },
          { where: { id: candyId } }
        )
        .then((candy) => {
          res.json(candy);
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};
