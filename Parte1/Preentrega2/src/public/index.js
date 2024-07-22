const socket = io();

const products = document.getElementById("products");
socket.on("products", (data) => {
  products.innerHTML = "";
  data.forEach((product) => {
    products.innerHTML += `
    <section class="product">
      <h3>Nombre: ${product.title}</h3>
      <p>Precio: $${product.price}</p>
      <img src="${product.thumbnail}" alt="${product.title}">
      <p>${product.description}</p>
      <button id="${product.id}" class="btn-delete">Eliminar</button>
    </section>
    `;
  });
  const deleteButtons = document.getElementsByClassName("btn-delete");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (event) => {
      event.preventDefault();
      const id = event.target.id;
      socket.emit("deleteProduct", id);
    });
  }
});

const form = document.getElementById("product-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  };
  socket.emit("newProduct", product);
  form.reset();
});
