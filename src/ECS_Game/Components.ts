module ECS {	
	export enum ComponentTags {
		PositionCom,
		RenderCom,
		InputCom,
		ControllerCom,

		BallCom,
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

	//InputComponent
	export interface InputState {

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

		static CreateMainBall(x:number, y:number, radius:number, name?:string) {
			let resultObj;
			let tmpPosCom:PostionState = {
				posX: x,
				posY: y
			};
			let tmpRenderCom:RenderState = {
				renderBody : new egret.Sprite()
			}

			resultObj = {...tmpPosCom, ...tmpRenderCom};

			return ComponentManager.InitComponent(
				ComponentTags.BallCom,
				name ? name : null,
				resultObj
			);
		}
	}
}