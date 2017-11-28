module ECS {
	export interface BaseComponent {		
		componentTag:ComponentTags;
		componentParent:BaseEntity;
		componentName:string;
		componentState:any;
	}	
}