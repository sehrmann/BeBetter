require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  include Capybara::DSL

  before(:each) do
    login_with_facebook("basiliskSlayer")
    harry = User.find_by(name: "basiliskSlayer")
    quidditch = Task.new(
      name: "Quidditch practice",
      importance: "Very High",
      reps: 2,
      period: "Week",
      user: harry
    )
    quidditch.set_value!
    quidditch.save
    dada = Task.new(
      name: "Defense Against the Dark Arts",
      importance: "Very High",
      reps: 5,
      period: "Week",
      user: harry
    )
    dada.set_value!
    dada.save
    potions = Task.new(
      name: "Potions",
      importance: "Very Low",
      reps: 2,
      period: "Week",
      user: harry
    )
    potions.set_value!
    potions.save
  end


  describe "POST #update_points_goal" do
    it "calls the update_points_goal! class method" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      post :update_points_goal, params: { user_id: harry.id }
      harry = User.find_by(name: "basiliskSlayer")

      expect(harry.points_goal).to eq(8406)
    end
  end

  describe "POST #clear_tasks" do
    it "clears the user's task list" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      post :clear_tasks, params: { user_id: harry.id }
      harry = User.find_by(name: "basiliskSlayer")

      expect(harry.tasks.length).to eq(0)
    end
  end

  describe "GET #fetch_current_user" do
    it "returns the current user, whether or not they have tasks, and if it is a new month" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      get :fetch_current_user
      json = JSON.parse(response.body)

      expect(json["user"]["id"]).to eq(harry.id)
      expect(json["hasTasks"]).to eq(true)
      expect(json["newMonth"]).to eq(false)
    end
  end

  describe "PUT #update" do
    it "updates the current points and/or points goal of the user" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      put :update, params: {
        id: harry.id,
        user: {
          current_points: 150,
          points_goal: 453
        }
      }
      harry = User.find_by(name: "basiliskSlayer")

      expect(harry.current_points).to eq(150)
      expect(harry.points_goal).to eq(453)
    end
  end
end
