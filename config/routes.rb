Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show]
      # get 'users/index'
      # post 'users/create'
      delete 'users/:id', to: 'users#destroy'

      resource :session, only: [:create]
      # post 'session/create', to: 'sessions#create'
      delete 'session/', to: 'sessions#destroy'

      resources :polls, only: [:show]
      resources :responses, only: [:create, :show] do
        resources :answers, only: [:create]
      end

      resources :answers, only: [:show]

      # resources :polls do
      #   resources :questions, shallow: true
      # end
      #
      # resources :questions, only: [] do
      #   resources :response_options, shallow: true
      # end
    end
  end

  resources :users, only: [:new]
  resource :session, only: [:new]
  resources :polls, only: [:show]
  resources :responses, only: [:show]

  root 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
