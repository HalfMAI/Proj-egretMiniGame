module ECS {
	export interface BaseSystem {		
		systemUpdateEntity(entities: BaseEntity[], deltaTime:number);
	}
}