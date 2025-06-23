"use strict";
function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`;
}
const ourHTML = items.map(function (item) {
    return itemTemplate(item);
}).join('');
const itemList = document.getElementById("item-list");
if (itemList) {
    itemList.insertAdjacentHTML("beforeend", ourHTML);
}
const createField = document.getElementById("create-field");
const createForm = document.getElementById("create-form");
if (createForm && createField) {
    createForm.addEventListener("submit", function (e) {
        e.preventDefault();
        axios.post('/create-item', { text: createField.value }).then(function (response) {
            const itemListEl = document.getElementById("item-list");
            if (itemListEl) {
                itemListEl.insertAdjacentHTML("beforeend", itemTemplate(response.data));
            }
            createField.value = "";
            createField.focus();
        }).catch(function (err) {
            var _a, _b, _c;
            const msg = ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data) || "Please try again later.";
            alert("Error adding item: " + msg);
        });
    });
}
document.addEventListener("click", function (e) {
    var _a;
    const target = e.target;
    // Delete Feature
    if (target.classList.contains("delete-me")) {
        if (confirm("Do you really want to delete this item permanently?")) {
            const id = target.getAttribute("data-id");
            axios.post('/delete-item', { id }).then(function () {
                var _a;
                const parentLi = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
                if (parentLi) {
                    parentLi.remove();
                }
            }).catch(function (err) {
                var _a, _b, _c;
                const msg = ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data) || "Please try again later.";
                alert("Error deleting item: " + msg);
            });
        }
    }
    // Update Feature
    if (target.classList.contains("edit-me")) {
        const parentLi = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        const itemTextEl = parentLi === null || parentLi === void 0 ? void 0 : parentLi.querySelector(".item-text");
        if (itemTextEl) {
            const userInput = prompt("Enter your desired new text", itemTextEl.innerHTML);
            if (userInput) {
                const id = target.getAttribute("data-id");
                axios.post('/update-item', { text: userInput, id }).then(function () {
                    itemTextEl.innerHTML = userInput;
                }).catch(function (err) {
                    var _a, _b, _c;
                    const msg = ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data) || "Please try again later.";
                    alert("Error updating item: " + msg);
                });
            }
        }
    }
});
