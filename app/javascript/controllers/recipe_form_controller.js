import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["ingredientsContainer"];
  static values = { ingredientsCount: Number };
  static outlets = ['material-data'];

  addIngredient() {
    // Find an existing ingredient fieldset to clone
    const existingFieldset = this.ingredientsContainerTarget.querySelector(".ingredient");

    if (!existingFieldset) {
      console.error("No existing ingredient fieldset found to clone.");
      return;
    }

    // Clone the fieldset and clear its values
    const newFieldset = existingFieldset.cloneNode(true);
    newFieldset.style.display = "block";
    this.clearFieldsetValues(newFieldset);

    // Update the name attributes with the new index
    const index = this.ingredientsCountValue;
    this.updateFieldsetIndex(newFieldset, index);

    // Append the new fieldset to the container
    this.ingredientsContainerTarget.appendChild(newFieldset);
    this.ingredientsCountValue += 1;
  }

  clearFieldsetValues(fieldset) {
    // Clear all input and select values in the cloned fieldset
    fieldset.querySelectorAll("input, select").forEach((element) => {
      if (element.tagName === "SELECT") {
        element.selectedIndex = 0; // Reset select to the first option
      } else {
        element.value = ""; // Clear input values
      }
    });
    const hiddenInput = fieldset.querySelector("[type='hidden']");
    if (hiddenInput) {
      hiddenInput.remove();
    }
  }

  updateFieldsetIndex(fieldset, index) {
    // Update the name attributes to reflect the new index
    fieldset.querySelectorAll("[name]").forEach((element) => {
      element.name = element.name.replace(
        /\[\d+\]/,
        `[${index}]`
      );
      element.id = element.id.replace(
        /_\d+_/,
        `_${index}_`
      );
    });
  }

  removeIngredient(event) {
    // Remove the ingredient field
    if (this.ingredientsCountValue === 1) { return }

    const fieldSet = event.target.closest(".ingredient");
    const siblingElement = fieldSet.nextElementSibling;

    if(siblingElement && siblingElement.tagName === "INPUT") {
      const attributeId = siblingElement.name.match(/\d+/)[0];
      fieldSet.appendChild(this.createDestroyMarkerElement(attributeId));
      fieldSet.style.display = "none";
    } else {
      fieldSet.remove();
      this.ingredientsCountValue -= 1;

      // Reindex the remaining ingredients
      this.reindexIngredients();
    }
  }

  createDestroyMarkerElement(id) {
    const element = document.createElement("input");
    element.type = "hidden";
    element.name = `recipe[ingredients_attributes][${id}][_destroy]`;
    element.id = `recipe_ingredients_attributes_${id}__destroy`;
    element.value = "1";
    return element;
  }

  reindexIngredients() {
    // Get all ingredient fieldsets
    const fieldsets = this.ingredientsContainerTarget.querySelectorAll(".ingredient");

    // Update the name attributes for each fieldset
    fieldsets.forEach((fieldset, index) => {
      this.updateFieldsetIndex(fieldset, index);
    });
  }

  updateUnit(event) {
    const input = event.target;
    const materialId = parseInt(input.value);
    const materialUnitHolder = input.parentElement.parentElement.querySelector(".material-unit");

    if (materialId === null || isNaN(materialId)) {
      materialUnitHolder.innerText = "unit: ";
    } else {
      const materialData = this.findMaterialData(materialId);
      materialUnitHolder.innerText = `unit: ${materialData.unitValue}`;
    }
  }

  findMaterialData(id) {
    return this.materialDataOutlets.find((material) => material.idValue === id);
  }
}
