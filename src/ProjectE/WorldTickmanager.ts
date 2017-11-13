class WorldTickManager {
	private lastTime:number;
	private deltaTime:number;
	public constructor() {
		this.lastTime = egret.getTimer();
		this.deltaTime = 0;
	}

	public onUpdateDeltaTime():number {
		let tmpCurTime = egret.getTimer();
		this.deltaTime = (tmpCurTime - this.lastTime) / 1000 ;

		this.lastTime = tmpCurTime;
		return this.deltaTime;
	}

	public getDeltaTime():number {
		return this.deltaTime;
	}
}