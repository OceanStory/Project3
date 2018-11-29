class AddPostIdToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :post_id, :integer
  end
end
