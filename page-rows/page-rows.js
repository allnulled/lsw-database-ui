Vue.component("LswPageRows", {
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
    if(typeof this.args.database !== "string") {
      throw new Error("Required parameter «args.database» to be a string on «LswPageRows.data»");
    }
    if(typeof this.args.table !== "string") {
      throw new Error("Required parameter «args.table» to be a string on «LswPageRows.data»");
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
        }
      }, {
        page: "LswPageRows",
        name: this.args.table,
        args: {
          database: this.args.database,
          table: this.args.table
        },
        current: true
      }],
      database: this.args.database,
      table: this.args.table,
      rows: undefined,
      connection: undefined,
    }
  },
  methods: {
    async loadRows() {
      this.connection = new LswDatabaseAdapter(this.database);
      await this.connection.open();
      this.rows = await this.connection.select(this.table, it => true);
    },
    openRow(rowid) {
      return this.databaseExplorer.selectPage("LswPageRow", {
        database: this.database,
        table: this.table,
        rowid: rowid
      });
    }
  },
  mounted() {
    this.loadRows();
  },
  unmounted() {
    this.connection.close();
  }
});