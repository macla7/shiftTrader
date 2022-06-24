class Post < ApplicationRecord
  belongs_to :user
  belongs_to :group
  has_many :likes
  has_many :bids
  has_many :shifts
  
  accepts_nested_attributes_for :shifts
  
  scope :active, ->{ where('ends_at > ?', DateTime.current()) }
  scope :past_posts, ->{ where('ends_at < ?', DateTime.current())}

  def post_info
    self.as_json.merge({
      email: self.user.email,
      bids: self.bids,
      likes: self.likes,
      shifts: self.shifts
      })  
  end
end
