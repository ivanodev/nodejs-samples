export default class RepositoryUtils {

	public static parseEnumerator(set: string | string[]): number[] {

		let enumerator: number[] = [];

		// MY SQL
		// if (set) {

		// 	if (typeof set === 'string') {

		// 		if (set.length > 0) {

		// 			const setArray = set.split(',');
		// 			setArray.forEach(item => enumerator.push(Number(item)));
		// 		}
		// 	} else if ( Array.isArray(set) ) {

		// 		set.forEach(item => enumerator.push(Number(item)));
		// 	}

		// }

		// POSTGRES
		if (set) {

			if (typeof set === 'string') {

				if (set.length > 0) {

					set = set.replace('{', '');
					set = set.replace('}', '');

					const setArray = set.split(',');
					setArray.forEach(item => enumerator.push(Number(item)));
				}
			} else if ( Array.isArray(set) ) {

				set.forEach(item => enumerator.push(Number(item)));
			}

		}
		
		return enumerator;
	}
}