<template>
  <div>
    <h1 class="title">My Recipes</h1>
    <b-button v-b-modal.modal-prevent-closing>Add a recipe</b-button>
    <b-container>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
      <b-row>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add a recipe"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="title"
          label-for="title-input"
          invalid-feedback="title is required"
          :state="nameState"
        >
          <!-- v-model="$v.form.title.$model" -->
          <b-form-input
            id="title-input"
            v-model="$v.form.title.$model"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="readyInMinutes"
          label-for="readyInMinutes-input"
          invalid-feedback="readyInMinutes is required"
          :state="nameState"
        >
          <b-form-input
            id="readyInMinutes-input"
            v-model="$v.form.readyInMinutes.$model"
            :state="nameState"
            type="number"
            min="0"
            required
          ></b-form-input>
        </b-form-group>
      </form>

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="image"
          label-for="image-input"
          invalid-feedback="image is required"
          :state="nameState"
        >
          <b-form-input
            id="image-input"
            v-model="$v.form.image.$model"
            :state="nameState"
          ></b-form-input>
        </b-form-group>
      </form>

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState">
          <b-form-checkbox
            id="vegan-input"
            v-model="$v.form.vegan.$model"
            name="vegan-input"
            value="1"
            unchecked-value="0"
          >
            vegan
          </b-form-checkbox>
        </b-form-group>
      </form>

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState">
          <b-form-checkbox
            id="vegetarian-input"
            v-model="$v.form.vegetarian.$model"
            name="vegetarian-input"
            value="1"
            unchecked-value="0"
          >
            vegetarian
          </b-form-checkbox>
        </b-form-group>
      </form>

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState">
          <b-form-checkbox
            id="glutenFree-input"
            v-model="$v.form.glutenFree.$model"
            name="glutenFree-input"
            value="1"
            unchecked-value="0"
          >
            glutenFree
          </b-form-checkbox>
        </b-form-group>
      </form>

      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="servings"
          label-for="servings-input"
          invalid-feedback="servings is required"
          :state="nameState"
        >
          <b-form-input
            id="servings-input"
            v-model="$v.form.servings.$model"
            :state="nameState"
            type="number"
            min="0"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
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
        submitError: undefined,
        nameState: null,
        recipes: [],
      },
      //  errors: [],
      validated: false,
    };
  },
  validations: {
    form: {
      title: {
        // required,
      },

      readyInMinutes: {
        //   required,
      },
      image: {
        // required,
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
        //required,
      },
    },
  },
  mounted() {
    this.myRecipes();
  },
  methods: {
    async myRecipes() {
      try {
        const response = await this.axios.get(
          // this.$root.store.server_domain + "/recipes/random",
        //  process.env.VUE_APP_ROOT_API + "/users/MyRecipes"
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        // console.log(response);
        //const recipes = response.data.recipes;
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(response.data);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.title = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>