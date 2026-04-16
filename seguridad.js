// seguridad.js
(function() {
    const userData = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const path = window.location.pathname.toLowerCase();
    
    // 1. Detectar la página de forma flexible
    // Esto captura "principal.html", "/principal", "/principal/" etc.
    const urlLimpia = path.split('/').pop();

    // 2. EXCEPCIONES: No bloquear el Login
    if (urlLimpia === "index.html" || urlLimpia === "login.html" || urlLimpia === "" || path === "/") {
        return; 
    }

    // 3. BLOQUEO SI NO HAY SESIÓN
    if (!userData) {
        window.location.href = "index.html";
        return;
    }

    const tipoUsuario = userData.tipo || "";

    // 4. VALIDACIÓN PARA SUPERVISOR
    if (tipoUsuario === "Supervisor") {
        const paginasPermitidas = [
            "principal",
            "reportes",
            "reporteventas",
            "listajugada",
            "reportegeneral",
            "reporteticket",
            "ticket-pagado",
            "monitor",
            "masvendido"
        ];

        // Verificamos si alguna palabra permitida está en la URL actual
        const esPermitida = paginasPermitidas.some(p => path.includes(p));

        if (!esPermitida) {
            // Si realmente no tiene permiso, lo mandamos a reportes
            // Usamos un alert solo para saber si falló
            console.warn("Bloqueado en: " + path);
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
