Rails.application.routes.draw do
  get 'home/index'

  post '/capture', to: 'home#capture_payment', format: :json
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root "home#index"
end
