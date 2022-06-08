class Task < ApplicationRecord
  belongs_to :user

  enum priority: { low: 0, medium: 1, high: 2 }

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, length: { maximum: 400 }
  validates :deadline, presence: true
  validates :priority, inclusion: { in: Task.priorities.keys }
  validates :is_done, inclusion: { in: [true, false] }

  scope :unfinished, -> { where(is_done: false)}
  scope :finished, -> { where(is_done: true) }
end
