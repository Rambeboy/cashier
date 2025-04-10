const priceMap = {
  "MIE NYEMEK": 10000,
  "MIE REBUS": 10000,
  "MIE TEKTEK": 10000,
  "BIHUN GORENG": 10000,
  "KENTANG GORENG": 10000,
  "PISANG COKELAT": 10000,
  "SOSIS BAKAR": 5000,
  "ANEKA GORENGAN": 1000,
  "ES COFFEE SUSU": 6000,
  "ES JOSU": 7000,
  "ES COFFEE CARAMEL": 15000,
  "POP ICE": 5000,
  "ANEKA COFFEE PANAS": 5000,
  "AQUA": 5000,
  "ES COFFEE MALAKA": 7000,
  "ES NUTRISARI": 4000,
  "WEDANG UWUH": 10000,
  "SUSU KAMBING": 10000
};

document.getElementById("itemName").addEventListener("input", function () {
  const name = this.value.trim();
  if (priceMap[name]) {
    document.getElementById("itemPrice").value = priceMap[name];
  }
});

let cart = [];

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const price = parseInt(document.getElementById('itemPrice').value);
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || price <= 0 || qty <= 0) {
    alert('Isi data barang dengan benar.');
    return;
  }

  cart.push({ name, price, qty });
  renderCart();

  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemQty').value = '1';
}

function renderCart() {
  const cartSection = document.getElementById('cartSection');
  cartSection.classList.remove('hidden');

  const tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = item.name.toUpperCase();

    const tdPrice = document.createElement('td');
    tdPrice.textContent = `Rp ${item.price}`;

    const tdQty = document.createElement('td');
    tdQty.textContent = item.qty;

    const rowTotal = item.price * item.qty;
    total += rowTotal;
    const tdTotal = document.createElement('td');
    tdTotal.textContent = `Rp ${rowTotal}`;

    const tdAction = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.onclick = () => removeItem(index);
    tdAction.appendChild(delBtn);

    row.appendChild(tdName);
    row.appendChild(tdPrice);
    row.appendChild(tdQty);
    row.appendChild(tdTotal);
    row.appendChild(tdAction);

    tbody.appendChild(row);
  });

  document.getElementById('total').innerText = `Total Belanja: Rp ${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();

  if (cart.length === 0) {
    document.getElementById('cartSection').classList.add('hidden');
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Keranjang kosong!');
    return;
  }

  const now = new Date();
  const timestamp = now.toLocaleString();
  let struk = `=== STRUK BELANJA ===\nTanggal: ${timestamp}\n\n`;
  let grandTotal = 0;

  cart.forEach((item, i) => {
    const total = item.price * item.qty;
    grandTotal += total;
    struk += `${i + 1}. ${item.name.toUpperCase()} x${item.qty} = Rp ${total}\n`;
  });

  struk += `\nTotal Bayar: Rp ${grandTotal}\n\nTerima kasih telah berbelanja!\n`;

  const blob = new Blob([struk], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `struk-${now.getTime()}.txt`;
  link.href = url;
  link.click();

  alert('Checkout berhasil. Struk berhasil disimpan!');
  cart = [];
  document.getElementById('cartSection').classList.add('hidden');
  renderCart();
}