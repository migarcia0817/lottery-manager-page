// seguridad.js
(function() {
    const userData = JSON.parse(localStorage.getItem("usuarioLogueado"));
    
    // 1. Obtener el nombre del archivo ignorando rutas y parámetros
    const url = window.location.pathname;
    const paginaActual = url.substring(url.lastIndexOf('/') + 1).toLowerCase();

    // 2. EXCEPCIONES: Páginas que NO deben bloquearse nunca (Login e Index)
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
            "reportes.html",
            "reporteventas.html",
            "listajugada.html",
            "reportegeneral.html",
            "reporteticket.html",
            "ticket-pagado.html",
            "monitor.html",
            "masvendido.html"
        ];

        // Verificamos si la página actual está permitida
        const esPermitida = paginasPermitidas.some(p => paginaActual.includes(p.toLowerCase()));

        if (!esPermitida) {
            alert("⛔ Acceso denegado: Su rol no permite entrar a esta sección.");
            window.location.href = "reportes.html";
            return;
        }
    }

    // 5. MODO SOLO LECTURA (Desactivar botones de edición para Supervisor)
    document.addEventListener("DOMContentLoaded", () => {
        if (tipoUsuario === "Supervisor") {
            const prohibidos = ["guardar", "eliminar", "crear", "actualizar", "borrar", "update", "delete", "save"];
            document.querySelectorAll("button, input[type='button'], a").forEach(btn => {
                const texto = (btn.innerText || btn.value || btn.id || "").toLowerCase();
                if (prohibidos.some(p => texto.includes(p))) {
                    btn.style.display = "none"; // Es mejor ocultarlos para evitar errores
                }
            });
        }
    });
})();
