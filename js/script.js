
const style = document.createElement("style");
style.innerHTML = `
  #category-buttons {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px 0;
  }
  .category-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 60px;
    border: 1px solid gray;
    background-color:;
    color: black;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    transition: 0.3s ease-in-out;
  }
  .category-btn img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
  .category-btn:hover {
    background-color: #0e7a811a;
    transform: translateY(-3px);
  }
  .category-btn.active {
    background-color: green;
    scale: 1.05;
  }
    /* Pet Cards Grid */
  #pets-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
    gap: 18px;
    padding: 20px;
  }

  .pet-card {
    background: white;
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 0 8px rgba(0,0,0,0.08);
    text-align: left;
  }
  .pet-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .pet-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
  }
`;
document.head.appendChild(style);

// Load categories from API
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const container = document.getElementById("category-buttons");
  container.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.classList.add("category-btn");

    button.innerHTML = `
      <img src="${category.category_icon}" alt="${category.category}">
      <span>${category.category}</span>
    `;

    button.addEventListener("click", () => {
      document.querySelectorAll(".category-btn")
        .forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      loadPetsByCategory(category.category);

    //   console.log("Selected Category:", category.category);
    });

    container.appendChild(button);
  });
};

// Load pets by category
const loadPetsByCategory = async (categoryName) => {
  const url = `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`;
  const res = await fetch(url);
  const data = await res.json();
  const pets = data.data // API returns data.data here

    const container = document.getElementById("pets-container");
  container.innerHTML = "";

  if (!pets || pets.length === 0) {
    // Show empty category message
    container.innerHTML = `
      <div style="
      grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        width: 100%;
      ">
        <div style="font-size: 50px; margin-bottom: 10px;">🔍</div>
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">
          No Pets Found
        </h2>
        <p style="font-size: 16px; color: #555;">
          The "${categoryName}" category is currently empty. Please try another category!
        </p>
      </div>
    `;
    return;
  }

  // If pets exist, display them
  displayPets(pets);
};

// Load All Pets Initially
const loadPets = async () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  const res = await fetch(url);
  const data = await res.json();
  displayPets(data.pets);
};


// Show Pets in UI
const displayPets = (pets) => {
  const container = document.getElementById("pets-container");
  container.innerHTML = "";

  pets.forEach(pet => {
    const card = document.createElement("div");
    card.classList.add("pet-card");

    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.pet_name}">
      <h3 class="pet-title">${pet.pet_name}</h3>

      <div class="pet-info">
        <p>Breed: ${pet.breed || "Not Available"}</p>
        <p>Birth: ${pet.date_of_birth || "Unknown"}</p>
        <p>Gender: ${pet.gender || "Unknown"}</p>
        <p>Price: ${pet.price ? pet.price + " ৳" : "Not Provided"}</p>
      </div>

      <div class="pet-buttons flex items-center justify-between mt-3">
        <button class="pet-btn like-btn text-[#0E7A81] border p-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
        <button class="pet-btn adopt-btn text-[#0E7A81] border p-2 rounded-md">Adopt</button>
        <button class="pet-btn details-btn text-[#0E7A81] border p-2 rounded-md">Details</button>
      </div>
    `;

    card.addEventListener("click", () => openModal(pet));

    container.appendChild(card);
  });
};

const openModal = (pet) => {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <img src="${pet.image}" alt="${pet.pet_name}" style="width:100%; border-radius:8px; margin-bottom:12px;">
    <h2 style="margin-bottom:10px;">${pet.pet_name}</h2>
    <p><strong>Breed:</strong> ${pet.breed || "Not Available"}</p>
    <p><strong>Birth:</strong> ${pet.date_of_birth || "Unknown"}</p>
    <p><strong>Gender:</strong> ${pet.gender || "Unknown"}</p>
    <p><strong>Price:</strong> ${pet.price ? pet.price + " ৳" : "Not Provided"}</p>
    <p style="margin-top:10px;"><strong>Description:</strong> ${pet.pet_details || "No description available."}</p>
  `;

  modal.style.display = "flex";
};
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});








loadCategories();
loadPets();
