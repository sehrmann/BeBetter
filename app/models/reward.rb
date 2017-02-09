class Reward < ApplicationRecord
  belongs_to :user

  validates :asin,
    length: { is: 10 },
    presence: true
end
