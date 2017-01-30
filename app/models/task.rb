class Task < ApplicationRecord

  def frequency(days_in_month)
    case period
      when "Day"
        reps / days_in_month
      when "Week"
        reps / (7 * days_in_month)
      when "Month"
        reps
      else
        0
    end
  end

  validates :name,
    presence: true
  validates :importance,
    inclusion: { in: ["Very Low", "Low", "Medium", "High", "Very High"]},
    allow_nil: true
  validates :value,
    presence: true,
    numericality: true
  validates :reps,
    presence: true,
    numericality: true
  validates :period,
    presence: true,
    inclusion: { in: ["Day","Week","Month"]}
end
