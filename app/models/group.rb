class Group < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships
  has_many :requests, -> { where request: true }, class_name: 'Invite'
  has_many :posts
  has_many :notification_blueprints, :as => :notificationable
  
end
