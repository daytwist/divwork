Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: { registrations: "api/v1/auth/registrations" }

      namespace :auth do
        resources :sessions, only: [:index]
      end

      get "teams/select", to: "teams#select"
      resources :teams, only: [:create, :show, :update, :destroy]

      resources :users, only: [:show]
      get "users/:id/finished", to: "users#finished"

      resources :tasks, only: [:create, :show, :update, :destroy] do
        resources :divisions, only: [:new, :create]
      end

      get "health_check", to: "health_check#index"
    end
  end
end
