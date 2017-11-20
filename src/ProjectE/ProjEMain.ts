module ProjectE {
	export class ProjEMainContainer extends World {
		public constructor() {
			super(); 

			this.LoadLevel(Levels.LevelList.TestLevel);
		}
	}
}