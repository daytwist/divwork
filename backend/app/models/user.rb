# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one_attached :avatar
  belongs_to :team
  has_many :tasks, dependent: :nullify
  has_many :divisions, dependent: :nullify

  validates :name, presence: true, length: { maximum: 10 }

  def tasks_count
    low    = tasks.where(priority: 0).size
    medium = tasks.where(priority: 1).size
    high   = tasks.where(priority: 2).size
    [low, medium, high]
  end

  def self.guest
    find_or_create_by!(email: "guest@example.com") do |user|
      user.name = "ゲスト"
      user.password = SecureRandom.urlsafe_base64
      user.team = Team.find(1)
    end
  end
end
