class AddUsersCountToTeams < ActiveRecord::Migration[6.1]
  def self.up
    add_column :teams, :users_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :teams, :users_count
  end
end
