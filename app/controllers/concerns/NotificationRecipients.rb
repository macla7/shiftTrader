module NotificationRecipients
  extend ActiveSupport::Concern

  def set_entity(notificationable_type, notificationable_id)
    if notificationable_type == "Group"
      @group =  Group.find(notificationable_id)
    elsif notificationable_type == "Post"
      @post = Post.find(notificationable_id)
    end
  end

  def getRecipients(notification_blueprint_params)
    set_entity(notification_blueprint_params['notificationable_type'], notification_blueprint_params['notificationable_id'])
    case notification_blueprint_params['notification_type']
    when 4
      return @group.users
    else
      return []
    end
  end
end