Rails.application.routes.draw do
  namespace :api do
    namespace :v0 do
      get 'users/index'
      get 'user/:id', to: 'user#show'
      post 'users/create'
      delete 'users/:id', to: 'users#destroy'
    end
  end


  root 'users#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
