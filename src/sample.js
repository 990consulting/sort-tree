const treeData = [
  {
    title: "return",
    dataType: "root",
    children: [
      {
        title: "a global map",
        dataType: "map",
        global: true,
        children: [
          {
            title: "global",
            global: true,
            dataType: "currency"
          }
        ]
      },
      {
        title: "a static map",
        dataType: "map",
        static: true,
        children: [
          {
            title: "static",
            static: true,
            dataType: "currency"
          }
        ]
      }
    ]
  },
  {
    title: "a transient map",
    dataType: "map",
    transient: true,
    children: [
      {
        title: "transient",
        transient: true,
        dataType: "currency"
      }
    ]
  },
  {
    title: "a derived map",
    dataType: "map",
    derived: true,
    children: [
      {
        title: "derived",
        derived: true,
        dataType: "currency"
      }
    ]
  },
  {
    title: "filer",
    dataType: "map",
    children: [
      {
        title: "just_global",
        dataType: "unary",
        global: true,
        transient: true,
        derived: true
      },
      {
        title: "just_static",
        dataType: "unary",
        static: true
      },
      {
        title: "global_and_static",
        dataType: "decimal",
        static: true,
        global: true,
        transient: true
      },
      {
        title: "a_system_variable",
        dataType: "date",
        system: true
      }
    ]
  },
  {
    title: "compensated",
    dataType: "list",
    derived: true,
    children: [
      {
        title: "title",
        dataType: "text",
        derived: true
      },
      {
        title: "reportable_org",
        dataType: "currency",
        derived: true
      },
      {
        title: "position",
        dataType: "map",
        transient: true,
        derived: true,
        static: true,
        children: [
          {
            title: "indivtrusteedirector",
            dataType: "unary",
            transient: true,
            static: true,
            derived: true
          },
          {
            title: "officer",
            dataType: "unary",
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
