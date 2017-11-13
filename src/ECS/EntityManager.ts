module ECS {
	export class EntityManager {
		static entityObjPool:ObjectPool<BaseEntity> = new ObjectPool<BaseEntity>();
		static renderObjList:Array<egret.DisplayObject> = new Array<egret.DisplayObject>();

		private static _AddDisplayObj(entity:BaseEntity) {
			if (!entity.components[ComponentTags.RenderCom]) {return;}
			let tmpRenderState:RenderState = entity.components[ComponentTags.RenderCom][0].componentState;
			if (tmpRenderState) {
				EntityManager.renderObjList.push(tmpRenderState.renderBody);
				World.getWorldInstance().addChild(tmpRenderState.renderBody);
			}
		}
		private static _RemoveDisplayObj(entity:BaseEntity) {
			if (!entity.components[ComponentTags.RenderCom]) {return;}
			//remove displayObj child
			let tmpRenderState:RenderState = entity.components[ComponentTags.RenderCom][0].componentState;
			if (tmpRenderState) {
				let tmpIndex = EntityManager.renderObjList.indexOf(tmpRenderState.renderBody);
				EntityManager.renderObjList.splice(tmpIndex, 1);
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

			console.log(EntityManager.entityObjPool.objPool);
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
			EntityManager._AddDisplayObj(entity);
		}
		public static RemoveComponent(entity:BaseEntity, component:BaseComponent) {		
			let tmpCurComponent = entity.components[component.componentTag];	
			if (tmpCurComponent) {
				if (component.componentTag === ComponentTags.RenderCom) {
					EntityManager._RemoveDisplayObj(entity);
				}

				let tmpIndex = entity.components[component.componentTag].indexOf(component);
				if (tmpIndex > -1) {
					entity.components[component.componentTag].splice(tmpIndex, 1);
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
				if (tmpIndex > -1) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		public static GetComponents(entity:BaseEntity, componentTag:ComponentTags):any[] {
			return entity.components[componentTag];
		}
	}
	
}