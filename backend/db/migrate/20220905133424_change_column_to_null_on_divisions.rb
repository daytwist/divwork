class ChangeColumnToNullOnDivisions < ActiveRecord::Migration[6.1]
  def up
    change_column_null :divisions, :user_id, true
  end

  def down
    change_column_null :divisions, :user_id, false
  end
end
