let cart = {}
let total = 0


function addItem(btn, price, name)
{

    let cartControl = btn.closest(".cart-control")

    btn.style.display = "none"

    let qtyBox = cartControl.querySelector(".qty-control")

    qtyBox.style.display = "inline-flex"

    let qtySpan = qtyBox.querySelector(".qty")
    qtySpan.innerText = 1

    cart[name] = 1

    total += price

    updateCart()

}


function increase(btn, price, name)
{

    let cartControl = btn.closest(".cart-control")

    let qtySpan = cartControl.querySelector(".qty")

    let qty = parseInt(qtySpan.innerText)

    qty++

    qtySpan.innerText = qty

    cart[name] = qty

    total += price

    updateCart()

}


function decrease(btn, price, name)
{

    let cartControl = btn.closest(".cart-control")

    let qtySpan = cartControl.querySelector(".qty")

    let qty = parseInt(qtySpan.innerText)

    qty--

    if (qty <= 0)
    {

        let qtyBox = cartControl.querySelector(".qty-control")
        let addBtn = cartControl.querySelector(".add-btn")

        qtyBox.style.display = "none"
        addBtn.style.display = "inline-block"

        delete cart[name]

    }
    else
    {

        qtySpan.innerText = qty

        cart[name] = qty

    }

    total -= price

    updateCart()

}


function updateCart()
{

    let cartList = document.getElementById("cart-items")

    cartList.innerHTML = ""

    for (let item in cart)
    {

        let li = document.createElement("li")

        li.innerText = item + " x " + cart[item]

        cartList.appendChild(li)

    }

    document.getElementById("total-price").innerText = total

}


function placeOrder()
{

let name = document.getElementById("firstName").value
let phone = document.getElementById("phone").value
let table = document.getElementById("tableNo").value
let dine = document.querySelector('input[name="wheretoeat"]:checked')

if(name=="" || phone=="" || table=="" || !dine)
{
alert("Please fill all customer information before ordering")
return
}

if(Object.keys(cart).length===0)
{
alert("Cart Empty")
return
}

// Create order object


orderData = {
    name: name,
    phone: phone,
    table: table,
    type: dine.value,
    items: {...cart},
    total: total
}

// Store order data in sessionStorage
sessionStorage.setItem('currentOrder', JSON.stringify(orderData))

// Open kitchen page
window.open('kitchen.html', 'KitchenOrder', 'width=900,height=700')

}


function resetCart()
{

    cart = {}
    total = 0

    document.getElementById("cart-items").innerHTML = ""
    document.getElementById("total-price").innerText = "0"

    let addBtns = document.querySelectorAll(".add-btn")
    let qtyBoxes = document.querySelectorAll(".qty-control")
    let qty = document.querySelectorAll(".qty")

    addBtns.forEach(btn => btn.style.display = "inline-block")
    qtyBoxes.forEach(box => box.style.display = "none")
    qty.forEach(q => q.innerText = "1")

}