Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index'
      post 'users/create'
      delete 'users/:id', to: 'users#destroy'

      post 'session/create', to: 'sessions#create'
      delete 'session/', to: 'sessions#destroy'

      get 'polls/index'
      get 'polls/:id', to: 'polls#show'
    end
  end

  resources :users, only: [:new]
  resource :session, only: [:new]
  resources :polls, only: [:show]

  root 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
