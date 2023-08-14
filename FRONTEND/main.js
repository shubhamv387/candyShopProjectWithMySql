window.addEventListener("DOMContentLoaded", async () => {
  try {
    const loadingCandy = document.createElement("h4");
    loadingCandy.innerHTML =
      "<h4 class='text-center mt-5'> Loding candings...</h4>";

    setTimeout(async () => {
      document.getElementById("candyList").removeChild(loadingCandy);

      const candies = await axios.get("http://localhost:3000/");
      candies.data.forEach((candy) => {
        showAllCandyOnScreen(candy);
      });
    }, 800);

    document.getElementById("candyList").appendChild(loadingCandy);
  } catch (err) {
    console.log(err.message);
  }
});

const form = document.getElementById("form-submit");

form.addEventListener("submit", async (e) => {
  try {
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
      const candy = await axios.post(
        `http://localhost:3000/add-candy`,
        candyObj
      );
      // console.log(candy.data);
      showAllCandyOnScreen(candy.data);

      nameInput.value = "";
      descriptionInput.value = "";
      priceInput.value = "";
      qtyInput.value = "";
    }
  } catch (err) {
    console.log(err.message);
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
  async function buyOneCandy() {
    try {
      if (candyObj.candyQty > 0) {
        console.log("buying 1");
        const candy = await axios.put(
          `http://localhost:3000/buy-one/${candyObj.id}`,
          candyObj
        );
        // console.log(candy.data);

        candyObj = candy.data;
        candyItem.firstElementChild.innerHTML = `${candyObj.candyName} - ${candyObj.candyDescription} - ${candyObj.candyPrice}Rs - ${candyObj.candyQty}`;
      } else alert("Sold Out!");
    } catch (error) {
      console.log(error.message);
    }
  }

  buyTwoBtn.addEventListener("click", buyTwoCandy);
  async function buyTwoCandy() {
    try {
      if (candyObj.candyQty > 0) {
        console.log("buying 2");
        const candy = await axios.put(
          `http://localhost:3000/buy-two/${candyObj.id}`,
          candyObj
        );
        // console.log(candy.data);

        candyObj = candy.data;
        candyItem.firstElementChild.innerHTML = `${candyObj.candyName} - ${candyObj.candyDescription} - ${candyObj.candyPrice}Rs - ${candyObj.candyQty}`;
      } else alert("Sold Out!");
    } catch (error) {
      console.log(error.message);
    }
  }

  buyThreeBtn.addEventListener("click", buyThreeCandy);
  async function buyThreeCandy() {
    try {
      if (candyObj.candyQty > 0) {
        console.log("buying 3");
        const candy = await axios.put(
          `http://localhost:3000/buy-three/${candyObj.id}`,
          candyObj
        );
        // console.log(candy.data);

        candyObj = candy.data;
        candyItem.firstElementChild.innerHTML = `${candyObj.candyName} - ${candyObj.candyDescription} - ${candyObj.candyPrice}Rs - ${candyObj.candyQty}`;
      } else alert("Sold Out!");
    } catch (error) {
      console.log(error.message);
    }
  }
}
