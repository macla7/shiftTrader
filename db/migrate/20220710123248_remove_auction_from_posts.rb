class RemoveAuctionFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :auction, :boolean
  end
end
