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
function addToCart(id,name, image, price) {
    price = Number(price);

    // Check if item already in cart
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ id,name, image, price, qty: 1 });
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
    updateNavigation(); 

    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.qty, 0);

    try {

        const response = await fetch("http://localhost:3000/api/orders", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                userId,
                cart,
                total

            })

        });

        const data = await response.json();

        alert(data.message);

        cart = [];
        saveCart();
        updateCartUI();
        updateCartBadge();

    }

    catch (err) {

        console.error(err);

        alert("Could not place order.");

    }

});

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
function updateNavigation() {

    const loggedIn = localStorage.getItem("loggedIn") === "true";

    const login = document.getElementById("nav-login");
    const signup = document.getElementById("nav-signup");
    const account = document.getElementById("nav-account");

    if (!login || !signup || !account) return;

    if (loggedIn) {

        login.style.display = "none";
        signup.style.display = "none";
        account.style.display = "block";

    } else {

        login.style.display = "block";
        signup.style.display = "block";
        account.style.display = "none";

    }

}
function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        window.location.href="login.html";

    }

}