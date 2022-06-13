namespace :api do
  namespace :v1 do
    scope :users, module: :users do
      post '/', to: 'registrations#create', as: :user_registration
      get '/session-data', to: 'sessions#show'
      post '/session-data', to: 'sessions#create'
    end

    resources :users
    resources :likes
    resources :posts do
      resources :likes, only: [:index]
    end

    get '/likes/destroy', to: 'likes#destroy'
    
    resources :groups do
      resources :memberships, :invites
      resources :posts, only: [:index]
      get '/requests', to: 'invites#index_requests'
      put '/requests/:id', to: 'invites#update_request'
    end

    get '/home', to: 'posts#index_home'

    namespace :android do
      resources :books
    end

  end
end

scope :api do
  scope :v1 do
    use_doorkeeper do
      skip_controllers :authorization, :applications, :authorized_applications
    end
  end
end