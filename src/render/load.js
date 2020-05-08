
// Load the static contents into the app
((global) => {
  let StaticContent = (() => {
    const fs = require('fs')
    const categoryNames = require('./config/categories.json').categories;
    const inspectorContents = categoryNames.map(name =>
      fs.readFileSync(`./static/menus/${name}.html`, 'utf8')
    );

    // Load the inspector for each category
    const inspectors = (() => {
      let inspector = document.getElementsByClassName("inspector-panel")[0];

      return inspectorContents.map((content) => {
        let element = document.createElement("div");
        element.innerHTML = content;
        element.classList.add("hidden");
        element.classList.add("inspector");
        inspector.appendChild(element);

        return element;
      });
    })();

    // Load the category panel
    const categories = (() => {
      let categoriesPanel = document.getElementsByClassName("categories")[0];

      return categoryNames.map((name, i) => {
        let element = document.createElement("div");
        element.innerHTML = name;
        element.classList.add("category-name");
        element.classList.add(i % 2 == 0 ? "base-even" : "base-odd");
        element.onclick = () => showInspector(i);
        categoriesPanel.appendChild(element);

        return element;
      });
    })();

    // Hide current inspector and show the selected one
    let selectedCategory;
    const showInspector = (i) => {
      if (selectedCategory != undefined) {
        inspectors[selectedCategory].classList.add("hidden");
        categories[selectedCategory].classList.remove("selected");
      }
      selectedCategory = i;
      inspectors[selectedCategory].classList.remove("hidden");
      categories[selectedCategory].classList.add("selected");
    };

    return {
      categories: categories,
      inspectors: inspectors
    };
  })();

  global.StaticContent = StaticContent;
})( this );
