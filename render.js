const fs = require('fs')

const categoryNames = require('./menus/categories.json').categories;
const inspectorContents = categoryNames.map(name =>
  fs.readFileSync(`./menus/${name}.html`, 'utf8')
);

// Load the category panel
(() => {
  let innerHTML = "";
  categoryNames.forEach((name) => {
    innerHTML += `<div class="category-name">${name}</div>`;
  })

  let element = document.getElementsByClassName("categories")[0];
  element.innerHTML = innerHTML;
})();

// Load the inspector for each category
const inspectors = (() => {
  let inspector = document.getElementsByClassName("inspector")[0];

  return inspectorContents.map((content, i) => {
    let name = categoryNames[i];
    let element = document.createElement("div");
    element.innerHTML = content;
    element.classList.add("hidden");
    inspector.appendChild(element);

    return {
      name: name,
      element: element
    };
  });
})();
