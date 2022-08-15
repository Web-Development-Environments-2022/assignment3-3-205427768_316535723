<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }" style = "color: antiquewhite ;font-weight: 900; font-size:x-large">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <!-- |{{ !$root.store.username }}| -->
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
         <!-- <b-nav-item-dropdown id="personal" text="Personal" down >
          <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>
          <router-link :to="{ name: 'favoriteRecipes'}">favorie Recipes</router-link>
          <router-link :to="{ name: 'familyRecipes' }">family Recipes</router-link>
          {{$root.store.username }}: <button @click="Logout">Logout</button>
        </b-nav-item-dropdown> -->
        <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>|
        <router-link :to="{ name: 'favoriteRecipes'}">favorie Recipes</router-link>|
        <router-link :to="{ name: 'familyRecipes' }">family Recipes</router-link>|
        {{$root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
       
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  background-image:"/img/background.jpg";
  
}

// #nav {
//   padding: 30px;
// }

// #nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }

#nav{
  background:  #c8680ea4;
  font-family: 'Lexend Exa', sans-serif;
  font-weight: 300;
	cursor: pointer;
	position: fixed;
  width: 85%;
	top: 5%;
	left: 48%;
	transform: translateX(-50%);
	display: inline-block; 
	/* border: 2px solid #EBECF1; */
	border-radius: 25px;
	/* animation: slide-in 1s ease-out; */
	padding: 2px 20px;
}


#nav a {
	color: rgb(256,256,256);
	// -webkit-text-stroke: 0.3px rgb(165, 159, 126);
	/*font-family: fantasy;*/
	padding: 5px;
	font-size: 110%;
	text-decoration: none;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
  
#nav a:hover {
	background-color:#6b7574;
	color: rgb(255, 255, 255);
} 

#personal{
  background-color: antiquewhite;
}

</style>
