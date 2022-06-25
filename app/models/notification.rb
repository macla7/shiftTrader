class Notification < ApplicationRecord
  belongs_to :notification_blueprint
  belongs_to :recipient, class_name: 'User', foreign_key: 'recipient_id'
end
