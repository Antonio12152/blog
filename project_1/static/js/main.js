"use strict"
const basketShopWrap = document.getElementById("basket-wrap")
const baketShop = document.getElementById("basket-shop")
const productAdd = document.getElementById("product-add")
const cartOpen = document.getElementById("cart-open")
const cartContent = document.getElementById("cart-content")
const clearCart = document.getElementById("clear-cart")
const cartCount = document.getElementById('cart-count')
const closeBaketShopIcon = document.getElementById("close-baketShop-button")
//записываем данные в localStorage
function setCartData(o) {
    localStorage.setItem("cart", JSON.stringify(o))
    return false;
}
//получаем данные из localStorage
function getCartData() {
    return JSON.parse(localStorage.getItem("cart"))
}
//Очистить карзину
function clearCartF(cartCount,productAdd) {
    console.log('clear')
    localStorage.removeItem("cart")
    renderCart(cartContent)
    showItemCart(cartCount)
    cartItemCount(productAdd)
}
//добавляем товар в корзину
function addToCart(title, price, cartCount) {
    console.log('add')
    event.target.disabled = true;
    let cartData = getCartData() || {},
        parentBox = event.target.parentNode,
        itemId = event.target.dataset.id,
        itemTitle = parentBox.querySelector(title).innerHTML,
        itemPrice = parentBox.querySelector(price).innerHTML;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice, itemId]
    }
    if (!setCartData(cartData)) {
        event.target.disabled = false;
    }
    showItemCart(cartCount)
    cartItemCount(productAdd)
}
// количество елементов в карзине
function showItemCart(elem) {
    let cartData = getCartData()
    elem.textContent = cartData ? Object.keys(cartData).length : 0
}
// добавлен ли товар в карзину
function cartItemCount(elem) {
    let cartData = getCartData()
//    const data_id = elem.getAttribute('data-id')
//    if(Object.keys(cartData).length === 0 ){
//    elem.textContent = 'Добавить в корзину'
//    }else{
//        for (let i in Object.keys(cartData)){
//            if(Object.keys(cartData)[i] === data_id){
//                elem.textContent = 'Товар в карзине'
//                break
//            }else{
//                elem.textContent = 'Добавить в корзину'
//            }
//        }
//    }
    if(elem != null){
        if(cartData && cartData.hasOwnProperty(elem.dataset.id)){
            elem.textContent = 'Товар в карзине'
            elem.className = 'btn btn-shop add-item btn-info'
        }else{
            elem.textContent = 'Добавить в корзину'
            elem.className = 'btn btn-shop add-item'
        }
    }
}
function renderCart(cartContent) {
    console.log('open')
    let cartData = getCartData(),
        totalItems = "",
        totalAmount = 0;
    if (!cartData) {
        totalItems = "<p>Корзина очищена</p>"
    } else {
        totalItems = "<table class='shoping-list'><tr><th>Наименнование</th><th>Цена</th></tr>";
        for (let items in cartData) {
            totalItems += "<tr>";
            for (let i = 0; i < cartData[items].length - 1; i++) {
                totalItems += "<td>" + cartData[items][i] + "</td>";
            }
            totalItems += `<td><button class='close-cart' data-order=${items}>Удалить</button></td></tr>`;
            totalAmount += +cartData[items][1]
        }
        totalItems += "</table>";
        totalItems += `<p>Общая стоимасть товаров: ${totalAmount}</p>`
    }
    cartContent.innerHTML = totalItems;
    addEventCloseCart(cartContent)
}
//Удаляем товар из карзины
function deleteItemCart(cartContent, cartCount) {
    console.log('delete')
    let cartData = getCartData(),
        itemId = event.target.dataset.order
    delete cartData[itemId]
    setCartData(cartData);
    if (Object.keys(cartData).length === 0) {
        clearCartF(cartCount)
    }
    renderCart(cartContent)
    showItemCart(cartCount)
    cartItemCount(productAdd)
}
//Добавляем событее для удаления товара
function addEventCloseCart(cartContent) {
    console.log('close')
    const closeCart = document.querySelectorAll(".close-cart")
    closeCart.forEach(button => button.addEventListener("click", () => deleteItemCart(cartContent, cartCount)))
}
if (productAdd) {
    productAdd.addEventListener("click", addToCart.bind(this, ".product__title", ".product__prise", cartCount))
}
showItemCart(cartCount)
cartItemCount(productAdd)
cartOpen.addEventListener("click", () => renderCart(cartContent))
closeBaketShopIcon.addEventListener("click", () => basketShopWrap.style.display = "none")
clearCart.addEventListener("click",() => clearCartF(cartCount,productAdd))
