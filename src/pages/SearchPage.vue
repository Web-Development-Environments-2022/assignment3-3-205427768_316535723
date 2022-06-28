<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
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

      <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
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
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
        ></b-form-checkbox-group>
        <b-form-invalid-feedback> Country is required </b-form-invalid-feedback>
      </b-form-group>
      <div>
        Selected: <strong>{{ selected }}</strong>
      </div>
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
        <b-form-invalid-feedback> Country is required </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width: 250px"
        class="ml-5 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>
<script>
//import cuisines from "../assets/cuisines";
import diets from "../assets/diets";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        dish_name: "",
        firstName: "",
        lastName: "",
      /*  selected:[],
        options: [
          { text: "African", value: "African" },
          { text: "American", value: "American" },
          { text: "British", value: "British" },
          { text: "Cajun", value: "Cajun" },
          { text: "Caribbean", value: "Caribbean" },
          { text: "Chinese", value: "Chinese" },
          { text: "Eastern European", value: "Eastern European" },
          { text: "European", value: "European" },
          { text: "French", value: "French" },
          { text: "German", value: "German" },
          { text: "Greek", value: "Greek" },
          { text: "Indian", value: "Indian" },
          { text: "Irish", value: "Irish" },
          { text: "Italian", value: "Italian" },
          { text: "Japanese", value: "Japanese" },
          { text: "Jewish", value: "Jewish" },
          { text: "Korean", value: "Korean" },
          { text: "Latin American", value: "Latin American" },
          { text: "Mediterranean", value: "Mediterranean" },
          { text: "Mexican", value: "Mexican" },
          { text: "Middle Eastern", value: "Middle Eastern" },
          { text: "Nordic", value: "Nordic" },
          { text: "Southern", value: "Southern" },
          { text: "Spanish", value: "Spanish" },
          { text: "Thai", value: "Thai" },
          { text: "Vietnamese", value: "Vietnamese" },
        ],*/
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' }
        ],
        diets: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined,
      },

      diets: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      dish_name: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      cuisines: {
       // required,
      },
      diets: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  mounted() {
    // console.log("mounted");
    // this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          //this.$root.store.server_domain + "/Register",
          process.env.VUE_APP_ROOT_API + "/Register",
          {
            dishName: this.form.dish_name,
            password: this.form.password,
          }
        );
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        dish_name: "",
        firstName: "",
        lastName: "",
        cuisines: null,
        diets: null,
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
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
