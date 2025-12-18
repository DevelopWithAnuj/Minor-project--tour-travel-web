const loginCard = document.getElementById("loginCard");
const registerCard = document.getElementById("registerCard");

// ---------------- CARD TOGGLE ----------------
function showRegister() {
  loginCard?.classList.add("hidden");
  registerCard?.classList.remove("hidden");
}

function showLogin() {
  registerCard?.classList.add("hidden");
  loginCard?.classList.remove("hidden");
}

// ---------------- SHAKE ----------------
function shake() {
  const card = document.querySelector(".auth-card:not(.hidden)");
  if (!card) return;

  card.style.animation = "shake 0.4s";
  setTimeout(() => (card.style.animation = ""), 400);
}

// ---------------- REGISTER ----------------
function register() {
  const emailEl = document.getElementById("regEmail");
  const passEl = document.getElementById("regPassword");

  if (!emailEl || !passEl) {
    alert("Form elements missing");
    return;
  }

  const email = emailEl.value.trim();
  const password = passEl.value.trim();

  if (!email || !password) {
    shake();
    alert("All fields are required");
    return;
  }

  if (password.length < 6) {
    shake();
    alert("Password must be at least 6 characters");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Prevent duplicate email
  if (users.find(u => u.email === email)) {
    shake();
    alert("User already exists");
    return;
  }

  const role = email === "admin@gmail.com" ? "admin" : "user";

  users.push({ email, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully");
  showLogin();
}

// ---------------- LOGIN ----------------
function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const btn = document.getElementById("loginBtn");

  if (!emailInput || !passwordInput || !btn) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    shake();
    alert("Enter email and password");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  btn.querySelector(".btn-text")?.classList.add("hidden");
  btn.querySelector(".spinner")?.classList.remove("hidden");

  setTimeout(() => {
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      window.location.href =
        user.role === "admin"
          ? "admin-dashboard.html"
          : "index.html";
    } else {
      shake();
      alert("Invalid credentials");
      btn.querySelector(".btn-text")?.classList.remove("hidden");
      btn.querySelector(".spinner")?.classList.add("hidden");
    }
  }, 1200);
}

