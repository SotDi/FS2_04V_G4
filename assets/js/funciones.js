document.addEventListener("DOMContentLoaded", function() {
    const rolUsuario = localStorage.getItem("usuarioRol");
    const linkAdmin = document.getElementById("linkAdmin");
    
    if (linkAdmin !== null && rolUsuario === "Administrador") {
        linkAdmin.classList.remove("d-none");
    }

    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion !== null) {
        btnCerrarSesion.addEventListener("click", function() {
            localStorage.removeItem("usuarioRol");
            window.location.href = "index.html";
        });
    }

    const formContacto = document.getElementById("formContacto");
    if (formContacto !== null) {
        formContacto.addEventListener("submit", function(event) {
            event.preventDefault();
            let formularioValido = true;

            const nombre = document.getElementById("nombre");
            if (nombre.value.trim() === "") {
                nombre.classList.add("is-invalid");
                formularioValido = false;
            } else {
                nombre.classList.remove("is-invalid");
                nombre.classList.add("is-valid");
            }

            const correo = document.getElementById("correo");
            const dominiosValidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
            const esValido = dominiosValidos.some(dominio => correo.value.trim().endsWith(dominio));
            
            if (correo.value.trim() === "" || !esValido) {
                correo.classList.add("is-invalid");
                formularioValido = false;
            } else {
                correo.classList.remove("is-invalid");
                correo.classList.add("is-valid");
            }

            if (formularioValido) {
                alert("Mensaje enviado correctamente al soporte.");
                formContacto.reset();
                nombre.classList.remove("is-valid");
                correo.classList.remove("is-valid");
            }
        });
    }

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const formUsuario = document.getElementById("formUsuario");
    if (formUsuario !== null) {
        const region = document.getElementById("regionUsuario");
        const comuna = document.getElementById("comunaUsuario");
        if(region !== null && comuna !== null) {
            region.addEventListener("change", function() {
                if(this.value === "RM") {
                    comuna.disabled = false;
                    comuna.innerHTML = '<option value="">Seleccione comuna...</option><option value="Maipu">Maipú</option><option value="Santiago">Santiago</option>';
                }
            });
        }

        formUsuario.addEventListener("submit", function(e) {
            e.preventDefault();
            const correo = document.getElementById("correoUsuario").value;
            const run = document.getElementById("runUsuario").value;
            const esCorreoValido = dominiosPermitidos.some(d => correo.endsWith(d));
            const regexRun = /^[0-9Kk]{7,9}$/;
            
            if (!esCorreoValido || !regexRun.test(run) || !formUsuario.checkValidity()) {
                formUsuario.classList.add("was-validated");
            } else {
                alert("Usuario guardado exitosamente en la base de datos simulada.");
                window.location.href = "listado_usuarios.html";
            }
        });
    }
    const formProducto = document.getElementById("formProducto");
    if (formProducto !== null) {
        formProducto.addEventListener("submit", function(e) {
            e.preventDefault();
            if (!formProducto.checkValidity()) {
                formProducto.classList.add("was-validated");
            } else {
                alert("Producto guardado exitosamente en el inventario.");
                window.location.href = "listado_productos.html";
            }
        });
    }

    function obtenerCarrito() {
        const data = localStorage.getItem("levelup_carrito");
        return data !== null ? JSON.parse(data) : [];
    }

    function actualizarContadorCarrito() {
        const carrito = obtenerCarrito();
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        document.querySelectorAll("#cart-count").forEach(function(badge) {
            badge.textContent = totalItems;
        });
    }
    actualizarContadorCarrito();

    const btnAgregarCarrito = document.getElementById("btn-agregar-carrito");
    if (btnAgregarCarrito !== null) {
        btnAgregarCarrito.addEventListener("click", function() {
            const codigo = document.getElementById("producto-codigo").textContent.trim();
            const nombre = document.getElementById("producto-nombre").textContent.trim();
            const cantidad = parseInt(document.getElementById("cantidad").value, 10);

            const carrito = obtenerCarrito();
            const existente = carrito.find(item => item.codigo === codigo);
            if (existente !== undefined) {
                existente.cantidad += cantidad;
            } else {
                carrito.push({ codigo: codigo, nombre: nombre, cantidad: cantidad });
            }

            localStorage.setItem("levelup_carrito", JSON.stringify(carrito));
            actualizarContadorCarrito();
            alert(nombre + " se agregó al carrito.");
        });
    }

    const formLogin = document.getElementById("form-login");
    if (formLogin !== null) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.getElementById("email");
            const password = document.getElementById("password");

            if (email.value.trim() === "" || password.value.trim() === "") {
                formLogin.classList.add("was-validated");
                return;
            }

            alert("Iniciando sesión...");
        });
    }

    const formRegistro = document.getElementById("form-registro");
    if (formRegistro !== null) {
        const inputFechaNacimiento = document.getElementById("fecha-nacimiento");
        const inputPassword = document.getElementById("password");
        const inputPassword2 = document.getElementById("confirm-password");
        const inputEmail = document.getElementById("email");

        function calcularEdad(fechaStr) {
            const hoy = new Date();
            const nacimiento = new Date(fechaStr);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        }

        formRegistro.addEventListener("submit", function(e) {
            e.preventDefault();

            if (!formRegistro.checkValidity()) {
                formRegistro.classList.add("was-validated");
                return;
            }

            const edad = calcularEdad(inputFechaNacimiento.value);
            if (edad < 18) {
                alert("Debes ser mayor de 18 años para registrarte en Level-Up Gamer.");
                return;
            }

            if (inputPassword.value !== inputPassword2.value) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            let mensaje = "¡Cuenta creada con éxito! Bienvenido a Level-Up Gamer.";
            if (inputEmail.value.trim().toLowerCase().endsWith("@duocuc.cl")) {
                mensaje += " 🎓 Se aplicó tu 20% de descuento de por vida.";
            }
            alert(mensaje);
        });
    }

    const gridProductos = document.getElementById("grid-productos");
    if (gridProductos !== null) {
        const checkboxesCategoria = document.querySelectorAll(".filter-box .form-check-input");
        const inputBuscar = document.getElementById("buscar-producto");
        const selectOrden = document.getElementById("orden-precio");
        const tarjetas = Array.from(gridProductos.children);

        function obtenerPrecio(tarjeta) {
            const texto = tarjeta.querySelector(".price").textContent;
            return parseInt(texto.replace(/[^0-9]/g, ""), 10);
        }

        function aplicarFiltros() {
            const categoriasMarcadas = Array.from(checkboxesCategoria).filter(c => c.checked).map(c => c.value);
            const busqueda = inputBuscar.value.trim().toLowerCase();

            tarjetas.forEach(function(tarjeta) {
                const categoria = tarjeta.getAttribute("data-categoria");
                const nombre = tarjeta.querySelector(".card-title").textContent.toLowerCase();
                const pasaCategoria = categoriasMarcadas.length === 0 || categoriasMarcadas.includes(categoria);
                const pasaBusqueda = nombre.includes(busqueda);
                tarjeta.style.display = (pasaCategoria && pasaBusqueda) ? "" : "none";
            });
        }

        checkboxesCategoria.forEach(c => c.addEventListener("change", aplicarFiltros));
        if (inputBuscar !== null) {
            inputBuscar.addEventListener("input", aplicarFiltros);
        }

        if (selectOrden !== null) {
            selectOrden.addEventListener("change", function() {
                if (this.value === "relevancia") return;
                const ordenadas = [...tarjetas].sort(function(a, b) {
                    const pa = obtenerPrecio(a);
                    const pb = obtenerPrecio(b);
                    return this.value === "menor-precio" ? pa - pb : pb - pa;
                }.bind(this));
                ordenadas.forEach(t => gridProductos.appendChild(t));
            });
        }
    }

    const formResena = document.getElementById("form-resena");
    if (formResena !== null) {
        formResena.addEventListener("submit", function(e) {
            e.preventDefault();
            const comentario = document.getElementById("resena-comentario");
            if (comentario.value.trim() === "") {
                comentario.classList.add("is-invalid");
                return;
            }
            comentario.classList.remove("is-invalid");
            alert("¡Gracias por tu reseña!");
            formResena.reset();
        });
    }

    const formComentario = document.getElementById("form-comentario");
    if (formComentario !== null) {
        formComentario.addEventListener("submit", function(e) {
            e.preventDefault();
            const texto = document.getElementById("comentario-texto");
            if (texto.value.trim() === "") {
                texto.classList.add("is-invalid");
                return;
            }
            texto.classList.remove("is-invalid");
            alert("¡Comentario publicado!");
            formComentario.reset();
        });
    }

});

function eliminarUsuarioJS() {
    confirm("¿Estás seguro de que deseas eliminar este usuario del sistema?");
}
function eliminarProductoJS() {
    confirm("¿Estás seguro de que deseas eliminar este producto del inventario?");
}