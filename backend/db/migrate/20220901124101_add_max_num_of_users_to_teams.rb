class AddMaxNumOfUsersToTeams < ActiveRecord::Migration[6.1]
  def change
    add_column :teams, :max_num_of_users, :integer, default: 10
  end
end
