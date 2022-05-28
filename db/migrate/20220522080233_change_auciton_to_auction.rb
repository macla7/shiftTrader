class ChangeauctionToAuction < ActiveRecord::Migration[7.0]
  change_table :posts do |t|
    t.rename :auction, :auction
  end
end
