class NotificationBlueprint < ApplicationRecord
  belongs_to :notificationable, :polymorphic => true
  has_many :notifications
  has_many :notification_origins
end
