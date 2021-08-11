# == Schema Information
#
# Table name: response_options
#
#  id                 :bigint           not null, primary key
#  text               :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_question_id :integer          not null
#
# Indexes
#
#  index_response_options_on_text_and_parent_question_id  (text,parent_question_id) UNIQUE
#
FactoryBot.define do
  factory :response_option do
    
  end
end
