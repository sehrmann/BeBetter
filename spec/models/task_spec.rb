require 'rails_helper'

describe Task, type: :model do
  it { should have_valid(:name).when('Do the dishes') }
  it { should_not have_valid(:name).when(nil,'') }

  it { should have_valid(:importance).when(
    'Very Low',
    'Low',
    'Medium',
    'High',
    'Very High',
    'Custom (Advanced)',
    nil)
  }
  it { should_not have_valid(:importance).when('kinda',5) }

  it { should have_valid(:value).when(0,500,205.1) }
  it { should_not have_valid(:value).when(nil,'',-22,-500.6) }

  it { should have_valid(:reps).when(3,2.5) }
  it { should_not have_valid(:reps).when(nil,'',-5,) }

  it { should have_valid(:period).when('Day','Week','Month') }
  it { should_not have_valid(:period).when(nil,'',5,'Year') }

  describe "instance methods" do
    let(:harry) { User.new(
      email: "hpotter@hogwarts.wiz",
      name: "basiliskSlayer",
      oauth_uid: "1",
      current_month: 7
    )}
    let(:dishes) { Task.new(
      name: "Do dishes",
      importance: "Low",
      reps: 1,
      period: "Day",
      user: harry
    )}
    let(:gym) { Task.new(
      name: "Go to the gym",
      importance: "High",
      reps: 3.5,
      period: "Week",
      user: harry
    )}
    let(:read) { Task.new(
      name: "Read a book",
      importance: "Medium",
      reps: 1,
      period: "Month",
      user: harry
    )}

    describe "#frequency" do
      it "calculates the number of times a task should be completed per month" do
        expect(dishes.frequency(31)).to eq(31.0)
        expect(gym.frequency(30)).to eq(15.0)
        expect(read.frequency(28)).to eq(1.0)
      end
    end

    describe "#set_value!" do
      it "assigns a per-task point value based on frequency and importance" do
        dishes.set_value!
        gym.set_value!
        read.set_value!

        expect(dishes.value).to eq(73)
        expect(gym.value).to eq(242)
        expect(read.value).to eq(3000)
      end
    end
  end

end
