class Bid < ApplicationRecord
  belongs_to :post
  belongs_to :user

  def users
    return memberships.is_admin.map { |member| member.user}
  end
end
