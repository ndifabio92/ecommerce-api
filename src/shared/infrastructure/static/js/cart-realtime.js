// Global variables
let socket;
let cartId;

// Función para mostrar mensajes de notificación
function showToast(message, type = "info") {
  // Si existe una librería de toasts, usarla
  if (window.toastr) {
    window.toastr[type](message);
    return;
  }

  // Si no hay librería, crear un toast simple
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "4px";
  toast.style.color = "white";
  toast.style.zIndex = "1000";

  // Estilos según el tipo
  switch (type) {
    case "success":
      toast.style.backgroundColor = "#28a745";
      break;
    case "error":
      toast.style.backgroundColor = "#dc3545";
      break;
    case "warning":
      toast.style.backgroundColor = "#ffc107";
      toast.style.color = "#212529";
      break;
    default:
      toast.style.backgroundColor = "#17a2b8";
  }

  document.body.appendChild(toast);

  // Eliminar después de 3 segundos
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s";
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 3000);
}

// Funciones para operaciones del carrito (definidas globalmente)
function removeProduct(productId) {
  if (!cartId) {
    showToast("No se pudo identificar el carrito", "error");
    return;
  }

  if (
    !confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")
  ) {
    return;
  }

  try {
    showToast("Eliminando producto...", "info");
    console.log("Eliminando producto:", { cartId, productId });
    socket.emit("removeFromCart", { cartId, productId });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    showToast("Error al eliminar el producto", "error");
  }
}

function clearCart() {
  if (!cartId) {
    showToast("No se pudo identificar el carrito", "error");
    return;
  }

  if (!confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
    return;
  }

  try {
    showToast("Vaciando carrito...", "info");
    console.log("Vaciando carrito:", cartId);
    socket.emit("clearCart", cartId);
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    showToast("Error al vaciar el carrito", "error");
  }
}

function updateQuantity(productId, quantity) {
  if (!cartId) {
    showToast("No se pudo identificar el carrito", "error");
    return;
  }

  if (isNaN(quantity) || quantity < 1) {
    showToast("La cantidad debe ser un número mayor a 0", "error");
    return;
  }

  try {
    showToast("Actualizando cantidad...", "info");
    console.log("Actualizando cantidad:", { cartId, productId, quantity });
    socket.emit("updateCartQuantity", {
      cartId,
      productId,
      quantity: parseInt(quantity),
    });
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
    showToast("Error al actualizar la cantidad", "error");
  }
}

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar Socket.IO
  socket = io();

  // Obtener el cartId de la página de forma robusta
  const cartIdElem = document.querySelector(".cart-id");
  cartId = cartIdElem ? cartIdElem.getAttribute("data-cart-id") : null;
  window.cartId = cartId; // Exponer para depuración

  if (cartId) {
    socket.emit("joinCartRoom", cartId);
    console.log("Conectado al carrito:", cartId);
  } else {
    console.error("No se pudo obtener el ID del carrito");
  }

  // Manejar eventos de Socket.IO
  socket.on("connect", () => {
    console.log("Conectado al servidor de Socket.IO");
  });

  socket.on("connect_error", (error) => {
    console.error("Error de conexión Socket.IO:", error);
    showToast("Error de conexión con el servidor", "error");
  });

  socket.on("cartUpdated", (cart) => {
    console.log("Carrito actualizado:", cart);
    showToast("Carrito actualizado correctamente", "success");
    setTimeout(() => location.reload(), 1000);
  });

  socket.on("error", (error) => {
    console.error("Error en operación del carrito:", error);
    showToast("Error en la operación: " + error.message, "error");
  });
});
