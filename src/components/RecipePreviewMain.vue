<template >
  <div>
    <div class="recipe-footer">
      <b-card no-body class="overflow-hidden">
        <b-col no-gutters id="card">
          <b-row md="6">
            <router-link
              :to="{ name: 'recipe', params: { recipeId: recipe.id , type:'spoonacular'} }"
              class="recipe-preview"
              ><b-card-img :src="recipe.image" alt="Image" class="recipe-image">
              </b-card-img>
            </router-link>
          </b-row>
          <b-row md="6">
            <b-card-body :title="recipe.title" class="recipe-title">
              <b-card-text>
                <b-container>
                  <b-row>
                    <b-col class="recipe-overview">
                      <img src="../assets/clock.png" class="img_logo" />
                      {{ recipe.readyInMinutes }} min
                    </b-col>
                    <b-col class="recipe-overview">
                      <img src="../assets/like.png" class="img_logo" />
                      {{ recipe.popularity }}
                    </b-col>

                    <b-col class="recipe-overview">
                      <div v-if="recipe.view">
                        <img src="../assets/viewed.png" class="img_logo" />
                        <!-- viewed -->
                      </div>
                      <div v-if="!recipe.view">
                        <img src="../assets/not-viewed.png" class="img_logo" />
                        <!-- not viewed -->
                      </div>
                    </b-col>

                    <b-col class="recipe-overview">
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
                          id=addToFavorite
                          @click="addToFavorites"
                          v-b-popover.hover.bottom="'add to favorites'"
                          title="add to favorites"
                        
                        />
                        <!--<span v-if="showText === 1">add to favorites</span>-->
                        <!-- not favorite -->

                        <!--</div>-->
                      </div>
                    </b-col>

                    <b-col class="recipe-overview" v-if="recipe.glutenFree">
                      
                        <img
                          src="../assets/gluten_free1.png"
                          class="img_logo"
                        /><br>
                         Gluten Free 
                      
                    </b-col>
                    <b-col class="recipe-overview" v-if="recipe.vegetarian">
                     
                        <img src="../assets/vegetarian.png" class="img_logo" />
                         vegetarian 
                     
                    </b-col>
                    <b-col class="recipe-overview" v-if="recipe.vegan">
                     
                        <img src="../assets/vegan1.png" class="img_logo" />
                        vegan
                     
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-text>
            </b-card-body>
          </b-row>
        </b-col>
      </b-card>
    </div>
  </div>
  <!-- </router-link>-->
</template>

<script>
export default {
  /*mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },*/
  data() {
    return {
      // image_load: false

      showText: 0,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },

    //methods:{
    // alertM: function (){
    //   alert("hey");
    //   console.log("here")
    // },

    //}

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  },
  methods: {
    async addToFavorites() {
      this.recipe.favorite = true;
      try {
        console.log(this.recipe.id);
        const response = await this.axios.post(
          // this.$root.store.server_domain + "/recipes/random",

          process.env.VUE_APP_ROOT_API + "/users/favorites",
          {
            recipeId: this.recipe.id,
            recipeFrom: "spoonacular"
          }
          //   // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        //const recipes = response.data;
        // this.recipes = [];
        // this.recipes.push(...recipes);
        /* this.recipes = [
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
        ];*/
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
table {
  display: table;
}
table tr {
  display: table-cell;
}
table tr td {
  display: block;
}
.recipe-preview {
  display: inline-block;
  width: 90%;
  position: relative;
  /* margin: 2px 10px; */
  margin-left: 5%;
  margin-top: 5%;
}
.recipe-preview > .recipe-body {
  width: 10%;
  height: 2px;
  position: fixed;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 120%;
  height: 100%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 120%;
  color: black;
  font-family: cursive;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-overview {
  font-size: 80%;
  text-align: center;
  display: block;
}
/*.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}*/

/*.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  font-family: cursive;
  font-size: 10pt;
}*/
.img_logo {
  width: 30px;
  height: 30px;
}
#addToFavorite:hover{
  cursor: pointer;
}
</style>
