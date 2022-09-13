class Division < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :comment, length: { maximum: 100 }

  def parent_task
    task.parent
  end

  def parent_user
    task.parent.user
  end

  def child_task
    task
  end

  def child_user
    task.user
  end
end
