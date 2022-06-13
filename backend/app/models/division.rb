class Division < ApplicationRecord
  belongs_to :user
  belongs_to :task

  validates :comment, length: { maximum: 100 }
end
