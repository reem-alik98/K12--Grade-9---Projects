let cart = [
  { name: "Laptop", price: 1000, quantity: 1 },
  { name: "Phone", price: 700, quantity: 2 },
  { name: "Headphones", price: 50, quantity: 3 },
  { name: "USB Cable", price: 10, quantity: 5 },
];

// Function to calculate total price for each item using map
const calculateTotalPrices = (cart) => {
  return cart.map(item => ({
    ...item,
    totalPrice: item.price * item.quantity
  }));
};

// Function to calculate the total cost using reduce
const calculateTotalCost = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// Function to remove an item using filter
const removeItem = (index) => {
  cart = cart.filter((_, i) => i !== index);
  renderCart();
};

// Function to add an item
const addItem = (name, price, quantity) => {
  cart = [...cart, { name, price: parseInt(price), quantity: parseInt(quantity) }];
  renderCart();
};

// Function to render the cart
function renderCart() {
  const cartBody = document.getElementById("cart-body");
  cartBody.innerHTML = ""; // Clear the table body

  // Calculate item total prices and total cost
  const updatedCart = calculateTotalPrices(cart);
  const totalCost = calculateTotalCost(cart);

  // Render cart rows
  updatedCart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.quantity}</td>
      <td>$${item.totalPrice}</td>
      <td>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </td>
    `;
    cartBody.appendChild(row);
  });

  // Update the total cost
  document.getElementById("total-cost").textContent = `Total Cost: $${totalCost}`;

  // Attach event listeners to remove buttons
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      removeItem(index);
    });
  });
}

// Event listener for the add item form
document.getElementById("add-item-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  const name = document.getElementById("item-name").value;
  const price = document.getElementById("item-price").value;
  const quantity = document.getElementById("item-quantity").value;

  if (name && price && quantity) {
    addItem(name, price, quantity);

    // Clear form inputs
    document.getElementById("add-item-form").reset();
  }
});

// Initial render
renderCart();
