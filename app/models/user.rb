class User < ApplicationRecord

  def days_in_month
    case current_month
      when 4, 6, 9, 11
        30
      when 1, 3, 5, 7, 8, 10, 12
        31
      else
        Time.now.to_date.leap? ? 29 : 28
    end
  end

  def days_left_in_month
    days_in_month - Time.now.day
  end

  has_many :tasks

  validates_format_of :name, with: /\A[\w-]+\z/, message: "May only contain letters, numbers, dashes, and underscores."
  validates_presence_of :email, :name, :oauth_uid
  validates_uniqueness_of :oauth_uid, :name
  validates :points_goal,
    numericality: { greater_than_or_equal_to: 0 }
  validates :current_points, numericality: { greater_than_or_equal_to: 0 }
  validates :savings, numericality: { greater_than_or_equal_to: 0 }
  validates :current_month,
    presence: true,
    inclusion: { in: (1..12).to_a }
end
