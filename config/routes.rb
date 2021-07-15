Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index'
      post 'users/create'
      delete 'users/:id', to: 'users#destroy'
      get 'session/create'
    end
  end

  resources :users, only: [:new]
  resource :session, only: [:new]

  root 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
