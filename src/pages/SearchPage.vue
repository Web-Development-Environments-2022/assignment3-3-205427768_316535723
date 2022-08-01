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
      <div class="mt-2">
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
    </div>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Search failed: {{ form.submitError }}
    </b-alert>

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
   // RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
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
      },
      numbers: [],
      diets: [{ value: null, text: "None", disabled: false }],
      cuisines: [],
      intolerances: [],
      errors: [],
      validated: false,
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
  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.numbers.push(...numbers);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    // console.log($v);
  },

  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      try {
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
  max-width: 500px;
}
</style>
