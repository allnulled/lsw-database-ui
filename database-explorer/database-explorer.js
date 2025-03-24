Vue.component("LswDatabaseExplorer", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-database-explorer.data", arguments);
    return {
      isLoading: false,
      selectedPage: "lsw-page-tables",
      selectedArgs: { database: "lsw_default_database" },
    }
  },
  methods: {
    selectPage(page, args = {}) {
      try {
        this.$trace("lsw-database-explorer.methods.selectPage", arguments);
        $ensure({page}, 1).type("string");
        $ensure({args}, 1).type("object");
        this.isLoading = true;
        this.$nextTick(() => {
          this.selectedArgs = args;
          this.selectedPage = page;
          this.isLoading = false;
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  async mounted() {
    this.$trace("lsw-database-explorer.methods.mounted", arguments);
  },
  unmounted() {
    this.$trace("lsw-database-explorer.methods.unmounted", arguments);
  }
});