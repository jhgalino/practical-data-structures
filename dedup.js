var fs = require('fs');
const data = JSON.parse(fs.readFileSync("data/users.json"));

function dedup(data) {

    const idStore = new Set();
    const filtered = [];

    // We need to use a stack for this because using splice changes the length of
    // the array. Changing the length of the array also changes the indexes of the
    // elements, thus making splice delete the wrong item. As such, we use an Array
    // as a stack.
    data.forEach(v => {
        if (!idStore.has(v.id)) {
            idStore.add(v.id);
            filtered.push(v);
        }
    });

    return filtered;
}

console.log(dedup(data));
