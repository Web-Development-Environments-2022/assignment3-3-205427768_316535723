<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <b-form-group
        id="input-group-dish_name"
        label-cols-sm="3"
        label="Dish Name:"
        label-for="dish_name"
      >
        <b-form-input
          id="dish_name"
          v-model="$v.form.dish_name.$model"
          type="text"
          :state="validateState('dish_name')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.dish_name.required">
          dish name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.dish_name.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.dish_name.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <!--<b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>

      <b-form-group
        id="input-group-cuisines"
        label-cols-sm="3"
        label="Cuisines:"
        label-for="cuisines"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-checkbox-group
          id="cuisines"
          v-model="$v.form.cuisines.$model"
          :options="cuisines"
          :aria-describedby="ariaDescribedby"
        ></b-form-checkbox-group>
      </b-form-group>
      <div>
        Selected: <strong>{{ selected }}</strong>
      </div>-->

      <b-form-group
        id="input-group-cuisines"
        label-cols-sm="3"
        label="Cuisines:"
        label-for="cuisines"
      >
        <multiselect
          id="cuisines"
          v-model="$v.form.cuisines.$model"
          tag-placeholder="Add this as new tag"
          placeholder="Select cuisines"
          label="label"
          track-by="id"
          :options="cuisines"
          :multiple="true"
          :taggable="true"
        ></multiselect>
      </b-form-group>

      <b-form-group
        id="input-group-diets"
        label-cols-sm="3"
        label="Diets:"
        label-for="diets"
      >
        <b-form-select
          id="diets"
          v-model="$v.form.diets.$model"
          :options="diets"
          :state="validateState('diets')"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-intolerances"
        label-cols-sm="3"
        label="Intolerances:"
        label-for="intolerances"
      >
        <multiselect
          id="intolerances"
          v-model="$v.form.intolerances.$model"
          tag-placeholder="Add this as new tag"
          placeholder="Select intolerances"
          label="label"
          track-by="id"
          :options="intolerances"
          :multiple="true"
          :taggable="true"
        ></multiselect>
      </b-form-group>

      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="Results:"
        label-for="numbers"
      >
        <b-form-radio-group
          id="numbers"
          v-model="$v.form.numbers.$model"
          :options="numbers"
          :state="validateState('numbers')"
        ></b-form-radio-group>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width: 250px"
        class="ml-5 w-75"
        >Search</b-button
      >
    </b-form>
    <!--<div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <div>
      <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
    </div>-->
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Search failed: {{ form.submitError }}
    </b-alert>
    <div v-if="recipes.length">
      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="Sort By:"
        label-for="sort"
      >
        <b-form-radio-group
          id="sort"
          v-model="$v.form.sort.$model"
          :options="sort"
          :state="validateState('sort')"
          @input="sortItems"
        ></b-form-radio-group>
      </b-form-group>

      <!--<b-container>
     <b-row v-for="row in nrows" :key="row">
        <b-col v-for="col in 3" :key="col">
          {{(row-1) * 3 +(col-1)}} 
          {{sortedItems.length}}
          <RecipePreview class="recipePreview" :recipe="sortedItems[(row-1) * 3 +(col-1)]" v-if="(row-1) * 3 + (col-1) < sortedItems.length" />
        </b-col>
      </b-row>
</b-container>-->
      <!--<b-row v-for="r in sortedItems" :key="r.id">-->
      <!--<b-col v-for="r in recipes" :key="r.id"> -->
      <!-- <RecipePreview class="recipePreview" :recipe="r" />-->
      <!--</b-col>-->
      <!--</b-row> -->

      <b-row v-for="row in nrows" :key="row">
        <b-col v-for="col in 3" :key="col">
          <!--   {{recipes.length}} -->
          <RecipePreview
            class="recipePreview"
            type="spoonacular"
            :recipe="sortedItems[(row - 1) * 3 + (col - 1)]"
            v-if="(row - 1) * 3 + (col - 1) < sortedItems.length"
          />
        </b-col>
      </b-row>
    </div>
    <div v-if="not_found">
      <img src="../assets/noResultsFound.png" class="noResults" />
    </div>

    <!--<b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container> -->

    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>
<script>
import RecipePreview from "../components/RecipePreview.vue";
import Multiselect from "vue-multiselect";
import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import numbers from "../assets/numbers";
import intolerances from "../assets/intolerances";
import sort from "../assets/sort";

//import Multiselect from "../components/multiselect.vue";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Search",
  components: {
    Multiselect,
    RecipePreview,
  },
  /* props: {
    title: {
      type: String,
      required: true
    }
  },*/
  data() {
    return {
      form: {
        dish_name: "",
        firstName: "",
        lastName: "",
        selected: [],
        cuisines: [],
        cuisines3: [],
        numbers: 5,
        diets: null,
        intolerances: [],
        intolerances_list: [],
        submitError: undefined,
        sort: "readyMinutes",
      },
      numbers: [],
      diets: [{ value: null, text: "None", disabled: false }],
      cuisines: [],
      intolerances: [],
      errors: [],
      recipes: [],
      validated: false,
      sort: [],
      not_found: false,
    };
  },
  validations: {
    form: {
      dish_name: {
        required,
        // length: (u) => minLength(3)(u) && maxLength(8)(u),
        // alpha,
      },
      cuisines: {
        // required,
      },
      cuisines3: {
        // required,
      },

      diets: {
        //required,
      },
      numbers: {
        //required,
      },
      intolerances: {
        //required,
      },
      intolerances_list: {
        //required,
      },
      sort: {},

      password: {
        //required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      },
      confirmedPassword: {
        // required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  computed: {
    sortedItems() {
      return this.recipes;
    },
    nrows() {
      return Math.floor((this.sortedItems.length - 1) / 3) + 1;
    },
    nrowsLastSearch() {
      return Math.floor((this.sortedItems.length - 1) / 3) + 1;
    },
  },

  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.numbers.push(...numbers);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    this.sort.push(...sort);
    console.log(this.$route.params.dish_name);
    if (this.$route.params.dish_name != undefined) {
      // conslole.log(this.$route.params.dish_name);
      console.log("here");
      this.searchFromNav(this.$route.params.dish_name);
    }
    if (this.$root.store.username.length & this.$root.store.lastSearch.length) {
      this.recipes = this.$root.store.lastSearch;
    }
    // console.log($v);
  },

  methods: {
    sortItems() {
      if (this.form.sort == "Popularity") {
        this.recipes.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
      } else if (this.form.sort == "readyMinutes") {
        this.recipes.sort((a, b) =>
          a.readyInMinutes > b.readyInMinutes ? 1 : -1
        );
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async searchFromNav(dishName) {
      try {
        console.log(this.form.cuisines);
        this.form.cuisines3 = this.form.cuisines.map(({ id, label }) => {
          return label;
        });
        this.form.intolerances_list = this.form.intolerances.map(
          ({ id, label }) => {
            return label;
          }
        );
        const response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          //this.$root.store.server_domain + "/Register",
          process.env.VUE_APP_ROOT_API + "/recipes/search",
          {
            params: {
              dishName: dishName,
              number: 5,
            },
            //  password: this.form.password,
          }
        );
        // this.$router.push("/login");
        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(response.data);

        if (response.status == 204) {
          this.not_found = true;
        }

        this.recipes.sort((a, b) =>
          a.readyInMinutes < b.readyInMinutes ? -1 : 1
        );
        if (this.recipes.length & this.$root.store.username.length) {
          //sessionStorage.setItem('last_search',this.search_results);

          this.$root.store.updateLastSearch(this.recipes);
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    async Search() {
      try {
        console.log(this.form.cuisines);
        this.form.cuisines3 = this.form.cuisines.map(({ id, label }) => {
          return label;
        });
        this.form.intolerances_list = this.form.intolerances.map(
          ({ id, label }) => {
            return label;
          }
        );
        const response = await this.axios.get(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          //this.$root.store.server_domain + "/Register",
          process.env.VUE_APP_ROOT_API + "/recipes/search",
          {
            params: {
              dishName: this.form.dish_name,
              cuisine: this.form.cuisines3.join(","),
              diets: this.form.diets,
              intolerances: this.form.intolerances_list.join(","),
              number: this.form.numbers,
            },
            //  password: this.form.password,
          }
        );
        // this.$router.push("/login");
        console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(response.data);
        if (response.status == 204) {
          this.not_found = true;
        }
        this.recipes.sort((a, b) =>
          a.readyInMinutes < b.readyInMinutes ? -1 : 1
        );
        if (this.recipes.length & this.$root.store.username.length) {
          this.$root.store.updateLastSearch(this.recipes);
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onSearch() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Search();
    },
    onReset() {
      this.form = {
        dish_name: "",
        firstName: "",
        lastName: "",
        selected: [],
        cuisines: [],
        cuisines3: [],
        diets: null,
        numbers: 5,
        intolerances: [],
        intolerances_list: [],
        password: "",
        confirmedPassword: "",
        email: "",
        recipes: [],
        sortedRecipes: [],
        sort: "readyMinutes",
        not_found: false,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.container {
  /*background-color: antiquewhite;*/
  max-width: 70%;
  margin-top: 2%;
}
.noResults {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
h1.title{
  margin-top: 2%;
  display: block;
  text-align: center;

}
</style>
