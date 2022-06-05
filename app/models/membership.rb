class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  enum status: [:accepted, :rejected, :left, :kicked]
  enum role: [:admin, :user]
end
