document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Viva Chips', price: '350 Ft' },
        { id: 2, name: 'Chio Snack Chips', price: '400 Ft' },
        { id: 3, name: 'Xixo Dobozos üdítőital', price: '200+50 Ft' },
        { id: 4, name: 'Hell energia ital', price: '300+50 Ft' },
        { id: 5, name: 'Tutti Juice üdítőital', price: '200 Ft' },
        { id: 6, name: 'Nyalóka', price: '100 Ft' },
        { id: 7, name: 'Soma kóla 3l', price: '450 Ft' },
        { id: 8, name: 'Attack Csokiszelet', price: '200 Ft' },
        { id: 9, name: 'Szobi Kóla por', price: '100 Ft'}
    ];

    const sections = document.querySelectorAll('.content-section');
    const homeLink = document.getElementById('home-link');
    const catalogLink = document.getElementById('catalog-link');
    const contactLink = document.getElementById('contact-link');
    const sorsolasLink = document.getElementById('sorsolas-link');

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('home');
    });
    catalogLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('catalog');
        loadProducts();
    });
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('contact');
    });
    sorsolasLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('sorsolas');
    });

    function showSection(sectionId) {
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    }

    function loadProducts() {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // Tisztítsuk meg a korábbi termékeket

        products.forEach(product => {
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

    // Alapértelmezés szerint a kezdőlap jelenik meg
    showSection('home');
    // Év automatikus frissítése a láblécben
    document.getElementById("year").textContent = new Date().getFullYear();

    // Üzenetküldés logika (Formspree API-hoz)
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // E-mail és üzenet adatok kinyerése
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Küldés a Formspree API-hoz
        fetch('https://formspree.io/f/meoojgvr', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                message: message
            })
        })
        .then(function(response) {
            if (response.ok) {
                document.getElementById('form-response').textContent = 'Az üzenet sikeresen elküldve!';
            } else {
                document.getElementById('form-response').textContent = 'Hiba történt az üzenet küldésekor. Kérjük, próbálja újra később.';
            }
            document.getElementById('form-response').style.display = 'block';
        })
        .catch(function(error) {
            document.getElementById('form-response').textContent = 'Hiba történt az üzenet küldésekor. Kérjük, próbálja újra később.';
            document.getElementById('form-response').style.display = 'block';
        });

        // Űrlap alaphelyzetbe állítása
        document.getElementById('contact-form').reset();
    });
    // Sorsolás névlista kezelése localStorage-ból
const addNameButton = document.getElementById('add-name-button');
const drawButton = document.getElementById('draw-button');
const nameInput = document.getElementById('single-name');
const resultDisplay = document.getElementById('draw-result');
const nameListDisplay = document.getElementById('name-list-display');

// Névsor betöltése (ha van mentve korábbról)
let names = JSON.parse(localStorage.getItem('names')) || [];
renderNameList();

// Hozzáadás gomb esemény
addNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name === '') return;

    names.push(name);
    localStorage.setItem('names', JSON.stringify(names));
    nameInput.value = '';
    renderNameList();
});

// Sorsolás gomb esemény
drawButton.addEventListener('click', () => {
    if (names.length === 0) {
        resultDisplay.textContent = 'Nincs elérhető név.';
        return;
    }

    const randomIndex = Math.floor(Math.random() * names.length);
    const winner = names[randomIndex];
    resultDisplay.textContent = `A kisorsolt név: ${winner} 🎉`;
});

// Lista megjelenítése
function renderNameList() {
    nameListDisplay.innerHTML = '';
    names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        nameListDisplay.appendChild(li);
    });
}

});