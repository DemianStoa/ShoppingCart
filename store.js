if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    const removeCartItemButtons = document.querySelectorAll(".btn-danger")
    const quantityElements = document.querySelectorAll('.cart-quantity-input')
    const shopItemButtons = document.querySelectorAll('.shop-item-button')  

  removeCartItemButtons.forEach( button  => {
    button.addEventListener('click', removeCartItem)
  })

  quantityElements.forEach( quantityElement  => {
    quantityElement.addEventListener('change', quantitychanged)
  })

   shopItemButtons.forEach( button  => {
    button.addEventListener('click', addCartItem)
  })
}

function removeCartItem(e) {
    let buttonClicked = e.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal() 
}

function addCartItem(e) {
    let addButtonClicked = e.target
    const cartItemContainer = document.querySelector(".cart-items")
    let curItem = addButtonClicked.parentElement.parentElement
    let curItemTitle = curItem.querySelector('.shop-item-title').textContent
    let cartItemRowTemplate = document.getElementById("cart-row-template")
    let cartItemTitles = [...cartItemContainer.querySelectorAll('.cart-item-title')]
    let onCartIndex = -1
    let onCart = cartItemTitles.some((cartItemTitle,index) => {
        if (cartItemTitle.textContent === curItemTitle) {
            onCartIndex = index
            return true
        }
        return false
    })
    if(onCart) {
        let curQuantityElement = cartItemTitles[onCartIndex].parentElement.parentElement.querySelector('.cart-quantity-input')
        curQuantityElement.value++
    } else {
        const newCartItemRow = cartItemRowTemplate.content.cloneNode(true)
        let curItemPrice = curItem.querySelector('.shop-item-price').textContent
        newCartItemRow.querySelector('.cart-item-image').src = curItem.querySelector('.shop-item-image').src.replace("http://127.0.0.1:5500","")

        newCartItemRow.querySelector("[data-cart-price]").textContent = curItemPrice
        newCartItemRow.querySelector('.cart-item-title').textContent = curItemTitle
        newCartItemRow.querySelector('.btn-danger').addEventListener('click', removeCartItem)
        newCartItemRow.querySelector('.cart-quantity-input').addEventListener('change', quantitychanged)

        cartItemContainer.append(newCartItemRow)
    }
   
  
    updateCartTotal() 
}

function quantitychanged(e) {
    let input = e.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


function updateCartTotal() {
    let totalPrice = 0
    const cartItemContainer = document.querySelector(".cart-items")
    cartItemContainer.querySelectorAll(".cart-row").forEach(cartRow => {
        let priceElement = cartRow.querySelector(".cart-price")
        let quantityElement = cartRow.querySelector('.cart-quantity-input')
        let price = parseFloat(priceElement.textContent.replace('$',''))
        let quantity = quantityElement.value
        totalPrice += quantity * price 
    })
    document.querySelector('.cart-total-price').textContent = "$" + totalPrice.toFixed(2) 
}
