# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one_attached :avatar
  belongs_to :team
  has_many :tasks, dependent: :destroy
  has_many :divisions, dependent: :nullify

  validates :name, presence: true, length: { maximum: 10 }

  def unfinished_tasks_priority_count
    low    = tasks.unfinished.where(priority: 0).size
    medium = tasks.unfinished.where(priority: 1).size
    high   = tasks.unfinished.where(priority: 2).size
    [low, medium, high]
  end

  def unfinished_tasks_deadline_count
    long = tasks.unfinished.deadline_long.size
    middle = tasks.unfinished.deadline_middle.size
    short = tasks.unfinished.deadline_short.size
    [long, middle, short]
  end

  def self.guest
    find_or_create_by!(email: "guest@example.com") do |user|
      user.name = "ゲスト"
      user.password = SecureRandom.urlsafe_base64
      user.team_id = 1
    end
  end

  def team_members
    team.users.where.not(id:)
  end
end
