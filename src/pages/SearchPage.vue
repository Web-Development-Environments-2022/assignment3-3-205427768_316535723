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
<b-container>
     <b-row v-for="row in nrows" :key="row">
        <b-col v-for="col in 3" :key="col">
          <!--{{(row-1) * 3 +(col-1)}} 
          {{sortedItems.length}}-->
          <RecipePreview class="recipePreview" :recipe="sortedItems[(row-1) * 3 +(col-1)]" v-if="(row-1) * 3 + (col-1) < sortedItems.length" />
        </b-col>
      </b-row>
</b-container>
    <!--<b-row v-for="r in sortedItems" :key="r.id">-->
       <!--<b-col v-for="r in recipes" :key="r.id"> -->
     <!-- <RecipePreview class="recipePreview" :recipe="r" />-->
       <!--</b-col>-->
    <!--</b-row> -->

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
  },

  mounted() {
    // console.log("mounted");
    this.cuisines.push(...cuisines);
    this.numbers.push(...numbers);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
    this.sort.push(...sort);
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
        /*    const response = await this.axios.get(
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
        console.log(response.data);*/
        this.recipes = [
          {
            id: 658585,
            title: "Roasted Fish Bruschetta",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/658585-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Preheat oven to 475 degrees F.",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                        temperature: {
                          number: 475,
                          unit: "Fahrenheit",
                        },
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Heat a sauce pan over medium heat.",
                    ingredients: [
                      {
                        id: 0,
                        name: "sauce",
                        localizedName: "sauce",
                        image: "",
                      },
                    ],
                    equipment: [
                      {
                        id: 404669,
                        name: "sauce pan",
                        localizedName: "sauce pan",
                        image: "sauce-pan.jpg",
                      },
                    ],
                  },
                  {
                    number: 3,
                    step: "Add 1 Tb. of oil, onions and anchovies.",
                    ingredients: [
                      {
                        id: 15001,
                        name: "anchovies",
                        localizedName: "anchovies",
                        image: "anchovies.jpg",
                      },
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Saute for 2 minutes, then add the garlic, tomatoes and tomato paste. Salt and pepper to taste.Bring to a boil and reduce heat to a simmer. Simmer 10-15 minutes.Meanwhile, pat the fish with a paper towel. Then lightly oil, salt and pepper on both sides. Roast on a rimmed baking sheet for 6-8 minutes--depending on the thickness of the fish.",
                    ingredients: [
                      {
                        id: 1102047,
                        name: "salt and pepper",
                        localizedName: "salt and pepper",
                        image: "salt-and-pepper.jpg",
                      },
                      {
                        id: 11887,
                        name: "tomato paste",
                        localizedName: "tomato paste",
                        image: "tomato-paste.jpg",
                      },
                      {
                        id: 11529,
                        name: "tomato",
                        localizedName: "tomato",
                        image: "tomato.png",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 10115261,
                        name: "fish",
                        localizedName: "fish",
                        image: "fish-fillet.jpg",
                      },
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404727,
                        name: "baking sheet",
                        localizedName: "baking sheet",
                        image: "baking-sheet.jpg",
                      },
                      {
                        id: 405895,
                        name: "paper towels",
                        localizedName: "paper towels",
                        image: "paper-towels.jpg",
                      },
                    ],
                    length: {
                      number: 25,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 5,
                    step: "Brush the bread with olive oil and toast in the oven for 3-5 minutes. *You could put them on a lower rack with the fish to save time!Stack the basil leaves.",
                    ingredients: [
                      {
                        id: 2044,
                        name: "fresh basil",
                        localizedName: "fresh basil",
                        image: "fresh-basil.jpg",
                      },
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 18064,
                        name: "bread",
                        localizedName: "bread",
                        image: "white-bread.jpg",
                      },
                      {
                        id: 18070,
                        name: "toast",
                        localizedName: "toast",
                        image: "toast",
                      },
                      {
                        id: 10115261,
                        name: "fish",
                        localizedName: "fish",
                        image: "fish-fillet.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                      },
                    ],
                    length: {
                      number: 5,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 6,
                    step: "Roll them into a tight cylinder. Slice them thin into fine ribbons.To assemble the bruschetta, top bread with a fish fillets. Then add tomato sauce and sprinkle fresh basil ribbons.",
                    ingredients: [
                      {
                        id: 10115261,
                        name: "fish fillets",
                        localizedName: "fish fillets",
                        image: "fish-fillet.jpg",
                      },
                      {
                        id: 11549,
                        name: "tomato sauce",
                        localizedName: "tomato sauce",
                        image: "tomato-sauce-or-pasta-sauce.jpg",
                      },
                      {
                        id: 2044,
                        name: "fresh basil",
                        localizedName: "fresh basil",
                        image: "fresh-basil.jpg",
                      },
                      {
                        id: 18064,
                        name: "bread",
                        localizedName: "bread",
                        image: "white-bread.jpg",
                      },
                      {
                        id: 0,
                        name: "roll",
                        localizedName: "roll",
                        image: "dinner-yeast-rolls.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 7,
                    step: "Serve immediately.",
                    ingredients: [],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 648923,
            title: "King Crab Risotto",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/648923-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Follow all steps here: http://wp.me/pGpdt-bG",
                    ingredients: [],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 648279,
            title: "Italian Tuna Pasta",
            readyInMinutes: 20,
            image: "https://spoonacular.com/recipeImages/648279-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Once pasta is cooked, drain and leave to cool for a minute.",
                    ingredients: [
                      {
                        id: 20420,
                        name: "pasta",
                        localizedName: "pasta",
                        image: "fusilli.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 2,
                    step: "Place small skillet on medium fire, drizzle olive oil, add in red pepper and stir-fry for 1-2 minutes. Put aside.Toss pasta shells, red pepper, tuna, parsley, garlic, chillies and lemon juice. Season with ground black pepper to taste, spoon into serving bowls.",
                    ingredients: [
                      {
                        id: 1002030,
                        name: "ground black pepper",
                        localizedName: "ground black pepper",
                        image: "pepper.jpg",
                      },
                      {
                        id: 11020420,
                        name: "pasta shells",
                        localizedName: "pasta shells",
                        image: "shell-pasta.jpg",
                      },
                      {
                        id: 9152,
                        name: "lemon juice",
                        localizedName: "lemon juice",
                        image: "lemon-juice.jpg",
                      },
                      {
                        id: 11821,
                        name: "red pepper",
                        localizedName: "red pepper",
                        image: "red-pepper.jpg",
                      },
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 11819,
                        name: "chili pepper",
                        localizedName: "chili pepper",
                        image: "red-chili.jpg",
                      },
                      {
                        id: 11297,
                        name: "parsley",
                        localizedName: "parsley",
                        image: "parsley.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 10015121,
                        name: "tuna",
                        localizedName: "tuna",
                        image: "canned-tuna.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 642096,
            title: "Easy Shrimp Scampi",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/642096-312x231.jpg",
            popularity: 27,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "In a large skillet, melt butter and oil.",
                    ingredients: [
                      {
                        id: 1001,
                        name: "butter",
                        localizedName: "butter",
                        image: "butter-sliced.jpg",
                      },
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Add garlic and saute 30 seconds.Stir in wine and lemon juice and cook 1 minute.Stir in shrimp, parsley, salt and pepper. Cook 2-3 minutes over high heat, stir constantly.",
                    ingredients: [
                      {
                        id: 1102047,
                        name: "salt and pepper",
                        localizedName: "salt and pepper",
                        image: "salt-and-pepper.jpg",
                      },
                      {
                        id: 9152,
                        name: "lemon juice",
                        localizedName: "lemon juice",
                        image: "lemon-juice.jpg",
                      },
                      {
                        id: 11297,
                        name: "parsley",
                        localizedName: "parsley",
                        image: "parsley.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                      {
                        id: 14084,
                        name: "wine",
                        localizedName: "wine",
                        image: "red-wine.jpg",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 4,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 3,
                    step: "Serve with pasta or rice.",
                    ingredients: [
                      {
                        id: 20420,
                        name: "pasta",
                        localizedName: "pasta",
                        image: "fusilli.jpg",
                      },
                      {
                        id: 20444,
                        name: "rice",
                        localizedName: "rice",
                        image: "uncooked-white-rice.png",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 659109,
            title: "Salmon Quinoa Risotto",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/659109-312x231.jpg",
            popularity: 3,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "In a 4 quart saucepan, heat 2 tablespoons of olive oil over medium high heat.",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404669,
                        name: "sauce pan",
                        localizedName: "sauce pan",
                        image: "sauce-pan.jpg",
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "When oil is shimmering, add diced onion.",
                    ingredients: [
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 3,
                    step: "Saute onion until transparent.",
                    ingredients: [
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Add quinoa to onion mixture and stir, to toast quinoa, for 2 minutes.",
                    ingredients: [
                      {
                        id: 20035,
                        name: "quinoa",
                        localizedName: "quinoa",
                        image: "uncooked-quinoa.png",
                      },
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                      {
                        id: 18070,
                        name: "toast",
                        localizedName: "toast",
                        image: "toast",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 5,
                    step: "Add 1 cup of vegetable stock to quinoa and onions.",
                    ingredients: [
                      {
                        id: 6615,
                        name: "vegetable stock",
                        localizedName: "vegetable stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                      {
                        id: 20035,
                        name: "quinoa",
                        localizedName: "quinoa",
                        image: "uncooked-quinoa.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 6,
                    step: "Stir until stock is absorbed.  Once stock is absorbed, add 1 cup of stock.",
                    ingredients: [
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 7,
                    step: "Continue stirring until stock is absorbed.",
                    ingredients: [
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 8,
                    step: "Add remaining stock in 1/2 cup intervals, stirring until all stock is absorbed.",
                    ingredients: [
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 9,
                    step: "Remove from heat.",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 10,
                    step: "While preparing the onion quinoa mixture, heat 1 tablespoon of oil in a saute pan with chopped garlic (over medium high heat).",
                    ingredients: [
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 20035,
                        name: "quinoa",
                        localizedName: "quinoa",
                        image: "uncooked-quinoa.png",
                      },
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 11,
                    step: "Once garlic is sizzling, add chopped kale to the pan.",
                    ingredients: [
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 11233,
                        name: "kale",
                        localizedName: "kale",
                        image: "kale.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 12,
                    step: "Turn kale to coat with oil and garlic.",
                    ingredients: [
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 11233,
                        name: "kale",
                        localizedName: "kale",
                        image: "kale.jpg",
                      },
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 13,
                    step: "Turn kale mixture until fragrant (approximately 2 minutes).",
                    ingredients: [
                      {
                        id: 11233,
                        name: "kale",
                        localizedName: "kale",
                        image: "kale.jpg",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 14,
                    step: "Remove kale mixture from heat.",
                    ingredients: [
                      {
                        id: 11233,
                        name: "kale",
                        localizedName: "kale",
                        image: "kale.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 15,
                    step: "Once quinoa is complete, add kale and salmon.",
                    ingredients: [
                      {
                        id: 20035,
                        name: "quinoa",
                        localizedName: "quinoa",
                        image: "uncooked-quinoa.png",
                      },
                      {
                        id: 15076,
                        name: "salmon",
                        localizedName: "salmon",
                        image: "salmon.png",
                      },
                      {
                        id: 11233,
                        name: "kale",
                        localizedName: "kale",
                        image: "kale.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 16,
                    step: "Stir to combine.",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 17,
                    step: "Add salt and pepper to taste.",
                    ingredients: [
                      {
                        id: 1102047,
                        name: "salt and pepper",
                        localizedName: "salt and pepper",
                        image: "salt-and-pepper.jpg",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 1182871,
            title: "Shrimp Scampi Zoodles",
            readyInMinutes: 15,
            image: "https://spoonacular.com/recipeImages/1182871-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Grab the spiralizer and the zucchini and use the chipper blade. (This is one of the three blades that comes with the Paderno.) Use a knife to cut off both ends of the zucchini and then place it into the spiralizer. Turn until you have fresh zoodles.",
                    ingredients: [
                      {
                        id: 11477,
                        name: "zucchini",
                        localizedName: "zucchini",
                        image: "zucchini.jpg",
                      },
                      {
                        id: 0,
                        name: "chipper",
                        localizedName: "chipper",
                        image: "shortbread-cookies.jpg",
                      },
                      {
                        id: 10111477,
                        name: "zucchini noodles",
                        localizedName: "zucchini noodles",
                        image: "zoodles.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404745,
                        name: "knife",
                        localizedName: "knife",
                        image: "chefs-knife.jpg",
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Place a large skillet over medium heat and add 1 tbsp of extra virgin olive oil.",
                    ingredients: [
                      {
                        id: 1034053,
                        name: "extra virgin olive oil",
                        localizedName: "extra virgin olive oil",
                        image: "olive-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 3,
                    step: "Place the fresh zoodles into the skillet and add the garlic and red pepper flakes to flavor things up. Toss zoodles in olive oil and season well. Cover skillet and heat for one minute.",
                    ingredients: [
                      {
                        id: 1032009,
                        name: "red pepper flakes",
                        localizedName: "red pepper flakes",
                        image: "red-pepper-flakes.jpg",
                      },
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 10111477,
                        name: "zucchini noodles",
                        localizedName: "zucchini noodles",
                        image: "zoodles.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                    length: {
                      number: 1,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 4,
                    step: "Remove lid, toss zoodles again, and cover for an additional two minutes.",
                    ingredients: [
                      {
                        id: 10111477,
                        name: "zucchini noodles",
                        localizedName: "zucchini noodles",
                        image: "zoodles.jpg",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 5,
                    step: "Remove from heat and keep covered.",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 6,
                    step: "Add the shrimp to a small skillet over medium-high heat in a tbsp of olive oil. Season with salt and pepper, lemon zest, and sprinkle with parsley. Once the shrimp are heated through, add the zucchini noodles and serve immediately.",
                    ingredients: [
                      {
                        id: 10111477,
                        name: "zucchini noodles",
                        localizedName: "zucchini noodles",
                        image: "zoodles.jpg",
                      },
                      {
                        id: 1102047,
                        name: "salt and pepper",
                        localizedName: "salt and pepper",
                        image: "salt-and-pepper.jpg",
                      },
                      {
                        id: 9156,
                        name: "lemon zest",
                        localizedName: "lemon zest",
                        image: "zest-lemon.jpg",
                      },
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 11297,
                        name: "parsley",
                        localizedName: "parsley",
                        image: "parsley.jpg",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 665446,
            title: "X-Country Double Lobster Risotto",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/665446-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: true,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "*You can use chicken stock, fish stock, or make your own stock using the lobster shells, which is what we did. After cooking, remove lobster to cold water.",
                    ingredients: [
                      {
                        id: 6172,
                        name: "chicken stock",
                        localizedName: "chicken stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 6963,
                        name: "fish stock",
                        localizedName: "fish stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 15147,
                        name: "lobster",
                        localizedName: "lobster",
                        image: "lobster.png",
                      },
                      {
                        id: 11020420,
                        name: "pasta shells",
                        localizedName: "pasta shells",
                        image: "shell-pasta.jpg",
                      },
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 14412,
                        name: "water",
                        localizedName: "water",
                        image: "water.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 2,
                    step: "Add to pot 1 cut up onion, 2 chopped carrots, 2 chopped celery ribs, and a bay leaf. Toss the lobster shells back into the pot as you finish cleaning them of their meat. Simmer, allowing stock to reduce, until ready to use, then strain.",
                    ingredients: [
                      {
                        id: 10111143,
                        name: "celery rib",
                        localizedName: "celery sticks",
                        image: "celery.jpg",
                      },
                      {
                        id: 2004,
                        name: "bay leaves",
                        localizedName: "bay leaves",
                        image: "bay-leaves.jpg",
                      },
                      {
                        id: 11124,
                        name: "carrot",
                        localizedName: "carrot",
                        image: "sliced-carrot.png",
                      },
                      {
                        id: 15147,
                        name: "lobster",
                        localizedName: "lobster",
                        image: "lobster.png",
                      },
                      {
                        id: 11020420,
                        name: "pasta shells",
                        localizedName: "pasta shells",
                        image: "shell-pasta.jpg",
                      },
                      {
                        id: 11282,
                        name: "onion",
                        localizedName: "onion",
                        image: "brown-onion.png",
                      },
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 1065062,
                        name: "meat",
                        localizedName: "meat",
                        image: "whole-chicken.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404752,
                        name: "pot",
                        localizedName: "pot",
                        image: "stock-pot.jpg",
                      },
                    ],
                  },
                  {
                    number: 3,
                    step: "Saute shallots, garlic, celery, and mushrooms in butter over medium-high heat. When the shallots are translucent, pour in the sherry and continue cooking until most of the alcohol has evaporated, then add the rice and stir to coat thoroughly, cooking another couple minutes.",
                    ingredients: [
                      {
                        id: 11260,
                        name: "mushrooms",
                        localizedName: "mushrooms",
                        image: "mushrooms.png",
                      },
                      {
                        id: 11677,
                        name: "shallot",
                        localizedName: "shallot",
                        image: "shallots.jpg",
                      },
                      {
                        id: 14037,
                        name: "alcohol",
                        localizedName: "alcohol",
                        image: "rum-dark.jpg",
                      },
                      {
                        id: 1001,
                        name: "butter",
                        localizedName: "butter",
                        image: "butter-sliced.jpg",
                      },
                      {
                        id: 11143,
                        name: "celery",
                        localizedName: "celery",
                        image: "celery.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 10214106,
                        name: "sherry",
                        localizedName: "sherry",
                        image: "dry-sherry.png",
                      },
                      {
                        id: 20444,
                        name: "rice",
                        localizedName: "rice",
                        image: "uncooked-white-rice.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Begin adding ladlefuls of warm stock in your preferred risotto style. I like this risotto creamy but not overly wet. Continue until the rice is cooked yet still al dente.",
                    ingredients: [
                      {
                        id: 1006615,
                        name: "stock",
                        localizedName: "stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 20444,
                        name: "rice",
                        localizedName: "rice",
                        image: "uncooked-white-rice.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 5,
                    step: "Meanwhile, chop up lobster meat to desired size, reserving large hunks of claw meat as garnish. When risotto is done, remove from heat and mix in Parmesan and lobster pieces.",
                    ingredients: [
                      {
                        id: 10115147,
                        name: "lobster meat",
                        localizedName: "lobster meat",
                        image: "lobster.png",
                      },
                      {
                        id: 1033,
                        name: "parmesan",
                        localizedName: "parmesan",
                        image: "parmesan.jpg",
                      },
                      {
                        id: 15147,
                        name: "lobster",
                        localizedName: "lobster",
                        image: "lobster.png",
                      },
                      {
                        id: 1065062,
                        name: "meat",
                        localizedName: "meat",
                        image: "whole-chicken.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 6,
                    step: "Sprinkle plated risotto with chopped herbs.",
                    ingredients: [
                      {
                        id: 1002044,
                        name: "herbs",
                        localizedName: "herbs",
                        image: "mixed-fresh-herbs.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 7,
                    step: 'Pair with a medium to full-bodied white that isn\'t too oaky. Our local shop recommended an Argiolas Vermentino di Sardegna Costamolino 2008, which the New York Times called their favorite as well as "Best Value" in a recent roundup of Italian vermentinos.',
                    ingredients: [
                      {
                        id: 0,
                        name: "vermentino",
                        localizedName: "vermentino",
                        image: "white-wine.jpg",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 650651,
            title: "Make It Quick Italian Shrimp Rolls",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/650651-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Preheat broiler.",
                    ingredients: [],
                    equipment: [
                      {
                        id: 405914,
                        name: "broiler",
                        localizedName: "broiler",
                        image: "oven.jpg",
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Mix shrimp with spaghetti sauce and microwave for 1 1/2 - 2 minutes until heated through.",
                    ingredients: [
                      {
                        id: 10011549,
                        name: "pasta sauce",
                        localizedName: "pasta sauce",
                        image: "tomato-sauce-or-pasta-sauce.jpg",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404762,
                        name: "microwave",
                        localizedName: "microwave",
                        image: "microwave.jpg",
                      },
                    ],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 3,
                    step: "Sprinkle parmesan cheese on hoagie rolls and toast under the broiler until cheese melts.",
                    ingredients: [
                      {
                        id: 1033,
                        name: "parmesan",
                        localizedName: "parmesan",
                        image: "parmesan.jpg",
                      },
                      {
                        id: 1041009,
                        name: "cheese",
                        localizedName: "cheese",
                        image: "cheddar-cheese.png",
                      },
                      {
                        id: 0,
                        name: "roll",
                        localizedName: "roll",
                        image: "dinner-yeast-rolls.jpg",
                      },
                      {
                        id: 18070,
                        name: "toast",
                        localizedName: "toast",
                        image: "toast",
                      },
                    ],
                    equipment: [
                      {
                        id: 405914,
                        name: "broiler",
                        localizedName: "broiler",
                        image: "oven.jpg",
                      },
                    ],
                  },
                  {
                    number: 4,
                    step: "Top each roll with half the shrimp mixture and spinach leaves.",
                    ingredients: [
                      {
                        id: 10011457,
                        name: "spinach",
                        localizedName: "spinach",
                        image: "spinach.jpg",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                      {
                        id: 0,
                        name: "roll",
                        localizedName: "roll",
                        image: "dinner-yeast-rolls.jpg",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 660366,
            title: "Smoked Salmon and Mascarpone Calzone",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/660366-312x231.jpg",
            popularity: 5,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Preheat your oven to 450F and place the top rack in the lower third of your oven.  Like a baking sheet with parchment paper (optional, for easier cleanup).Wash and pat dry the leek.  Slice the leek lengthwise, then cut each half into long, very thin strips.",
                    ingredients: [
                      {
                        id: 11246,
                        name: "leek",
                        localizedName: "leek",
                        image: "leeks.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404770,
                        name: "baking paper",
                        localizedName: "baking paper",
                        image: "baking-paper.jpg",
                      },
                      {
                        id: 404727,
                        name: "baking sheet",
                        localizedName: "baking sheet",
                        image: "baking-sheet.jpg",
                      },
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                        temperature: {
                          number: 450,
                          unit: "Fahrenheit",
                        },
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Cut the strips into short pieces, about  long.  Set aside.Divide the dough into two equal parts, and roll out each into a 10 circle.  Gently spread a thin layer of mascarpone on the surface of the dough, leaving at least a  crust.In a small bowl, break up the smoked salmon using your fingers until it is fluffy.  You want the filling of the calzone to be pretty even, or it will fall apart as you eat it.Divide the salmon between the two crusts, arranging it only on one side of the crust (in a half-moon shape), again leave at least a  crust.",
                    ingredients: [
                      {
                        id: 15077,
                        name: "smoked salmon",
                        localizedName: "smoked salmon",
                        image: "smoked-salmon.png",
                      },
                      {
                        id: 93820,
                        name: "mascarpone",
                        localizedName: "mascarpone",
                        image: "white-cream-fluffy.jpg",
                      },
                      {
                        id: 15076,
                        name: "salmon",
                        localizedName: "salmon",
                        image: "salmon.png",
                      },
                      {
                        id: 0,
                        name: "spread",
                        localizedName: "spread",
                        image: "",
                      },
                      {
                        id: 0,
                        name: "crust",
                        localizedName: "crust",
                        image: "",
                      },
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                      {
                        id: 0,
                        name: "roll",
                        localizedName: "roll",
                        image: "dinner-yeast-rolls.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                  },
                  {
                    number: 3,
                    step: "Sprinkle the chives and leeks over the salmon, then lightly salt and pepper.  Finally, drizzle with about 1 tsp of olive oil.Fold each calzone in half, making sure that the crusts line up.  Using the tines of a fork, gently press down the edge all the way around the rounded side of the calzone to seal it.  Make sure you get a tight seal  this will help the calzone puff up during baking.",
                    ingredients: [
                      {
                        id: 1102047,
                        name: "salt and pepper",
                        localizedName: "salt and pepper",
                        image: "salt-and-pepper.jpg",
                      },
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 11156,
                        name: "chives",
                        localizedName: "chives",
                        image: "fresh-chives.jpg",
                      },
                      {
                        id: 15076,
                        name: "salmon",
                        localizedName: "salmon",
                        image: "salmon.png",
                      },
                      {
                        id: 11246,
                        name: "leek",
                        localizedName: "leek",
                        image: "leeks.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Brush the tops of each calzone with egg white.",
                    ingredients: [
                      {
                        id: 1124,
                        name: "egg whites",
                        localizedName: "egg whites",
                        image: "egg-white.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 5,
                    step: "Bake at 450F for about 15 minutes, or until golden brown and delicious.",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                        temperature: {
                          number: 450,
                          unit: "Fahrenheit",
                        },
                      },
                    ],
                    length: {
                      number: 15,
                      unit: "minutes",
                    },
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 1697663,
            title: "for Shrimp Scampi with Garlic and Lemon",
            readyInMinutes: 30,
            image: "https://spoonacular.com/recipeImages/1697663-312x231.jpg",
            popularity: 0,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Clean and pat dry shrimp",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 2,
                    step: "Toss with 1 Tbsp olive oil (keep remaining 2 Tbsp for later), salt, pepper, lemon zest, and hot pepper flakes",
                    ingredients: [
                      {
                        id: 11819,
                        name: "chili pepper",
                        localizedName: "chili pepper",
                        image: "red-chili.jpg",
                      },
                      {
                        id: 9156,
                        name: "lemon zest",
                        localizedName: "lemon zest",
                        image: "zest-lemon.jpg",
                      },
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 1002030,
                        name: "pepper",
                        localizedName: "pepper",
                        image: "pepper.jpg",
                      },
                      {
                        id: 2047,
                        name: "salt",
                        localizedName: "salt",
                        image: "salt.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 3,
                    step: "Mix and marinate no longer than 30 minutes. If you marinate for more than 20 minutes, you’ll start making ceviche (another delicious way to prepare shrimp, but that’s not our goal here)",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 50,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 4,
                    step: "Grab a pan and heat the remaining 2 Tbsp olive oil over medium heat",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 5,
                    step: "Add shallots and cook for about 2 minutes",
                    ingredients: [
                      {
                        id: 11677,
                        name: "shallot",
                        localizedName: "shallot",
                        image: "shallots.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 6,
                    step: "Add garlic and cook for another 2 minutes",
                    ingredients: [
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 7,
                    step: "Add white wine and cook until reduced by half, about 3 minutes",
                    ingredients: [
                      {
                        id: 14106,
                        name: "white wine",
                        localizedName: "white wine",
                        image: "white-wine.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 8,
                    step: "Add butter and marinated shrimp",
                    ingredients: [
                      {
                        id: 1001,
                        name: "butter",
                        localizedName: "butter",
                        image: "butter-sliced.jpg",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 9,
                    step: "Cook shrimp just until they’re pink on the outside...just a couple minutes.",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 10,
                    step: "Add chicken stock (or a mixture of chicken and seafood stock)",
                    ingredients: [
                      {
                        id: 6172,
                        name: "chicken stock",
                        localizedName: "chicken stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 6963,
                        name: "seafood stock",
                        localizedName: "seafood stock",
                        image: "chicken-broth.png",
                      },
                      {
                        id: 5006,
                        name: "whole chicken",
                        localizedName: "whole chicken",
                        image: "whole-chicken.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 11,
                    step: "Add pasta and bring to a boil. Reduce to a low boil and put the lid on.",
                    ingredients: [
                      {
                        id: 20420,
                        name: "pasta",
                        localizedName: "pasta",
                        image: "fusilli.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 12,
                    step: "Once the pasta is al dente, serve and sprinkle with some chopped chives (or Italian flat leaf parsley)",
                    ingredients: [
                      {
                        id: 10311297,
                        name: "flat leaf parsley",
                        localizedName: "flat leaf parsley",
                        image: "parsley.jpg",
                      },
                      {
                        id: 11156,
                        name: "chives",
                        localizedName: "chives",
                        image: "fresh-chives.jpg",
                      },
                      {
                        id: 20420,
                        name: "pasta",
                        localizedName: "pasta",
                        image: "fusilli.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 13,
                    step: "Add lemon juice - only if needed. Taste first.",
                    ingredients: [
                      {
                        id: 9152,
                        name: "lemon juice",
                        localizedName: "lemon juice",
                        image: "lemon-juice.jpg",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 640314,
            title: "Crab Ravioli With Scallops and Gremolata",
            readyInMinutes: 45,
            image: "https://spoonacular.com/recipeImages/640314-312x231.jpg",
            popularity: 1,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Heat oil in saut pan.",
                    ingredients: [
                      {
                        id: 4582,
                        name: "cooking oil",
                        localizedName: "cooking oil",
                        image: "vegetable-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Add chopped shallots. Saut until translucent.",
                    ingredients: [
                      {
                        id: 11677,
                        name: "shallot",
                        localizedName: "shallot",
                        image: "shallots.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 3,
                    step: "Add crab meat, salt, pepper and red pepper flakes. Saut until warmed through. Take off heat and cool.Once filling is cooled add ricotta.Separate out the lasagna sheets or wonton wrappers.",
                    ingredients: [
                      {
                        id: 1032009,
                        name: "red pepper flakes",
                        localizedName: "red pepper flakes",
                        image: "red-pepper-flakes.jpg",
                      },
                      {
                        id: 10018368,
                        name: "wonton wrappers",
                        localizedName: "wonton wrappers",
                        image: "wonton-wrappers.jpg",
                      },
                      {
                        id: 10620420,
                        name: "lasagne noodles",
                        localizedName: "lasagne noodles",
                        image: "lasagna-noodles.jpg",
                      },
                      {
                        id: 10015136,
                        name: "crabmeat",
                        localizedName: "crabmeat",
                        image: "crabmeat.jpg",
                      },
                      {
                        id: 1036,
                        name: "ricotta cheese",
                        localizedName: "ricotta cheese",
                        image: "ricotta.png",
                      },
                      {
                        id: 1002030,
                        name: "pepper",
                        localizedName: "pepper",
                        image: "pepper.jpg",
                      },
                      {
                        id: 2047,
                        name: "salt",
                        localizedName: "salt",
                        image: "salt.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Place about 1 tbls of filling on center of sheet (you don't want too much or filing will come out when cooking).",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 5,
                    step: "Place dollops of filling about 2-3 inches apart.",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 6,
                    step: "Brush egg white around the filling.",
                    ingredients: [
                      {
                        id: 1124,
                        name: "egg whites",
                        localizedName: "egg whites",
                        image: "egg-white.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 7,
                    step: "Place another sheet on top of the sheet with filling.",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 8,
                    step: "Cut out rounds with a cookie cutter (or a glass - whatever works).With a fork, press the sides of rounds together to prevent them from separating during cooking.Bring pot of water to a boil.",
                    ingredients: [
                      {
                        id: 10118192,
                        name: "cookies",
                        localizedName: "cookies",
                        image: "shortbread-cookies.jpg",
                      },
                      {
                        id: 14412,
                        name: "water",
                        localizedName: "water",
                        image: "water.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 221429,
                        name: "cookie cutter",
                        localizedName: "cookie cutter",
                        image: "cookie-cutters.jpg",
                      },
                      {
                        id: 404752,
                        name: "pot",
                        localizedName: "pot",
                        image: "stock-pot.jpg",
                      },
                    ],
                  },
                  {
                    number: 9,
                    step: "Add finished ravioli to pot of boiling water. Cook about 6 minutes, or until done.After they are done place on paper towel to absorb water.",
                    ingredients: [
                      {
                        id: 93832,
                        name: "ravioli",
                        localizedName: "ravioli",
                        image: "ravioli.png",
                      },
                      {
                        id: 14412,
                        name: "water",
                        localizedName: "water",
                        image: "water.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 405895,
                        name: "paper towels",
                        localizedName: "paper towels",
                        image: "paper-towels.jpg",
                      },
                      {
                        id: 404752,
                        name: "pot",
                        localizedName: "pot",
                        image: "stock-pot.jpg",
                      },
                    ],
                    length: {
                      number: 6,
                      unit: "minutes",
                    },
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 1697557,
            title: "Cast Iron Shrimp Pizza with Pecan Basil Pesto",
            readyInMinutes: 30,
            image: "https://spoonacular.com/recipeImages/1697557-312x231.jpg",
            popularity: 0,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Pizza Dough",
                    ingredients: [
                      {
                        id: 93610,
                        name: "pizza dough",
                        localizedName: "pizza dough",
                        image: "pizza-dough.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 2,
                    step: "**These dough instructions are for using a stand mixer, but mixing by hand works just as well, it just takes a little longer. ",
                    ingredients: [
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                    ],
                    equipment: [
                      {
                        id: 404665,
                        name: "stand mixer",
                        localizedName: "stand mixer",
                        image: "stand-mixer.jpg",
                      },
                    ],
                  },
                  {
                    number: 3,
                    step: "In a Kitchen",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Aid stand mixer bowl, using a spoon, stir together warm water, yeast, and sugar.",
                    ingredients: [
                      {
                        id: 19335,
                        name: "sugar",
                        localizedName: "sugar",
                        image: "sugar-in-bowl.png",
                      },
                      {
                        id: 14412,
                        name: "water",
                        localizedName: "water",
                        image: "water.png",
                      },
                      {
                        id: 18375,
                        name: "yeast",
                        localizedName: "yeast",
                        image: "yeast-granules.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404665,
                        name: "stand mixer",
                        localizedName: "stand mixer",
                        image: "stand-mixer.jpg",
                      },
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                  },
                  {
                    number: 5,
                    step: "Let sit for five minutes or until it becomes frothy. Then, add olive oil and stir again.",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 5,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 6,
                    step: "In a separate bowl, mix flour and salt. ",
                    ingredients: [
                      {
                        id: 20081,
                        name: "all purpose flour",
                        localizedName: "all purpose flour",
                        image: "flour.png",
                      },
                      {
                        id: 2047,
                        name: "salt",
                        localizedName: "salt",
                        image: "salt.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                  },
                  {
                    number: 7,
                    step: "Using the dough hook attachment, turn your stand mixer on to a low-medium speed (about 3 or 4). Slowly add the flour mixture while the dough hook is turning.",
                    ingredients: [
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                      {
                        id: 20081,
                        name: "all purpose flour",
                        localizedName: "all purpose flour",
                        image: "flour.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404665,
                        name: "stand mixer",
                        localizedName: "stand mixer",
                        image: "stand-mixer.jpg",
                      },
                    ],
                  },
                  {
                    number: 8,
                    step: "Mix until dough pulls away from the sides of the bowl, about two minutes.",
                    ingredients: [
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                    ],
                    equipment: [
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 9,
                    step: "Form dough into a ball. ",
                    ingredients: [
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 10,
                    step: "Grease a large bowl with olive oil, place the dough ball in the bowl, and turn it over and over so that all sides of the dough are oiled. Cover with a towel and place in a warm spot for about one hour, until the dough has doubled in size.",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                    ],
                    equipment: [
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                    length: {
                      number: 60,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 11,
                    step: "Pesto",
                    ingredients: [
                      {
                        id: 93698,
                        name: "pesto",
                        localizedName: "pesto",
                        image: "basil-pesto.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 12,
                    step: "If you have time, mix all ingredients in a mortar and pestle until the desired consistency is reached. If not, put all ingredients in a food processor and do the same, just faster.",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404751,
                        name: "mortar and pestle",
                        localizedName: "mortar and pestle",
                        image: "mortar-and-pestle.jpg",
                      },
                      {
                        id: 404771,
                        name: "food processor",
                        localizedName: "food processor",
                        image: "food-processor.png",
                      },
                    ],
                  },
                  {
                    number: 13,
                    step: "Prepare the shrimp",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 14,
                    step: "Depending on what kind of shrimp you use, defrost, peel, devein, and pat them dry. ",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 15,
                    step: "Butterfly the shrimp by using a knife and making a cut along the back, about halfway through the shrimp.",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404745,
                        name: "knife",
                        localizedName: "knife",
                        image: "chefs-knife.jpg",
                      },
                    ],
                  },
                  {
                    number: 16,
                    step: "Place the shrimp on the chopping board and press down lightly with your hand. Or don’t butterfly them. It’s a personal thing. Say what?",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404716,
                        name: "cutting board",
                        localizedName: "cutting board",
                        image: "cutting-board.jpg",
                      },
                    ],
                  },
                  {
                    number: 17,
                    step: "Place the shrimp in a bowl, add lemon juice, red pepper flakes, salt, and pepper, and mix. ",
                    ingredients: [
                      {
                        id: 1032009,
                        name: "red pepper flakes",
                        localizedName: "red pepper flakes",
                        image: "red-pepper-flakes.jpg",
                      },
                      {
                        id: 9152,
                        name: "lemon juice",
                        localizedName: "lemon juice",
                        image: "lemon-juice.jpg",
                      },
                      {
                        id: 1002030,
                        name: "pepper",
                        localizedName: "pepper",
                        image: "pepper.jpg",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                      {
                        id: 2047,
                        name: "salt",
                        localizedName: "salt",
                        image: "salt.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404783,
                        name: "bowl",
                        localizedName: "bowl",
                        image: "bowl.jpg",
                      },
                    ],
                  },
                  {
                    number: 18,
                    step: "Putting it all together",
                    ingredients: [],
                    equipment: [],
                  },
                  {
                    number: 19,
                    step: "Preheat the oven to 425°F.",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                        temperature: {
                          number: 425,
                          unit: "Fahrenheit",
                        },
                      },
                    ],
                  },
                  {
                    number: 20,
                    step: "On the stovetop, over medium heat, heat butter in the cast iron Lodge pan until it bubbles.",
                    ingredients: [
                      {
                        id: 1001,
                        name: "butter",
                        localizedName: "butter",
                        image: "butter-sliced.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404794,
                        name: "stove",
                        localizedName: "stove",
                        image: "oven.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 21,
                    step: "Add shrimp mixture and stir for about three minutes. The shrimp will turn and pink and curl up.",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 3,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 22,
                    step: "Remove the cooked shrimp and wipe the pan clean with a paper towel.",
                    ingredients: [
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 405895,
                        name: "paper towels",
                        localizedName: "paper towels",
                        image: "paper-towels.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 23,
                    step: "Place the empty pan in the hot oven for about 5 minutes. ",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                    length: {
                      number: 5,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 24,
                    step: "While the pan is heating up, roll out the dough on a lightly floured surface, to a size that’s just slightly larger than the pan.",
                    ingredients: [
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                      {
                        id: 0,
                        name: "roll",
                        localizedName: "roll",
                        image: "dinner-yeast-rolls.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 25,
                    step: "Carefully remove the hot pan from the oven and place the dough directly into it.",
                    ingredients: [
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                    ],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 26,
                    step: "Cut off any dough that’s overhanging the edges. You can add some semolina into the pan first if it’s not super non-stick, to prevent your dough from sticking. ",
                    ingredients: [
                      {
                        id: 20066,
                        name: "semolina",
                        localizedName: "semolina",
                        image: "cornmeal.png",
                      },
                      {
                        id: 0,
                        name: "dough",
                        localizedName: "dough",
                        image: "pizza-dough",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 27,
                    step: "Pour pesto on top and spread evenly.",
                    ingredients: [
                      {
                        id: 0,
                        name: "spread",
                        localizedName: "spread",
                        image: "",
                      },
                      {
                        id: 93698,
                        name: "pesto",
                        localizedName: "pesto",
                        image: "basil-pesto.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 28,
                    step: "Add shredded or sliced mozzarella and finish by adding the cooked shrimp on top.",
                    ingredients: [
                      {
                        id: 1026,
                        name: "mozzarella",
                        localizedName: "mozzarella",
                        image: "mozzarella.png",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 29,
                    step: "Place the pan back in the oven (middle rack) and bake for about 10 minutes. Use your eyes and nose to decide when it’s done. ",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404784,
                        name: "oven",
                        localizedName: "oven",
                        image: "oven.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                    length: {
                      number: 10,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 30,
                    step: "Carefully remove the hot pan and slide the pizza onto a cutting board. ",
                    ingredients: [],
                    equipment: [
                      {
                        id: 404716,
                        name: "cutting board",
                        localizedName: "cutting board",
                        image: "cutting-board.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 31,
                    step: "Serve hot. ",
                    ingredients: [],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
          {
            id: 1697675,
            title: "Shrimp Fettuccine Alfredo, Mamma Mia that's good",
            readyInMinutes: 40,
            image: "https://spoonacular.com/recipeImages/1697675-312x231.jpg",
            popularity: 0,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            instructions: [
              {
                name: "",
                steps: [
                  {
                    number: 1,
                    step: "Thaw, clean, and rinse shrimp and pat dry with paper towels. Season with salt and freshly cracked pepper, squeeze some lemon juice over, and put in the fridge.",
                    ingredients: [
                      {
                        id: 0,
                        name: "cracked pepper",
                        localizedName: "cracked pepper",
                        image: "pepper.jpg",
                      },
                      {
                        id: 9152,
                        name: "lemon juice",
                        localizedName: "lemon juice",
                        image: "lemon-juice.jpg",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                      {
                        id: 2047,
                        name: "salt",
                        localizedName: "salt",
                        image: "salt.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 405895,
                        name: "paper towels",
                        localizedName: "paper towels",
                        image: "paper-towels.jpg",
                      },
                    ],
                  },
                  {
                    number: 2,
                    step: "Cook bacon your favorite way (mine is baked) and chop",
                    ingredients: [
                      {
                        id: 10123,
                        name: "bacon",
                        localizedName: "bacon",
                        image: "raw-bacon.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 3,
                    step: "Cook pasta in salted water, set some pasta water aside, rinse pasta under cold water",
                    ingredients: [
                      {
                        id: 14412,
                        name: "water",
                        localizedName: "water",
                        image: "water.png",
                      },
                      {
                        id: 20420,
                        name: "pasta",
                        localizedName: "pasta",
                        image: "fusilli.jpg",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 4,
                    step: "Heat a tablespoon olive oil over medium heat and add shrimp and garlic. Stir constantly for about 3 minutes, but make sure garlic doesn’t brown and turn bitter and inedible. Lower heat as necessary.",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 3,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 5,
                    step: "Remove shrimp and garlic, but leave all the bits and juices.",
                    ingredients: [
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                    ],
                    equipment: [],
                  },
                  {
                    number: 6,
                    step: "Add another tablespoon olive oil. Use a wooden spoon to scrape everything loose from the bottom of the pan.",
                    ingredients: [
                      {
                        id: 4053,
                        name: "olive oil",
                        localizedName: "olive oil",
                        image: "olive-oil.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404732,
                        name: "wooden spoon",
                        localizedName: "wooden spoon",
                        image: "wooden-spoon.jpg",
                      },
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 7,
                    step: "Add shallots and tomatoes, season with salt and pepper (just a pinch each), and stir for two minutes.",
                    ingredients: [
                      {
                        id: 1102047,
                        name: "salt and pepper",
                        localizedName: "salt and pepper",
                        image: "salt-and-pepper.jpg",
                      },
                      {
                        id: 11677,
                        name: "shallot",
                        localizedName: "shallot",
                        image: "shallots.jpg",
                      },
                      {
                        id: 11529,
                        name: "tomato",
                        localizedName: "tomato",
                        image: "tomato.png",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 8,
                    step: "Add heavy cream and hot chili pepper flakes, and stir for another three minutes. Adjust heat so that heavy cream is bubbling but not boiling.",
                    ingredients: [
                      {
                        id: 11819,
                        name: "chili pepper",
                        localizedName: "chili pepper",
                        image: "red-chili.jpg",
                      },
                      {
                        id: 1053,
                        name: "heavy cream",
                        localizedName: "heavy cream",
                        image: "fluid-cream.jpg",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 3,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 9,
                    step: "Add cooked pasta back to the pan; let it absorb the cream and reheat for a minute.",
                    ingredients: [
                      {
                        id: 20421,
                        name: "cooked pasta",
                        localizedName: "cooked pasta",
                        image: "fusilli.jpg",
                      },
                      {
                        id: 1053,
                        name: "cream",
                        localizedName: "cream",
                        image: "fluid-cream.jpg",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 10,
                    step: "Toss shrimp and garlic back in the pan, and add parsley, sage and bacon. ",
                    ingredients: [
                      {
                        id: 11297,
                        name: "parsley",
                        localizedName: "parsley",
                        image: "parsley.jpg",
                      },
                      {
                        id: 11215,
                        name: "garlic",
                        localizedName: "garlic",
                        image: "garlic.png",
                      },
                      {
                        id: 15270,
                        name: "shrimp",
                        localizedName: "shrimp",
                        image: "shrimp.png",
                      },
                      {
                        id: 10123,
                        name: "bacon",
                        localizedName: "bacon",
                        image: "raw-bacon.png",
                      },
                      {
                        id: 99226,
                        name: "sage",
                        localizedName: "sage",
                        image: "fresh-sage.png",
                      },
                    ],
                    equipment: [
                      {
                        id: 404645,
                        name: "frying pan",
                        localizedName: "frying pan",
                        image: "pan.png",
                      },
                    ],
                  },
                  {
                    number: 11,
                    step: "Add grated cheeses and lazily stir all ingredients for about 2 minutes. As the cheese melts, it emulsifies the liquid to form a smooth and rich coating on the pasta. If it’s too thick, add some of the pasta water you set aside earlier.",
                    ingredients: [
                      {
                        id: 14412,
                        name: "water",
                        localizedName: "water",
                        image: "water.png",
                      },
                      {
                        id: 1041009,
                        name: "cheese",
                        localizedName: "cheese",
                        image: "cheddar-cheese.png",
                      },
                      {
                        id: 20420,
                        name: "pasta",
                        localizedName: "pasta",
                        image: "fusilli.jpg",
                      },
                    ],
                    equipment: [],
                    length: {
                      number: 2,
                      unit: "minutes",
                    },
                  },
                  {
                    number: 12,
                    step: "Serve and garnish with some more parsley and maybe even some more grated Parmigiano Reggiano",
                    ingredients: [
                      {
                        id: 1033,
                        name: "parmigiano reggiano",
                        localizedName: "parmigiano reggiano",
                        image: "parmesan.jpg",
                      },
                      {
                        id: 11297,
                        name: "parsley",
                        localizedName: "parsley",
                        image: "parsley.jpg",
                      },
                    ],
                    equipment: [],
                  },
                ],
              },
            ],
            view: false,
            favorite: false,
          },
        ];
        this.recipes.sort((a, b) =>
          a.readyInMinutes < b.readyInMinutes ? -1 : 1
        );
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
  //  max-width: 500px;
}
</style>
