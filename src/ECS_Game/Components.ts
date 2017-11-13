module ECS {	
	export enum ComponentTags {
		PositionCom,
		RenderCom,
		ControllerCom,
	}

	//PostionComponent
	export interface PostionState {
		posX:number;
		posY:number;
	}

	//RenderComponent
	export interface RenderState {
		renderBody:egret.DisplayObject;
	}

	export class ComponentCreator {
		static CreatePositionComponent(x:number, y:number, name?:string) {
			let tmpPosCom:PostionState = {
				posX: x,
				posY: y
			};
			return ComponentManager.InitComponent(
				ComponentTags.PositionCom,
				name ? name : null, 
				tmpPosCom
			);
		}

		static CreateRenderComponent(displayObj:egret.DisplayObject, name:string) {
			let tmpRenderCom:RenderState = {
				renderBody : displayObj
			};
			return ComponentManager.InitComponent(
				ComponentTags.RenderCom,
				name,
				tmpRenderCom
			);
		}
	}
}