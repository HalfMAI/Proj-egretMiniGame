module ECS {	
	export interface BaseEntity {
		id:string;
		tag:string;
		components:{ [tag:number] : BaseComponent[] }
	}
}