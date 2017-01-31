source 'https://rubygems.org/'

gem 'omniauth'
gem 'omniauth-facebook'
gem 'recaptcha', require: "recaptcha/rails"
gem 'rails', '~> 5.0.0'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'font-awesome-rails'
gem 'foundation-rails'

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development, :test do
  gem 'dotenv-rails', require: 'dotenv/rails-now'
  gem 'capybara'
  gem 'factory_girl_rails'
  gem 'warden-rspec-rails'
  gem 'database_cleaner'
  gem 'launchy', require: false
  gem 'pry-rails'
  gem 'rspec-rails', '~> 3.5'
  gem 'shoulda'
  gem 'valid_attribute'
end

group :test do
  gem 'coveralls', require: false
end

group :production do
  gem 'rails_12factor'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
