let currentRecipes = 0;
const recipesPerLoad = 6;

// Function to create a recipe card
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <div class="recipe-cuisine">
                <i class="fas fa-globe"></i> ${recipe.cuisine}
                <span style="margin-left: 10px;">
                    <i class="fas fa-star" style="color: #ffd700;"></i>
                    <i class="fas fa-star" style="color: #ffd700;"></i>
                    <i class="fas fa-star" style="color: #ffd700;"></i>
                    <i class="fas fa-star" style="color: #ffd700;"></i>
                    <i class="far fa-star" style="color: #ffd700;"></i>
                </span>
            </div>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="#" class="view-recipe-btn">View Recipe</a>
        </div>
    `;
    
    return card;
}

// Function to load more recipes
function loadMoreRecipes() {
    const recipesGrid = document.getElementById('recipesGrid');
    const endIndex = Math.min(currentRecipes + recipesPerLoad, recipesData.length);
    
    for (let i = currentRecipes; i < endIndex; i++) {
        const card = createRecipeCard(recipesData[i]);
        recipesGrid.appendChild(card);
    }
    
    currentRecipes = endIndex;
    
    // Hide load more button if all recipes are loaded
    if (currentRecipes >= recipesData.length) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    }
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const recipesGrid = document.getElementById('recipesGrid');
    recipesGrid.innerHTML = '';
    
    const filteredRecipes = recipesData.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.cuisine.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    filteredRecipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipesGrid.appendChild(card);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadMoreRecipes();
    
    document.getElementById('loadMoreBtn').addEventListener('click', loadMoreRecipes);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}); 