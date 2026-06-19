// ================================================
// Keys Of Africa — cart.js
// ================================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ── Save ─────────────────────────────────────────
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ── Add to cart (NO login / T&Cs gate) ───────────
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

// ═══════════════════════════════════════════════════
//  AUTH  (Firebase localStorage bridge)
// ═══════════════════════════════════════════════════

function getCurrentUser() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (loggedIn) {
        return {
            name:  localStorage.getItem("userName")  || "Customer",
            email: localStorage.getItem("userEmail") || ""
        };
    }
    return null;
}

// Per-user T&Cs acceptance key
function getTCsKey() {
    const user = getCurrentUser();
    if (!user || !user.email) return null;
    return "tcsAccepted_" + user.email;
}

function hasAcceptedTCs() {
    const key = getTCsKey();
    if (!key) return false;
    return localStorage.getItem(key) === "true";
}

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

function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}

// ── T&Cs functions (used on Ts&Cs.html) ──────────
function toggleButtons() {
    const cb  = document.getElementById("tcCheckbox");
    const btn = document.getElementById("acceptBtn");
    if (btn) btn.disabled = !cb.checked;
}

function acceptTerms() {
    const key = getTCsKey();
    if (key) {
        localStorage.setItem(key, "true");
    }
    const m = document.getElementById("tcs-message");
    if (m) {
        m.textContent = "✅ Thank you! You have accepted the Terms & Conditions.";
        m.style.color = "#16a34a";
    }
    setTimeout(() => { window.location.href = "cart.html"; }, 1800);
}

function declineTerms() {
    const key = getTCsKey();
    if (key) localStorage.removeItem(key);
    const m = document.getElementById("tcs-message");
    if (m) {
        m.textContent = "❌ You have declined the Terms & Conditions.";
        m.style.color = "#dc2626";
    }
}

// ── Cart page submit logic ────────────────────────
document.addEventListener("DOMContentLoaded", () => {

    // Show login/T&Cs status banner on cart page
    const cartPage = document.querySelector(".cart-page");
    if (cartPage) {
        const user = getCurrentUser();

        if (!user) {
            // Not logged in — show banner, disable submit buttons
            const banner = document.createElement("div");
            banner.style.cssText = "background:#fff7e6;border:1.5px solid #d4af37;border-radius:8px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;";
            banner.innerHTML = `
                <span style="color:#92600a;font-size:14px;font-weight:600;">
                    ⚠️ You must be logged in to place an order. You can still add items to your cart.
                </span>
                <a href="login.html" style="background:#d4af37;color:white;padding:8px 18px;border-radius:6px;font-weight:bold;font-size:13px;text-decoration:none;">
                    Login Now →
                </a>`;
            cartPage.insertBefore(banner, cartPage.firstChild);
            disableCheckout();
        } else if (!hasAcceptedTCs()) {
            // Logged in but T&Cs not accepted — show banner
            const banner = document.createElement("div");
            banner.style.cssText = "background:#f0fdf4;border:1.5px solid #22c55e;border-radius:8px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;";
            banner.innerHTML = `
                <span style="color:#15803d;font-size:14px;font-weight:600;">
                    📋 Please accept our Terms & Conditions before placing an order.
                </span>
                <a href="Ts&Cs.html" style="background:#22c55e;color:white;padding:8px 18px;border-radius:6px;font-weight:bold;font-size:13px;text-decoration:none;">
                    View &amp; Accept T&amp;Cs →
                </a>`;
            cartPage.insertBefore(banner, cartPage.firstChild);
            disableCheckout();
        }
    }

    // Form submit handler
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", e => {
        // 1. Must be logged in
        if (!getCurrentUser()) {
            e.preventDefault();
            showToast("⚠️ Please log in before placing an order.");
            setTimeout(() => { window.location.href = "login.html"; }, 1800);
            return;
        }
        // 2. Must have accepted T&Cs
        if (!hasAcceptedTCs()) {
            e.preventDefault();
            showToast("📋 Please accept the Terms & Conditions first.");
            setTimeout(() => { window.location.href = "Ts&Cs.html"; }, 1800);
            return;
        }
        // 3. Cart must not be empty
        if (cart.length === 0) {
            e.preventDefault();
            showToast("Your cart is empty! Add products first.");
            return;
        }
        // Attach order data
        let hidden = document.getElementById("order") || (() => {
            const h = document.createElement("input");
            h.type = "hidden"; h.name = "order"; h.id = "order";
            form.appendChild(h); return h;
        })();
        hidden.value = JSON.stringify(buildOrder(), null, 2);
    });

    // WhatsApp button — same gates
    const waBtn = document.getElementById("whatsappCheckout");
    if (waBtn) {
        waBtn.addEventListener("click", e => {
            if (!getCurrentUser()) {
                e.preventDefault();
                showToast("⚠️ Please log in before placing an order.");
                setTimeout(() => { window.location.href = "login.html"; }, 1800);
                return;
            }
            if (!hasAcceptedTCs()) {
                e.preventDefault();
                showToast("📋 Please accept the Terms & Conditions first.");
                setTimeout(() => { window.location.href = "Ts&Cs.html"; }, 1800);
            }
        });
    }
});

// Visually disable submit buttons when not allowed
function disableCheckout() {
    const submitBtn = document.querySelector("#checkoutForm button[type=submit]");
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
        submitBtn.title = "Login and accept T&Cs to place an order";
    }
    const waBtn = document.getElementById("whatsappCheckout");
    if (waBtn) {
        waBtn.style.opacity = "0.5";
        waBtn.style.pointerEvents = "none";
        waBtn.title = "Login and accept T&Cs to place an order";
    }
}

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

// ── Init ──────────────────────────────────────────
window.onload = function () {
    if (!Array.isArray(cart)) cart = [];
    updateCartUI();
    updateCartCount();
    updateWhatsApp();
    updateNavAuth();

    const lb = document.getElementById("logoutBtn");
    if (lb) lb.addEventListener("click", handleLogout);
};
