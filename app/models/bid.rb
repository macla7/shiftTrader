class Bid < ApplicationRecord
  include ActiveModel::Serializers::JSON
  
  belongs_to :post
  belongs_to :user

  def users
    return memberships.is_admin.map { |member| member.user}
  end

  def avatar_url
    return self.user.avatar_url
  end

end
