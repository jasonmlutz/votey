Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show]
      delete 'users/:id', to: 'users#destroy'

      resource :session, only: [:create]
      delete 'session/', to: 'sessions#destroy'

      resources :polls, only: [:show, :index, :create]
      resources :responses, only: [:create, :show] do
        resources :answers, only: [:create]
      end

      resources :answers, only: [:show]
    end
  end

  resources :users, only: [:new, :show]
  resource :session, only: [:new]
  resources :polls, only: [:show, :index, :new]
  resources :responses, only: [:show]

  root 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
