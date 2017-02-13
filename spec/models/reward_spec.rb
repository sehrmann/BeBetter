require 'rails_helper'

describe Reward, type: :model do
  let(:harry) { User.new(
    email: "hpotter@hogwarts.wiz",
    name: "basiliskSlayer",
    oauth_uid: "1",
    current_month: 7
  )}

  let(:candy) { Reward.new(
    asin: "B005BFJGJUz",
    user: harry
  )}

  it { should have_valid(:asin).when('B005BFJGJU', '1338132318') }
  it { should_not have_valid(:asin).when(nil, '12345', 'candy', 12345, 20.2) }

  it { should have_valid(:user).when(harry) }
  it { should_not have_valid(:user).when(nil) }
end
