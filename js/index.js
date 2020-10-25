
let toAdd = document.querySelector("#toAdd");
let add = document.querySelector("#addToList");
let table = document.querySelector("#list");
let list = localStorage.getItem("list");

add.addEventListener("click", () => {
    if (toAdd.value.length > 0) createRow(table.children.length, toAdd.value);
    saveTable();
});

function saveTable() {
    return new Promise((resolve, reject) => {
        try {
            let rows = table.querySelectorAll("tr");
            let columns = [];
            let data = [];
            rows.forEach(row => columns.push(row.querySelector("td.todo")));

            columns.shift();
            columns.forEach(column => data.push(column.firstChild.data));

            localStorage.setItem("data", JSON.stringify(data));
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

function loadTable() {
    return new Promise((resolve, reject) => {
        try {
            let data = JSON.parse(localStorage.getItem("data"));
            let counter = 1;
            data.forEach(element => createRow(counter++, element));
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

function createRow(number, text) {
    return new Promise((resolve, reject) => {
        try {
            let row = document.createElement("tr");

            let column = document.createElement("td");
            column.append(document.createTextNode(number));
            column.className = "counter column";
            row.append(column);

            column = document.createElement("td");
            column.append(document.createTextNode(text));
            column.className = "todo column";
            row.append(column);

            column = document.createElement("td");
            column.append(document.createElement("span"));
            column.className = "remove column";
            column.addEventListener("click", () => {
                column.parentNode.remove();
                updateCounter();
                saveTable();
            });
            row.append(column);

            table.append(row);
            resolve(row);
        } catch (error) {
            reject(error);
        }
    });
}

function updateCounter() {
    return new Promise((resolve, reject) => {
        try {
            let increment = 1;
            let counters = table.querySelectorAll(".counter");
            counters.forEach(counter => {
                counter.firstChild.data = increment++;
            });
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

loadTable();