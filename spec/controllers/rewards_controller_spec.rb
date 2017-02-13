require "rails_helper"

RSpec.describe Api::V1::RewardsController, type: :controller do
  include Capybara::DSL

  before(:each) do
    login_with_facebook("basiliskSlayer")
    harry = User.find_by(name: "basiliskSlayer")
    fantastic_beasts = Reward.create(
      asin: "1338132318",
      user: harry
    )
    candy = Reward.create(
      asin: "B005BFJGJU",
      user: harry
    )
    quidditch = Reward.create(
      asin: "0545850584",
      user: harry
    )
  end


  describe "GET #index" do
    it "should return all a user's rewards" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      get :index
      json = JSON.parse(response.body)

      expect(json.length).to eq(3)
      expect(json[0]["asin"]).to eq("0545850584")
      expect(json[0]["user_id"]).to eq(harry.id)
      expect(json[1]["asin"]).to eq("B005BFJGJU")
      expect(json[1]["user_id"]).to eq(harry.id)
      expect(json[2]["asin"]).to eq("1338132318")
      expect(json[2]["user_id"]).to eq(harry.id)
    end
  end

  describe "POST #create" do
    it "adds a reward to the user's rewards" do
      harry = User.find_by(name: "basiliskSlayer")
      session[:user_id] = harry.id
      post :create, params: {
        reward: {
          asin: "B0026PW67W",
        }
      }
      map = Reward.find_by(asin: "B0026PW67W")
      rewards = harry.rewards

      expect(rewards.length).to eq(4)
      expect(rewards.include?(map)).to be(true)
    end
  end

  describe "DELETE #destroy" do
    it "should delete the reward" do
      candy = Reward.find_by(asin: "B005BFJGJU")
      session[:user_id] = User.find_by(name: "basiliskSlayer").id
      delete :destroy, params: { id: candy.id }
      rewards = Reward.all.map { |reward| reward.id }

      expect(rewards.length).to eq(2)
      expect(rewards.find { |id| id == candy.id }).to be(nil)
    end
  end

  xdescribe "POST #amazon_lookup" do
    it "should return the title, image, price, and url of the given ASIN" do
      session[:user_id] = User.find_by(name: "basiliskSlayer").id

    end
  end
end
