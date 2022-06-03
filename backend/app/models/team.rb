class Team < ApplicationRecord
  has_many :users, dependent: :nullify

  validates :name, presence: true, length: { maximum: 20 }
end
