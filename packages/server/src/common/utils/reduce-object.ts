export function reduceObject<T extends {}>(obj: T): Partial<T> {
	return Object.entries(obj).reduce((acc, [key, val]) => {
		if (val !== undefined && val !== null) {
			acc[key] = val
		}

		return acc
	}, {}) as Partial<T>
}
