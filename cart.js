// ================================================
// Keys Of Africa — cart.js  (fully fixed version)
// ================================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ── Save ─────────────────────────────────────────
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ── Add to cart (NO T&Cs gate) ───────────────────
function addToCart(name, image, price) {
    cart.push({ name, image, price: Number(price) });
    saveCart();
    updateCartUI();
    updateWhatsApp();
    updateCartCount();
    showToast("✓  " + name + " added to cart!");
}

// ── Remove item ───────────────────────────────────
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    updateWhatsApp();
    updateCartCount();
}

// ── Clear cart ────────────────────────────────────
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
    updateWhatsApp();
    updateCartCount();
}

// ── Nav cart badge ────────────────────────────────
function updateCartCount() {
    document.querySelectorAll("#cartCount").forEach(el => {
        el.innerText = cart.length;
    });
}

// ── Cart page UI ──────────────────────────────────
function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<li style="padding:30px;text-align:center;color:#888;background:#fff;border-radius:10px;border:1px dashed #ddd;">
            <div style="font-size:40px;margin-bottom:10px;">🛒</div>
            <div style="font-size:16px;margin-bottom:8px;">Your cart is empty</div>
            <a href="products.html" style="color:#d4af37;font-weight:bold;">Browse Products →</a>
        </li>`;
    }

    cart.forEach((item, index) => {
        total += Number(item.price);
        const li = document.createElement("li");
        li.classList.add("cart-item");

        const left = document.createElement("div");
        left.classList.add("cart-left");

        if (item.image) {
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.style.cssText = "width:80px;height:70px;object-fit:cover;border-radius:6px;flex-shrink:0;";
            left.appendChild(img);
        }

        const info = document.createElement("div");
        info.innerHTML = `<div style="font-weight:600;color:#0f172a;font-size:15px;">${item.name}</div>
            <div style="color:#b9911e;font-size:15px;margin-top:4px;">R${Number(item.price).toLocaleString("en-ZA",{minimumFractionDigits:2})}</div>`;
        left.appendChild(info);

        const right = document.createElement("div");
        right.classList.add("cart-right");
        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.style.cssText = "width:auto;padding:7px 14px;background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;border-radius:5px;font-size:13px;cursor:pointer;margin-top:0;";
        btn.onclick = () => removeFromCart(index);
        right.appendChild(btn);

        li.appendChild(left);
        li.appendChild(right);
        cartItems.appendChild(li);
    });

    const itemCount = document.getElementById("itemCount");
    const cartTotal = document.getElementById("cartTotal");
    if (itemCount) itemCount.innerText = cart.length;
    if (cartTotal) cartTotal.innerText = "R" + total.toLocaleString("en-ZA", { minimumFractionDigits: 2 });
}

// ── WhatsApp checkout link ────────────────────────
function updateWhatsApp() {
    const btn = document.getElementById("whatsappCheckout");
    if (!btn) return;
    if (cart.length === 0) { btn.href = "#"; return; }

    let msg = "Hi Keys Of Africa,%0A%0AI would like to place the following order:%0A%0A";
    cart.forEach(item => {
        msg += `• ${encodeURIComponent(item.name)} — R${Number(item.price).toLocaleString("en-ZA")}%0A`;
    });
    const total = cart.reduce((s, i) => s + Number(i.price), 0);
    msg += `%0ATotal: R${total.toLocaleString("en-ZA")}%0A%0APlease confirm availability. Thank you!`;
    btn.href = `https://wa.me/27637836366?text=${msg}`;
}

// ── Order object for Formspree ────────────────────
function buildOrder() {
    return {
        customer: {
            name:  document.getElementById("name")?.value  || "",
            email: document.getElementById("email")?.value || "",
            phone: document.getElementById("phone")?.value || ""
        },
        items: cart,
        total: cart.reduce((s, i) => s + Number(i.price), 0),
        date:  new Date().toISOString()
    };
}

// ── Cart form submit ──────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", e => {
        // 1. Must be logged in
        if (!getCurrentUser()) {
            e.preventDefault();
            showToast("⚠️ Please log in before placing an order.");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1800);
            return;
        }
        // 2. Cart must not be empty
        if (cart.length === 0) {
            e.preventDefault();
            showToast("Your cart is empty! Add products first.");
            return;
        }
        let hidden = document.getElementById("order") || (() => {
            const h = document.createElement("input");
            h.type = "hidden"; h.name = "order"; h.id = "order";
            form.appendChild(h); return h;
        })();
        hidden.value = JSON.stringify(buildOrder(), null, 2);
    });

    // Also block WhatsApp checkout if not logged in
    const waBtn = document.getElementById("whatsappCheckout");
    if (waBtn) {
        waBtn.addEventListener("click", e => {
            if (!getCurrentUser()) {
                e.preventDefault();
                showToast("⚠️ Please log in before placing an order.");
                setTimeout(() => { window.location.href = "login.html"; }, 1800);
            }
        });
    }

    // Show login prompt banner on cart page if not logged in
    const cartPage = document.querySelector(".cart-page");
    if (cartPage && !getCurrentUser()) {
        const banner = document.createElement("div");
        banner.style.cssText = "background:#fff7e6;border:1.5px solid #d4af37;border-radius:8px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;";
        banner.innerHTML = `
            <span style="color:#92600a;font-size:14px;font-weight:600;">
                ⚠️ You must be logged in to place an order.
            </span>
            <a href="login.html" style="background:#d4af37;color:white;padding:8px 18px;border-radius:6px;font-weight:bold;font-size:13px;text-decoration:none;">
                Login Now →
            </a>`;
        cartPage.insertBefore(banner, cartPage.firstChild);
    }
});

// ── Mobile nav toggle ─────────────────────────────
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("open");
}

// ── Product search ────────────────────────────────
function searchProducts() {
    const input = document.getElementById("search");
    if (!input) return;
    const term = input.value.toLowerCase();
    document.querySelectorAll(".product-images > div").forEach(card => {
        const h = card.querySelector("h5");
        if (h) card.style.display = h.innerText.toLowerCase().includes(term) ? "" : "none";
    });
}

// ── Toast notification ────────────────────────────
function showToast(msg) {
    let t = document.getElementById("koa-toast");
    if (!t) {
        t = document.createElement("div");
        t.id = "koa-toast";
        t.style.cssText = "position:fixed;bottom:90px;right:20px;z-index:9999;background:#0f172a;color:#d4af37;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;border:1px solid #d4af37;opacity:0;transition:opacity 0.3s;max-width:300px;box-shadow:0 4px 16px rgba(0,0,0,.2);";
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = "0"; }, 3000);
}

// ── T&Cs page buttons ─────────────────────────────
function toggleButtons() {
    const cb = document.getElementById("tcCheckbox");
    const btn = document.getElementById("acceptBtn");
    if (btn) btn.disabled = !cb.checked;
}
function acceptTerms() {
    localStorage.setItem("tcsAccepted", "yes");
    const m = document.getElementById("tcs-message");
    if (m) { m.textContent = "✅ Thank you! You have accepted the Terms & Conditions."; m.style.color = "#16a34a"; }
    setTimeout(() => { window.location.href = "index.html"; }, 2000);
}
function declineTerms() {
    localStorage.removeItem("tcsAccepted");
    const m = document.getElementById("tcs-message");
    if (m) { m.textContent = "❌ You have declined the Terms & Conditions."; m.style.color = "#dc2626"; }
}

// ═══════════════════════════════════════════════════
//  AUTH  (localStorage-based — works on GitHub Pages)
// ═══════════════════════════════════════════════════

function getUsers()        { return JSON.parse(localStorage.getItem("koa_users") || "[]"); }
function saveUsers(u)      { localStorage.setItem("koa_users", JSON.stringify(u)); }
function getCurrentUser()  { return JSON.parse(localStorage.getItem("koa_currentUser") || "null"); }

// Show/hide nav links based on login state
function updateNavAuth() {
    const user       = getCurrentUser();
    const loginEl    = document.getElementById("nav-login");
    const signupEl   = document.getElementById("nav-signup");
    const logoutEl   = document.getElementById("nav-logout");
    const greetEl    = document.getElementById("nav-greeting");

    if (user) {
        if (loginEl)  loginEl.style.display  = "none";
        if (signupEl) signupEl.style.display  = "none";
        if (logoutEl) logoutEl.style.display  = "list-item";
        if (greetEl)  greetEl.textContent     = "Hi, " + user.name + "!";
    } else {
        if (loginEl)  loginEl.style.display  = "list-item";
        if (signupEl) signupEl.style.display  = "list-item";
        if (logoutEl) logoutEl.style.display  = "none";
        if (greetEl)  greetEl.textContent     = "";
    }
}

function handleSignup(e) {
    e.preventDefault();
    const get = id => document.getElementById(id).value.trim();
    const name     = get("signup-name");
    const surname  = get("signup-surname");
    const phone    = get("signup-phone");
    const email    = get("signup-email").toLowerCase();
    const username = get("signup-username").toLowerCase();
    const password = document.getElementById("signup-password").value;
    const confirm  = document.getElementById("signup-confirm").value;
    const errEl    = document.getElementById("signup-error");

    errEl.textContent = "";
    if (password !== confirm)  { errEl.textContent = "Passwords do not match.";                  return; }
    if (password.length < 6)   { errEl.textContent = "Password must be at least 6 characters."; return; }
    if (!name || !email || !username) { errEl.textContent = "Please fill in all fields."; return; }

    const users = getUsers();
    if (users.find(u => u.username === username || u.email === email)) {
        errEl.textContent = "An account with that username or email already exists.";
        return;
    }

    const newUser = { name, surname, phone, email, username, password };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("koa_currentUser", JSON.stringify(newUser));
    window.location.href = "index.html";
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const errEl    = document.getElementById("login-error");

    errEl.textContent = "";
    const user = getUsers().find(u =>
        (u.username === username || u.email === username) && u.password === password
    );

    if (!user) { errEl.textContent = "Incorrect username or password."; return; }

    localStorage.setItem("koa_currentUser", JSON.stringify(user));
    window.location.href = "index.html";
}

function handleLogout() {
    localStorage.removeItem("koa_currentUser");
    window.location.href = "index.html";
}

// ── Init ──────────────────────────────────────────
window.onload = function () {
    if (!Array.isArray(cart)) cart = [];
    updateCartUI();
    updateCartCount();
    updateWhatsApp();
    updateNavAuth();

    const sf = document.getElementById("signupForm");
    if (sf) sf.addEventListener("submit", handleSignup);

    const lf = document.getElementById("loginForm");
    if (lf) lf.addEventListener("submit", handleLogin);

    const lb = document.getElementById("logoutBtn");
    if (lb) lb.addEventListener("click", handleLogout);
};

// ============================
// SAVE CART
// ============================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ============================
// ADD TO CART
// ============================
function addToCart(name, image, price) {
    price = Number(price);
    cart.push({ name, image, price });
    saveCart();
    updateCartUI();
    updateWhatsApp();
    updateCartCount();
    showToast(name + " added to cart!");
}

// ============================
// REMOVE ITEM
// ============================
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    updateWhatsApp();
    updateCartCount();
}

// ============================
// CLEAR CART
// ============================
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
    updateWhatsApp();
    updateCartCount();
}

// ============================
// UPDATE CART COUNT (in nav)
// ============================
function updateCartCount() {
    const count = document.getElementById("cartCount");
    if (count) count.innerText = cart.length;
}

// ============================
// UPDATE CART UI (cart page)
// ============================
function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li style="padding:20px; text-align:center; color:#888;">Your cart is empty. <a href="products.html" style="color:#d4af37;">Browse products</a></li>';
    }

    cart.forEach((item, index) => {
        total += Number(item.price);

        const li = document.createElement("li");
        li.classList.add("cart-item");

        const left = document.createElement("div");
        left.classList.add("cart-left");

        const right = document.createElement("div");
        right.classList.add("cart-right");

        if (item.image) {
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            left.appendChild(img);
        }

        const info = document.createElement("div");
        const nameEl = document.createElement("div");
        nameEl.style.fontWeight = "600";
        nameEl.style.color = "#0f172a";
        nameEl.textContent = item.name;

        const priceEl = document.createElement("div");
        priceEl.style.color = "#b9911e";
        priceEl.style.fontSize = "15px";
        priceEl.textContent = "R" + Number(item.price).toLocaleString("en-ZA", { minimumFractionDigits: 2 });

        info.appendChild(nameEl);
        info.appendChild(priceEl);
        left.appendChild(info);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromCart(index);
        right.appendChild(removeBtn);

        li.appendChild(left);
        li.appendChild(right);
        cartItems.appendChild(li);
    });

    const itemCount = document.getElementById("itemCount");
    const cartTotal = document.getElementById("cartTotal");
    if (itemCount) itemCount.innerText = cart.length;
    if (cartTotal) cartTotal.innerText = "R" + total.toLocaleString("en-ZA", { minimumFractionDigits: 2 });
}

// ============================
// WHATSAPP CHECKOUT LINK
// ============================
function updateWhatsApp() {
    const btn = document.getElementById("whatsappCheckout");
    if (!btn) return;

    let msg = "Hi Keys Of Africa,%0A%0AI would like to place the following order:%0A%0A";
    cart.forEach(item => {
        msg += `• ${item.name} — R${Number(item.price).toLocaleString("en-ZA")}%0A`;
    });

    const total = cart.reduce((sum, i) => sum + Number(i.price), 0);
    msg += `%0ATotal: R${total.toLocaleString("en-ZA")}%0A%0APlease confirm availability and delivery cost. Thank you!`;

    btn.href = `https://wa.me/27637836366?text=${msg}`;
}

// ============================
// BUILD ORDER OBJECT FOR FORM
// ============================
function buildOrder() {
    return {
        customer: {
            name: document.getElementById("name")?.value || "",
            email: document.getElementById("email")?.value || "",
            phone: document.getElementById("phone")?.value || ""
        },
        items: cart,
        total: cart.reduce((sum, i) => sum + Number(i.price), 0),
        date: new Date().toISOString()
    };
}

// ============================
// FORM SUBMIT HANDLER
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        if (cart.length === 0) {
            e.preventDefault();
            showToast("Your cart is empty! Add products before ordering.");
            return;
        }

        let hidden = document.getElementById("order");
        if (!hidden) {
            hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = "order";
            hidden.id = "order";
            form.appendChild(hidden);
        }
        hidden.value = JSON.stringify(buildOrder(), null, 2);
        saveCart();
    });
});

// ============================
// MOBILE NAV TOGGLE
// ============================
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("open");
}

// ============================
// PRODUCT SEARCH
// ============================
function searchProducts() {
    const input = document.getElementById("search");
    if (!input) return;
    const term = input.value.toLowerCase();
    const cards = document.querySelectorAll(".product-images div");
    cards.forEach(card => {
        const title = card.querySelector("h5");
        if (title) {
            card.style.display = title.innerText.toLowerCase().includes(term) ? "flex" : "none";
        }
    });
}

// ============================
// TOAST NOTIFICATION
// ============================
function showToast(message) {
    let toast = document.getElementById("koa-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "koa-toast";
        toast.style.cssText = `
            position: fixed; bottom: 90px; right: 20px; z-index: 9999;
            background: #0f172a; color: #d4af37;
            padding: 12px 20px; border-radius: 8px;
            font-size: 14px; font-weight: 600;
            border: 1px solid #d4af37;
            opacity: 0; transition: opacity 0.3s;
            max-width: 280px;
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.opacity = "0"; }, 3000);
}

// ============================
// INIT ON PAGE LOAD
// ============================
window.onload = function () {
    if (!Array.isArray(cart)) cart = [];
    updateCartUI();
    updateCartCount();
    updateWhatsApp();
};