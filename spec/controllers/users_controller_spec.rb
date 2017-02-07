require "rails_helper"

RSpec.describe Api::V1::TasksController, type: :controller do
  include Capybara::DSL

  before(:each) do
    login_with_facebook("basiliskSlayer")
    harry = User.find_by(name: "basiliskSlayer")
    quidditch = Task.create(
      name: "Quidditch practice",
      importance: "Very High",
      reps: 2,
      period: "Week",
      user: harry
    )
    dada = Task.create(
      name: "Defense Against the Dark Arts",
      importance: "Very High",
      reps: 5,
      period: "Week",
      user: harry
    )
    potions = Task.create(
      name: "Potions",
      importance: "Very Low",
      reps: 2,
      period: "Week",
      user: harry
    )
  end


  describe "POST #update_points_goal" do

  end

  describe "POST #clear_tasks" do

  end

  describe "GET #fetch_current_user" do

  end

  describe "PUT #update" do

  end
end
