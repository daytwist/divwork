class Team < ApplicationRecord
  has_many :users, dependent: :restrict_with_error

  validates :name, presence: true, length: { maximum: 20 }

  def admin_users
    users.where(admin: true)
  end
end
