Rails.application.routes.draw do
  resources :posts
  use_doorkeeper
  devise_for :users
  resources :books
  root 'pages#home'

  draw :api
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
