var fs = require('fs');
const data = JSON.parse(fs.readFileSync("data/users.json"));

function dedup(data) {

    const filtered = new Map();

    // We need to use a stack for this because using splice changes the length of
    // the array. Changing the length of the array also changes the indexes of the
    // elements, thus making splice delete the wrong item. As such, we use an Array
    // as a stack.
    data.forEach(v => {
        if (!filtered.has(v.id)) {
            filtered.set(v.id, v);
        }
    });

    return Array.from(filtered.values())
}
