require 'rails_helper'

describe User, type: :model do
  let(:harry) { User.new(
    email: "hpotter@hogwarts.wiz",
    name: "basiliskSlayer",
    oauth_uid: "1",
    current_month: 7
    )}

  it { should have_valid(:email).when('anything') }
  it { should_not have_valid(:email).when("", nil) }

  it { should have_valid(:name).when('harry','h4rry','h-rry','H_rry') }
  it { should_not have_valid(:name).when(nil,'','!@#$%\'^&*()\'}]') }

  it { should have_valid(:oauth_uid).when('something') }
  it { should_not have_valid(:oauth_uid).when('', nil) }

  it { should have_valid(:points_goal).when(0, 22_550) }
  it { should_not have_valid(:points_goal).when(-2, nil, "five") }

  it { should have_valid(:current_points).when(0, 50) }
  it { should_not have_valid(:current_points).when(-26, nil, "twenty") }

  it { should have_valid(:savings).when(0, 500) }
  it { should_not have_valid(:savings).when(-266, nil, "forty-two") }

  it { should have_valid(:current_month).when(1,2,3,4,5,6,7,8,9,10,11,12) }
  it { should_not have_valid(:current_month).when(0,nil,"May") }

  describe "default values" do
    it "should default sign_in_count, points_goal, current_points, savings to zero" do
      expect(harry.sign_in_count).to eq(0)
      expect(harry.points_goal).to eq(0)
      expect(harry.current_points).to eq(0)
      expect(harry.savings).to eq(0)
    end
  end

  describe "#days_in_month" do
    it "calculates the number of days in a month" do
      [4,6,9,11].each do |month|
        harry.update(current_month: month)
        expect(harry.days_in_month).to eq(30)
      end
      [1,3,5,7,8,10,12].each do |month|
        harry.update(current_month: month)
        expect(harry.days_in_month).to eq(31)
      end
      harry.update(current_month: 2)
      expect(harry.days_in_month).to eq(Time.now.to_date.leap? ? 29 : 28)
    end
  end

  describe "#days_left_in_month" do
    it "calculates the number of days left in a month" do
      expect(harry.days_left_in_month).to eq(31 - Time.now.day)
    end
  end

  describe "#update_points_goal!" do
    it "Sets points goal to 80% of the total points for that month" do
      dishes = Task.new(
        name: "Do dishes",
        importance: "Low",
        reps: 1,
        period: "Day",
        user: harry
      )
      dishes.set_value!
      dishes.save
      gym = Task.new(
        name: "Go to the gym",
        importance: "High",
        reps: 3.5,
        period: "Week",
        user: harry
      )
      gym.set_value!
      gym.save
      read = Task.new(
        name: "Read a book",
        importance: "Medium",
        reps: 1,
        period: "Month",
        user: harry
      )
      read.set_value!
      read.save

      harry.update_points_goal!

      expect(harry.points_goal).to eq(7_211)
    end
  end

end
