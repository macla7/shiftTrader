class Comment < ApplicationRecord
  include ActiveModel::Serializers::JSON
  
  belongs_to :post
  belongs_to :user

  default_scope { order(created_at: :desc) }

  def avatar_url
    return self.user.avatar_url
  end

  def commentor
    return self.user.name
  end
end
