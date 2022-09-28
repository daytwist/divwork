class Division < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :comment, length: { maximum: 100 }

  def parent_task
    if task&.parent_id?
      task.parent
    end
  end

  def parent_user
    if task&.parent_id?
      task.parent.user
    end
  end

  def child_task
    task
  end

  def child_user
    task&.user
  end
end
