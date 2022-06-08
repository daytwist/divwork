class AddForeignKeyToUsers < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :team_id, :bigint
    add_foreign_key :users, :teams
  end
end
