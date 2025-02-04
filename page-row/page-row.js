Vue.component("LswPageRow", {
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
      throw new Error("Required parameter «args.database» to be a string on «LswPageRow.data»");
    }
    if(typeof this.args.table !== "string") {
      throw new Error("Required parameter «args.table» to be a string on «LswPageRow.data»");
    }
    if(typeof this.args.rowid === "undefined") {
      throw new Error("Required parameter «args.rowid» to be a string or a number on «LswPageRow.data»");
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
      }, {
        page: "LswPageRow",
        name: "#" + this.args.rowid,
        args: {
          database: this.args.database,
          table: this.args.table,
          rowid: this.args.rowid
        },
        current: true
      }],
      database: this.args.database,
      table: this.args.table,
      rowid: this.args.rowid,
      connection: undefined,
      row: false,
    }
  },
  methods: {
    async loadRow() {
      this.connection = new LswDatabaseAdapter(this.database);
      await this.connection.open();
      const matches = await this.connection.select(this.table, it => it.id === this.rowid);
      this.rowid = matches[0];
    }
  },
  mounted() {
    this.loadRow();
  },
  unmounted() {
    this.connection.close();
  }
});