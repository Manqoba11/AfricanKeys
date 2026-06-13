let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================
// ADD TO CART
// ============================
function addToCart(name, image,price ) {
    price = Number(price); // 🔥 convert to number
             cart.push({ name, image, price });

    saveCart();
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
// SAVE CART
// ============================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ============================
// UPDATE UI
// ============================
function updateCartUI() {

    let cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        let li = document.createElement("li");
        li.classList.add("cart-item");

        let left = document.createElement("div");
        left.classList.add("cart-left");

        let right = document.createElement("div");
        right.classList.add("cart-right");

        if (item.image) {
            let img = document.createElement("img");
            img.src = item.image;
            img.style.width = "80px";
            img.style.height = "80px";
            left.appendChild(img); 
        }
        

        let span = document.createElement("span");
        span.textContent = `${item.name} - R${Number(item.price).toFixed(2)}`; // 🔥 convert to number and format

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromCart(index);

        left.appendChild(span);
        right.appendChild(removeBtn);

        li.appendChild(left);
        li.appendChild(right);

        cartItems.appendChild(li);
    });

    document.getElementById("itemCount").innerText = cart.length;
    document.getElementById("cartTotal").innerText = "R" + Number(total).toFixed(2);
}

// ============================
// WHATSAPP LINK
// ============================
function updateWhatsApp() {
    let items = cart.map(i => i.name).join(", ");

    let msg = `Hi Keys Of Africa! I would like to order: ${items}`;

    let btn = document.getElementById("whatsappCheckout");

    if (btn) {
        btn.href = `https://wa.me/27833467574?text=${encodeURIComponent(msg)}`;
    }
}

// ============================
// LOAD ON PAGE START
// ============================
window.onload = function () {
    updateCartUI();
    updateWhatsApp();
};