class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  scope :is_admin, -> { where(role: 'admin') }

  enum status: [:current, :left, :kicked]
  enum role: [:admin, :user]

  def member_info
    self.as_json.merge({
      user: self.user,
      })  
  end
end
