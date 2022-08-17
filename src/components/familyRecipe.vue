<template >
  <div>
      <b-card no-body class="recipe-overview" style="max-width:740px">
      <b-row no-gutters>
        <router-link
          :to="{ name: 'familyRecipe', params: { title: recipe.title, family_member:recipe.family_member, when_to_make: recipe.when_to_make, ingredients: recipe.ingredients, instructions: recipe.instructions, image: recipe.image } }"
          class="recipe-preview"
          ><b-card-img :src="recipe.image" class="recipe-image"> </b-card-img>
        </router-link>
        <b-col no-gutters id="card">
        <b-row md="6">
          <b-card-body :title="recipe.title" class="recipe-title">
            <b-card-text>
              <b-container>
                <b-row>
                    <ul>
                        <li>
                 by {{recipe.family_member}}
                 </li>
                 <li>
                    When To Make: {{recipe.when_to_make}}
                    </li>
                    </ul>
                  
                </b-row>
              </b-container>
            </b-card-text>
          </b-card-body>
        </b-row>
      </b-col>
      </b-row>
    </b-card>
  </div>
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
   /* async addToFavorites() {
      this.recipe.favorite = true;
       try {
        console.log(this.recipe.id);
        const response = await this.axios.post(
          // this.$root.store.server_domain + "/recipes/random",
          

          process.env.VUE_APP_ROOT_API + "/users/favorites",
           {
            recipeId: this.recipe.id,
          }
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );
        

      } catch (error) {
        console.log(error);
      }
      
    },*/
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
</style>