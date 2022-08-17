<template>
  <b-container>
    <h3 >
      {{ title }}:
        <button v-if="this.title!=='Last Viewed'" @click="updateRecipes">More</button>
        <slot></slot>
    </h3>

    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreviewMain class="recipePreview" :recipe="r" />
      </b-row>
    </b-col>

  </b-container>
</template>

<script>
import { env } from "process";
import RecipePreviewMain from "./RecipePreviewMain.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreviewMain,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes:{
      type: Array,
      required: true,
    }
},
  data() {
    return {
      //recipes: null,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      
      var type = this.title;
      //this.listType;
      var listTypeRoute = "Random";
      switch(type)
      {
        case "Random Recipes":
            listTypeRoute = "/recipes/random";
            break;
        case "Last Viewed":
            listTypeRoute = "/users/lastWatchedRecipes";
            break;
        default:  
          listTypeRoute = null;
      }
      //listTypeRoute = "/recipes/random";
      try {
        const response = await this.axios.get(
           process.env.VUE_APP_ROOT_API + listTypeRoute
        );
        console.log(response);
        const recipes = response.data;
        

      //try {
      /*  if (this.content == "random") {
          const response = await this.axios.get(
            // VUE_APP_ROOT_API = "http://localhost:80/"
            // spooncular_apiKey = a2db82f6e7174087bd946ceb5db220bc
            process.env.VUE_APP_ROOT_API + "/recipes/random"
            //"http://localhost:80/recipes/random?apiKey=a2db82f6e7174087bd946ceb5db220bc",
            // "http://localhost:80/users/views?apiKey=a2db82f6e7174087bd946ceb5db220bc"
            //this is the real

            //"http://localhost:80/users/MyRecipes?apiKey=a2db82f6e7174087bd946ceb5db220bc",
            // "https://api.spoonacular.com/recipes/informationBulk?ids=716429,716439,715538&apiKey=a2db82f6e7174087bd946ceb5db220bc"
          );
        }
        if (this.content == "last3") {
          const response = await this.axios.get(
            // VUE_APP_ROOT_API = "http://localhost:80/"
            // spooncular_apiKey = a2db82f6e7174087bd946ceb5db220bc
            process.env.VUE_APP_ROOT_API + "/users/lastWatchedRecipes"
          );
        }*/

        
        //const recipes = response.data.recipes;

        
        //  this.recipes = [
        //      {
        //        id: 641227,
        //        title: "Dandelion pesto",
        //        readyInMinutes: 45,
        //        image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
        //        popularity: 103,
        //        vegan: true,
        //        vegetarian: true,
        //        glutenFree: true,
        //        view: false,
        //        favorite: true,
        //      },
        //      {
        //        id: 662850,
        //        title: "Tangy & Savory Mexican Soup",
        //        readyInMinutes: 45,
        //        image: "https://spoonacular.com/recipeImages/662850-556x370.jpg",
        //        popularity: 8,
        //        vegan: false,
        //        vegetarian: false,
        //        glutenFree: true,
        //        view: false,
        //        favorite: false,
        //      },
        //      {
        //        id: 647395,
        //        title: "Hot Artichoke Crab Dip",
        //        readyInMinutes: 45,
        //        image: "https://spoonacular.com/recipeImages/647395-556x370.jpg",
        //        popularity: 54,
        //        vegan: false,
        //        vegetarian: false,
        //        glutenFree: true,
        //        view: false,
        //        favorite: false,
        //      },
        //    ];

        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 160%;
}

</style>
