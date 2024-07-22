function getCartIdFromUrl() {
    const urlParts = window.location.pathname.split("/");
    return urlParts[urlParts.length - 1]; // Asume que el `cartId` es el último segmento en la URL
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Script cargado correctamente");
    const deleteButtons = document.getElementsByClassName("delete");
    console.log(deleteButtons);
  
    const cartId = getCartIdFromUrl(); // Obtener el `cartId` desde la URL
    console.log(cartId)
    // Convierte la colección HTML a un array
    Array.from(deleteButtons).forEach((button) => {
      button.addEventListener("click", async function () {
        const productId = this.id;
  
        try {
          const response = await fetch(
            `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.ok) {
            const updatedCart = await response.json();
            // Actualiza la vista del carrito en el cliente después de eliminar el producto
            this.closest(".product").remove();
          } else {
            console.error("Failed to delete product from cart");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  });
  