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
			derived: true,
			noChildren: true
		  },
		  {
			title: "just_static",
			dataType: "unary",
			static: true,
			noChildren: true
		  },
		  {
			title: "global_and_static",
			dataType: "decimal",
			static: true,
			global: true,
			transient: true,
			noChildren: true
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
		   noChildren: true
		 },
		 {
		   title: "reportable_org",
		   dataType: "currency",
		   noChildren: true
		 },
		 {
		   title: "position",
		   dataType: "map",
		   transient: true,
		   static: true,
		   children: [
		     {
			   title: "indivtrusteedirector",
			   dataType: "unary"
			 },
			 {
			   title: "officer",
			   dataType: "unary"
			 }
		   ]
		 }
	   ]
	 }
	]
}

export default treeData;