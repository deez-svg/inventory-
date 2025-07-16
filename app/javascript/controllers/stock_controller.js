import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['percentageBar', 'percentage'];
  static values = { current: String, minimum: String, unit: String,
                    price: String, materialId: String, name: String };

  connect() {
    this.updatePercentageBar();
  }

  updatePercentageBar() {
    const bar = this.percentageBarTarget;
    const percentageIndicator = this.percentageTarget;
    const percentage = this.minimumValue == 0 ? 100 : parseInt(this.currentValue / this.minimumValue * 100);
    const width = percentage < 100 ? percentage : 100;

    bar.style.width = `${width}%`;
    bar.style.backgroundColor = `var(--stock-bar-${width === 100 ? 'full' : 'low'}`;
    percentageIndicator.innerText = `${percentage}%`;
  }
};
