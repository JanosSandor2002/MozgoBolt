let cheatingNum = 0;
let names;

document.addEventListener('DOMContentLoaded', () => {
  // Év automatikus frissítése a láblécben
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- KATALÓGUS OLDAL ---
  const productContainer = document.getElementById('product-container');
  if (productContainer) {
    const products = [
      { id: 1, name: 'Viva Chips', price: '350 Ft' },
      { id: 2, name: 'Chio Snack Chips', price: '400 Ft' },
      { id: 3, name: 'Xixo Dobozos üdítőital', price: '200+50 Ft' },
      { id: 4, name: 'Hell energia ital', price: '300+50 Ft' },
      { id: 5, name: 'Tutti Juice üdítőital', price: '200 Ft' },
      { id: 6, name: 'Nyalóka', price: '100 Ft' },
      { id: 7, name: 'Soma kóla 3l', price: '450 Ft' },
      { id: 8, name: 'Attack Csokiszelet', price: '200 Ft' },
      { id: 9, name: 'Szobi Kóla por', price: '100 Ft' },
    ];

    productContainer.innerHTML = '';
    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const productName = document.createElement('h3');
      productName.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.textContent = product.price;

      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);
      productContainer.appendChild(productDiv);
    });
  }

  // --- KAPCSOLAT OLDAL ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const responseEl = document.getElementById('form-response');

      fetch('https://formspree.io/f/meoojgvr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      })
        .then((response) => {
          if (response.ok) {
            responseEl.textContent = 'Az üzenet sikeresen elküldve!';
          } else {
            responseEl.textContent =
              'Hiba történt az üzenet küldésekor. Kérjük, próbálja újra később.';
          }
          responseEl.style.display = 'block';
        })
        .catch(() => {
          responseEl.textContent =
            'Hiba történt az üzenet küldésekor. Kérjük, próbálja újra később.';
          responseEl.style.display = 'block';
        });

      contactForm.reset();
    });
  }

  // --- SORSOLÁS OLDAL ---
  fetch('./names.json')
    .then((response) => response.json())
    .then((data) => {
      names = data.nevek; // JSON tömb
      console.log(names);

      const drawButton = document.getElementById('draw-button');
      const resultDisplay = document.getElementById('draw-result');
      const nameListDisplay = document.getElementById('name-list-display');

      if (!drawButton || !resultDisplay || !nameListDisplay) return;

      // Lista render
      function renderNameList() {
        nameListDisplay.innerHTML = '';
        names.forEach((name) => {
          const li = document.createElement('li');
          li.textContent = name;
          nameListDisplay.appendChild(li);
        });
      }

      renderNameList(); // kezdeti lista

      // Cheating tömb
      const cheatingArray = [
        'Sándor imréné (Sándor viktória)',
        'Ónodi Brendon',
        'Adu Heléna',
        'Kótai Fernándó',
        'Horváth Szabolcs',
      ];

      drawButton.addEventListener('click', () => {
        if (names.length === 0) {
          resultDisplay.textContent = 'Nincs elérhető név.';
          return;
        }
        //non cheat

        let winner = names[Math.floor(Math.random() * names.length)];

        // Cheat
        /*
        let winner =
          cheatingArray[cheatingNum] ||
          names[Math.floor(Math.random() * names.length)];
        */
        resultDisplay.textContent = `A kisorsolt név: ${winner} 🎉`;

        if (cheatingNum < cheatingArray.length - 1) {
          cheatingNum++;
        }
      });
    })
    .catch((error) => console.error('Hiba a JSON betöltésekor:', error));
});
