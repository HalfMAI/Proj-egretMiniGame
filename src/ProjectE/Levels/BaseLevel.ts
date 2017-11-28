module Levels {
	export interface IBaseLevel {		
		systemList:Array<ECS.IBaseSystem>;
		onLevelLoaded();
		onLevelUpdate(deltaTime:number);
		onLevelUnloaded();
	}

	export class LevelList {
		static readonly MainLevel = "MainLevel";
		static readonly TestLevel = "TestLevel";
	}
}