class Task < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, length: { maximum: 400 }
  validates :deadline, presence: true
  validates :priority, presence: true
  validates :is_done, presence: true

  enum priority: { low: 0, medium: 1, high: 2 }
end
