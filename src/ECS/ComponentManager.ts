module ECS {
    export class ComponentManager {
		static componentObjPool:ObjectPool<BaseComponent> = new ObjectPool<BaseComponent>();
		static componentObjList:{ [tag:number] : BaseComponent[] } = {};

		static InitComponent(tag:ComponentTags, name:string, state:any):any {	
			let tmpObj = ComponentManager.componentObjPool.CreateObjFromPool(tag);
			if (tmpObj == null) {
				tmpObj = {
					componentTag: tag,
					componentName: name,
					componentState: state,
					componentParent: null
				};
			} else {
				tmpObj.componentName = name;
				tmpObj.componentState = state;				
			}

			let tmpObjList = ComponentManager.componentObjList[tag];
			if (!tmpObjList) {
				ComponentManager.componentObjList[tag] = [];
			}
			ComponentManager.componentObjList[tag].push(tmpObj);

			return tmpObj;
		}

		static RemoveComponent(tag, component:BaseComponent) {
			let tmpIndex = ComponentManager.componentObjList[tag].indexOf(component);
			if (tmpIndex > -1) {
				ComponentManager.componentObjList[tag].splice(tmpIndex, 1);
			}

			ComponentManager.componentObjPool.RemoveObjToPool(tag, component);
		}
	}
}