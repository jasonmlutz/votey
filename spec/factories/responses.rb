# == Schema Information
#
# Table name: responses
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  poll_id       :integer          not null
#  respondent_id :integer          not null
#
FactoryBot.define do
  factory :response do
    
  end
end
