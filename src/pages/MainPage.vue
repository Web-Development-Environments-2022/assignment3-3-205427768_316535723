<template>
  <div class="container">
    <br><br><br>
    <h1 class="title">Main Page</h1>
      
    <!-- <b-container class="bv-example-row"> -->
      <b-row>
        <b-col>
          <RecipePreviewList 
          title="Random Recipes"        
          class="RandomRecipes center" />
        </b-col>
        <b-col>
          <div v-if="!$root.store.username">
              <LoginPage 
              class="Login left" style="margin-left:-10% ;"/>
          </div>

          <!-- <router-link v-if="!$root.store.username" 
              :to="{ name: 'login' }"
              tag="button">You need to Login to vue this
              <LoginPage 
              class="Login left" style="margin-left:-10% ;"/>
          </router-link> -->
          
        </b-col>
      </b-row>
    <!-- </b-container> -->
    

    <!-- {{ !$root.store.username }}type = "Random"  :type = "LastViewed"   -->
      <!-- <RecipePreviewList
            title="Last Viewed Recipes"
            :class="{
              // RandomRecipes: true,
              //LastViewed: True,
              blur: !$root.store.username,
              center: true
            }"
            disabled="true"
        ></RecipePreviewList> -->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    LoginPage
}
};
</script>

<style lang="scss" scoped>
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
  font-weight: 900;
  background-color: rgb(232, 227, 226);
}

</style>
