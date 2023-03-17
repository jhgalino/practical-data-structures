var fs = require('fs');
let data = JSON.parse(fs.readFileSync("data/users.json"));

function dedup(data) {

    let idStore = new Set();

    console.log(data.length);

    data.map((v, i) => {
        if (!idStore.has(v.id)) {
            idStore.add(v.id);
        } else {
            console.log(v.id)
            data.splice(i, 1);
        }
    });

    console.log(data.length);

    return data;
}

dedup(data);