Rails.application.routes.draw do
  root "sessions#new"

  get "auth/:provider/callback", to: "sessions#create"
  get "signin", to: "sessions#new", as: "signin"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new]
  resources :users
  resources :tasks
end
