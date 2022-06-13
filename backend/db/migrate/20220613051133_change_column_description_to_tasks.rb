class ChangeColumnDescriptionToTasks < ActiveRecord::Migration[6.1]
  def change
    rename_column :tasks, :content, :description
  end
end
