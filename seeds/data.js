const recipes = [
    {
      title: 'Spaghetti Bolognese',
      ingredients: [
        { ingredient: 'Spaghetti', quantity: 200 },
        { ingredient: 'Ground Beef', quantity: 300 },
        { ingredient: 'Tomato Sauce', quantity: 150 }
      ],
      directions: ['Boil spaghetti', 'Cook beef', 'Add sauce to beef', 'Mix spaghetti with sauce'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 15,
      cook_time: 30,
      servings: 4,
      nutrition: { calories: 500, fat: 20, protein: 25, carbs: 60 },
      tags: ['Italian', 'Pasta'],
      difficulty: 'Medium'
    },
    {
      title: 'Chicken Curry',
      ingredients: [
        { ingredient: 'Chicken Breast', quantity: 250 },
        { ingredient: 'Curry Powder', quantity: 15 },
        { ingredient: 'Coconut Milk', quantity: 200 }
      ],
      directions: ['Cut chicken into pieces', 'Cook chicken with curry powder', 'Add coconut milk', 'Simmer until cooked'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 20,
      cook_time: 40,
      servings: 4,
      nutrition: { calories: 600, fat: 30, protein: 40, carbs: 50 },
      tags: ['Indian', 'Curry'],
      difficulty: 'Medium'
    },
    {
      title: 'Beef Stew',
      ingredients: [
        { ingredient: 'Beef', quantity: 500 },
        { ingredient: 'Potatoes', quantity: 300 },
        { ingredient: 'Carrots', quantity: 200 },
        { ingredient: 'Onions', quantity: 100 }
      ],
      directions: ['Brown beef', 'Add vegetables', 'Simmer until tender'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 30,
      cook_time: 120,
      servings: 6,
      nutrition: { calories: 700, fat: 25, protein: 50, carbs: 70 },
      tags: ['American', 'Stew'],
      difficulty: 'Hard'
    },
    {
      title: 'Vegetable Stir Fry',
      ingredients: [
        { ingredient: 'Broccoli', quantity: 200 },
        { ingredient: 'Bell Pepper', quantity: 150 },
        { ingredient: 'Carrots', quantity: 100 },
        { ingredient: 'Soy Sauce', quantity: 50 }
      ],
      directions: ['Chop vegetables', 'Stir fry with soy sauce'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 10,
      cook_time: 15,
      servings: 4,
      nutrition: { calories: 200, fat: 5, protein: 10, carbs: 30 },
      tags: ['Chinese', 'Vegetarian'],
      difficulty: 'Easy'
    },
    {
      title: 'Chicken Alfredo',
      ingredients: [
        { ingredient: 'Pasta', quantity: 200 },
        { ingredient: 'Chicken Breast', quantity: 250 },
        { ingredient: 'Alfredo Sauce', quantity: 150 }
      ],
      directions: ['Cook pasta', 'Cook chicken', 'Mix with Alfredo sauce'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 15,
      cook_time: 20,
      servings: 4,
      nutrition: { calories: 600, fat: 25, protein: 35, carbs: 65 },
      tags: ['Italian', 'Pasta'],
      difficulty: 'Medium'
    },
    {
      title: 'Tacos',
      ingredients: [
        { ingredient: 'Taco Shells', quantity: 10 },
        { ingredient: 'Ground Beef', quantity: 300 },
        { ingredient: 'Lettuce', quantity: 100 },
        { ingredient: 'Cheese', quantity: 50 }
      ],
      directions: ['Cook beef', 'Assemble tacos with ingredients'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 10,
      cook_time: 15,
      servings: 4,
      nutrition: { calories: 450, fat: 20, protein: 20, carbs: 40 },
      tags: ['Mexican', 'Fast Food'],
      difficulty: 'Easy'
    },
    {
      title: 'Margarita Pizza',
      ingredients: [
        { ingredient: 'Pizza Dough', quantity: 1 },
        { ingredient: 'Tomato Sauce', quantity: 100 },
        { ingredient: 'Mozzarella Cheese', quantity: 150 },
        { ingredient: 'Basil', quantity: 10 }
      ],
      directions: ['Prepare dough', 'Add sauce and toppings', 'Bake in oven'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 20,
      cook_time: 25,
      servings: 2,
      nutrition: { calories: 800, fat: 35, protein: 30, carbs: 90 },
      tags: ['Italian', 'Pizza'],
      difficulty: 'Medium'
    },
    {
      title: 'Grilled Cheese Sandwich',
      ingredients: [
        { ingredient: 'Bread', quantity: 2 },
        { ingredient: 'Cheese', quantity: 50 },
        { ingredient: 'Butter', quantity: 10 }
      ],
      directions: ['Butter bread', 'Add cheese', 'Grill until golden'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 5,
      cook_time: 10,
      servings: 1,
      nutrition: { calories: 300, fat: 15, protein: 10, carbs: 35 },
      tags: ['American', 'Snack'],
      difficulty: 'Easy'
    },
    {
      title: 'Caesar Salad',
      ingredients: [
        { ingredient: 'Romaine Lettuce', quantity: 200 },
        { ingredient: 'Caesar Dressing', quantity: 50 },
        { ingredient: 'Croutons', quantity: 30 },
        { ingredient: 'Parmesan Cheese', quantity: 20 }
      ],
      directions: ['Chop lettuce', 'Add dressing and toppings'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 10,
      cook_time: 0,
      servings: 2,
      nutrition: { calories: 200, fat: 10, protein: 5, carbs: 15 },
      tags: ['Italian', 'Salad'],
      difficulty: 'Easy'
    },
    {
      title: 'Pancakes',
      ingredients: [
        { ingredient: 'Flour', quantity: 200 },
        { ingredient: 'Milk', quantity: 300 },
        { ingredient: 'Eggs', quantity: 2 },
        { ingredient: 'Maple Syrup', quantity: 50 }
      ],
      directions: ['Mix ingredients', 'Cook on griddle', 'Serve with syrup'],
      created_at: new Date(),
      image: 'https://www.eatright.org/-/media/images/eatright-landing-pages/foodgroupslp_804x482.jpg?as=0&w=967&rev=d0d1ce321d944bbe82024fff81c938e7&hash=E6474C8EFC5BE5F0DA9C32D4A797D10D',
      prep_time: 10,
      cook_time: 15,
      servings: 4,
      nutrition: { calories: 350, fat: 10, protein: 8, carbs: 60 },
      tags: ['American', 'Breakfast'],
      difficulty: 'Easy'
    }
  ];  

module.exports = recipes;