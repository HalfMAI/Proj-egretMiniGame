module ECS {
	export class ObjectPool<T> {
		private type:number | string;
		public objPool:{[key:string] : Array<Object>};
		public constructor() {
			this.type = 0;
			this.objPool = {};
		}

		public CreateObjFromPool(type:number | string):T {
			this.type = type;

			let tmpObj;		
			if (this.objPool[type] == null) {
				tmpObj = null;
			} else {
				tmpObj =  this.objPool[type].pop();
			}
			return tmpObj;
		}

		public RemoveObjToPool(obj:T) {
			if (!this.objPool[this.type]) {
				this.objPool[this.type] = new Array<T>();
			}
			this.objPool[this.type].push(obj);
		}
	}
}