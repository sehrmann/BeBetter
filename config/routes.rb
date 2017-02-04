Rails.application.routes.draw do
  root "sessions#new"

  get "auth/:provider/callback", to: "sessions#create"
  get "signin", to: "sessions#new", as: "signin"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new]
  resources :users, only: [:create, :new, :show]
  resources :tasks, except: :show

  namespace :api do
    namespace :v1 do
      resources :users, only: [:fetch_current_user, :update, :update_points_goal] do
        post :update_points_goal
        collection do
          get :fetch_current_user
        end
      end
      resources :tasks, except: [:new, :edit] do
        collection do
          get :importances_and_periods
        end
      end
    end
  end

end
