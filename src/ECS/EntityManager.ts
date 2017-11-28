module ECS {
	export class EntityManager {
		static entityObjPool:ObjectPool<BaseEntity> = new ObjectPool<BaseEntity>();

		private static _AddDisplayObj(entity:BaseEntity) {
			if (!entity.components[ComponentTags.RenderCom]) {return;}
			let tmpRenderState:RenderState = entity.components[ComponentTags.RenderCom][0].componentState;
			if (tmpRenderState) {
				World.getWorldInstance().addChild(tmpRenderState.renderBody);
			}
		}
		private static _RemoveDisplayObj(entity:BaseEntity) {
			if (!entity.components[ComponentTags.RenderCom]) {return;}
			//remove displayObj child
			let tmpRenderState:RenderState = entity.components[ComponentTags.RenderCom][0].componentState;
			if (tmpRenderState) {
				World.getWorldInstance().removeChild(tmpRenderState.renderBody);
			}
		}

		private static CreateRandomID():string {
			return (+new Date()).toString(16) + Math.floor((Math.random() * 1000)).toString();
		}

		public static CreateEntity(className:string):BaseEntity {
			let tmpEntity = EntityManager.entityObjPool.CreateObjFromPool(className);
			if (tmpEntity == null) {
				tmpEntity = { 
					id : EntityManager.CreateRandomID(),
					tag : className,
					components : {}
				 };
			} else {
				tmpEntity.id = EntityManager.CreateRandomID();
			}
			return tmpEntity;
		}

		public static RemoveEntity(entity:BaseEntity) {
			EntityManager.RemoveAllComponent(entity);
			EntityManager.entityObjPool.RemoveObjToPool(entity.tag, entity);
		}

		//component operator
		public static AddComponent(entity:BaseEntity, component:BaseComponent) {
			if (!entity.components[component.componentTag]) {
				entity.components[component.componentTag] = new Array<BaseComponent>();
			}			
			entity.components[component.componentTag].push(component);
			component.componentParent = entity;		//componentParent
			EntityManager._AddDisplayObj(entity);
		}
		public static RemoveComponent(entity:BaseEntity, component:BaseComponent) {		
			let tmpCurComponents = entity.components[component.componentTag];	
			if (tmpCurComponents) {
				if (component.componentTag === ComponentTags.RenderCom) {
					EntityManager._RemoveDisplayObj(entity);
				}

				let tmpIndex = tmpCurComponents.indexOf(component);
				if (tmpIndex > -1) {
					tmpCurComponents.splice(tmpIndex, 1);					
					component.componentParent = null;		//componentParent
					ComponentManager.RemoveComponent(component.componentTag, component);
				}				
			}
		}
		public static RemoveAllComponent(entity:BaseEntity) {
			for (let key in entity.components) {
				let val = entity.components[key];
				val.forEach(component => {
					EntityManager.RemoveComponent(entity, component);
				});
			}
			entity.components = {};
		}

		public static HasComponent(entity:BaseEntity, component:BaseComponent):boolean {
			if (entity.components[component.componentTag]) {
				let tmpIndex = entity.components[component.componentTag].indexOf(component);
				return tmpIndex > -1;
			} else {
				return false;
			}
		}

		public static GetComponents(entity:BaseEntity, componentTag:ComponentTags):BaseComponent[] {
			return entity.components[componentTag];
		}

		public static GetComponent(entity:BaseEntity, componentTag:ComponentTags):BaseComponent {
			let tmpComponents = entity.components[componentTag];
			if (!tmpComponents || tmpComponents.length == 0) {
				return null;
			}
			if (tmpComponents.length > 1) {
				egret.error("The Entity Contain Multi-Component with SAME TAG");
				return null;
			} else {					
				return tmpComponents[0];
			}
		}
	}
	
}