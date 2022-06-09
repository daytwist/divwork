class Task < ApplicationRecord
  belongs_to :user
  has_one :division, dependent: :destroy
  has_many :children, class_name: "Task", foreign_key: "parent_id", inverse_of: :parent, dependent: :nullify
  belongs_to :parent, class_name: "Task", optional: true, inverse_of: :children

  enum priority: { low: 0, medium: 1, high: 2 }

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, length: { maximum: 400 }
  validates :deadline, presence: true
  validates :priority, inclusion: { in: Task.priorities.keys }
  validates :is_done, inclusion: { in: [true, false] }

  scope :unfinished, -> { where(is_done: false) }
  scope :finished, -> { where(is_done: true) }
end
