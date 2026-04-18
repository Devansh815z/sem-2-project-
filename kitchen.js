let currentOrder = null;

function loadOrderData() {
    const raw = sessionStorage.getItem('currentOrder');

    if (!raw) {
        document.querySelector('.kitchen-container').innerHTML =
            '<div style="padding:60px;text-align:center;">No order found</div>';
        return;
    }

    const order = JSON.parse(raw);
    currentOrder = order;

    document.getElementById('customerName').textContent  = order.name;
    document.getElementById('customerPhone').textContent = order.phone;
    document.getElementById('tableNumber').textContent   = 'Table ' + order.table;
    document.getElementById('orderType').textContent     = order.type;
    document.getElementById('totalAmount').textContent   = order.total;

    const list = document.getElementById('orderItemsList');
    list.innerHTML = '';

    for (let item in order.items) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item}</span> × ${order.items[item]}`;
        list.appendChild(li);
    }
}
function placeOrderFinal() {

    if (!currentOrder) return;

    // convert items to text
    let itemsText = "";
    for (let item in currentOrder.items) {
        itemsText += `${item} x ${currentOrder.items[item]}\n`;
    }

    let templateParams = {
        name: currentOrder.name,
        phone: currentOrder.phone,
        table: currentOrder.table,
        type: currentOrder.type,
        items: itemsText,
        total: currentOrder.total
    };
    emailjs.send("service_h2mya9s", "template_7v4fc8r", templateParams)
    .then(function() {

        alert("✅ Order placed successfully!");

        // ✅ RESET MAIN PAGE CART
        sessionStorage.removeItem('currentOrder');

        // call resetCart of main page
        if (window.opener && !window.opener.closed) {
            window.opener.resetCart();
        }

        window.close();

    }, function(error) {
        alert("❌ Failed to send order");
        console.log(error);
    });
}
function updateCart() {
    window.close(); 
}
window.onload = function () {
    loadOrderData();

    document.getElementById('placeOrderBtn').addEventListener('click', placeOrderFinal);
    document.getElementById('updateBtn').addEventListener('click', updateCart);
};