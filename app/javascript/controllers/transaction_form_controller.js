import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static outlets = ['stock'];
  static targets = ['material', 'unit', 'preview', 'quantity', 'price',
                    'materialPreview', 'quantityPreview', 'pricePreview'];

  updateUnit() {
    const unitIndicator = this.unitTarget;
    const stock = this.currentStock();

    unitIndicator.innerText = stock ? `Unit: ${stock.unitValue}` : "";
  }

  updatePreview() {
    if(this.readyForPreview()) {
      const stock = this.currentStock();
      this.previewTarget.style.display = "flex";

      this.materialPreviewTarget.innerText = stock.nameValue;
      this.updateQuantityPreview(stock);
      this.updatePricePreview(stock);
    } else {
      this.previewTarget.style.display = "none";
    }
  }

  updateQuantityPreview(stock) {
    if (this.quantityTarget.checkValidity()) {
      const currentQuantity = parseFloat(stock.currentValue);
      const addedQuantity = parseFloat(this.quantityTarget.value);
      const updatedQuantity = parseFloat(currentQuantity + addedQuantity);

      this.quantityPreviewTarget.style.display = "block";
      this.quantityPreviewTarget.innerHTML = `Stock:&ensp;&ensp;${currentQuantity}&ensp;&ensp;=>&ensp;&ensp;${updatedQuantity}`;
    } else {
      this.quantityPreviewTarget.style.display = "none";
      this.quantityPreviewTarget.innerText = "";
    }
  }

  updatePricePreview(stock) {
    if (this.priceTarget.checkValidity()) {
      const currentPrice = parseFloat(stock.priceValue);
      const addedPrice = parseFloat(this.priceTarget.value);
      const updatedPrice = parseFloat(currentPrice + addedPrice);

      this.pricePreviewTarget.style.display = "block";
      this.pricePreviewTarget.innerHTML = `Purchase cost:&ensp;&ensp;₹ ${currentPrice}&ensp;&ensp;=>&ensp;&ensp;₹ ${updatedPrice}`;
    } else {
      this.pricePreviewTarget.style.display = "none";
      this.pricePreviewTarget.innerText = "";
    }
  }

  readyForPreview() {
    return this.materialTarget.checkValidity() &&
             (this.quantityTarget.checkValidity() ||
                this.priceTarget.checkValidity());
  }

  currentStock() {
    return this.findStockByMaterialId(this.currentMaterialId());
  }

  currentMaterialId() {
    return this.materialTarget.options[this.materialTarget.selectedIndex].value;
  }

  findStockByMaterialId(id) {
    return this.stockOutlets.find(stock => stock.materialIdValue === id);
  }
};
