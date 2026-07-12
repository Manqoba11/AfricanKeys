// Product database
const products = {
    1: {
        name: "Sliding Door",
        price: "From R4 800",
        image: "images/sliding-door.jpg",
        description: "High-quality aluminium sliding door suitable for homes and offices."
    },

    2: {
        name: "Casement Window",
        price: "From R2 100",
        image: "images/casement-window.jpg",
        description: "Strong aluminium casement window with excellent ventilation."
    },

    3: {
        name: "Pivot Door",
        price: "From R6 500",
        image: "images/pivot-door.jpg",
        description: "Modern aluminium pivot door with premium finish."
    }
};

// Read the product ID from the URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const product = products[id];

if (product) {

    document.getElementById("productName").textContent = product.name;

    document.getElementById("productPrice").textContent = product.price;

    document.getElementById("productDescription").textContent =
        product.description;

    document.getElementById("productImage").src = product.image;

    document.getElementById("productImage").alt = product.name;

}
const products = [

{
    id:1,
    name:"Sliding Door",
    category:"doors",
    price:4800,
    image:"images/sliding-door.jpg",
    description:"Premium aluminium sliding door."
},

{
    id:2,
    name:"Pivot Door",
    category:"doors",
    price:6500,
    image:"images/pivot-door.jpg",
    description:"Modern pivot aluminium door."
},

{
    id:3,
    name:"Casement Window",
    category:"windows",
    price:2100,
    image:"images/casement-window.jpg",
    description:"Strong aluminium casement window."
},
{
    id:4,
    name:"Awning Window",
    category:"windows", 
    price:2800,
    image:"images/awning-window.jpg",
    description:"Functional aluminium awning window."

},
{   id:5,
    name:"French Door",
    category:"doors",
    price:7500,
    image:"images/french-door.jpg",
    description:"Elegant aluminium French door."
},
{   id:6,
    name:"Fixed Panel",
    category:"windows",
    price:1500,
    image:"images/fixed-panel.jpg",
    description:"Simple aluminium fixed panel."
},
{   id:7,
    name:"Garden Door",
    category:"doors",
    price:5000,
    image:"images/garden-door.jpg",
    description:"Durable aluminium garden door."
},
{  id:8,
    name:"Security Door",
    category:"doors",
    price:8000,
    image:"images/security-door.jpg",
    description:"High-security aluminium door."
},
{   id:9,
    name:"Louvre Window",
    category:"windows",
    price:3200,
    image:"images/louvre-window.jpg",
    description:"Elegant aluminium louvre window."
},
{   id:10,
    name:"Bi-Fold Door",
    category:"doors",
    price:9000,
    image:"images/bi-fold-door.jpg",
    description:"Spacious aluminium bi-fold door."
},
{   id:11,
    name:"Tilt and Turn Window",
    category:"windows",
    price:3500,
    image:"images/tilt-and-turn-window.jpg",
    description:"Functional aluminium tilt and turn window."
}
];