let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}
function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

function initMap() {
    const mombasa = { lat: -4.043477, lng: 39.668206 };

    // The map, centered at Mombasa
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: mombasa,
    });

    const marker = new google.maps.Marker({
        position: mombasa,
        map: map,
    });
    }


    document.addEventListener('DOMContentLoaded', function() {
        // Select the cart icon and cart sidebar
        const cartBtn = document.querySelector('#cart-btn');
        const cart = document.querySelector('.cart.card');
        const closeBtn = document.querySelector('.closeShopping');
       
        cartBtn.addEventListener('click', function() {
            cart.style.right = '0';  
        });
       
        closeBtn.addEventListener('click', function() {
            cart.style.right = '-400px';  
        });
    
        // Close cart when clicking outside of it
        document.addEventListener('click', function(event) {
            const isClickInsideCart = cart.contains(event.target);
            const isClickOnCartButton = event.target === cartBtn;
            const isClickOnInteractiveElement = event.target.matches('.increase, .decrease, .remove');
    
            if (!isClickInsideCart && !isClickOnCartButton && !isClickOnInteractiveElement) {
                cart.style.right = '-400px';
            }
        });
    });
    
    // Function to redirect to the checkout page
    function goToCheckout() {
        window.location.href = 'cart.html'; 
    }
    
    // Adding event listener to the total button
    const totalbtn = document.querySelector('.total');
    
    totalbtn.addEventListener('click', function() {
        goToCheckout(); 
    });
    
    // Initialize cart items array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    function updateCartQuantity() {
        const cartQuantity = document.querySelector('.quantity');
        cartQuantity.textContent = cartItems.length; 
    }
    
    function updateCart() {
        const listCard = document.querySelector('.listCard');
        const totalDisplay = document.querySelector('.total');
        listCard.innerHTML = '';
    
        let total = 0;
    
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <span>${item.name} - Ksh ${item.price}</span>
                    <div class="controls">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                        <button class="remove">Delete</button>
                    </div>
                </div>
            `;
    
            // Event listeners for increasing/decreasing quantity
            li.querySelector('.increase').addEventListener('click', function() {
                item.quantity += 1;
                updateCart();
                saveCart();
            });
    
            li.querySelector('.decrease').addEventListener('click', function() {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    removeFromCart(item.id);
                }
                updateCart();
                saveCart();
            });
    
            // Event listener for deleting the item
            li.querySelector('.remove').addEventListener('click', function() {
                removeFromCart(item.id);
                updateCart();
                saveCart();
            });
    
            listCard.appendChild(li);
            total += item.price * item.quantity;
        });
    
        totalDisplay.textContent = `Total: Ksh ${total.toFixed(2)}`;
        updateCartQuantity();
    }
    
    // Function to remove an item from the cart
    function removeFromCart(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        updateCart();
        saveCart();
    }
    
    // Function to add an item to the cart
    function addToCart(id, name, price) {
        const existingItem = cartItems.find(item => item.id === id);
    
        if (existingItem) {
            existingItem.quantity += 1;
            alert(`Increased quantity of ${name} in the cart.`);
        } else {
            cartItems.push({ id, name, price: Number(price), quantity: 1 });
        }
        updateCart();
        saveCart();
    }
    
    // Function to save the cart data to local storage
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    
    // Add event listeners to shopping cart icons
    const addCartButtons = document.querySelectorAll('.products .box-container .box .icons a.fas.fa-shopping-cart');
    addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productBox = button.closest('.box');
            const productId = productBox.dataset.id;
            const productName = productBox.dataset.name;
            const productPrice = productBox.dataset.price;
            addToCart(productId, productName, productPrice);
            updateCartQuantity();
        });
    });
     
    updateCart();
    updateCartQuantity();


document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('popup-login').style.display = 'flex';
});

document.getElementById('popup-login').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    
    window.location.href = 'register.html';
});

document.getElementById('google-login').addEventListener('click', function() {
    // Add your Google login API code here
    // For example:
    // window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=profile email';
});
