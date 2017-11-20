module Levels {
	export interface IBaseLevel {
		onLevelLoaded();
		onLevelUpdate(deltaTime:number);
		onLevelUnloaded();
	}

	export class LevelList {
		static readonly MainLevel = "MainLevel";
		static readonly TestLevel = "TestLevel";
	}
}