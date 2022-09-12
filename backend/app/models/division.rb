class Division < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :comment, length: { maximum: 100 }

  def details
    parent_user_id = task.parent.user_id
    parent_user_name = task.parent.user.name
    parent_task_id = task.parent_id
    parent_task_title = task.parent.title
    child_user_id = task.user_id
    child_user_name = task.user.name
    child_task_id = task_id
    child_task_title = task.title
    created_at = self.created_at

    { parent_user_id:, parent_user_name:, parent_task_id:, parent_task_title:,
      child_user_id:, child_user_name:, child_task_id:, child_task_title:,
      created_at: }
  end
end
