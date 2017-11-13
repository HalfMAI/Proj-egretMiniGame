module ECS {
	export class testSystem implements BaseSystem {		
		public systemUpdateEntity(entities: BaseEntity[]) {
			entities.forEach(entity => {
				let tmpPosComponents:BaseComponent[] = EntityManager.GetComponents(entity, ComponentTags.PositionCom);
				if (tmpPosComponents) {
					tmpPosComponents.forEach(element => {
						let tmpState:PostionState = element.componentState;
						tmpState.posY += 30 * World.getDeltaTime();
					});

					let tmpRenderComponents:BaseComponent[] = EntityManager.GetComponents(entity, ComponentTags.RenderCom);
					if (tmpRenderComponents) {
						tmpRenderComponents.forEach(element => {
							let tmpState:RenderState = element.componentState;
							tmpState.renderBody.x = tmpPosComponents[0].componentState.posX;
							tmpState.renderBody.y = tmpPosComponents[0].componentState.posY;
						});
					}				
				}
			});
		}
	}
}