document.getElementById('add-ingredient').addEventListener('click', function () {
  const ingredientsOl = document.getElementById('ingredients');
  const newIndex = ingredientsOl.children.length;
  const newIngredient = document.createElement('li');
  newIngredient.className = 'ingredient form-row mb-3';
  newIngredient.innerHTML = `
    <div class="col">
      <input type="text" class="form-control" name="recipe[ingredients][${newIndex}][ingredient]" placeholder="Ingredient" required>
    </div>
    <div class="col">
      <input type="number" class="form-control" name="recipe[ingredients][${newIndex}][quantity]" placeholder="Quantity" min="0.1" required>
    </div>
    <button type="button" class="btn btn-danger remove-ingredient">Remove</button>
  `;
  ingredientsOl.appendChild(newIngredient);
  attachRemoveIngredientEvent();
  updateIngredientsIndexes();
});

document.getElementById('add-direction').addEventListener('click', function () {
  const directionsOl = document.getElementById('directions');
  const newIndex = directionsOl.children.length;
  const newDirection = document.createElement('li');
  newDirection.className = 'direction form-row mb-3';
  newDirection.innerHTML = `
    <div class="col">
      <textarea class="form-control" name="recipe[directions][${newIndex}]" required></textarea>
    </div>
    <button type="button" class="btn btn-danger remove-direction">Remove</button>
  `;
  directionsOl.appendChild(newDirection);
  attachRemoveDirectionEvent();
  updateDirectionsIndexes();
});

function attachRemoveIngredientEvent() {
  document.querySelectorAll('.remove-ingredient').forEach(button => {
    button.addEventListener('click', function () {
      this.parentElement.remove();
      updateIngredientsIndexes();
    });
  });
}

function attachRemoveDirectionEvent() {
  document.querySelectorAll('.remove-direction').forEach(button => {
    button.addEventListener('click', function () {
      this.parentElement.remove();
      updateDirectionsIndexes();
    });
  });
}

function updateIngredientsIndexes() {
  document.querySelectorAll('#ingredients .ingredient').forEach((ingredient, index) => {
    ingredient.querySelector('[name*="[ingredient]"]').name = `recipe[ingredients][${index}][ingredient]`;
    ingredient.querySelector('[name*="[quantity]"]').name = `recipe[ingredients][${index}][quantity]`;
  });
}

function updateDirectionsIndexes() {
  document.querySelectorAll('#directions .direction').forEach((direction, index) => {
    direction.querySelector('textarea').name = `recipe[directions][${index}]`;
  });
}

attachRemoveIngredientEvent();
attachRemoveDirectionEvent();
