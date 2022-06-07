class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :content
      t.datetime :deadline, null: false
      t.integer :priority, null: false
      t.boolean :is_done, null: false, default: false
      t.integer :created_user_id, null: false

      t.timestamps
    end
  end
end
