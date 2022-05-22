namespace :api do
  namespace :v1 do
    scope :users, module: :users do
      post '/', to: 'registrations#create', as: :user_registration
    end
    resources :books
    resources :posts

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