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

    // Funciones para ADMIN
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

    // ==========================================
    // 4. ESPACIO PARA LAS VISTAS DE TU COMPAÑERO
    // ==========================================
    // Dile a tu compañero que cree sus validaciones de "Login", "Registro" y "Productos" aquí abajo
    // Siempre usando if (suFormulario !== null) { ... } !

});

// Funciones para eliminar usuarios y productos
function eliminarUsuarioJS() {
    confirm("¿Estás seguro de que deseas eliminar este usuario del sistema?");
}
function eliminarProductoJS() {
    confirm("¿Estás seguro de que deseas eliminar este producto del inventario?");
}