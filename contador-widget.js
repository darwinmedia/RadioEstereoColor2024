import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChyPlqq2LWxt8cIkyiZX6jXeg32qX9a4",
  authDomain: "contador-visitas-stereo-color.firebaseapp.com",
  projectId: "contador-visitas-stereo-color",
  storageBucket: "contador-visitas-stereo-color.firebasestorage.app",
  messagingSenderId: "979539767756",
  appId: "1:979539767756:web:7639c2a63eb829d62c2d69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ref = doc(db, "stats", "visitas");

// crear UI automáticamente
const box = document.createElement("div");
box.style.cssText = `
  background:#000;
  color:#fff;
  padding:10px 15px;
  text-align:center;
  font-family:Arial;
  font-size:16px;
`;

box.innerHTML = "🌎 Visitas: <b id='visitas'>0</b>";

document.body.appendChild(box);

async function contar() {
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, { total: 1 });
  } else {
    await updateDoc(ref, {
      total: increment(1)
    });
  }

  const data = await getDoc(ref);

  const el = document.getElementById("visitas");
  if (el) el.innerText = data.data().total;
}

contar();