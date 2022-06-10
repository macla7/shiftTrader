namespace :api do
  namespace :v1 do
    scope :users, module: :users do
      post '/', to: 'registrations#create', as: :user_registration
      get '/session-data', to: 'sessions#show'
      post '/session-data', to: 'sessions#create'
    end

    resources :posts, :books

    resources :groups do
      resources :memberships, :invites
      get '/requests', to: 'invites#index_requests'
    end

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