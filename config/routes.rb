Rails.application.routes.draw do
  root "sessions#new"

  get "auth/:provider/callback", to: "sessions#create"
  get "signin", to: "sessions#new", as: "signin"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new]
  resources :users, only: [:create, :new, :show]

  namespace :api do
    namespace :v1 do
      resources :users, only: [:fetch_current_user, :update, :update_points_goal, :clear_tasks] do
        post :update_points_goal
        post :clear_tasks
        collection do
          get :fetch_current_user
        end
      end
      resources :tasks, except: [:show, :new, :edit] do
        collection do
          get :importances_and_periods
        end
      end
      resources :rewards, only: [:index, :create, :destroy, :amazon_lookup] do
        collection do
          post :amazon_lookup
        end
      end
    end
  end

end
