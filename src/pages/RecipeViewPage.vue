<template>
  <div class="container">
    <div v-if="recipe">
     <!-- <div class="recipe-header mt-3 mb-4">-->
        <h1>
          <b>{{ recipe.title }}</b>
        </h1>
        <!--<img :src="recipe.image" class="center" />-->
        <b-row md="15">
          <b-col>
            <img :src="recipe.image" class="center" />
          </b-col>
          <!--</div>-->
          <!--<div class="wrapped3">-->
          <b-col>
            <div class="mb-3">
              <div>
                <img src="../assets/clock.png" class="img_logo" />
                Ready in <b>{{ recipe.readyInMinutes }}</b> minutes
              </div>
              <div>
                <img src="../assets/like.png" class="img_logo" />
                <b>{{ recipe.popularity }} </b> likes
              </div>
              <div v-if="recipe.view">
                <img src="../assets/viewed.png" class="img_logo" />
                viewed
              </div>
              <div v-if="!recipe.view">
                <img src="../assets/not-viewed.png" class="img_logo" />
                not viewed
              </div>

              <div v-if="recipe.favorite">
                <img src="../assets/favorite.png" class="img_logo" />
                favorite
              </div>
              <div v-if="!recipe.favorite">
                <!--<div
                        class="img-wrapper"
                        @mouseover="showText = 1"
                        @mouseleave="showText = 0"
                      >-->
                <img
                  src="../assets/not-favorite.png"
                  class="img_logo"
                  id="addToFavorite"
                />
                not favorite
                <!-- <span v-if="showText === 1">Text 1</span> -->
                <!--</div>-->
              </div>
              <div v-if="recipe.vegan">
                <img src="../assets/vegan1.png" class="img_logo" />
                vegan
              </div>
              <div v-if="recipe.vegetarian">
                <img src="../assets/vegetarian.png" class="img_logo" />
                vegetarian
              </div>
              <div v-if="recipe.glutenFree">
                <img src="../assets/gluten_free1.png" class="img_logo" />
                Gluten Free
              </div>
              <div>
                <img src="../assets/servings.png" class="img_logo" />
                Servings: <b>{{ recipe.servings }} </b>
              </div>
              <!-- <div>view: <b>{{ recipe.view }} </b></div>
              <div>favorite: <b>{{ recipe.favorite }} </b></div> -->
            </div>
            
          </b-col>
        </b-row>
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
                <div v-if="$route.params.type === 'spoonacular'">
                  {{ r.original }}
                </div>
                <div v-else>
                  {{ r }}
                </div>
              </li>
            </ul>
           
            
              
              
              
              

              
              
              
              
              
             
             
          </div>
          <div class="wrapped2">
            <b>Instructions:</b>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}{{ s }}
              </li>
            </ol>
          </div>
       <!--</div>-->
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
      let response;
      //response = this.$route.params.response;
      if (this.$route.params.type == "spoonacular") {
        try {
          response = await this.axios.get(
            // this.$root.store.server_domain + "/recipes/info",
            process.env.VUE_APP_ROOT_API + "/recipes/recipe",
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

        let instructions = response.data.instructions;
        console.log(instructions);

        var instructionsArray = response.data.instructions.split(".");
        let _recipe = {
          title: response.data.title,
          readyInMinutes: response.data.readyInMinutes,
          image: response.data.image,
          popularity: response.data.popularity,
          ingredients: response.data.ingredients,
          _instructions: instructionsArray,
          vegan: response.data.vegan,
          vegetarian: response.data.vegetarian,
          glutenFree: response.data.glutenFree,
          servings: response.data.servings,
          view: response.data.view,
          favorite: response.data.favorite,
        };

        this.recipe = _recipe;
        console.log(recipe);
        console.log("recipe");
      }
      if (this.$route.params.type == "my") {
        try {
          response = await this.axios.get(
            process.env.VUE_APP_ROOT_API + "/users/recipe",
            {
              params: { recipeId: this.$route.params.recipeId },
            }
          );
          console.log(response);

          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }
        console.log(response.data[0]);

        var instructionsArray = response.data[0].instructions.split(".");
        var ingredientsArray = response.data[0].extendedIngredients.split(",");
        let _recipe = {
          title: response.data.title,
          readyInMinutes: response.data[0].readyInMinutes,
          image: response.data[0].image,
          popularity: response.data[0].popularity,
          ingredients: ingredientsArray,
          _instructions: instructionsArray,
          vegan: response.data[0].vegan,
          vegetarian: response.data[0].vegetarian,
          glutenFree: response.data[0].glutenFree,
          servings: response.data[0].servings,
          view: response.data[0].view,
          favorite: response.data[0].favorite,
        };

        this.recipe = _recipe;
        console.log(recipe);
        console.log("recipe");
      }
    } catch (error) {
      console.log(error);
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
/*.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}*/
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
.img_logo {
  width: 35px;
  height: 35px;
}
</style>
