Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      get "teams/select", to: "teams#select"
      resources :teams, only: [:create, :show, :update, :destroy]
      mount_devise_token_auth_for "User", at: "auth", controllers: { registrations: "api/v1/auth/registrations" }
      resources :tasks, only: [:create, :show, :update, :destroy]
    end
  end
end
