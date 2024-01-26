// function to retrieve diet selection from localStorage
function retrieveUserSelection() {
  const userSelection = localStorage.getItem("userSelection");
  return userSelection
    ? JSON.parse(userSelection)
    : { selectedDiet: "", selectedOrganic: "" };
}

// function to filter and display articles
async function displayArticles() {
  const { selectedDiet, selectedOrganic } = retrieveUserSelection();

  const articlesContainer = document.getElementById("products");
  articlesContainer.innerHTML = ""; // Clear previous content

  // Display current diet preference text
  const currentDietText = document.getElementById("current-diet");
  currentDietText.textContent = `Your current diet preference is: ${selectedDiet}`;

  try {
    const response = await fetch("products.json");
    const productsData = await response.json();

    for (const category in productsData.products) {
      for (const product of productsData.products[category]) {
        if (
          selectedDiet === "None" ||
          (selectedDiet === "Lactose-free" && product.lactoseFree === "true") ||
          (selectedDiet === "Gluten-Free" && product.glutenFree === "true") ||
          (selectedDiet === "Vegetarian" && product.vegetarian === "true")
        ) {
          const articleElement = document.createElement("article");
          articleElement.innerHTML = `
                      <img src="${product.image}" id="image">
                      <h2 id="name">${product.name}</h2>
                      <p id="description">${product.description}</p>
                      <p id="price">${product.price}</p>
                      <button id="add-cart" onclick="addToCart()">Add to cart</button>
                  `;
          articlesContainer.appendChild(articleElement);
        }
      }
    }
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

displayArticles();
