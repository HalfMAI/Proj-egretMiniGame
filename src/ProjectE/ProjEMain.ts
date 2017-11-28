module ProjectE {
	export class ProjEMainContainer extends ECS.World {
		public constructor() {
			super(); 

		}

		public onWorldLoaded(){
			this.LoadLevel(Levels.LevelList.MainLevel);
		}

		public onUpdate(deltaTime:number){

		}
	}
}