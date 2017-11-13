module ECS {
	export class ObjectPool<T> {
		public objPool:{[key:string] : Array<Object>};
		public constructor() {
			this.objPool = {};
		}

		public CreateObjFromPool(type:number | string):T {
			let tmpObj;		
			if (this.objPool[type] == null) {
				tmpObj = null;
			} else {
				tmpObj =  this.objPool[type].pop();
			}
			return tmpObj;
		}

		public RemoveObjToPool(type:number | string, obj:T) {
			if (!this.objPool[type]) {
				this.objPool[type] = new Array<T>();
			}
			this.objPool[type].push(obj);
		}
	}
}