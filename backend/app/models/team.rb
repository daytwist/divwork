class Team < ApplicationRecord
  has_many :users, dependent: :restrict_with_error

  validates :name, presence: true, length: { maximum: 20 }
  validates :max_num_of_users, numericality: {
    only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 20
  }

  def admin_users
    users.where(admin: true)
  end
end
