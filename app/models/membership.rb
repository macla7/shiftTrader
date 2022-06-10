class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  enum status: [:current, :left, :kicked]
  enum role: [:admin, :user]
end
