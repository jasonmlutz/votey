# == Schema Information
#
# Table name: questions
#
#  id             :bigint           not null, primary key
#  question_type  :string           default(":RADIO"), not null
#  required       :boolean          default(TRUE)
#  title          :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  parent_poll_id :integer          not null
#
# Indexes
#
#  index_questions_on_title_and_parent_poll_id  (title,parent_poll_id) UNIQUE
#
class Question < ApplicationRecord
  validates :question_type, :title, :parent_poll_id, presence: true
  validates :title, uniqueness: {scope: :parent_poll_id}

  belongs_to :poll, foreign_key: :parent_poll_id
  has_many :response_options, foreign_key: :parent_question_id, dependent: :destroy
  has_many :answers, foreign_key: :question_id, dependent: :destroy
end
