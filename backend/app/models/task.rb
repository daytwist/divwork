class Task < ApplicationRecord
  belongs_to :user
  has_one :division, dependent: :destroy
  has_many :children, class_name: "Task", foreign_key: "parent_id", inverse_of: :parent, dependent: :nullify
  belongs_to :parent, class_name: "Task", optional: true, inverse_of: :children
  has_many_attached :files

  enum priority: { low: 0, medium: 1, high: 2 }

  validates :title, presence: true, length: { maximum: 50 }
  validates :description, length: { maximum: 400 }
  validates :deadline, presence: true
  validates :priority, inclusion: { in: Task.priorities.keys }
  validates :is_done, inclusion: { in: [true, false] }
  validates :rate_of_progress, numericality: {
    only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100
  }

  scope :unfinished, -> { where(is_done: false) }
  scope :finished, -> { where(is_done: true) }

  scope :deadline_long, lambda {
    where("deadline > ?", Time.zone.today.advance(days: 8))
  }
  scope :deadline_middle, lambda {
    where(deadline: Time.zone.today.advance(days: 4)..Time.zone.today.advance(days: 8))
  }
  scope :deadline_short, lambda {
    where("deadline <= ?", Time.zone.today.advance(days: 4))
  }
end
