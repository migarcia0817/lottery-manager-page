// seguridad.js
(function() {
    const userData = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const paginaActual = window.location.pathname.split("/").pop();

    // 1. SI ES LA PÁGINA DE LOGIN O INDEX, NO HACER NADA (DEJAR PASAR)
    if (paginaActual === "login.html" || paginaActual === "index.html" || paginaActual === "") {
        return; 
    }

    // 2. BLOQUEO SI NO HAY SESIÓN (Solo para páginas internas)
    if (!userData) {
        window.location.href = "login.html";
        return;
    }

    const tipoUsuario = userData.tipo || "";

    // 3. DEFINIR PERMISOS DEL SUPERVISOR
    if (tipoUsuario === "Supervisor") {
        const paginasPermitidas = [
            "login.html",
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

        if (!paginasPermitidas.includes(paginaActual)) {
            alert("⛔ Acceso denegado: Su rol no permite entrar a esta sección.");
            window.location.href = "principal.html";
        }
    }

    // 4. MODO SOLO LECTURA PARA SUPERVISOR
    document.addEventListener("DOMContentLoaded", () => {
        if (tipoUsuario === "Supervisor") {
            const botonesProhibidos = ["guardar", "eliminar", "crear", "actualizar", "borrar", "update", "delete", "save"];
            
            document.querySelectorAll("button, input[type='button'], input[type='submit']").forEach(btn => {
                const texto = (btn.innerText || btn.value || btn.id || "").toLowerCase();
                if (botonesProhibidos.some(palabra => texto.includes(palabra))) {
                    btn.disabled = true;
                    btn.style.opacity = "0.5";
                    btn.style.cursor = "not-allowed";
                }
            });
        }
    });
})();
