class World extends egret.DisplayObjectContainer {
	private static staticSelf:World;

	private worldTick:WorldTickManager;

	protected constructor() {
		super();

		World.staticSelf = this;

		this.worldTick = new WorldTickManager();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	
	private onAddToStage(event:egret.Event){
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.onWorldLoaded();


		this.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event) => {
			let tmpDeltaTime = this.worldTick.onUpdateDeltaTime();
			this.onUpdate(tmpDeltaTime)
		}, this);
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