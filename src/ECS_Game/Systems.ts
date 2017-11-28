module ECS {
	export class InputSystem implements IBaseSystem {
		constructor() {
			World.getWorldInstance().addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			World.getWorldInstance().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			World.getWorldInstance().addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			World.getWorldInstance().addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		}

		public onTouchBegin(e:egret.TouchEvent) {
			
		}
		public onTouchMove(e:egret.TouchEvent) {
			
		}
		public onTouchEnd(e:egret.TouchEvent) {
			
		}
		public onTouchTap(e:egret.TouchEvent) {
			
		}

		public systemUpdateEntity(deltaTime:number) {

		}
	}

	//BaseSystem
	export class RenderPosSyncSystem implements IBaseSystem {
		public systemUpdateEntity(deltaTime:number) {
			let tmpComponentList = ComponentManager.componentObjList[ComponentTags.PositionCom];
			tmpComponentList.forEach(component => {				
				let tmpRenderComponent:BaseComponent = EntityManager.GetComponent(component.componentParent, ComponentTags.RenderCom);
				if (tmpRenderComponent) {
					tmpRenderComponent.componentState.renderBody.x = component.componentState.posX;
					tmpRenderComponent.componentState.renderBody.y = component.componentState.posY;
				}
			});
		}
	}

	export class MovementSystem implements IBaseSystem {		
		public systemUpdateEntity(deltaTime:number) {
			let tmpComponentList = ComponentManager.componentObjList[ComponentTags.PositionCom];
			tmpComponentList.forEach(component => {
				component.componentState.posY += 30 * World.getDeltaTime();
			});
		}
	}
}