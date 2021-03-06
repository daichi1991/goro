Rails.application.routes.draw do
  devise_for :users, path: 'api/v1/auth',
  controllers: {
    registrations: "api/v1/auth/registrations",
    sessions: "api/v1/auth/sessions",
    confirmations: "api/v1/auth/confirmations"
  }

  devise_scope :user do
    post 'api/v1/auth/resend_confirmation' => 'api/v1/auth/registrations#resend_confirmation'
  end

    

  namespace :api do
    namespace :v1 do
      resources :items do
        collection do
          get 'user_index'
          get 'search'
          get ':user_id/other_user_index', to: 'items#other_user_index'
        end
      end
      resources :my_lists
      resources :item_mylists do
        collection do
          get 'mylist_index'
        end
      end
      resources :profiles do
        collection do
          post 'upload_image'
          get 'my_profile'
          get 'get_profile_id'
        end
      end
      resources :users do
        collection do
          get 'current_user_show'
          get 'sign_in_check'
        end
      end
    end
  end
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

end
