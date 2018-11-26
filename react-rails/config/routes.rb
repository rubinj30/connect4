Rails.application.routes.draw do
  namespace :api do
    resources :players do
    end
  end
end