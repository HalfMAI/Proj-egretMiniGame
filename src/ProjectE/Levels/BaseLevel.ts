interface IBaseLevel {
	onLevelLoaded();
	onLevelUpdate(deltaTime:number);
	onLevelUnloaded();
}

class LevelList {
	static readonly TestLevel = "TestLevel";
}