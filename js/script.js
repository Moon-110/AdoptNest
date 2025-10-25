
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

      console.log("Selected Category:", category.category);
    });

    container.appendChild(button);
  });
};

loadCategories();
