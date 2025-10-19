const botones = document.querySelectorAll(".producto button");
const items = document.getElementById("items");
const totalTexto = document.getElementById("total");
const contador = document.getElementById("contador");
const vaciar = document.getElementById("vaciar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

botones.forEach(boton => {
  boton.addEventListener("click", e => {
    const producto = e.target.parentElement;
    const nombre = producto.querySelector("h3").textContent;
    const precio = parseFloat(producto.querySelector(".precio").textContent);
    const item = carrito.find(p => p.nombre === nombre);

    if (item) {
      item.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarYActualizar();
  });
});

function actualizarCarrito() {
  items.innerHTML = "";
  let total = 0;
  carrito.forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${p.nombre}</strong> x${p.cantidad} — $${(p.precio * p.cantidad).toFixed(2)}
      <button onclick="eliminar(${i})">❌</button>
    `;
    items.appendChild(div);
    total += p.precio * p.cantidad;
  });
  totalTexto.textContent = `Total: Bs${total.toFixed(2)}`;
  contador.textContent = `(${carrito.length})`;
}

function eliminar(index) {
  carrito.splice(index, 1);
  guardarYActualizar();
}

vaciar.addEventListener("click", () => {
  carrito = [];
  guardarYActualizar();
});

function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

actualizarCarrito();
