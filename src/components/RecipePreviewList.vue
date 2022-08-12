<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <!-- <b-col>
      <b-row>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </b-col> -->


    <b-row>
      <b-col id="random">
        <b-row v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import { env } from "process";
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
    // },
    // // Random, LastViewed
    // ,listType: {
    //   type: string,
    // }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      
      var type = "Random";
      //this.listType;
      var listTypeRoute = "Random";
      switch(type)
      {
        case "Random":
            listTypeRoute = "/recipes/random";
            break;
        case "LastViewed":
            listTypeRoute = "/users/views";
            break;
        default:  
          listTypeRoute = null;
      }
      //listTypeRoute = "/recipes/random";
      try {
        const response = await this.axios.get(
           process.env.VUE_APP_ROOT_API + listTypeRoute



          // VUE_APP_ROOT_API = "http://localhost:80/"
          // spooncular_apiKey = a2db82f6e7174087bd946ceb5db220bc
         
          
          //process.env.VUE_APP_ROOT_API + "recipes/random?apiKey" + process.env.spooncular_apiKey
          //"http://localhost:80/recipes/random?apiKey=a2db82f6e7174087bd946ceb5db220bc",

          // "http://localhost:80/users/views?apiKey=a2db82f6e7174087bd946ceb5db220bc"
          //this is the real
          
          //"http://localhost:80/users/MyRecipes?apiKey=a2db82f6e7174087bd946ceb5db220bc",
          // "https://api.spoonacular.com/recipes/informationBulk?ids=716429,716439,715538&apiKey=a2db82f6e7174087bd946ceb5db220bc"
        );

        // console.log(response);
        //const recipes = response.data.recipes;
        const recipes = response.data;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 70%;
}

</style>
