module ECS {
    export class ComponentManager {
		static componentObjPool:ObjectPool<BaseComponent> = new ObjectPool<BaseComponent>();

		static InitComponent(tag:ComponentTags, name:string, state:any):any {	
			let tmpObj = ComponentManager.componentObjPool.CreateObjFromPool(tag);
			if (tmpObj == null) {
				tmpObj = {
					componentTag: tag,
					componentName: name,
					componentState: state
				};
			} else {
				tmpObj.componentName = name;
				tmpObj.componentState = state;				
			}
			return tmpObj;
		}

		static RemoveComponent(tag, component) {
			ComponentManager.componentObjPool.RemoveObjToPool(tag, component);
		}
	}
}