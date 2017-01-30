class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.string :importance
      t.integer :value, null: false
      t.float :reps, null: false
      t.string :period, null: false

      t.timestamps null: false
    end
  end
end
