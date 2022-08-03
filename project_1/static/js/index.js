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
function clearCartF(cartContent) {
    console.log('clear')
    localStorage.removeItem("cart")
    cartContent.innerHTML = "Корзина очищенна"
}
//добавляем товар в корзину
function addToCart(title, price, /*basket*/) {
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
    //basket.style.display = "flex"
}
// добавлен ли товар в карзину
function showItemCart(elem) {
    let cartData = getCartData()
    elem.textContent = cartData?Object.keys(cartData).length:0
}
// количество елементов в карзине
function cartItemCount(elem) {
    let cartData = getCartData()

}
function renderCart(cartContent) {
    console.log('open')
    let cartData = getCartData(),
        totalItems = "";
    if (cartData !== null) {
        totalItems = "<table class='shoping-list'><tr><th>Наименнование</th><th>Цена</th></tr>";
        for (let items in cartData) {
            totalItems += "<tr>";
            for (let i = 0; i < cartData[items].length - 1; i++) {
                totalItems += "<td>" + cartData[items][i] + "</td>";
            }
            totalItems += `<td><button class='close-cart' data-order=${items}>Удалить</button></td></tr>`;
        }
        totalItems += "</table>";
        cartContent.innerHTML = totalItems;
    }
    addEventCloseCart(cartContent)
}
//Удаляем товар из карзины
function deleteItemCart(cartContent) {
    console.log('delete')
    let cartData = getCartData(),
        itemId = event.target.dataset.order
    delete cartData[itemId]
    setCartData(cartData);
    if (Object.keys(cartData).length === 0 ){
        clearCartF(cartContent)
    }
    renderCart(cartContent)
}
//Добавляем событее для удаления товара
function addEventCloseCart(cartContent) {
    console.log('close')
    const closeCart = document.querySelectorAll(".close-cart")
    closeCart.forEach(button => button.addEventListener("click", () => deleteItemCart(cartContent)))
}
if (productAdd) {
    productAdd.addEventListener("click", addToCart.bind(this, ".product__title", ".product__prise", /*basketShopWrap*/))
}

cartOpen.addEventListener("click", () => renderCart(cartContent))
closeBaketShopIcon.addEventListener("click", () => basketShopWrap.style.display = "none")
clearCart.addEventListener("click", clearCartF.bind(this, cartContent))