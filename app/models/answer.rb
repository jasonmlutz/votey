# == Schema Information
#
# Table name: answers
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  question_id        :integer          not null
#  response_id        :integer          not null
#  response_option_id :integer          not null
#
class Answer < ApplicationRecord
  validates :question_id, :response_id, :response_option_id, presence: true
  validates_with QuestionHasResponseOption

  belongs_to :question, foreign_key: :question_id # redundant?
  belongs_to :response, foreign_key: :response_id
  belongs_to :response_option, foreign_key: :response_option_id
end

class QuestionHasResponseOption < ActiveModel::Validator
  def validate(record)
    unless record.question == record.response_option.question
      record.errors.add(:base, "Question does not have selected ResponseOption")
    end
  end
end
