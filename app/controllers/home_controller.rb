class HomeController < ApplicationController
  def index
    js capturePaymentUrl: capture_url(format: :json)
  end

  def capture_payment
    pp params.permit!

    respond_to do |format|
      format.json do
        render json: { success: true }
      end
    end
  end
end
