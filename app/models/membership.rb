class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  scope :is_admin, -> { where(role: 'admin') }

  enum status: [:current, :left, :kicked]
  enum role: [:admin, :user]
end
