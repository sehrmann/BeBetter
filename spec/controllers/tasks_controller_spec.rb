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


  describe "GET #index" do
    it "should return all a user's tasks" do
      get :index
      json = JSON.parse(response.body)
      puts json
    end
  end

  describe "GET #show" do

  end

  describe "POST #create" do

  end

  describe "PUT #update" do

  end

  describe "DELETE #destroy" do

  end

  describe "GET #importances_and_periods" do

  end
end
