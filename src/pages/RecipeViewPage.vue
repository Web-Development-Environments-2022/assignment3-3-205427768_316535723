<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1><b>{{ recipe.title }}</b></h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped1">
            <b>Ingredients: </b>
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
           <br><br><br><br>
            <div class="mb-3">
              <div>Ready in <b>{{ recipe.readyInMinutes }}</b> minutes</div>
              <div>Likes: <b>{{ recipe.popularity }} </b> likes</div>
            </div>
          </div>
          <div class="wrapped2">
            <b>Instructions:</b>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                  {{ s.step }}{{s}} 
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre -->
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      //response = this.$route.params.response;

      try {
        response = await this.axios.get(
         // this.$root.store.server_domain + "/recipes/info", 
          process.env.VUE_APP_ROOT_API + "/recipes/recipe", 
          {
              params: { recipeId: this.$route.params.recipeId }
              //params: { recipeId: 642054 }
          }
        );
        console.log(response);

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
     console.log(response.data);
    //  let {
    //     title,
    //     readyInMinutes,
    //     image,
    //     popularity,
    //     ingredients,
    //     instructions,
    //     // analyzedInstructions,
    //     // extendedIngredients,
    //       } = response.data.recipe;
      let instructions = response.data.instructions;
      console.log(instructions);
      // let _instructions = instructions.map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);
        // let _recipe = {
        //             id: 641227,
        //             title: "Dandelion pesto",
        //             readyInMinutes: 45,
        //             image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
        //             aggregateLikes: 103,
        //             ingredients: [
        //         {
        //             "id": 1001,
        //             "aisle": "Milk, Eggs, Other Dairy",
        //             "image": "butter-sliced.jpg",
        //             "consistency": "SOLID",
        //             "name": "butter",
        //             "nameClean": "butter",
        //             "original": "1 tbsp butter",
        //             "originalName": "butter",
        //             "amount": 1,
        //             "unit": "tbsp",
        //             "meta": [],
        //             "measures": {
        //                 "us": {
        //                     "amount": 1,
        //                     "unitShort": "Tbsp",
        //                     "unitLong": "Tbsp"
        //                 },
        //                 "metric": {
        //                     "amount": 1,
        //                     "unitShort": "Tbsp",
        //                     "unitLong": "Tbsp"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 10011135,
        //             "aisle": "Produce",
        //             "image": "cauliflower.jpg",
        //             "consistency": "SOLID",
        //             "name": "cauliflower florets",
        //             "nameClean": "cauliflower florets",
        //             "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
        //             "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
        //             "amount": 2,
        //             "unit": "cups",
        //             "meta": [
        //                 "frozen",
        //                 "thawed",
        //                 "cut into bite-sized pieces"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 2,
        //                     "unitShort": "cups",
        //                     "unitLong": "cups"
        //                 },
        //                 "metric": {
        //                     "amount": 473.176,
        //                     "unitShort": "ml",
        //                     "unitLong": "milliliters"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 1041009,
        //             "aisle": "Cheese",
        //             "image": "cheddar-cheese.png",
        //             "consistency": "SOLID",
        //             "name": "cheese",
        //             "nameClean": "cheese",
        //             "original": "2 tbsp grated cheese (I used romano)",
        //             "originalName": "grated cheese (I used romano)",
        //             "amount": 2,
        //             "unit": "tbsp",
        //             "meta": [
        //                 "grated",
        //                 "(I used romano)"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 2,
        //                     "unitShort": "Tbsps",
        //                     "unitLong": "Tbsps"
        //                 },
        //                 "metric": {
        //                     "amount": 2,
        //                     "unitShort": "Tbsps",
        //                     "unitLong": "Tbsps"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 1034053,
        //             "aisle": "Oil, Vinegar, Salad Dressing",
        //             "image": "olive-oil.jpg",
        //             "consistency": "LIQUID",
        //             "name": "extra virgin olive oil",
        //             "nameClean": "extra virgin olive oil",
        //             "original": "1-2 tbsp extra virgin olive oil",
        //             "originalName": "extra virgin olive oil",
        //             "amount": 1,
        //             "unit": "tbsp",
        //             "meta": [],
        //             "measures": {
        //                 "us": {
        //                     "amount": 1,
        //                     "unitShort": "Tbsp",
        //                     "unitLong": "Tbsp"
        //                 },
        //                 "metric": {
        //                     "amount": 1,
        //                     "unitShort": "Tbsp",
        //                     "unitLong": "Tbsp"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 11215,
        //             "aisle": "Produce",
        //             "image": "garlic.png",
        //             "consistency": "SOLID",
        //             "name": "garlic",
        //             "nameClean": "garlic",
        //             "original": "5-6 cloves garlic",
        //             "originalName": "garlic",
        //             "amount": 5,
        //             "unit": "cloves",
        //             "meta": [],
        //             "measures": {
        //                 "us": {
        //                     "amount": 5,
        //                     "unitShort": "cloves",
        //                     "unitLong": "cloves"
        //                 },
        //                 "metric": {
        //                     "amount": 5,
        //                     "unitShort": "cloves",
        //                     "unitLong": "cloves"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 20420,
        //             "aisle": "Pasta and Rice",
        //             "image": "fusilli.jpg",
        //             "consistency": "SOLID",
        //             "name": "pasta",
        //             "nameClean": "pasta",
        //             "original": "6-8 ounces pasta (I used linguine)",
        //             "originalName": "pasta (I used linguine)",
        //             "amount": 6,
        //             "unit": "ounces",
        //             "meta": [
        //                 "(I used linguine)"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 6,
        //                     "unitShort": "oz",
        //                     "unitLong": "ounces"
        //                 },
        //                 "metric": {
        //                     "amount": 170.097,
        //                     "unitShort": "g",
        //                     "unitLong": "grams"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 1032009,
        //             "aisle": "Spices and Seasonings",
        //             "image": "red-pepper-flakes.jpg",
        //             "consistency": "SOLID",
        //             "name": "red pepper flakes",
        //             "nameClean": "red pepper flakes",
        //             "original": "couple of pinches red pepper flakes, optional",
        //             "originalName": "couple of red pepper flakes, optional",
        //             "amount": 2,
        //             "unit": "pinches",
        //             "meta": [
        //                 "red"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 2,
        //                     "unitShort": "pinches",
        //                     "unitLong": "pinches"
        //                 },
        //                 "metric": {
        //                     "amount": 2,
        //                     "unitShort": "pinches",
        //                     "unitLong": "pinches"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 1102047,
        //             "aisle": "Spices and Seasonings",
        //             "image": "salt-and-pepper.jpg",
        //             "consistency": "SOLID",
        //             "name": "salt and pepper",
        //             "nameClean": "salt and pepper",
        //             "original": "salt and pepper, to taste",
        //             "originalName": "salt and pepper, to taste",
        //             "amount": 2,
        //             "unit": "servings",
        //             "meta": [
        //                 "to taste"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 2,
        //                     "unitShort": "servings",
        //                     "unitLong": "servings"
        //                 },
        //                 "metric": {
        //                     "amount": 2,
        //                     "unitShort": "servings",
        //                     "unitLong": "servings"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 11291,
        //             "aisle": "Produce",
        //             "image": "spring-onions.jpg",
        //             "consistency": "SOLID",
        //             "name": "scallions",
        //             "nameClean": "spring onions",
        //             "original": "3 scallions, chopped, white and green parts separated",
        //             "originalName": "scallions, chopped, white and green parts separated",
        //             "amount": 3,
        //             "unit": "",
        //             "meta": [
        //                 "white",
        //                 "green",
        //                 "separated",
        //                 "chopped"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 3,
        //                     "unitShort": "",
        //                     "unitLong": ""
        //                 },
        //                 "metric": {
        //                     "amount": 3,
        //                     "unitShort": "",
        //                     "unitLong": ""
        //                 }
        //             }
        //         },
        //         {
        //             "id": 14106,
        //             "aisle": "Alcoholic Beverages",
        //             "image": "white-wine.jpg",
        //             "consistency": "LIQUID",
        //             "name": "white wine",
        //             "nameClean": "dry white wine",
        //             "original": "2-3 tbsp white wine",
        //             "originalName": "white wine",
        //             "amount": 2,
        //             "unit": "tbsp",
        //             "meta": [
        //                 "white"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 2,
        //                     "unitShort": "Tbsps",
        //                     "unitLong": "Tbsps"
        //                 },
        //                 "metric": {
        //                     "amount": 2,
        //                     "unitShort": "Tbsps",
        //                     "unitLong": "Tbsps"
        //                 }
        //             }
        //         },
        //         {
        //             "id": 99025,
        //             "aisle": "Pasta and Rice",
        //             "image": "breadcrumbs.jpg",
        //             "consistency": "SOLID",
        //             "name": "whole wheat bread crumbs",
        //             "nameClean": "whole wheat breadcrumbs",
        //             "original": "1/4 cup whole wheat bread crumbs (I used panko)",
        //             "originalName": "whole wheat bread crumbs (I used panko)",
        //             "amount": 0.25,
        //             "unit": "cup",
        //             "meta": [
        //                 "whole wheat",
        //                 "(I used panko)"
        //             ],
        //             "measures": {
        //                 "us": {
        //                     "amount": 0.25,
        //                     "unitShort": "cups",
        //                     "unitLong": "cups"
        //                 },
        //                 "metric": {
        //                     "amount": 59.147,
        //                     "unitShort": "ml",
        //                     "unitLong": "milliliters"
        //                 }
        //             }
        //         }
        //             ],
        //             vegan: true,
        //             vegetarian: true,
        //             glutenFree: true,
        //             view: false,
        //             favorite: false,
        //           }
//  instructions,
//analyzedInstructions,
 //extendedIngredients,
//   _instructions,
// aggregateLikes,
// readyInMinutes,
      // let instructionsArray=[];
      var instructionsArray = response.data.instructions.split(".");
      let _recipe = {
        title:response.data.title,
        readyInMinutes:response.data.readyInMinutes,
        image:response.data.image,
        popularity:response.data.popularity,
        ingredients:response.data.ingredients,
        _instructions:instructionsArray,
      };

      this.recipe = _recipe;
      console.log(recipe);
      console.log("recipe");
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.container{
  margin-top: 7%;
  background-color: antiquewhite;
 margin-bottom: 7%;
}
.wrapped1 {
  margin-left: 10%;
  width: 30%;
}

.wrapped2 {
  margin-left: 7%;
  width: 40%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

.recipe-header{
  font-size: 10%;
}
/* .recipe-header{

} */

h1{
  font-size: 20pt;
  text-align: center;
}
</style>
