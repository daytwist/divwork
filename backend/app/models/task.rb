class Task < ApplicationRecord
  validates :title, presence: true, length: { maximum: 50 }
  validates :content, length: { maximum: 400 }
  validates :deadline, presence: true
  validates :priority, presence: true
  validates :is_done, presence: true
  validates :created_user_id, presence: true
end
