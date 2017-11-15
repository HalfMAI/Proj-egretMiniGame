module ECS {
	export class InputSystem implements BaseSystem {
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

		public systemUpdateEntity(entities: BaseEntity[], deltaTime:number) {

		}
	}

	export class testSystem implements BaseSystem {		
		public systemUpdateEntity(entities: BaseEntity[], deltaTime:number) {
			entities.forEach(entity => {
				let tmpPosComponents:BaseComponent[] = EntityManager.GetComponents(entity, ComponentTags.PositionCom);
				if (tmpPosComponents) {
					tmpPosComponents.forEach(element => {
						let tmpState:PostionState = element.componentState;
						tmpState.posY += 30 * deltaTime;
					});

					let tmpRenderComponents:BaseComponent[] = EntityManager.GetComponents(entity, ComponentTags.RenderCom);
					if (tmpRenderComponents) {
						tmpRenderComponents.forEach(element => {
							let tmpState:RenderState = element.componentState;
							tmpState.renderBody.x = tmpPosComponents[0].componentState.posX;
							tmpState.renderBody.y = tmpPosComponents[0].componentState.posY;
						});
					}				
				}
			});
		}
	}
}