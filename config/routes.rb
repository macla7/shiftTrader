Rails.application.routes.draw do
  resources :posts
  resources :books

  devise_for :users
  root 'pages#home'
  use_doorkeeper do
    controllers tokens: 'tokens'
  end

  draw :api
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
