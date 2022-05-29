Rails.application.routes.draw do
  resources :posts
  resources :books

  use_doorkeeper
  devise_for :users
  root 'pages#home'

  get '/member-data', to: 'members#show'

  draw :api
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
