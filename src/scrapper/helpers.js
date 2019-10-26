const filterP = async (arr, pred) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const res = await pred(arr[i]);
        res && result.push(arr[i]);
    }

    return result;
};

const mapP = async (arr, mapper) => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        result.push(await mapper(arr[i]));
    }

    return result;
};

module.exports = {
    mapP,
    filterP,
};
