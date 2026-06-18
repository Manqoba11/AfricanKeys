let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    alert(name + " added to cart!");
    updateCartUI();
    updateWhatsApp();
}

// ============================
// REMOVE ITEM
// ============================
function removeFromCart(index) {
    cart.splice(index, 1);

    saveCart();
    updateCartUI();
    updateWhatsApp();
}

// ============================
// UPDATE UI
// ============================
function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

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
            img.style.width = "80px";
            img.style.height = "80px";
            left.appendChild(img);
        }

        const span = document.createElement("span");
        span.textContent = `${item.name} - R${Number(item.price).toFixed(2)}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromCart(index);

        left.appendChild(span);
        right.appendChild(removeBtn);

        li.appendChild(left);
        li.appendChild(right);

        cartItems.appendChild(li);
    });

    const itemCount = document.getElementById("itemCount");
    const cartTotal = document.getElementById("cartTotal");

    if (itemCount) itemCount.innerText = cart.length;
    if (cartTotal) cartTotal.innerText = "R" + total.toFixed(2);
}

// ============================
// WHATSAPP
// ============================
function updateWhatsApp() {
    const btn = document.getElementById("whatsappCheckout");
    if (!btn) return;

    let msg = "🛒 *Keys Of Africa Order*%0A%0A";

    cart.forEach(item => {
        msg += `• ${item.name} - R${item.price}%0A`;
    });

    const total = cart.reduce((sum, i) => sum + Number(i.price), 0);

    msg += `%0A💰 Total: R${total}`;

    btn.href = `https://wa.me/27833467574?text=${msg}`;
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
// ATTACH TO FORM BEFORE SUBMIT
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        if (cart.length === 0) {
            e.preventDefault();
            alert("Your cart is empty!");
            return;
        }

        // create hidden input if missing
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
// INIT
// ============================
window.onload = function () {
    if (!Array.isArray(cart)) cart = [];

    updateCartUI();
    updateCartCount();
    updateWhatsApp();
}; 
function toggleMenu() {
    const nav = document.getElementById("navMenu");

    if (!nav) {
        console.log("navMenu not found");
        return;
    }

    nav.classList.toggle("active");
}
function updateCartCount() {
    const count = document.getElementById("cartCount");

    if(count){
        count.innerText = cart.length;
    }
}
function searchProducts() {

    let input =
    document.getElementById("search").value.toLowerCase();

    let cards =
    document.querySelectorAll(".product-images div");

    cards.forEach(card => {

        let title =
        card.querySelector("h5").innerText.toLowerCase();

        card.style.display =
        title.includes(input)
        ? "block"
        : "none";
    });
}
function clearCart(){

    cart = [];

    saveCart();
    updateCartUI();
    updateWhatsApp();
}