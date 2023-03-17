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
    
    // deduplicate data so there won't be confusion in regards to which user has which id
    const filtered_data = dedup(data);
    const hash = new Map();

    // We use a hash map here to store the indexes of each of the users in the
    // array. This is useful because we won't have to iterate through the entire
    // array of users every time we want to replace a friend ID 
    filtered_data.map((v, i) => hash.set(v.id, i));


    filtered_data.map((v, _) => {
        v.friends.map((friend, index) => {
            // for each id in the friends field, remove the id using splice
            // and replace it with the actual user object. using splice is safe 
            // here because the length does not change as items are only replaced
            v.friends.splice(index, 1, filtered_data[hash.get(friend)]);
        })
    });

    return filtered_data;
}

populate(data);