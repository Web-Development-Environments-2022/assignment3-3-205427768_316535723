<template>
  <div class="container">
    <br><br><br>
    <h1 class="title">Main Page</h1>
     <b-container>
      <b-row >
      <b-col>
    <RecipePreviewList 
        title="Random Recipes"
        :recipes = recipesRandom
        class="RandomRecipes" />
        <router-link v-if="!$root.store.username" 
            :to="{ name: 'login' }"
            tag="button">You need to Login to vue this
        </router-link>
        </b-col>
    <!-- {{ !$root.store.username }} -->
    <b-col>
   <RecipePreviewList
        title="Last Viewed Recipes"
        :recipes = recipesLast3
        class="RandomRecipes"
        :class="{
          RandomRecipes: true,
          blur: !$root.store.username,
          center: true
        }"
        disabled="true"
    ></RecipePreviewList>
   
    
      
    </b-col>
     </b-row>
    
  </b-container>
    <!--<div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
   data() {
    return {
      recipesRandom: [],
      recipesLast3: [],
    };
  },
  components: {
    RecipePreviewList
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
       /* const response = await this.axios.get(
          // this.$root.store.server_domain + "/recipes/random",
          process.env.VUE_APP_ROOT_API + "/recipes/random"
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        const recipes = response.data;
        this.recipesRandom = [];
        this.recipesRandom.push(...recipes);
        console.log(response.data);*/
         this.recipesRandom = [
          {
            id: 641227,
            title: "Dandelion pesto",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
            popularity: 103,
            vegan: true,
            vegetarian: true,
            glutenFree: true,
            view: false,
            favorite: false,
          },
          {
            id: 662850,
            title: "Tangy & Savory Mexican Soup",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/662850-556x370.jpg",
            popularity: 8,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            view: false,
            favorite: false,
          },
          {
            id: 647395,
            title: "Hot Artichoke Crab Dip",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/647395-556x370.jpg",
            popularity: 54,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            view: false,
            favorite: false,
          },
        ];
      } catch (error) {
        console.log(error);
      }
       try {
        /*const response = await this.axios.get(
          // this.$root.store.server_domain + "/recipes/random",
          process.env.VUE_APP_ROOT_API + "/users/lastWatchedRecipes"
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        const recipes = response.data;
        this.recipesLast3 = [];
        this.recipesLast3.push(...recipes);
        console.log(response.data);*/
        this.recipesLast3 = [
          {
            id: 641227,
            title: "Dandelion pesto",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
            popularity: 103,
            vegan: true,
            vegetarian: true,
            glutenFree: true,
            view: false,
            favorite: false,
          },
          {
            id: 662850,
            title: "Tangy & Savory Mexican Soup",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/662850-556x370.jpg",
            popularity: 8,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            view: false,
            favorite: false,
          },
          {
            id: 647395,
            title: "Hot Artichoke Crab Dip",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/647395-556x370.jpg",
            popularity: 54,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            view: false,
            favorite: false,
          },
        ];
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.container
{
  //background-color: blue;
  width: 100%;
}
.RandomRecipes {
  margin: 10px 0 10px;
  width: 100%;
  
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

.title
{
  // position: static;
  text-align: center;
  font-size: 120%;
}

.RandomRecipes
{
  font-family:Calibri;
  width: 100%;
 // font-weight: 900;
  background-color: rgb(232, 227, 226);
}

</style>
