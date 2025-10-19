// Seleccionamos elementos del DOM
const addCartButtons = document.querySelectorAll(".add-cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const clearCartButton = document.querySelector(".clear-cart");

// Array para guardar los productos agregados
let cart = [];

// Función para actualizar el carrito visualmente
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Bs ${item.price.toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-item");
    removeBtn.addEventListener("click", () => {
      removeFromCart(index);
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = `Bs ${total.toFixed(2)}`;
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// Función para eliminar un producto específico
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Función para vaciar todo el carrito
function clearCart() {
  cart = [];
  updateCart();
}

// Eventos para los botones de "Agregar al carrito"
addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    addToCart(name, price);
  });
});

// Evento para el botón de "Vaciar carrito"
clearCartButton.addEventListener("click", clearCart);
