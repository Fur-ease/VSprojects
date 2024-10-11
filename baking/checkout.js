
//const nameError = document.getElementById('.Name_error');

let listCart = [];

function checkCart() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        listCart = JSON.parse(cartItems);
    }
}

function addCartToHTML() {
   
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;

    // If there are products in the cart
    if (listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">Ksh ${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">Ksh ${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += (product.price * product.quantity);
            }
        });
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'Ksh ' + totalPrice;
}

checkCart();
addCartToHTML();



function goToHome() {
    window.location.href = 'baking.html';
}


const backButton = document.getElementById('back');


backButton.addEventListener('click', function(event) {
  
  event.preventDefault();

  window.location.href = 'baking.html';
});

$(document).ready(function() {
    
    checkCart();
    addCartToHTML();
    
    $("#checkoutbtn").click(function(e) {
        //let nameError  = querySelector('.Name_error');

       /* if (nameError === '' || nameError == null) {
            e.preventDefault()
            nameError.innerHTML = "name is required";
        }*/

        var inputs = $('input');
        
        var isEmpty = false;
        inputs.each(function() {
            if ($(this).val() === '') {
                isEmpty = true;
                return false;
           }
        });
        
        if (isEmpty) {
            alert("Please fill in all required fields before checking out.");
            return;
        } 

        var formData = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            address: $("#address").val(),
            country: $("#country option:selected").text(),
            city: $("#city option:selected").text(),
        }

        $.ajax({
            type: "POST",
            url: "backend/server.php",
            data: JSON.stringify({cart : listCart, formData: formData}), 
            contentType: "application/json", 
            success: function(response) {
                console.log("Success:", response);
                alert("Checkout successful");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
                alert("An error occurred during checkout.");
            }
        });
    });
});
