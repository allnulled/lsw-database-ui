Vue.component("LswPageTables", {
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
    if(!("database" in this.args)) {
      throw new Error("Required parameter «args.database» on «LswPageTables.data»");
    }
    if(typeof this.args.database !== "string") {
      throw new Error("Required parameter «args.database» to be a string on «LswPageTables.data»");
    }
    return {
      breadcrumb: [{
        page: "LswPageDatabases",
        name: "Databases",
        args: {}
      }, {
        page: "LswPageTables",
        name: this.args.database,
        args: {
          database: this.args.database
        },
        current: true
      }],
      database: this.args.database,
      tables: false
    }
  },
  methods: {
    async loadDatabase() {
      const db = await LswDatabaseAdapter.getSchema(this.database);
      this.tables = db;
      console.log(db);
    },
    openTable(table) {
      return this.databaseExplorer.selectPage("LswPageRows", {
        database: this.database,
        table: table
      });
    }
  },
  mounted() {
    this.loadDatabase();
  },
  unmounted() {

  }
});