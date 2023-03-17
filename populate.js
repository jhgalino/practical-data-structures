var fs = require('fs');
let data = JSON.parse(fs.readFileSync("data/users.json"));

function populate(data) {

    const idMap = new Map();

    // time: O(n)
    // space: O(n)
    data.forEach(v => {
        if (!idMap.has(v.id)) {
            idMap.set(v.id, v);
        }
    });

    // deduplicate array
    data = Array.from(idMap.values())

    // time: O(n^2)
    // space: O(n)
    data.forEach(v => {
        v.friends.forEach((friend, index) => {
            // for each id in the friends field, remove the id using splice
            // and replace it with the actual user object. using splice is safe 
            // here because the length does not change as items are only replaced
            const f = idMap.get(friend);
            v.friends.splice(index, 1, f);
        })
    });

    return data;
}

const x = populate(data);
x.forEach(item => console.log(item.friends))
