var fs = require('fs');
let data = JSON.parse(fs.readFileSync("data/users.json"));

function populate(data) {

    // normally, dedup would be imported here but default js does not allow imports
    function dedup(data) {

        const idStore = new Set();
        const filtered = new Array();
    
        /* We need to use a stack for this because using splice changes the length of
        the array. Changing the length of the array also changes the indexes of the
        elements, thus making splice delete the wrong item. As such, we use an Array
        as a stack. */
        data.map((v, _) => {
            if (!idStore.has(v.id)) {
                idStore.add(v.id);
                filtered.push(v);
            }
        });
    
        return filtered;
    }
    
    
    const filtered_data = dedup(data);
    const hash = new Map();
    filtered_data.map((v, i) => hash.set(v.id, i));

    filtered_data.map((v, _) => {
        v.friends.map((friend, index) => {
            v.friends.splice(index, 1, filtered_data[hash.get(friend)]);
        })
    });

    return filtered_data;
}

populate(data);