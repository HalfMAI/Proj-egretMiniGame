module Levels {
	export class MainLevel implements IBaseLevel {

		private posSyncSys = new ECS.RenderPosSyncSystem();
		private movemontSys = new ECS.MovementSystem();
		public systemList = new Array<ECS.IBaseSystem>();

		public constructor() {
			this.systemList.push(
				this.posSyncSys,
				this.movemontSys
			);
		}

		onLevelLoaded() {
			let tmpBossPosX = ECS.World.getWorldInstance().stage.stageWidth / 2;
			let tmpBossPosY = ECS.World.getWorldInstance().stage.stageHeight / 4;
			this._CreateBall(64, 0xff0000, "Boss", tmpBossPosX, tmpBossPosY);			
		}

		onLevelUpdate(deltaTime:number) {
			this.systemList.forEach(system => {
				system.systemUpdateEntity(deltaTime);
			});
		}

		onLevelUnloaded() {

		}

		private _CreateBall(radius:number, color:number, ballName:string, initX:number, initY:number){			
			let tmpBossEntity:ECS.BaseEntity = ECS.EntityManager.CreateEntity(ballName);

			let tmpPosCom:ECS.BaseComponent = ECS.ComponentCreator.CreatePositionComponent(initX, initY);

			let tmpRenderBody = new egret.Shape();
			tmpRenderBody.x = initX;
			tmpRenderBody.y = initY;
			tmpRenderBody.graphics.beginFill(color);
			tmpRenderBody.graphics.drawCircle(0, 0, radius);
			tmpRenderBody.graphics.endFill();
			tmpRenderBody.cacheAsBitmap = true;

			tmpRenderBody.scaleX = 1;
			tmpRenderBody.scaleY = 1;

			ECS.EntityManager.AddComponent(tmpBossEntity, tmpPosCom);
			ECS.EntityManager.AddComponent(tmpBossEntity,
				ECS.ComponentCreator.CreateRenderComponent(tmpRenderBody)
			);
		}
	}
}