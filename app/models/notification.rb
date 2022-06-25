class Notification < ApplicationRecord
  belongs_to :notification_blueprint
  belongs_to :recipient, class_name: 'User', foreign_key: 'recipient_id'

  def notification_info
    self.as_json.merge({
      notification_blueprint: self.notification_blueprint,
      notification_origin: self.notification_blueprint.notification_origin
      })  
  end

end