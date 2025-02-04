Vue.component("LswPageDatabases", {
  template: $template,
  props: {
    databaseExplorer: {
      type: Object,
      required: true
    },
    args: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      databases: [],
      breadcrumb: [{
        page: "LswPageDatabases",
        name: "Databases",
        args: {},
        current: true
      }],
    }
  },
  methods: {
    openDatabase(name) {
      this.databaseExplorer.selectPage("LswPageTables", { database: name });
    }
  },
  async mounted() {
    this.databases = await LswDatabaseAdapter.listDatabases();
  },
  unmounted() {

  }
});