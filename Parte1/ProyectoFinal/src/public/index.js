document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByClassName("addToCart");
  console.log(buttons);

  async function addToCart() {
    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  addToCart().then((cart) => {
    if (cart) {
      Array.from(buttons).forEach((button) => {
        button.addEventListener("click", async function () {
          const id = button.id;
          try {
            const response = await fetch(
              `http://localhost:8080/api/carts/${cart._id}/product/${id}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            await response.json();

            Swal.fire({
              title: "Producto agregado",
              text: "Has agregado un producto al carrito.",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          } catch (error) {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          }
        });
      });
    } else {
      console.error("No se pudo crear el carrito");
    }
  });
});
