class CreateDivisions < ActiveRecord::Migration[6.1]
  def change
    create_table :divisions do |t|
      t.references :user, foreign_key: true, null: false
      t.references :task, foreign_key: true, null: false

      t.timestamps
    end
  end
end
