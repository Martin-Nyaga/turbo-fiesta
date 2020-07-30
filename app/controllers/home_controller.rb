class HomeController < ApplicationController
  def index
    js capturePaymentUrl: capture_url(format: :json)
  end

  def capture_payment
    params.permit!

    Thread.new do
      sleep 3
      ActionCable.server.broadcast(
        "payments:#{params[:order_id]}",
        success: true,
        message: "Here is the response from the payment gateway!",
        order_id: params[:order_id]
      )

      # This will stream to (for example) payments:ac12cdea
      # PaymentsChannel.broadcast_to(
      #   @order,
      #   success: true,
      #   message: "Here is the response from the payment gateway!",
      #   order_id: params[:order_id]
      # )
   end

    # Make request to the MPesa API
    respond_to do |format|
      format.json do
        render json: { success: true }
      end
    end
  end
end
