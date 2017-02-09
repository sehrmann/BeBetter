class CreateRewards < ActiveRecord::Migration[5.0]
  def change
    create_table :rewards do |t|
      t.string :asin, null: false
      t.belongs_to :user
      
      t.timestamps
    end
  end
end
