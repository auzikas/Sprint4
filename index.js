const shoppingInput = document.querySelector(".shopping-list-input");
const addItemButton = document.querySelector(".shopping-list-submit");
const listContainer = document.querySelector(".items");
const clearAllButton = document.querySelector('.clear-all');


let shoppingList = [];

window.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('shoppingList'))
    ? JSON.parse(localStorage.getItem('shoppingList'))
    : [];
    items.forEach((item) => {
        handleCreatItem(item);
    });
    shoppingList = items;
})

const setItemsToLocalStorageOnEditOrDelete = (item) => {
    if(item) {
        item.remove();
    }

    const items = document.querySelectorAll('.item .text');
    const itemsArr = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        itemsArr.push(item.value);
    }
    shoppingList = itemsArr
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}


const handleEditItem = (contentInput, editBtn) => {
    if(editBtn.innerText === 'EDIT') {
        editBtn.innerText = 'SAVE';
        contentInput.disabled = false;
    } else if(editBtn.innerText === 'SAVE'){
        editBtn.innerText = 'EDIT';
        contentInput.disabled = true;
        setItemsToLocalStorageOnEditOrDelete();
    }
}

const handleClearAll = (event) => {
    event.preventDefault()
    const items = document.querySelectorAll('.item');
    items.forEach(item => item.remove());
    shoppingList = [];
    localStorage.clear();
}

clearAllButton.addEventListener('click', handleClearAll)

const handleCreatItem = (text) => {
const item = document.createElement('div');
    item.classList.add('item');
    const content = document.createElement('div');
    content.classList.add('content');
    const contentInput = document.createElement('input')
    contentInput.classList.add('text');
    contentInput.disabled = true;
    contentInput.value = text ? text : shoppingInput.value;
    content.appendChild(contentInput);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete';
    deleteBtn.classList.add('delete');

    deleteBtn.addEventListener('click', () => setItemsToLocalStorageOnEditOrDelete(item));

    editBtn.addEventListener('click', () => handleEditItem(contentInput, editBtn));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(content)
    item.appendChild(actions)
    listContainer.appendChild(item);
    shoppingInput.value = '';
    handleAddItemsToLocalstorage(item);
}

const handleAddItemToShoppingList = (e) => {
    e.preventDefault();
    handleCreatItem();
}


const handleAddItemsToLocalstorage = (item) => {
    const shoppingItem = item.querySelector('.text').value;
    shoppingList.push(shoppingItem);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}


addItemButton.addEventListener("click", handleAddItemToShoppingList);