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
FactoryBot.define do
  factory :question do
    
  end
end
