module ProjectE {
	export class ProjEMainContainer extends World {

		private testSys:ECS.testSystem;
		private tmpTest:ECS.BaseEntity[];
		private curCount=0;

		public constructor() { super(); }

		public onUpdate(deltaTime:number):void {
			this.testSys.systemUpdateEntity(this.tmpTest);
		}

        public onWorldLoaded():void{
			this.stage.frameRate = 30;

			this.testSys = new ECS.testSystem();
			this.tmpTest = [];

			for (let i=0; i < 10; i++) {
				this.tmpTest.push(ECS.EntityManager.CreateEntity("test"));
				ECS.EntityManager.AddComponent(this.tmpTest[this.curCount], ECS.ComponentCreator.CreatePositionComponent(100, 100));
				ECS.EntityManager.AddComponent(this.tmpTest[this.curCount], ECS.ComponentCreator.CreateRenderComponent(Utility.createBitmapByName("egret_icon_png"), "testBody"));

				this.curCount++;


				let tmp = this.tmpTest[this.curCount-1];
				this.tmpTest.splice(this.tmpTest.indexOf(tmp));
				ECS.EntityManager.RemoveEntity(tmp);

				this.curCount--;
				this.curCount = Math.max(this.curCount, 0);
			}
			

			let tmpTimer = new egret.Timer(500);
			tmpTimer.addEventListener(egret.TimerEvent.TIMER, (e) => {
				this.tmpTest.push(ECS.EntityManager.CreateEntity("test"));
				ECS.EntityManager.AddComponent(this.tmpTest[this.curCount], ECS.ComponentCreator.CreatePositionComponent(100, 100));
				ECS.EntityManager.AddComponent(this.tmpTest[this.curCount], ECS.ComponentCreator.CreateRenderComponent(Utility.createBitmapByName("egret_icon_png"), "testBody"));

				this.curCount++;
			}, this);
			tmpTimer.start();

			// let tmpTimerDes = new egret.Timer(1000);
			// tmpTimerDes.addEventListener(egret.TimerEvent.TIMER, (e) => {
			// 	let tmp = this.tmpTest[this.curCount-1];
			// 	this.tmpTest.splice(this.tmpTest.indexOf(tmp));
			// 	ECS.EntityManager.RemoveEntity(tmp);

			// 	this.curCount--;
			// 	this.curCount = Math.max(this.curCount, 0);
			// }, this);
			// tmpTimerDes.start();
		}
	}
}