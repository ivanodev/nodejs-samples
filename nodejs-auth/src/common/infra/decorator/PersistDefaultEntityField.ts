import DefaultFieldEntityContainer, { DefaultFieldEntityType } from "@common/infra/database/DefaultFieldEntityContainer";

const PersistDefaultEntityField = (type: DefaultFieldEntityType[] | DefaultFieldEntityType) => {
	return (target: Function) => {

		if (Array.isArray(DefaultFieldEntityType)) {

			DefaultFieldEntityContainer.registerDefaultField(target.name, DefaultFieldEntityType as DefaultFieldEntityType[]);

		} else {

			if (type === DefaultFieldEntityType.all) {

				DefaultFieldEntityContainer.registerDefaultField(target.name, [
					DefaultFieldEntityType.created,
					DefaultFieldEntityType.updated,
					DefaultFieldEntityType.deactivated
				]);
			} else {

				DefaultFieldEntityContainer.registerDefaultField(target.name, type);
			}
		}
	}
}

export { PersistDefaultEntityField };