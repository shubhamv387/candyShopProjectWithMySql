window.addEventListener("DOMContentLoaded", async () => {
  const loadingCandy = document.createElement("h4");
  loadingCandy.innerHTML =
    "<h4 class='text-center mt-5'> Loding candings...</h4>";
  setTimeout(async () => {
    document.getElementById("candyList").removeChild(loadingCandy);
    try {
      const candies = await axios.get("http://localhost:3000/");
      candies.data.forEach((candy) => {
        showAllCandyOnScreen(candy);
      });
    } catch (err) {
      console.log(err.message);
    }
  }, 800);

  document.getElementById("candyList").appendChild(loadingCandy);
});

const form = document.getElementById("form-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("candyName");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const qtyInput = document.getElementById("quantity");

  if (
    !nameInput.value ||
    !descriptionInput.value ||
    !priceInput.value ||
    !qtyInput.value ||
    parseInt(qtyInput.value) === 0
  ) {
    alert(
      parseInt(qtyInput.value) === 0
        ? "Qty  can not be 0"
        : "all fields are required"
    );
  } else {
    const candyObj = {
      candyName: nameInput.value,
      candyDescription: descriptionInput.value,
      candyPrice: priceInput.value,
      candyQty: qtyInput.value,
    };

    try {
      const candy = await axios.post(
        `http://localhost:3000/add-candy`,
        candyObj
      );
      showAllCandyOnScreen(candy.data);
    } catch (error) {
      console.log(err.message);
    }

    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    qtyInput.value = "";
  }
});

function showAllCandyOnScreen(candyObj) {
  const candyList = document.getElementById("candyList");

  const candyItem = document.createElement("li");
  candyItem.classList =
    "list-group-item list-group-item-warning d-flex flex-wrap flex-sm-row flex-column justify-content-between";

  candyItem.innerHTML = `<span class="me-4 fw-bold text-capitalize">${candyObj.candyName} - ${candyObj.candyDescription} - ${candyObj.candyPrice}Rs - ${candyObj.candyQty} Qty.</span>`;

  const candyDiv = document.createElement("div");
  candyDiv.className = " mt-sm-0 mt-2";
  candyItem.appendChild(candyDiv);

  const buyOneBtn = document.createElement("button");
  buyOneBtn.className = "btn btn-danger me-1 btn-sm";
  buyOneBtn.innerHTML = "BUY 1";
  candyDiv.appendChild(buyOneBtn);

  const buyTwoBtn = document.createElement("button");
  buyTwoBtn.className = "btn btn-warning me-1 btn-sm";
  buyTwoBtn.innerHTML = "BUY 2";
  candyDiv.appendChild(buyTwoBtn);

  const buyThreeBtn = document.createElement("button");
  buyThreeBtn.className = "btn btn-success me-1 btn-sm";
  buyThreeBtn.innerHTML = "BUY 3";
  candyDiv.appendChild(buyThreeBtn);

  candyList.appendChild(candyItem);

  buyOneBtn.addEventListener("click", () => {
    const buyingObj = { candyObj, buying: "one" };
    buying(buyingObj);
  });

  buyTwoBtn.addEventListener("click", () => {
    const buyingObj = { candyObj, buying: "two" };
    buying(buyingObj);
  });

  buyThreeBtn.addEventListener("click", () => {
    const buyingObj = { candyObj, buying: "three" };
    buying(buyingObj);
  });

  async function buying(buyingObj) {
    try {
      if (candyObj.candyQty > 0) {
        const candy = await axios.put(
          `http://localhost:3000/buying/${candyObj.id}`,
          buyingObj
        );

        candyObj = candy.data;
        candyItem.firstElementChild.innerHTML = `${candyObj.candyName} - ${candyObj.candyDescription} - ${candyObj.candyPrice}Rs - ${candyObj.candyQty} Qty.`;
      } else alert("Sold Out!");
    } catch (error) {
      console.log(error.message);
    }
  }
}
