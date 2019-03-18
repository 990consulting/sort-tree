const treeData = {
  title: "return",
  dataType: "root",
  children: [
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
  ]
};

export default treeData;
