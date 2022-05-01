const shoppingInput = document.querySelector(".shopping-list-input");
const addItemButton = document.querySelector(".shopping-list-submit");
const listContainer = document.querySelector(".items");


let shoppingList = [];

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

        editBtn.addEventListener('click', () => handleEditItem(contentInput, editBtn));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
    
        item.appendChild(content)
        item.appendChild(actions)
        listContainer.appendChild(item);
        shoppingInput.value = '';
}

const handleAddItemToShoppingList = (e) => {
    e.preventDefault();
    handleCreatItem();
}


addItemButton.addEventListener("click", handleAddItemToShoppingList);