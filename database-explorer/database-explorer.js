Vue.component("LswDatabaseExplorer", {
  template: $template,
  props: {},
  data() {
    return {
      selectedPage: "lsw-page-databases",
      selectedArgs: [],
    }
  },
  methods: {
    selectPage(page, args = []) {
      try {
        this.selectedArgs = args;
        this.selectedPage = page;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  async mounted() {
    
  },
  unmounted() {

  }
});