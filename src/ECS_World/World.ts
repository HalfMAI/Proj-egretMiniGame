class World extends egret.DisplayObjectContainer {
	private static staticSelf:World = null;

	private worldTick:WorldTickManager = null;
	private _levelMap:Array<string> = [];
	private curLevel:Levels.IBaseLevel = null;

	protected constructor() {
		super();
		World.staticSelf = this;

		this.worldTick = new WorldTickManager();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	
	private onAddToStage(event:egret.Event){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.onWorldLoaded();

		this.addEventListener(egret.Event.ENTER_FRAME, this._onUpdate, this);
	}

	private _onUpdate(evt:egret.Event) {
		let tmpDeltaTime = this.worldTick.onUpdateDeltaTime();
		this.onUpdate(tmpDeltaTime)
		if (this.curLevel) {
			this.curLevel.onLevelUpdate(tmpDeltaTime);
		}
	}

	public LoadLevel(level:string) {
		let nextLevel;
		try {
			nextLevel = new Levels[level]();	//HACK
		} catch (error) {
			egret.error("error:" + error.message);
			return;
		}		

		if (this.curLevel) {
			this.curLevel.onLevelUnloaded();
		}
		this.curLevel = nextLevel;
		this.curLevel.onLevelLoaded();
	}

	public onWorldLoaded(){}
	public onUpdate(deltaTime:number){}

	public static getWorldInstance(){
		return World.staticSelf;
	}

	public static getDeltaTime() {
		return World.getWorldInstance().worldTick.getDeltaTime();
	}

}