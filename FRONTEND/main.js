window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/")
    .then((candies) => {
      candies.data.forEach((candy) => {
        showAllCandyOnScreen(candy);
      });
    })
    .catch((err) => console.log(err.message));
});

const form = document.getElementById("form-submit");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("candyName");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const qtyInput = document.getElementById("quantity");

  if (
    !nameInput.value ||
    !descriptionInput.value ||
    !priceInput.value ||
    !qtyInput.value
  ) {
    alert("all fields are required");
  } else {
    const candyObj = {
      candyName: nameInput.value,
      candyDescription: descriptionInput.value,
      candyPrice: priceInput.value,
      candyQty: qtyInput.value,
    };
    // console.log(candyObj);
    axios
      .post(`http://localhost:3000/add-candy`, candyObj)
      .then((candy) => {
        console.log(candy.data);
        showAllCandyOnScreen(candy.data);
      })
      .catch((err) => console.log(err));

    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    qtyInput.value = "";
  }
});

function showAllCandyOnScreen(candyObj) {
  const candyList = document.getElementById("candyList");

  const candyItem = document.createElement("li");
  candyItem.classList = "list-group-item list-group-item-warning";

  candyItem.innerHTML = `<span class="me-4 fw-bold">${candyObj.candyName} - ${candyObj.candyDescription} - ${candyObj.candyPrice}Rs - ${candyObj.candyQty}</span>`;

  const buyOneBtn = document.createElement("button");
  buyOneBtn.className = "btn btn-info me-1 btn-sm";
  buyOneBtn.innerHTML = "BUY 1";
  candyItem.appendChild(buyOneBtn);

  const buyTwoBtn = document.createElement("button");
  buyTwoBtn.className = "btn btn-warning me-1 btn-sm";
  buyTwoBtn.innerHTML = "BUY 2";
  candyItem.appendChild(buyTwoBtn);

  const buyThreeBtn = document.createElement("button");
  buyThreeBtn.className = "btn btn-success me-1 btn-sm";
  buyThreeBtn.innerHTML = "BUY 3";
  candyItem.appendChild(buyThreeBtn);

  candyList.appendChild(candyItem);

  buyOneBtn.addEventListener("click", buyOneCandy);
  function buyOneCandy() {
    console.log("buying 1");
    axios
      .put(`http://localhost:3000/buy-one/${candyObj.id}`, {
        messgae: "buying 1",
      })
      .then((candy) => {
        console.log(candy);
      })
      .catch((err) => console.log(err.message));
  }

  buyTwoBtn.addEventListener("click", buyTwoCandy);
  function buyTwoCandy() {
    console.log("buying 2");
    axios
      .put(`http://localhost:3000/buy-two/${candyObj.id}`, {
        messgae: "buying 1",
      })
      .then((candy) => {
        console.log(candy);
      })
      .catch((err) => console.log(err.message));
  }

  buyThreeBtn.addEventListener("click", buyThreeCandy);
  function buyThreeCandy() {
    console.log("buying 3");
    axios
      .put(`http://localhost:3000/buy-three/${candyObj.id}`, {
        messgae: "buying 1",
      })
      .then((candy) => {
        console.log(candy);
      })
      .catch((err) => console.log(err.message));
  }
}
