// seguridad.js
(function() {
    const userData = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    // 1. Obtener el nombre del archivo de forma limpia
    const url = window.location.pathname;
    let paginaActual = url.substring(url.lastIndexOf('/') + 1).toLowerCase();

    // Si la página está vacía (acceso a la raíz /), asumimos que es index.html
    if (paginaActual === "") {
        paginaActual = "index.html";
    }

    // 2. EXCEPCIONES: No bloquear el login (index.html o login.html)
    if (paginaActual === "index.html" || paginaActual === "login.html") {
        return; 
    }

    // 3. BLOQUEO SI NO HAY SESIÓN (Para el resto de las páginas)
    if (!userData) {
        window.location.href = "index.html";
        return;
    }

    const tipoUsuario = userData.tipo || "";

    // 4. PERMISOS PARA EL SUPERVISOR
    if (tipoUsuario === "Supervisor") {
        const paginasPermitidas = [
            "principal.html",
            "reportes.html",
            "reporteventas.html",
            "listajugada.html",
            "reportegeneral.html",
            "reporteticket.html",
            "ticket-pagado.html",
            "monitor.html",
            "masvendido.html"
        ];

        // Verificamos si tiene permiso
        const esPermitida = paginasPermitidas.some(p => paginaActual === p.toLowerCase());

        if (!esPermitida) {
            window.location.href = "reportes.html";
            return;
        }
    }

    // 5. MODO SOLO LECTURA
    document.addEventListener("DOMContentLoaded", () => {
        if (tipoUsuario === "Supervisor") {
            const prohibidos = ["guardar", "eliminar", "crear", "actualizar", "borrar", "update", "delete", "save"];
            document.querySelectorAll("button, input[type='button'], a").forEach(btn => {
                const texto = (btn.innerText || btn.value || btn.id || "").toLowerCase();
                if (prohibidos.some(p => texto.includes(p))) {
                    btn.style.display = "none";
                }
            });
        }
    });
})();
