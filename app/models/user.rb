class User < ApplicationRecord
  has_many :tasks

  validates_format_of :name, with: /\A[\w-]+\z/, message: "May only contain letters, numbers, dashes, and underscores."
  validates_presence_of :email, :name, :oauth_uid
  validates_uniqueness_of :oauth_uid, :name
end
