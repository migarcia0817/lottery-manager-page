// seguridad.js
(function() {
    const userData = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    // 1. Obtener el nombre del archivo limpio
    const url = window.location.pathname;
    const paginaActual = url.substring(url.lastIndexOf('/') + 1).toLowerCase();

    // 2. EXCEPCIONES: Login e Index (No se bloquean)
    if (paginaActual === "login.html" || paginaActual === "index.html" || paginaActual === "") {
        return; 
    }

    // 3. BLOQUEO SI NO HAY SESIÓN
    if (!userData) {
        window.location.href = "login.html";
        return;
    }

    const tipoUsuario = userData.tipo || "";

    // 4. VALIDACIÓN DE PERMISOS PARA EL SUPERVISOR
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

        // Normalizamos la búsqueda para que coincida exactamente con el nombre del archivo
        const esPermitida = paginasPermitidas.some(p => paginaActual === p.toLowerCase());

        if (!esPermitida) {
            // Solo alertamos y redirigimos si NO es una de las permitidas
            console.warn("Acceso restringido para supervisor en:", paginaActual);
            window.location.href = "reportes.html";
            return;
        }
    }

    // 5. MODO SOLO LECTURA PARA SUPERVISOR
    document.addEventListener("DOMContentLoaded", () => {
        if (tipoUsuario === "Supervisor") {
            // Ocultar botones de acción en páginas como principal.html si existieran
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
