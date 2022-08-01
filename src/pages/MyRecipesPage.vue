    <!-- <template>
    <div class="container">
        <br><br><br>
        <h1 class="title">My Recipes</h1>
        <b-container>
        <h3>
        <!-- {{ title }}: -->
        <slot></slot>
        </h3>
        <b-row>
        <b-col v-for="r in recipes" :key="r.id">
            <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
        </b-row>
    </b-container>
    </div>
    </template>

    <script>
    import RecipePreview from "../components/RecipePreview.vue";
    export default {
    name: "MyRecipesPage",
    components: {
        RecipePreview
    },
    props: {
        title: {
        type: String,
        //required: true
        }
    },
    data() {
        return {
        recipes: []
        };
    },
    mounted() {
        this.updateRecipes();
    },
    methods: {
        async updateRecipes() {
        try {
            console.log("before");
            //console.log(process.env.VUE_APP_ROOT_API);
            const response = await this.axios.get(
            //this.$root.store.server_domain + "/recipes/random",
            //process.env.VUE_APP_ROOT_API + "/users/favorites"
            //  "http://localhost:8080/users/views",
            //"http://localhost:80/users/MyRecipes?apiKey=a2db82f6e7174087bd946ceb5db220bc",
            "https://test-for-3-2.herokuapp.com/recipes/random"
            );
            console.log("after");
            // console.log(response);
            //const recipes = response.data.recipes;
            const recipes = response.data;
            console.log(recipes);
            this.recipes = [];
            this.recipes.push(...recipes);
            //console.log(this.recipes);
        } catch (error) {
            console.log(error);
        }
        }
    }
    };
    </script>

    <style lang="scss" scoped>
    .container {
    min-height: 400px;
    }
    </style> -->