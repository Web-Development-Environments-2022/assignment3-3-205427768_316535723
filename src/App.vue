<template>
  <div id="app">
    <div >
      <b-navbar toggleable="lg" type="dark" variant="info" class="nav">
        <b-navbar-brand href="#" class="nav-item"
          ><router-link :to="{ name: 'main' }" class="link"
            >Vue Recipes</router-link
          ></b-navbar-brand
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#"
              ><router-link :to="{ name: 'search' }" class="link"
                >Search</router-link
              ></b-nav-item
            >
            <b-nav-item href="#"
              ><router-link :to="{ name: 'about' }" class="link"
                >About</router-link
              ></b-nav-item
            >

            <b-nav-item href="#" v-if="!$root.store.username"
              >Hello Guest:</b-nav-item
            >
            <b-nav-item href="#" v-if="!$root.store.username"
              ><router-link :to="{ name: 'register' }" class="link"
                >Register</router-link
              ></b-nav-item
            >
            <b-nav-item href="#" v-if="!$root.store.username"
              ><router-link :to="{ name: 'login' } " class="link"
                >Login</router-link
              ></b-nav-item
            >

            <b-nav-item-dropdown text="Personal" v-else right>
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'myRecipes' }" class="link2"
                  >My Recipes</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'favoriteRecipes' }" class="link2"
                  >favorie Recipes</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'familyRecipes' }" class="link2"
                  >family Recipes</router-link
                ></b-dropdown-item
              >
              <!--<b-dropdown-item href="#">FA</b-dropdown-item>-->
            </b-nav-item-dropdown>

            <!-- <b-nav-item-dropdown id="personal" text="Personal" down >
          <router-link :to="{ name: 'myRecipes' }">My Recipes</router-link>
          <router-link :to="{ name: 'favoriteRecipes'}">favorie Recipes</router-link>
          <router-link :to="{ name: 'familyRecipes' }">family Recipes</router-link>
          {{$root.store.username }}: <button @click="Logout">Logout</button>
        </b-nav-item-dropdown> -->

            <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
                v-model="dish_name"
              ></b-form-input>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="submit"
                @click="search"
                
                >Search</b-button
              >
            </b-nav-form>

            <b-nav-item-dropdown right v-if="$root.store.username">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ $root.store.username }}</em>
              </template>
              <!-- <b-dropdown-item href="#">Profile</b-dropdown-item>-->
              <b-dropdown-item href="#" @click="Logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
//import search from "../pages/SearchPage"; //added

export default {
  name: "App",
  // components: {
  // search,
  // }, //added
  data() {
    return {
      dish_name: "",
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    async search() {
      //this.$router.push{'search'}
      this.$router.push({ name: "search", params: { dish_name: this.dish_name } });
      this.dish_name="";
    },
  },
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
  background-color: Linen;
  background-image: "/img/background.jpg";
}
.nav{
  background-color: white;
}
.link{
  color :rgba(255, 255, 255, 0.5);
}
.link2{
  color: #2c3e50;
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

/*#nav {
  background: #c8680ea4;
  font-family: "Lexend Exa", sans-serif;
  font-weight: 300;
  cursor: pointer;
  position: fixed;
  width: 85%;
  top: 5%;
  left: 48%;
  transform: translateX(-50%);
  display: inline-block;
  /* border: 2px solid #EBECF1; 
  border-radius: 25px;
  /* animation: slide-in 1s ease-out; 
  padding: 2px 20px;
}

#nav a {
  color: rgb(256, 256, 256);
  // -webkit-text-stroke: 0.3px rgb(165, 159, 126);
  /*font-family: fantasy;
  padding: 5px;
  font-size: 110%;
  text-decoration: none;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

#nav a:hover {
  background-color: #6b7574;
  color: rgb(255, 255, 255);
}*/
</style>
