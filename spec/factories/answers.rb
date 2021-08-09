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
# Indexes
#
#  index_answers_on_response_id_and_question_id  (response_id,question_id) UNIQUE
#
FactoryBot.define do
  factory :answer do
    
  end
end
