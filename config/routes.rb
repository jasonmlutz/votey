Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show]
      delete 'users/:id', to: 'users#destroy'

      resource :session, only: [:create, :show]
      delete 'session/', to: 'sessions#destroy'

      resources :polls, only: [:show, :index, :create] do
        resources :questions, only: [:create, :show]
      end

      resources :questions, only: [:show] do
        resources :response_options, only: [:create, :show]
      end
      resources :responses, only: [:create, :show] do
        resources :answers, only: [:create]
      end

      resources :answers, only: [:show]
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
