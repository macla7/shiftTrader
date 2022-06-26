# This whole file makes me uncomfortable lol
module NotificationHelpers
  extend ActiveSupport::Concern

  def set_entity(notificationable_type, notificationable_id)
    if notificationable_type == "Group"
      @group =  Group.find(notificationable_id)
    elsif notificationable_type == "Post"
      @post = Post.find(notificationable_id)
    end
  end

  def make_notification_description(notification_blueprint, notification_origin)
    set_entity(notification_blueprint.notificationable_type, notification_blueprint.notificationable_id)
    case notification_blueprint.notification_type
    when 1
      return "#{notification_origin.notifier.email} invited you to #{@group.name}"
    when 3
      return "#{notification_origin.notifier.email} has requested to join #{@group.name}"
    when 4
      return "#{notification_origin.notifier.email} posted in #{@group.name}"
    else 
      return "Error, can't find this notification.."
    end
  end

  def getRecipients(notification_blueprint_params)
    set_entity(notification_blueprint_params['notificationable_type'], notification_blueprint_params['notificationable_id'])
    case notification_blueprint_params['notification_type']
    when 1
      return [User.find(notification_blueprint_params['recipient_id'])]
    when 3
      return @group.admins
    when 4
      return @group.users
    else
      return []
    end
  end

end