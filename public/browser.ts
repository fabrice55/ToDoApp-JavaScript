declare const items: any[];
declare const axios: any;

function itemTemplate(item: any): string {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`;
}

const ourHTML = items.map(function(item) {
  return itemTemplate(item);
}).join('');

const itemList = document.getElementById("item-list");
if (itemList) {
  itemList.insertAdjacentHTML("beforeend", ourHTML);
}

const createField = document.getElementById("create-field") as HTMLInputElement | null;

const createForm = document.getElementById("create-form");
if (createForm && createField) {
  createForm.addEventListener("submit", function(e) {
    e.preventDefault();
    axios.post('/create-item', { text: createField.value }).then(function (response: any) {
      const itemListEl = document.getElementById("item-list");
      if (itemListEl) {
        itemListEl.insertAdjacentHTML("beforeend", itemTemplate(response.data));
      }
      createField.value = "";
      createField.focus();
    }).catch(function(err: any) {
      const msg = err.response?.data?.error || err.response?.data || "Please try again later.";
      alert("Error adding item: " + msg);
    });
  });
}

document.addEventListener("click", function(e) {    
  const target = e.target as HTMLElement;

  // Delete Feature
  if (target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this item permanently?")) {
      const id = target.getAttribute("data-id");
      axios.post('/delete-item', { id }).then(function () {
        const parentLi = target.parentElement?.parentElement;
        if (parentLi) {
          parentLi.remove();
        }
      }).catch(function(err: any) {
        const msg = err.response?.data?.error || err.response?.data || "Please try again later.";
        alert("Error deleting item: " + msg);
      });
    }
  }
  
  // Update Feature
  if (target.classList.contains("edit-me")) {
    const parentLi = target.parentElement?.parentElement;
    const itemTextEl = parentLi?.querySelector(".item-text");
    if (itemTextEl) {
      const userInput = prompt("Enter your desired new text", itemTextEl.innerHTML);
      if (userInput) {
        const id = target.getAttribute("data-id");
        axios.post('/update-item', { text: userInput, id }).then(function () {
          itemTextEl.innerHTML = userInput;
        }).catch(function(err: any) {
          const msg = err.response?.data?.error || err.response?.data || "Please try again later.";
          alert("Error updating item: " + msg);
        });
      }
    }
  }
});
