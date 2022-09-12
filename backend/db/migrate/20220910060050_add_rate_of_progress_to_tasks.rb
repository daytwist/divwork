class AddRateOfProgressToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :rate_of_progress, :integer, default: 0
  end
end
