class ChangeColumnToNullOnDivisionsTaskid < ActiveRecord::Migration[6.1]
  def up
    change_column_null :divisions, :task_id, true
  end

  def down
    change_column_null :divisions, :task_id, false
  end
end
