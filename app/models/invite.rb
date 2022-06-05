class Invite < ApplicationRecord
  belongs_to :group
  belongs_to :internal_user, class_name: 'User', foreign_key: 'user_id'
  belongs_to :external_user, class_name: 'User', foreign_key: 'user_id'
end
