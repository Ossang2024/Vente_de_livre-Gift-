
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  // --- Typewriter ---
  const phrases = ["Découvrez", "apprenez", "innovez", "créez","collaborez", "transformez", "influencez"];
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  const speed = 100;
  const delay = 1900;
  const eraseSpeed = 70;
  const typewriter = document.getElementById("typewriter");

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typewriter.textContent = current.substring(0, --letterIndex);
    } else {
      typewriter.textContent = current.substring(0, ++letterIndex);
    }
    if (!isDeleting && letterIndex === current.length) {
      isDeleting = true;
      setTimeout(type, delay);
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? eraseSpeed : speed);
    }
  }
  type();

  // --- Slider témoignages ---
  const slider = document.getElementById("slider");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  window.nextSlide = function() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }
  window.prevSlide = function() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  // --- Filtre de recherche (désactivé car pas de champ dans le HTML) ---
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    const listItems = document.querySelectorAll(".boutique-cart .cart");
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "block" : "none";
      });
    });
  }

  // --- Panier ---
  function addToCart(name, price) {
    cart.push({ name, price });
    displayCart();
  }

  function displayCart() {
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total");
    cartElement.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      cartElement.innerHTML += `
        <li>
          ${item.name} - ${item.price} FCFA
          <button onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
        </li>
      `;
    });
    totalElement.textContent = `Total : ${total} FCFA`;

    // Met à jour les badges du panier
    document.querySelectorAll('.num-panier p, .num-panier2 p').forEach(el => {
      el.textContent = cart.length;
    });

    // Met à jour le total dans le header
    const totalPanier = document.querySelector('.total-panier');
    if (totalPanier) {
      totalPanier.textContent = `${total} FCFA`;
    }

  }


  function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
  }

  // Affichage / Masquage du panier
  const cartContainer = document.getElementById("cartContainer");
  const toggleBtns = document.querySelectorAll(".toggleCartBtn");
  toggleBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cartContainer.classList.toggle("visible");
  });  
});
// Au chargement, s'assurer que le panier est masqué
cartContainer.classList.remove("visible");

  // Expose les fonctions globalement pour le HTML inline
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;


  // Affiche le panier au chargement pour synchroniser les compteurs
  displayCart();
});








// code pour la gestion du menu déroulant
// function toggleMenu() {
//     document.getElementById("navMenu").classList.toggle("open");
//   }

//   function toggleSubMenu(event) {
//     event.preventDefault(); // empêche le lien de recharger la page
//     const parent = event.target.parentElement;
//     parent.classList.toggle("open");
//   }

function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("open");
  }

  function toggleSubMenu(event) {
    event.preventDefault();
    const parent = event.target.closest(".accordion");
    parent.classList.toggle("open");

    // Pour animer dynamiquement le max-height (facultatif si tu veux un effet plus propre)
    const submenu = parent.querySelector(".submenu");
    if (parent.classList.contains("open")) {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    } else {
      submenu.style.maxHeight = null;
    }
  }

  window.toggleMenu = toggleMenu;
window.toggleSubMenu = toggleSubMenu;










// --- MODAL ---
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const modalCloseBtn = document.getElementById("modal-close");
const modalOpenBtns = document.querySelectorAll(".modal-toggleCartBtn");

// Fonction pour ouvrir le modal
function openModal() {
  modalContainer.classList.add("modalvisible");
  modalOverlay.classList.add("modalvisible");
}

// Fonction pour fermer le modal
function closeModal() {
  modalContainer.classList.remove("modalvisible");
  modalOverlay.classList.remove("modalvisible");
}

// Ouvre le modal sur clic des boutons/images
modalOpenBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});

// Ferme le modal sur clic de l'overlay ou du bouton de fermeture
modalOverlay.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);

// Au chargement, s'assurer que le modal est masqué
closeModal();
