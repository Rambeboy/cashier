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
  const name = this.value.trim().toUpperCase();
  if (priceMap[name]) {
    document.getElementById("itemPrice").value = priceMap[name];
  }
});

let cart = [];

function addItem() {
  const name = document.getElementById('itemName').value.trim().toUpperCase();
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

    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rp ${item.price}</td>
      <td>${item.qty}</td>
      <td>Rp ${item.price * item.qty}</td>
      <td><button onclick="removeItem(${index})">Hapus</button></td>
    `;

    total += item.price * item.qty;
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
  const timestamp = now.toLocaleString('id-ID');

  let struk = `            STRUK BELANJA\n`;
  struk += `Tanggal: ${timestamp.padStart(32)}\n`;
  struk += `----------------------------------------\n`;

  let grandTotal = 0;
  cart.forEach((item, i) => {
    const total = item.price * item.qty;
    grandTotal += total;
    struk += `${i + 1}. ${item.name}\n   ${item.qty} x Rp${item.price} = Rp${total}\n`;
  });

  struk += `----------------------------------------\n`;
  struk += `TOTAL: Rp.${grandTotal}\n`;
  struk += `----------------------------------------\n`;
  struk += `Terima kasih telah berbelanja!\n`;

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