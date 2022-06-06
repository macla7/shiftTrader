class Invite < ApplicationRecord
  belongs_to :group
  belongs_to :internal_user, class_name: 'User'
  belongs_to :external_user, class_name: 'User'
end