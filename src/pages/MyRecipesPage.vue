<template>
  <div>
    <h1 class="title" style="margin-top:5%; margin-left:45%">My Recipes</h1>
    <b-button v-b-modal.modal-prevent-closing style="margin-left:40%; width:20%; font-size: x-large ;">Add a recipe</b-button>
    <b-container>
      <h3>
        <!-- {{ title }}: -->
        <slot></slot>
      </h3>
      <b-row v-for="row in nrows" :key="row">
        <b-col v-for="col in 3" :key="col">
         <!--   {{recipes.length}} -->
          <RecipePreview class="recipePreview" :recipe="recipes[(row-1) * 3 +(col-1)]" v-if="(row-1) * 3 + (col-1) < recipes.length" />
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add a recipe"
      @show="resetModal"
      @hidden="resetModal"
    >
      <!-- @ok="handleOk" -->
      <form
        ref="form"
        @submit.prevent="handleSubmit"
        @reset.prevent="resetModal"
      >
        <!--@submit.stop.prevent="handleSubmit">-->
        <b-form-group label="title" label-for="title-input">
          <!-- v-model="$v.form.title.$model" -->
          <b-form-input
            id="title-input"
            v-model="$v.form.title.$model"
            :state="validateState('title')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.title.required">
            title is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="readyInMinutes" label-for="readyInMinutes-input">
          <b-form-input
            id="readyInMinutes-input"
            v-model="$v.form.readyInMinutes.$model"
            :state="validateState('readyInMinutes')"
            type="number"
            min="1"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">
            readyInMinutes is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.readyInMinutes.minValue">
          Time in minutes must be greater than 1
        </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="image" label-for="image-input">
          <!--<b-form-file
            id="image-input"
            v-model="$v.form.image.$model"
            :state="validateState('image')"
            accept="image/*"
          ></b-form-file>-->
          <b-form-input
            id="image-input"
            v-model="$v.form.image.$model"
            :state="validateState('image')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.image.required">
            image is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          ><!-- :state="nameState">-->
          <b-form-checkbox
            id="vegan-input"
            v-model="$v.form.vegan.$model"
            name="vegan-input"
            value="1"
            unchecked-value="0"
          >
            <img src="../assets/vegan1.png" class="img_logo" />
            vegan

          
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          ><!-- :state="nameState">-->
          <b-form-checkbox
            id="vegetarian-input"
            v-model="$v.form.vegetarian.$model"
            name="vegetarian-input"
            value="1"
            unchecked-value="0"
          >
            <img src="../assets/vegetarian.png" class="img_logo" />
            vegetarian
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          ><!-- :state="nameState">-->
          <b-form-checkbox
            id="glutenFree-input"
            v-model="$v.form.glutenFree.$model"
            name="glutenFree-input"
            value="0"
            unchecked-value="1"
          >
            <img src="../assets/gluten_free1.png" class="img_logo" />
            glutenFree
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="ingredients" label-for="ingredients-input">
          <b-form-textarea
            id="textarea"
            v-model="$v.form.ingredients.$model"
            placeholder="Enter ingredients..."
            rows="3"
            max-rows="6"
            :state="validateState('ingredients')"
          ></b-form-textarea>
          <b-form-invalid-feedback v-if="!$v.form.ingredients.required">
            ingredients is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="instructions" label-for="instructions-input">
          <b-form-textarea
            id="textarea"
            v-model="$v.form.instructions.$model"
            placeholder="Enter instructions..."
            rows="3"
            max-rows="6"
            :state="validateState('instructions')"
          ></b-form-textarea>
          <b-form-invalid-feedback v-if="!$v.form.instructions.required">
            instructions is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="servings" label-for="servings-input">
          <b-form-input
            id="servings-input"
            v-model="$v.form.servings.$model"
            :state="validateState('servings')"
            type="number"
            min="1"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.servings.required">
            number of servings is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.servings.minValue">
          number of servings must be greater than 1
        </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button
          type="submit"
          variant="primary"
          style="width: 250px"
          class="ml-5 w-75"
          >Add Recipe</b-button
        >
      </form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Register failed: {{ form.submitError }}
      </b-alert>
      <!--<b-form-input
            id="image-input"
            v-model="$v.form.image.$model"
            :state="nameState"
            
          ></b-form-input> -->
    </b-modal>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
import {
  required,
  minValue,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";
export default {
  components: {
    RecipePreview,
  },
  /* props: {
    title: {
      type: String,
      required: true,
    },
  },*/
  data() {
    return {
      form: {
        title: "",
        readyInMinutes: "",
        image: "",
        vegan: "0",
        vegetarian: "0",
        glutenFree: "0",
        servings: "",
        ingredients: "",
        instructions: "",
        submitError: undefined,
      },
      ingredients: "",
      errors: [],
      // nameState: null,
      recipes: [],
      validated: false,
    };
  },
  validations: {
    form: {
      title: {
        required,
      },

      readyInMinutes: {
        required,
        minValue: minValue(1),
       // positive: (r) => min(1)(r),
      },
      image: {
        required,
      },

      diets: {
        //required,
      },
      vegan: {
        //required,
      },
      vegetarian: {
        //required,
      },
      glutenFree: {
        //required,
      },

      servings: {
        required,
        minValue: minValue(1)
      },
      ingredients: {
        required,
      },
      instructions: {
        required,
      },
    },
  },
  mounted() {
    this.myRecipes();
  },
  computed: {
    nrows() {
      return Math.floor((this.recipes.length - 1) / 3) + 1;
    },
  },
  methods: {
    async myRecipes() {
      try {
        const response = await this.axios.get(
          // this.$root.store.server_domain + "/recipes/random",
          process.env.VUE_APP_ROOT_API + "/users/MyRecipes"
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(response.data);
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
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    /*   checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },*/
    resetModal() {
      //  (this.nameState = null),
      this.form = {
        title: "",
        readyInMinutes: "",
        image: "",
        vegan: "0",
        vegetarian: "0",
        glutenFree: "0",
        servings: "",
        ingredients: "",
        instructions: "",
        submitError: undefined,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    /* handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },*/
    async addRecipe() {
      try {
        console.log("here");
        const response = await this.axios.post(
          // this.$root.store.server_domain + "/recipes/random",
          //"http://127.0.0.1:3000/users/MyRecipes",
           process.env.VUE_APP_ROOT_API +"/users/MyRecipes",
          {
            title: this.form.title,
            readyInMinutes: this.form.readyInMinutes,
            image: this.form.image,
            popularity: "0",
            vegan: this.form.vegan,
            vegetarian: this.form.vegetarian,
            glutenFree: this.form.glutenFree,
            ingredients: this.form.ingredients,
            instructions: this.form.instructions,
            servings: this.form.servings,
            
          },
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    handleSubmit() {
      // Exit when the form isn't valid
      /* if (!this.checkFormValidity()) {
        return;
      }*/
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.addRecipe();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });

      // Push the name to submitted names
      // this.submittedNames.push(this.name);
      // Hide the modal manually
    },
  },
};
</script>

<style lang="scss" scoped>
// .container {
//   min-height: 400px;
// }

.container {
  background-color: antiquewhite;
  max-width: 80%;
  max-height: 60%;
}
.img_logo {
  width: 30px;
  height: 30px;
}
</style>
