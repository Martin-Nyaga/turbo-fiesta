class PaymentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "payments:#{params[:order_id]}"

    # order = Order.find(params[:order_id])
    # stream_for order
  end
end
