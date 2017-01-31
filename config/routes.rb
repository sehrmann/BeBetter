Rails.application.routes.draw do
  root "sessions#new"

  get "auth/:provider/callback", to: "sessions#create"
  get "signin", to: "sessions#new", as: "signin"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new]
  resources :users
  resources :tasks

  namespace :api do
    namespace :v1 do
      resources :tasks
    end
  end
end
