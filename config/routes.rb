Rails.application.routes.draw do
  devise_for :users, path: 'api/v1/auth',
  controllers: {
    registrations: "api/v1/auth/registrations",
    sessions: "api/v1/auth/sessions",
    confirmations: "api/v1/auth/confirmations"
  }
  namespace :api do
    namespace :v1 do
      resources :items do
        collection do
          get 'user_item'
        end
      end
    end
  end
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

end
