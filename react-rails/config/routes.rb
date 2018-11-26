Rails.application.routes.draw do
  namespace :api do
    get "/players", to: "players#index", as: "players"
  end
end