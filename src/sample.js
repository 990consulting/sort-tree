const treeData = [
  {
    title: "return",
    titleText: "",
    dataType: "root",
    isShowBox: false,
    children: [
      {
        title: "a global map",
        titleText: "",
        dataType: "map",
        isShowBox: false,
        global: true,
        children: [
          {
            title: "global",
            titleText: "",
            isShowBox: false,
            global: true,
            dataType: "currency"
          }
        ]
      },
      {
        title: "a static map",
        titleText: "",
        dataType: "map",
        isShowBox: false,
        static: true,
        children: [
          {
            title: "static",
            titleText: "",
            isShowBox: false,
            static: true,
            dataType: "currency"
          }
        ]
      }
    ]
  },
  {
    title: "a transient map",
    titleText: "",
    dataType: "map",
    isShowBox: false,
    transient: true,
    children: [
      {
        title: "transient",
        titleText: "",
        isShowBox: false,
        transient: true,
        dataType: "currency"
      }
    ]
  },
  {
    title: "a derived map",
    titleText: "",
    dataType: "map",
    isShowBox: false,
    derived: true,
    children: [
      {
        title: "derived",
        titleText: "",
        isShowBox: false,
        derived: true,
        dataType: "currency"
      }
    ]
  },
  {
    title: "filer",
    titleText: "",
    dataType: "map",
    isShowBox: false,
    children: [
      {
        title: "just_global",
        titleText: "",
        dataType: "unary",
        isShowBox: false,
        global: true,
        transient: true,
        derived: true
      },
      {
        title: "just_static",
        titleText: "",
        dataType: "unary",
        isShowBox: false,
        static: true
      },
      {
        title: "global_and_static",
        titleText: "",
        dataType: "decimal",
        isShowBox: false,
        static: true,
        global: true,
        transient: true
      },
      {
        title: "a_system_variable",
        titleText: "",
        dataType: "date",
        isShowBox: false,
        system: true
      }
    ]
  },
  {
    title: "compensated",
    titleText: "",
    dataType: "list",
    isShowBox: false,
    derived: true,
    children: [
      {
        title: "title",
        titleText: "",
        dataType: "text",
        isShowBox: false,
        derived: true
      },
      {
        title: "reportable_org",
        titleText: "",
        dataType: "currency",
        isShowBox: false,
        derived: true
      },
      {
        title: "position",
        titleText: "",
        dataType: "map",
        isShowBox: false,
        transient: true,
        derived: true,
        static: true,
        children: [
          {
            title: "indivtrusteedirector",
            titleText: "",
            dataType: "unary",
            isShowBox: false,
            transient: true,
            static: true,
            derived: true
          },
          {
            title: "officer",
            titleText: "",
            dataType: "unary",
            isShowBox: false,
            transient: true,
            static: true,
            derived: true
          }
        ]
      }
    ]
  }
];

export default treeData;
