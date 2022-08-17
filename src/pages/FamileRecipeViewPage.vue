<template>
  <div class="container">
    <div v-if="recipe">
      <!--<div class="recipe-header mt-3 mb-4">-->
        <h1>
          <b>{{ recipe.title }}</b>
        </h1>
        <b-row md="15">
            <b-col>
        <img :src="recipe.image" class="center" />
            </b-col>
      <!--</div>-->
      <!--<div class="wrapped3">-->
        <b-col>
            <ul><li>
        by {{ recipe.family_member }} 
        </li>
        <li>
        when to make: {{ recipe.when_to_make }}
        </li>
        </ul>
        </b-col>
        </b-row>
      <!--</div>-->
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped1">
            <b>Ingredients: </b>
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r }}
              </li>
            </ul>
            <!-- <br /><br /><br /><br />
            <div class="mb-3">
              <div>
                Ready in <b>{{ recipe.readyInMinutes }}</b> minutes
              </div>
              <div>
                Likes: <b>{{ recipe.popularity }} </b> likes
              </div>
              <div>
                Vegan: <b>{{ recipe.vegan }} </b>
              </div>
              <div>
                Vegetarian: <b>{{ recipe.vegetarian }} </b>
              </div>
              <div>
                GlutenFree: <b>{{ recipe.glutenFree }} </b>
              </div>
              <div>
                Servings: <b>{{ recipe.servings }} </b>
              </div>
               <div>view: <b>{{ recipe.view }} </b></div>
              <div>favorite: <b>{{ recipe.favorite }} </b></div> -->
            <!-- </div>-->
          </div>
          <div class="wrapped2">
            <b>Instructions:</b>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      //let response;
      //response = this.$route.params.response;

      /* try {
        response = await this.axios.get(
          // this.$root.store.server_domain + "/recipes/info",
          process.env.VUE_APP_ROOT_API + "/users/FamilyRecipes",
          {
            params: { recipeId: this.$route.params.recipeId },
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

      //  instructions,
      //analyzedInstructions,
      //extendedIngredients,
      //   _instructions,
      // aggregateLikes,
      // readyInMinutes,
      // let instructionsArray=[];*/
      var instructionsArray = this.$route.params.instructions.split("!");
      var ingredientsArray = this.$route.params.ingredients.split(".");
      let _recipe = {
        title: this.$route.params.title,
        image: this.$route.params.image,
        ingredients: ingredientsArray,
        _instructions: instructionsArray,
        when_to_make: this.$route.params.when_to_make,
        family_member: this.$route.params.family_member,
      };

      this.recipe = _recipe;
      //this.recipe = {
      //title: this.$route.params.title,
      //image: this.$route.params.image,
      // ingredients: ingredientsArray,
      // _instructions: instructionsArray,
      // when_to_make: this.$route.params.when_to_make,
      // family_member: this.$route.params.family_member,
      // };
      // console.log(recipe);
    } catch (error) {
      console.log(error);
      // this.$router.replace("/NotFound");
      //return;
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.container {
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
.wrapped3{
    margin-left: 35%;
  width: 40%;
}
.center {
  /*display: block;
  margin-left: 10%;
  margin-right: auto;
  width: 30%;*/
  width: 50%;
  margin-left: 20%
}

.recipe-header {
  font-size: 10%;
}
/* .recipe-header{

} */

h1 {
  font-size: 20pt;
  text-align: center;
}
</style>