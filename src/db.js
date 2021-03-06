const todos = document.querySelector('.todotable');

// real time listener
//db.collection("MyToDos").orderBy("Priority", "desc").onSnapshot((snapshot) => {
db.collection("MyToDos").onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added') {
            renderTodo(change.doc.data(), change.doc.id)
        }
        if(change.type === 'removed') {

        }
    });
})


const renderTodo = (data, id) => {
    
    const html = `
        <tr data_id="${id}">
            <td>${id}</td>
            <td>${data.Text}</td>
            <td>${data.Priority}</td>
        </tr>
    `;

    todos.innerHTML += html;
}

function writeData() {

    const todoItem = {
        Text: document.getElementById('taskfield').value,
        Priority: document.getElementById('priofield').value
    }
    document.getElementById('taskfield').value = null;
    document.getElementById('priofield').value = null;

    db.collection('MyToDos').add(todoItem).catch(err => console.log(err));
}