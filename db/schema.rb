# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_11_025008) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer "response_id", null: false
    t.integer "question_id", null: false
    t.integer "response_option_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["response_id", "question_id"], name: "index_answers_on_response_id_and_question_id", unique: true
  end

  create_table "polls", force: :cascade do |t|
    t.string "title", null: false
    t.integer "author_id", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "questions", force: :cascade do |t|
    t.integer "parent_poll_id", null: false
    t.string "title", null: false
    t.string "question_type", default: ":RADIO", null: false
    t.boolean "required", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["title", "parent_poll_id"], name: "index_questions_on_title_and_parent_poll_id", unique: true
  end

  create_table "response_options", force: :cascade do |t|
    t.integer "parent_question_id", null: false
    t.string "text", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["text", "parent_question_id"], name: "index_response_options_on_text_and_parent_question_id", unique: true
  end

  create_table "responses", force: :cascade do |t|
    t.integer "respondent_id", null: false
    t.integer "poll_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id", "respondent_id"], name: "index_responses_on_poll_id_and_respondent_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin", default: false
    t.string "session_token", null: false
  end

end
