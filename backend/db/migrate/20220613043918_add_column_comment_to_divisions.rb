class AddColumnCommentToDivisions < ActiveRecord::Migration[6.1]
  def change
    add_column :divisions, :comment, :string
  end
end
