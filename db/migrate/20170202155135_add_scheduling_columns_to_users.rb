class AddSchedulingColumnsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :current_month, :integer, null: false
  end
end
