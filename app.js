// 🔹 Configuración Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  databaseURL: "https://TU_PROJECT.firebaseio.com",
  projectId: "TU_PROJECT",
  storageBucket: "TU_PROJECT.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔹 Mostrar ventas en tiempo real
const ventasRef = db.ref("ventas");
ventasRef.on("value", (snapshot) => {
  const data = snapshot.val();
  document.getElementById("ventas").textContent = JSON.stringify(data, null, 2);
});

// 🔹 Guardar límite
function guardarLimite() {
  const limite = document.getElementById("limite").value;
  db.ref("config/limite").set(limite);
  alert("✅ Límite actualizado en Firebase");
}
