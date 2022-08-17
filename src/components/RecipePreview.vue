<template >
  
    <div class="recipe-footer">
    <b-card no-body class="recipe-overview" style="max-width:740px">
      <b-row no-gutters>
        <router-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id, type: type } }"
          class="recipe-preview"
          ><b-card-img :src="recipe.image" class="recipe-image"> </b-card-img>
        </router-link>
        <b-col no-gutters id="card">
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
                      <!-- favorite -->
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
                        <!-- not favorite -->
                        <!-- <span v-if="showText === 1">Text 1</span> -->
                      <!--</div>-->
                    </div>
                  </b-col>
                  <b-col class="recipe-overview">
                    <div v-if="recipe.glutenFree">
                      <img
                        src="../assets/gluten_free1.png"
                        class="img_logo"
                      />
                      <!-- Gluten Free -->
                    </div>
                  </b-col>
                  <b-col class="recipe-overview">
                    <div v-if="recipe.vegetarian">
                      <img src="../assets/vegetarian.png" class="img_logo" />
                      <!-- vegetarian -->
                    </div>
                  </b-col>
                  <b-col class="recipe-overview">
                    <div v-if="recipe.vegan">
                      <img src="../assets/vegan1.png" class="img_logo" />
                      <!-- vegan -->
                    </div>
                  </b-col>
                  
                </b-row>
              </b-container>
            </b-card-text>
          </b-card-body>
        </b-row>
      </b-col>
      </b-row>
    </b-card>
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
    type:{
      type: String,
      required: true,
    }

    //methods:{
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
        console.log(this.type);
        const response = await this.axios.post(
          // this.$root.store.server_domain + "/recipes/random",
          

          process.env.VUE_APP_ROOT_API + "/users/favorites",
           {
            recipeId: this.recipe.id,
            recipeFrom: this.type
          }
          // "https://test-for-3-2.herokuapp.com/recipes/random"
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
.recipe-preview {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  /* margin: 15px 15px; */
  margin: 10px 10px;
  font-size: 10pt;
}
.recipe-preview > .recipe-body {
  width: 80%;
  height: 80%;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: 20%;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 70%;
  height: 70%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  margin-left: 5%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  margin-left: 10%;
  width: 70%;
  color: black;
  font-family: cursive;
  font-size: 10pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 1px 10px;
  width: 70%;
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
}

.recipe-preview .recipe-footer ul.recipe-overview li {
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
}
.recipe-overview {
  font-size: 95%;
  text-align: center;
  display: block;
  padding: 6px;
}
.img_logo {
  width: 25px;
  height: 25px;
}

#addToFavorite:hover{
  cursor: pointer;
}

</style>
