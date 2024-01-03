const removeDuplicates = (array, key) => {
	const uniqueKeys = new Set();
	return array.filter((item) => {
		const value = item[key];
		if (!uniqueKeys.has(value)) {
			uniqueKeys.add(value);
			return true;
		}
		return false;
	});
};

module.exports = { removeDuplicates };
