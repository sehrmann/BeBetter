class Task < ApplicationRecord

  PERIODS = ["Day","Week","Month"]
  IMPORTANCES = [
    ["Very Low", 1_500],
    ["Low", 2_250],
    ["Medium", 3_000],
    ["High", 3_750],
    ["Very High", 4_500],
    ["Custom (Advanced)", nil]
  ]

  def frequency(days_in_month)
    case period
      when "Day"
        reps * days_in_month.to_f
      when "Week"
        (reps * days_in_month).to_f / 7
      when "Month"
        reps.to_f
    end
  end

  def set_value!
    IMPORTANCES.each do |importance_name, importance_value|
      if importance == importance_name && importance != "Custom (Advanced)"
        update(value: (importance_value / frequency(31)).round(0))
      end
    end
  end

  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].blank?
  end

  belongs_to :user

  validates :name,
    presence: true
  validates :importance,
    inclusion: { in: IMPORTANCES.map { |i| i.first } },
    allow_nil: true
  validates :value,
    presence: true,
    numericality: { greater_than_or_equal_to: 0 }
  validates :reps,
    presence: true,
    numericality: { greater_than: 0 }
  validates :period,
    presence: true,
    inclusion: { in: PERIODS}
end
