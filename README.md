# README

[ ![Build Status](https://app.codeship.com/projects/1e45bca0-c931-0134-3488-3a0fd8dae151/status?branch=master)](https://app.codeship.com/projects/199211)
[![Code Climate](https://codeclimate.com/github/sehrmann/BeBetter/badges/gpa.svg)](https://codeclimate.com/github/sehrmann/BeBetter)
[![Coverage Status](https://coveralls.io/repos/github/sehrmann/BeBetter/badge.svg?branch=master)](https://coveralls.io/github/sehrmann/BeBetter?branch=master)

# BeBetter

## Overview

[BeBetter](https://justbebetter.herokuapp.com) is a productivity app designed to motivate users to complete regular tasks by gamifying the experience. Users accumulate points by completing tasks, and are encouraged to buy a reward if a monthly goal is met.

## Features

* Built as a single-page React app for a seamless user experience
* Users can sign up using OmniAuth for Facebook
* Users have a Dashboard with:
  * Navigation to their TaskList, WishList, and Fun Fund
  * A progress bar showing how close they are to their monthly goal
* Users can add Tasks to their TaskList
  * Based on the importance and frequency of the Task, it is assigned a point value
* Users can add Items to their WishList
  * Users input an ASIN (Amazon Standard Identification Number) to add an item
  * To display Item information, data is pulled from Amazon's Product Advertising API
* Users can track their savings through their Fun Fund
  * Savings are used to buy a reward from the WishList at the end of the month if the point goal is met
* New User setup. When a user first logs in, they are:
  1. Prompted to add several Tasks to their TaskList
  2. Shown their first monthly point goal
* Monthly summary / new month setup. Shows at the start of a new month
  1. Display whether or not previous monthly goal was met
  2. Ask whether the user wants to import their previous month's Tasks
    * Show the current TaskList, allow the User to Edit or Delete current Tasks
  3. Prompt the User to add any new Tasks to their TaskList
  4. Show the next month's point goal

## Core Technologies

### Stack
* PostgreSQL
* ActiveRecord
* Ruby on Rails
* React
* Foundation

### Test
* RSpec
* Capybara
* Enzyme
* Karma
* PhantomJS
* Jasmine
* Coveralls
* Codeship
* CodeClimate
* Hound CI

### Gems
* OmniAuth
* OmniAuth-Facebook
* Rightscale right_aws_api
* FontAwesome
* Foudation

### External APIs
* Amazon Product Advertising API
