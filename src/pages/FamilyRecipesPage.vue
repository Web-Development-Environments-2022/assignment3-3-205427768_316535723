<template>
 <div class="container">
    <h1 class="title">Family Recipes</h1>
    <b-container>
   
    <!--<b-row v-for="r in recipes" :key="r.id">
      <b-col >
        <familyRecipe class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>-->
    <b-row v-for="row in nrows" :key="row">
        <b-col v-for="col in 3" :key="col">
            <!--{{recipes.length}} -->
          <familyRecipe class="recipePreview" :recipe="recipes[(row-1) * 3 +(col-1)]" v-if="(row-1) * 3 + (col-1) < recipes.length" />
        </b-col>
      </b-row>
  </b-container>
  </div>
</template>

<script>
import familyRecipe from "../components/familyRecipe.vue";
export default {
  name: "RecipePreviewList",
  components: {
    familyRecipe
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.familyRecipes();
  },
  computed: {
    nrows() {
      return Math.floor((this.recipes.length - 1) / 3) + 1;
    },
  },
  methods: {
    async familyRecipes() {
      try {
        console.log(process.env.VUE_APP_ROOT_API);
        const response = await this.axios.get(
          //this.$root.store.server_domain + "/users/favorites",
          process.env.VUE_APP_ROOT_API + "/users/FamilyRecipes"
        ); 

        // console.log(response);
        //const recipes = response.data.recipes;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(response.data);
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
  min-height: 400px;
}
h1.title{
  margin-top: 2%;
  display: block;
  text-align: center;

}
</style>