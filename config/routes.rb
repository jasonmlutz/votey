Rails.application.routes.draw do
  namespace :api do
    namespace :v3 do
      resources :responses, only: [:show]
    end

    namespace :v2 do
      resources :polls, only: [:show]
    end
    
    namespace :v1 do
      resources :answers, only: [:show, :destroy]

      resources :polls, only: [:show, :index, :create, :destroy] do
        resources :questions, only: [:create, :show]
      end

      resources :questions, only: [:show, :destroy] do
        resources :response_options, only: [:create, :show]
      end

      resources :responses, only: [:create, :show, :destroy] do
        resources :answers, only: [:create]
      end

      resources :response_options, only: [:destroy]

      resource :session, only: [:create, :show, :destroy]
      
      resources :users, only: [:index, :create, :show, :destroy]
    end
  end

  resources :users, only: [:new, :show]
  resource :session, only: [:new]

  resources :polls, only: [:show, :index, :new] do
    resources :questions, only: [:new]
  end

  resources :responses, only: [:show]

  root 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
