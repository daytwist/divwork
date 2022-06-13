Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: { registrations: "api/v1/auth/registrations" }

      get "teams/select", to: "teams#select"
      resources :teams, only: [:create, :show, :update, :destroy]

      resources :users, only: [:show]

      resources :tasks, only: [:create, :show, :update, :destroy] do
        resources :divisions, only: [:new, :create]
      end

      get "users/:id/finished", to: "users#finished"
    end
  end
end
