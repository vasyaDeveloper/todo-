const wrapper = document.querySelector('.todoWrapper');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const select = document.querySelector('.select');

function InputValue(value) {
    this.value = value;
    this.completed = false;
};

let array;

if (localStorage.getItem("element") === null) {
    array = [];
} else {
    array = JSON.parse(localStorage.getItem("element"))
};

function pushIntoStorage() {
    localStorage.setItem("element", JSON.stringify(array))
};

button.addEventListener('click', () => {
    array.push(new InputValue(input.value));
    pushIntoStorage();
    fillHTML();
    input.value = '';
})

function fillHTML() {
    wrapper.innerHTML = '';
    if (array.length > 0) {
        sort()
        array.forEach((item, index) => {
            wrapper.innerHTML += markup(item, index);
        })
    };
};

fillHTML()

function markup(item, index) {
    return `<div class="todoItem ${item.completed ? 'completed' : ''}">
                <div class="todoText">${item.value}</div>
                <div class="todoButtons">
                    <button class="checkButton" onclick=checkButton(${index})><i class="fas fa-pastafarianism"></i></button>
                    <button class="removeButton" onclick=removeButton(${index})><i class="fas fa-skull-crossbones"></i></button>
                </div>
            </div>`
};


function checkButton(index) {
    array[index].completed = !array[index].completed;
    pushIntoStorage();
    fillHTML();
};

function removeButton(index) {
    let getChildren = wrapper.children[index];
    getChildren.classList.add('deleteAnimation');
    setTimeout(() => {
        array.splice(index, 1);
        pushIntoStorage();
        fillHTML()
    }, 300)
};

function sort() {
    let arr1 = array.filter((item) => item.completed == false);
    let arr2 = array.filter((item) => item.completed == true);
    array = [...arr1, ...arr2];
}

select.addEventListener('click', (e) => {
    let getChildren = wrapper.childNodes;
    getChildren.forEach((i) => {
        switch (e.target.value) {
            case 'all':
                i.style.display = 'flex';
                break
            case 'completed':
                if (i.classList.contains('completed')) {
                    i.style.display = 'flex';
                } else {
                    i.style.display = 'none';
                }
                break
            case 'uncompleted':
                if (!i.classList.contains('completed')) {
                    i.style.display = 'flex';
                } else {
                    i.style.display = 'none';
                }
                break;
        }
    })
})

