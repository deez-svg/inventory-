class TransactionsController < ApplicationController
  def create
    @transaction = Transaction.new(transaction_params)
    if @transaction.save
      redirect_to stocks_path, notice: "Transaction was successfully created."
    else
      redirect_to stocks_path, alert: "Transaction was not created."
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(:material_id, :quantity, :price)
  end
end
