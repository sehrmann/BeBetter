class Api::V1::RewardsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @rewards = current_user.rewards.order("created_at DESC")
    render json: @rewards
  end

  def create
    @reward = Reward.new(reward_params)
    @reward.user = current_user
    @reward.save
  end

  def destroy
    @reward = Reward.find(params[:id])
    @reward.destroy
  end

  def amazon_lookup
    @asin = reward_params[:asin]
    response = paa.ItemLookup(
      'AssociateTag' => 'seehrmann-20',
      'IdType' => 'ASIN',
      'ItemId' => @asin,
      'ResponseGroup' => 'Medium'
    )
    @item = response["ItemLookupResponse"]["Items"]["Item"]
    render json: {
      title: @item["ItemAttributes"]["Title"],
      image: @item["SmallImage"]["URL"],
      price: @item["OfferSummary"]["LowestNewPrice"]["FormattedPrice"],
      url: @item["DetailPageURL"]
    }
  end

  private

  def reward_params
    params.require(:reward).permit(:asin)
  end

  def paa
    key      = ENV['AWS_ACCESS_KEY_ID']
    secret   = ENV['AWS_SECRET_KEY']
    endpoint = 'https://webservices.amazon.com'
    paa      = RightScale::CloudApi::ECS::PA::Manager.new(key, secret, endpoint, :cache => true)
  end
end
