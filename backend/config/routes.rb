Rails.application.routes.draw do
  namespace :api, format: "json" do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        sessions: "api/v1/auth/sessions",
        passwords: "api/v1/auth/passwords"
      }

      namespace :auth do
        devise_scope :api_v1_user do
          get "sessions", to: "sessions#index"
          post "guest_sign_in", to: "sessions#guest_sign_in"
        end
      end

      get "teams/select", to: "teams#select"
      resources :teams, only: [:create, :show, :update, :destroy]

      resources :users, only: [:show, :edit]

      resources :tasks, only: [:create, :show, :update, :destroy] do
        resources :divisions, only: [:new, :create]
      end

      get "health_check", to: "health_check#index"
    end
  end
end
