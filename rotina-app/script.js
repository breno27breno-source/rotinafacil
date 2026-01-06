// ================= ELEMENTOS =================
const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");

const btnLogin = document.getElementById("btnLogin");
const btnAdd = document.getElementById("btnAdd");
const btnIA = document.getElementById("btnIA");

const nomeInput = document.getElementById("nome");
const nascimentoInput = document.getElementById("nascimento");

const tarefaInput = document.getElementById("tarefa");
const horaInput = document.getElementById("hora");

const objetivoInput = document.getElementById("objetivo");
const lista = document.getElementById("lista");

// ================= DADOS =================
let rotinas = JSON.parse(localStorage.getItem("rotinas")) || [];

// ================= LOGIN =================
btnLogin.addEventListener("click", function () {
  const nome = nomeInput.value;
  const nascimento = nascimentoInput.value;

  if (nome === "" || nascimento === "") {
    alert("Preencha nome e data de nascimento!");
    return;
  }

  const anoAtual = new Date().getFullYear();
  const anoNasc = new Date(nascimento).getFullYear();
  const idade = anoAtual - anoNasc;

  loginDiv.style.display = "none";
  appDiv.style.display = "block";

  document.getElementById("bemvindo").innerText =
    "Bem-vindo, " + nome + " 👋";

  if (idade < 13) {
    document.body.style.background = "#ffe0f0";
  } else {
    document.body.style.background = "#e8f0ff";
  }
});

// ================= ADICIONAR ROTINA =================
btnAdd.addEventListener("click", function () {
  const tarefa = tarefaInput.value;
  const hora = horaInput.value;

  if (tarefa === "" || hora === "") {
    alert("Digite a tarefa e a hora!");
    return;
  }

  rotinas.push({ tarefa, hora });
  salvar();
  mostrarRotinas();

  tarefaInput.value = "";
  horaInput.value = "";
});

// ================= IA SIMULATIVA =================
btnIA.addEventListener("click", function () {
  const objetivo = objetivoInput.value.toLowerCase();

  if (objetivo === "") {
    alert("Digite um objetivo!");
    return;
  }

  let rotinaIA = [];

  if (objetivo.includes("estudo")) {
    rotinaIA = [
      { tarefa: "Acordar", hora: "07:00" },
      { tarefa: "Estudar", hora: "08:00" },
      { tarefa: "Pausa", hora: "10:00" },
      { tarefa: "Estudar", hora: "10:30" },
      { tarefa: "Dormir", hora: "21:00" }
    ];
  } else if (objetivo.includes("saude") || objetivo.includes("saúde")) {
    rotinaIA = [
      { tarefa: "Acordar", hora: "07:00" },
      { tarefa: "Caminhada", hora: "07:30" },
      { tarefa: "Almoço saudável", hora: "12:00" },
      { tarefa: "Dormir cedo", hora: "21:30" }
    ];
  } else {
    rotinaIA = [
      { tarefa: "Acordar", hora: "07:00" },
      { tarefa: "Atividades do dia", hora: "09:00" },
      { tarefa: "Lazer", hora: "16:00" },
      { tarefa: "Dormir", hora: "21:00" }
    ];
  }

  rotinaIA.forEach(function (r) {
    rotinas.push(r);
  });

  salvar();
  mostrarRotinas();

  objetivoInput.value = "";
  alert("🤖 Rotina criada automaticamente!");
});

// ================= FUNÇÕES =================
function mostrarRotinas() {
  lista.innerHTML = "";

  rotinas.forEach(function (r, index) {
    const li = document.createElement("li");
    li.textContent = r.hora + " - " + r.tarefa;
    lista.appendChild(li);
  });
}

function salvar() {
  localStorage.setItem("rotinas", JSON.stringify(rotinas));
}

// ================= INICIAR =================
mostrarRotinas();
