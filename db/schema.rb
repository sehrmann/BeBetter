# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170209154113) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "rewards", force: :cascade do |t|
    t.string   "asin",       null: false
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_rewards_on_user_id", using: :btree
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "importance"
    t.integer  "value",      null: false
    t.float    "reps",       null: false
    t.string   "period",     null: false
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tasks_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.datetime "last_signed_in_at"
    t.string   "name"
    t.string   "oauth_uid"
    t.integer  "sign_in_count",     default: 0
    t.integer  "points_goal",       default: 0
    t.integer  "current_points",    default: 0
    t.float    "savings",           default: 0.0
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "current_month",                   null: false
    t.index ["name"], name: "index_users_on_name", unique: true, using: :btree
    t.index ["oauth_uid"], name: "index_users_on_oauth_uid", unique: true, using: :btree
  end

end
