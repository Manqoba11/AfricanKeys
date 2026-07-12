// ============================
// CART STATE
// ============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================
// SAVE CART TO LOCALSTORAGE
// ============================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ============================
// ADD TO CART
// ============================
function addToCart(name, image, price) {
    price = Number(price);

    // Check if item already in cart
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ name, image, price, qty: 1 });
    }

    saveCart();
    updateCartUI();
    updateCartBadge();
    updateWhatsApp();

    // Show feedback
    const btn = event?.target;
    if (btn) {
        const original = btn.textContent;
        btn.textContent = "✅ Added!";
        btn.style.background = "#28a745";
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = "";
        }, 1500);
    }
}

// ============================
// REMOVE ITEM
// ============================
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    updateCartBadge();
    updateWhatsApp();
}

// ============================
// CHANGE QUANTITY
// ============================
function changeQty(index, delta) {
    cart[index].qty = (cart[index].qty || 1) + delta;
    if (cart[index].qty <= 0) {
        removeFromCart(index);
        return;
    }
    saveCart();
    updateCartUI();
    updateCartBadge();
    updateWhatsApp();
}

// ============================
// UPDATE CART BADGE IN NAV
// ============================
function updateCartBadge() {
    const total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const links = document.querySelectorAll('a[href="cart.html"]');
    links.forEach(link => {
        link.textContent = total > 0 ? `🛒 Cart (${total})` : "🛒 Cart";
    });
}

// ============================
// UPDATE CART UI (cart.html)
// ============================
function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>🛒 Your cart is empty</p>
                <a href="products.html">Browse Products</a>
            </div>`;
        updateSummary(0);
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = (item.price || 0) * (item.qty || 1);
        total += itemTotal;

        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            ${item.image
                ? `<img class="cart-img" src="${item.image}" alt="${item.name}">`
                : `<div class="cart-img" style="background:#eee;display:flex;align-items:center;justify-content:center;font-size:30px;">📦</div>`
            }
            <div class="cart-info">
                <div class="cart-name">${item.name}</div>
                <div class="cart-price">R${item.price.toFixed(2)} each</div>
                <div class="cart-controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
                    <span class="qty-display">${item.qty || 1}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    <span style="color:#888;font-size:13px;">= R${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})" title="Remove">✕</button>
        `;

        cartItems.appendChild(li);
    });

    updateSummary(total);
}

// ============================
// UPDATE ORDER SUMMARY
// ============================
function updateSummary(total) {
    const itemCount = document.getElementById("itemCount");
    const cartTotal = document.getElementById("cartTotal");

    const totalQty = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

    if (itemCount) itemCount.textContent = totalQty;
    if (cartTotal) cartTotal.textContent = "R" + total.toFixed(2);
}

// ============================
// WHATSAPP CHECKOUT LINK
// ============================
function updateWhatsApp() {
    const btn = document.getElementById("whatsappCheckout");
    if (!btn) return;

    if (cart.length === 0) {
        btn.href = "#";
        return;
    }

    let msg = "🛒 *Keys Of Africa Order*\n\n";
    cart.forEach(item => {
        msg += `• ${item.name} x${item.qty || 1} = R${((item.price || 0) * (item.qty || 1)).toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
    msg += `\n💰 *Total: R${total.toFixed(2)}*`;

    btn.href = `https://wa.me/27637836366?text=${encodeURIComponent(msg)}`;
}

// ============================
// BUILD ORDER FOR FORMSPREE
// ============================
function buildOrderSummary() {
    let text = "ORDER DETAILS:\n";
    cart.forEach(item => {
        text += `- ${item.name} x${item.qty || 1} = R${((item.price || 0) * (item.qty || 1)).toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
    text += `\nTOTAL: R${total.toFixed(2)}`;
    return text;
}

// ============================
// FORM SUBMIT HANDLER
// ============================
document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
    updateCartBadge();
    updateWhatsApp();

    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        if (cart.length === 0) {
            e.preventDefault();
            alert("⚠️ Your cart is empty! Please add products before placing an order.");
            return;
        }

        // Inject order data into hidden field
        let hidden = document.getElementById("order");
        if (!hidden) {
            hidden = document.createElement("input");
            hidden.type = "hidden";
            hidden.name = "order";
            hidden.id = "order";
            form.appendChild(hidden);
        }
        hidden.value = buildOrderSummary();
    });
});

// ============================
// TERMS & CONDITIONS
// ============================

function toggleButtons() {
    const checkbox = document.getElementById("tcCheckbox");
    const acceptBtn = document.getElementById("acceptBtn");

    if (checkbox && acceptBtn) {
        acceptBtn.disabled = !checkbox.checked;
    }
}

function hasAcceptedTCs() {
    const email = localStorage.getItem("userEmail");
    if (!email) return false;

    return localStorage.getItem("tcsAccepted_" + email) === "true";
}

function acceptTerms() {
    const email = localStorage.getItem("userEmail");

    if (!email) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    localStorage.setItem("tcsAccepted_" + email, "true");

    alert("Thank you for accepting the Terms & Conditions.");

    window.location.href = "index.html";
}

function declineTerms() {
    alert("You must accept the Terms & Conditions to continue.");

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    window.location.href = "login.html";
}