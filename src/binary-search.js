const dataUrl = 'https://raw.githubusercontent.com/dominictarr/random-name/refs/heads/master/first-names.json';

async function getAllData() {
    return fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('Data is not an array');
            }
            return data;
        });
}

// Normal search function
async function findIndex(name, data) {
    const start = performance.now();
    for (let i = 0; i < data.length; i++) {
        if (data[i] === name) {
            const end = performance.now();
            console.log(`Normal search took ${end - start} ms`);
            return i;
        }
    }
    const end = performance.now();
    console.log(`Normal search took ${end - start} ms`);
    return -1;
}

// Binary search function
async function binarySearch(name, data) {
    const start = performance.now();
    let left = 0;
    let right = data.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (data[mid] === name) {
            const end = performance.now();
            console.log(`Binary search took ${end - start} ms`);
            return mid;
        } else if (data[mid] < name) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    const end = performance.now();
    console.log(`Binary search took ${end - start} ms`);

    return -1;
}

(async () => {
    const data = await getAllData();

    if (!Array.isArray(data)) {
        console.error('No data found');
        return;
    }

    findIndex('Julie', data).then(idx => {
        console.log('Normal search index:', idx);
    });
    binarySearch('Julie', data).then(idx => {
        console.log('Binary search index:', idx);
    });
})();
