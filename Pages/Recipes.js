import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const recipes = [
  {
    title: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    prepTime: "30 mins",
    cookTime: "45 mins",
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      "2 lbs chicken pieces",
      "2 cups basmati rice",
      "1 cup yogurt",
      "2 onions, sliced",
      "4 cloves garlic, minced",
      "2 inch ginger, grated",
      "Biryani masala",
      "Saffron strands",
      "Fresh mint and cilantro"
    ],
    instructions: [
      "Marinate chicken with yogurt and spices for 2 hours",
      "Parboil basmati rice with whole spices",
      "Fry onions until golden brown",
      "Layer rice and chicken in a heavy pot",
      "Add saffron milk and fried onions on top",
      "Cook on low heat for 20 minutes"
    ]
  },
  {
    title: "Dal Tadka",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "1 cup yellow lentils (toor dal)",
      "2 tomatoes, chopped",
      "1 onion, chopped",
      "2 green chilies",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "Fresh cilantro",
      "Ghee for tempering"
    ],
    instructions: [
      "Pressure cook lentils with turmeric until soft",
      "Mash lentils and add salt",
      "In ghee, temper cumin seeds",
      "Add onions and cook until translucent",
      "Add tomatoes and green chilies",
      "Pour tempering over dal and garnish with cilantro"
    ]
  },
  {
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    prepTime: "20 mins",
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "500g paneer, cubed",
      "2 bunches spinach",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "Ginger-garlic paste",
      "Garam masala",
      "Cream",
      "Kasuri methi"
    ],
    instructions: [
      "Blanch spinach and puree",
      "Fry paneer cubes until golden",
      "Sauté onions, ginger-garlic paste",
      "Add tomatoes and spices",
      "Add spinach puree and simmer",
      "Add paneer and cream, garnish with kasuri methi"
    ]
  },
  {
    title: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
    prepTime: "2 hours (marinating)",
    cookTime: "40 mins",
    servings: 6,
    difficulty: "Medium",
    ingredients: [
      "1.5 lbs chicken",
      "1 cup yogurt",
      "Tandoori masala",
      "1 cup tomato puree",
      "1/2 cup cream",
      "Butter",
      "Kasuri methi",
      "Garam masala"
    ],
    instructions: [
      "Marinate chicken with yogurt and tandoori masala",
      "Grill or bake chicken until cooked",
      "Make gravy with tomato puree and spices",
      "Add butter and cream",
      "Add grilled chicken to gravy",
      "Garnish with cream and kasuri methi"
    ]
  },
  {
    title: "Samosa",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    prepTime: "45 mins",
    cookTime: "30 mins",
    servings: 12,
    difficulty: "Hard",
    ingredients: [
      "2 cups all-purpose flour",
      "4 potatoes, boiled",
      "1 cup peas",
      "Cumin seeds",
      "Coriander powder",
      "Garam masala",
      "Green chilies",
      "Oil for deep frying"
    ],
    instructions: [
      "Make dough with flour and oil, rest for 30 mins",
      "Prepare filling with mashed potatoes, peas, and spices",
      "Roll dough into circles, cut in half",
      "Form cone shape and fill with potato mixture",
      "Seal edges with water",
      "Deep fry until golden brown"
    ]
  },
  {
    title: "Gulab Jamun",
    image: "https://images.unsplash.com/photo-1589217157232-464b505b197f?w=600&q=80",
    prepTime: "30 mins",
    cookTime: "40 mins",
    servings: 20,
    difficulty: "Medium",
    ingredients: [
      "1 cup milk powder",
      "1/4 cup flour",
      "Baking soda pinch",
      "Milk as needed",
      "2 cups sugar",
      "Cardamom pods",
      "Rose water",
      "Ghee for frying"
    ],
    instructions: [
      "Make sugar syrup with cardamom and rose water",
      "Mix milk powder, flour, and baking soda",
      "Add milk to make soft dough",
      "Shape into small balls",
      "Deep fry on low heat until golden",
      "Soak in warm sugar syrup for 2 hours"
    ]
  }
];

export default function Recipes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--light-cream)] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--primary-gold)] to-[var(--primary-orange)] bg-clip-text text-transparent">
              Authentic Indian Recipes
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Traditional recipes using ingredients from our store
          </p>
        </motion.div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-[var(--primary-gold)] h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-[var(--primary-gold)] text-white">
                    {recipe.difficulty}
                  </Badge>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[var(--primary-orange)]" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4 text-[var(--primary-orange)]" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[var(--primary-orange)]" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>

                  <div className="mb-4 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {recipe.ingredients.slice(0, 5).map((ingredient, idx) => (
                        <li key={idx}>• {ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 5 && (
                        <li className="text-[var(--primary-gold)] font-medium">
                          +{recipe.ingredients.length - 5} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
                    <ol className="text-sm text-gray-600 space-y-1">
                      {recipe.instructions.slice(0, 3).map((step, idx) => (
                        <li key={idx}>{idx + 1}. {step}</li>
                      ))}
                      {recipe.instructions.length > 3 && (
                        <li className="text-[var(--primary-gold)] font-medium">
                          +{recipe.instructions.length - 3} more steps
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}