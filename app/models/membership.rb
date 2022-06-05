class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  enum status: [:pending, :accepted, :rejected, :left, :kicked]
end
